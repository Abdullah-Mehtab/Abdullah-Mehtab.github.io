.data
buffer:  .space 1024              # Buffer to store the read data from file
filename: .asciiz "data/data_1.csv" # Path of the file
# Adjust the size based on the maximum number of rows and columns
all_data: .space 1024
train_data: .space 1024
test_data: .space 512

# Simple 1-D Arrays
averages: .space 64
weights:   .space 256 # After Linear Regression
predicted: .space 256

# For the fit, kept in double precision (8 bytes each), so they start on an 8 byte boundary
.align 3
averagesD: .space 80   # Column averages as doubles, Y first (up to 10 columns)
spreadD:   .space 72   # Each X column's spread before the solve, to judge a pivot
matrixA:   .space 576  # The table the fit solves: k rows, k+1 columns (up to 8 X columns)
tiny:      .double 1.0e-9

# For Printing Output in a clean way
raww: .asciiz "Data read from file:\n"
formatted_raww: .asciiz "\nGiven Data:\nY"
tabX: .asciiz "\tX"
no_fit: .asciiz "\n\nNo line fits: two X columns move together in the Train Data (or one never changes).\n"
num_rows: .asciiz "\nRows: "
num_cols: .asciiz "\nCols: "
trained: .asciiz "\nTrain Data: \n"
tested: .asciiz "\nTest Data: \n"
average: .asciiz "\nAverages:\n"
weight: .asciiz "Weights:\n"
formula: .asciiz "\n\nFormula:\nY = b0 + x1 * b1 + x2 * b2 . . . xn * bn\nY = "
plusX:  .asciiz " + (X"
mulsign: .asciiz " * "
actual: .asciiz "\nActual: "
predicc: .asciiz "\tPredicted: "

Goodbye: .asciiz "\n\n  |\\_/|   ****************************  (\\_/)\n / @ @ \\  *     Project Complete!    * (='.'=)\n( > º < ) *         Goodbye!         * (')_(')\n `>>x<<´  *     (Abdullah Mehtab)    *\n /  O  \\  *"

.text
main:
    # UDF-1 (Assignment 2 :v)
    jal ReadnStore
    # UDF-2 
    jal test_train_data
    # UDF-3
    jal linRegression
    # UDF-4 (only when UDF-3 found a line: s4 = 1 means it could not)
    bnez $s4, Say_goodbye
    jal testModel

    Say_goodbye:
    li $v0, 4
    la $a0, Goodbye
    syscall

    j Exit

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# # # # # # # # # UDF-1 --> Read Raw data, convert to integer and store in Matrix # # # # # # # # # #

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

ReadnStore:
    # Open the file for reading
    li $v0, 13            # System call code for open file
    la $a0, filename      # Load the address of the filename
    li $a1, 0             # Flags: read-only
    li $a2, 0             # Mode: not needed for reading
    syscall

    move $s0, $v0         # Save the file descriptor

    # Read from the file
    li $v0, 14            # System call code for read from file
    move $a0, $s0         # File descriptor
    la $a1, buffer        # Buffer to store the read string
    li $a2, 1024          # Maximum number of bytes to read
    syscall

    # Print the read string
    li $v0, 4             
    la $a0, raww
    syscall
    
    li $v0, 4             
    la $a0, buffer
    syscall
    move $a2, $a0 # a2 = file's data

    # Close the file
    li $v0, 16            # System call code for close file
    move $a0, $s0         # File descriptor
    syscall
    
    # Store 1st byte (which is telling number of rows)
    lb $s0, 0($a2) # Row
    sub $s0, $s0, 48 # Conv to integer
    
    # Check if number of rows is in 'TENS' || If next chr is a comma, its ONES.
    addi $a2, $a2, 1 # Check next bit
    lb $s2, 0($a2)
    beq $s2, ',', ignoreA 
    
    sub $s2, $s2, 48 # Conv to integer
    mul $s3, $s0, 10 # Previous integer was in TENS
    addi $a2, $a2, 1
    add $s0, $s2, $s3 # Store Integer (in tens) in 's0' (number of rows)
 		
    ignoreA:
    # Display number of rows
    li $v0, 4             
    la $a0, num_rows
    syscall
        
    li $v0, 1           
    move $a0, $s0 # s0 = Number of Rows
    syscall
    
    li $v0, 11          
    la $a0, '\n'
    syscall  
    
    # Do the same for columns
    addi $a2, $a2, 1 # Ignore the comma
    lb $s1, 0($a2)# Col
    sub $s1, $s1, 48
    
    li $v0, 4             
    la $a0, num_cols
    syscall
    
    li $v0, 1            
    move $a0, $s1 # s1 = Number of Cols
    syscall
    
    li $v0, 11          
    la $a0, '\n'
    syscall  
    
    addi $a2, $a2, 3 # jump the col-integer and nextline chr

    move $t9, $a2 # Save buffer's address in t9 constant for later use
    move $t1, $a2 # Address of the input string

    li $v0, 4             
    la $a0, formatted_raww
    syscall

    # One heading per X column, however many the file has
    li $t3, 1
    Header_loop:
        beq $t3, $s1, Header_done
        li $v0, 4
        la $a0, tabX
        syscall
        li $v0, 1
        move $a0, $t3
        syscall
        addi $t3, $t3, 1
        j Header_loop
    Header_done:

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # Raw work is done, now actual programming and calculating  #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    
    li $v0, 11   
    la $a0, '\n'
    syscall

    # li $t6, 0 # Counter and checker for --> s0 = Number of Rows
    # li $t7, 0 # Counter and checker for --> s1 = Number of Cols

    move $t1, $t9 # Address of the input string
    la $t8, all_data 
    li $t7, 0 # Flag to check TENS or ONES in integers (2 = TENS, 1 = ONES)

    save_matt:
            lb $t2, 0($t1) # Load a character from the input string

        beqz $t2, forwardB
        
            beq $t2, '\n', reset_flag
            beq $t2, ',', reset_flag

            # Move to the next character in the input string
            addi $t1, $t1, 1

        # If current char is not "\n", comma, or null.. its an integer
        subi $t2, $t2, 48
        beq $t2, -35, reset_flag # weird bug?
        
        addi $t7, $t7, 1

        # If integer is in ONEs (t7 = 1) --- save and jump ahead
        beq $t7, 1, save_ones
        # Else
        addi $t8, $t8, -4 # Move to previous integer in array
        lw $t3, 0($t8)    # Load it
        mul $t3, $t3, 10  # Mul by 10
        add $t2, $t2, $t3 # Add current integer

        sw $t2, 0($t8)    # Save it back
        addi $t8, $t8, 4
        j save_matt
        
    save_ones:
        andi $t8, $t8, -4
        
        sw $t2, 0($t8) # Matrix[row][col] = t2 (integer)
        addi $t8, $t8, 4
        j save_matt
        
    reset_flag:
        li $t7, 0 # Reset Flag
        addi $t1, $t1, 1
        j save_matt
        
    forwardB:
        # Display the matrix

        #--> s0 = Number of Rows
        #--> s1 = Number of Cols

        la $t2, all_data    # $t2 = address of matrix
        li $t3, 0        # Initialize row index

        # Loop through rows
        display_matrix:
            li $t4, 0    # Initialize column index

            # Loop through columns
            display_row:
                # Load the matrix element
                andi $t2, $t2, -4    
                lw $a0, 0($t2)           # $a0 = matrix[row][column]

                # Print the matrix element
                li $v0, 1            
                syscall

                # Print tab
                li $v0, 11
                la $a0, '\t'
                syscall

                # Move to the next column
                addi $t4, $t4, 1
                addi $t2, $t2, 4          # Move to the next element in the matrix

                # Check if we have reached the end of the row
                bne $t4, $s1, display_row

            # Print newline
            li $v0, 11
            la $a0, '\n'
            syscall

            # Move to the next row
            addi $t3, $t3, 1

            # Check if we have reached the end of the matrix
            bne $t3, $s0, display_matrix

jr $ra

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# # # # # # # # # UDF-2 --> Divide 80% of Matrix for Training and 20% for Testing # # # # # # # # # #

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

test_train_data:
    la $t9, all_data
    la $t8, train_data
    la $t7, test_data

    mul $s2, $s0, 8   # 80% for TRAIN
    div $s2, $s2, 10  
    move $t4, $s2     # Save for printing later

    sub $s3, $s0, $s2 # The rest for TEST (about 20%), so rounding never leaves a row out
    move $t5, $s3     # Save for printing later

    # Loop through All_Data and store in test-train randomly 
    divide_data:
        # (MARS random number generator)
    	li $a1, 2   # Here you set $a1 to the max bound.
        li $v0, 42  # generates the random number.
        syscall
        #add $a0, $a0, 0  #Here you add the lowest bound which is 0 by default
        move $s7, $a0 # s7 has random number in it
                    
        # If s7 = 0 --> Include current row in train_data
        beqz $s7, include_in_train_data
        # else s7 = 1 --> Include current row in test_data
        j include_in_test_data

    include_in_train_data:
        # Check if 80% of rows from ALL are filled in TRAIN
        beqz, $t4, end_train

        # Copy the row from ALL_Data to Train_Data
        li $t3, 0 # Counter to check if all items in row were saved (using columns)
        addi $t4, $t4, -1 # One Row in TRAIN filled

        copy_rowTR:
            # If Counter == Num of Cols
            beq $t3, $s1, divide_data # Row Copied!

            andi $t9, $t9, -4
            andi $t8, $t8, -4
            lw $t2, 0($t9) # Load Element from ALL
            sw $t2, 0($t8) # Save in TRAIN

            addi $t9, $t9, 4 # Goto next element in ALL
            addi $t8, $t8, 4 # Goto next element in TRAIN
            addi $t3, $t3, 1 # Counter += 1

        j copy_rowTR 

    include_in_test_data:
        # Check if 20% of rows from ALL are filled in TEST
        beqz, $t5, end_test

        # Copy the row from ALL_Data to Train_Data
        li $t3, 0 # Counter to check if all items in row were saved (using columns)
        addi $t5, $t5, -1 # One Row in TEST filled

        copy_rowTS:
            # If Counter == Num of Cols
            beq $t3, $s1, divide_data # Row Copied!

            andi $t9, $t9, -4
            andi $t7, $t7, -4
            lw $t2, 0($t9) # Load Element from ALL
            sw $t2, 0($t7) # Save in TRAIN

            addi $t9, $t9, 4 # Goto next element in ALL
            addi $t7, $t7, 4 # Goto next element in TRAIN
            addi $t3, $t3, 1 # Counter += 1

        j copy_rowTS

    end_train:
        # Check if 20% of test data is complete too
        beqz $t5, end_divide_data
        # Otherwise loop again
        j divide_data

    end_test:
        # Check if 80% of train data is complete too
        beqz $t4, end_divide_data
        # Otherwise loop again
        j divide_data

    end_divide_data:
        # Display the Train and Test Data
        
        # First Display Train
        la $t2, train_data  
        li $t3, 0        # Initialize row index

        li $v0, 4
        la $a0, trained
        syscall        

        # Loop through rows
        display_matrixTR:
            li $t4, 0    # Initialize column index

            # Loop through columns
            display_rowTR:
                # Load the matrix element
                andi $t2, $t2, -4    
                lw $a0, 0($t2)           # $a0 = matrix[row][column]

                # Print the matrix element
                li $v0, 1            
                syscall

                # Print tab
                li $v0, 11
                la $a0, '\t'
                syscall

                # Move to the next column
                addi $t4, $t4, 1
                addi $t2, $t2, 4          # Move to the next element in the matrix

                # Check if we have reached the end of the row
                bne $t4, $s1, display_rowTR

            # Print newline
            li $v0, 11
            la $a0, '\n'
            syscall

            # Move to the next row
            addi $t3, $t3, 1

            # Check if we have reached the end of the matrix
            bne $t3, $s2, display_matrixTR # s2 = Rows in TRAIN Data


        # Display Test
        la $t2, test_data  
        li $t3, 0        # Initialize row index

        li $v0, 4
        la $a0, tested
        syscall        

        # Loop through rows
        display_matrixTS:
            li $t4, 0    # Initialize column index

            # Loop through columns
            display_rowTS:
                # Load the matrix element
                andi $t2, $t2, -4    
                lw $a0, 0($t2)           # $a0 = matrix[row][column]

                # Print the matrix element
                li $v0, 1            
                syscall

                # Print tab
                li $v0, 11
                la $a0, '\t'
                syscall

                # Move to the next column
                addi $t4, $t4, 1
                addi $t2, $t2, 4          # Move to the next element in the matrix

                # Check if we have reached the end of the row
                bne $t4, $s1, display_rowTS

            # Print newline
            li $v0, 11
            la $a0, '\n'
            syscall

            # Move to the next row
            addi $t3, $t3, 1

            # Check if we have reached the end of the matrix
            bne $t3, $s3, display_matrixTS # s3 = Rows in TEST Data


jr $ra

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# # # # # # # # # UDF-3 --> Train the data using Linear Regression (find weights) # # # # # # # # # #

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

linRegression:

    # Print the Average of each column while storing in an Array
    li $v0, 4      
    la $a0, average
    syscall

    la $t0, train_data
    la $t2, averages
    li $t4, 0 # Counter of how many columns have been calculated

    # Store the number of ROWS (in train) as a FLOAT (to be divided for average)
    mtc1 $s2, $f0 # s2 --> f0
    cvt.s.w $f0, $f0
    
    print_col_sum_loop:
        li $t6, 0
        li $t3, 0
        li $t9, 0 # Helper temporary variable
        
        compute_col_sum_loop:
            andi $t0, $t0, -4    
            lw $t5, 0($t0)
            add $t6, $t6, $t5

            # Next column jumper checker
    	    mul $t9, $s1, 4
            # Move to the next column
            add $t0, $t0, $t9
            addi $t3, $t3, 1

            # Check if we have reached the end of the matrix
            bne $t3, $s2, compute_col_sum_loop

        mtc1 $t6, $f1 # f2 = t6
    	cvt.s.w $f1, $f1
    	
        div.s $f2, $f1, $f0 # Divide the SUM by nROWs for AVG and store result in $f2

        # The same average as a double, for the fit
        mtc1 $t6, $f4
        cvt.d.w $f4, $f4       # column sum
        cvt.d.s $f6, $f0       # number of TRAIN rows
        div.d $f4, $f4, $f6
        sll $t9, $t4, 3
        la $t8, averagesD
        add $t8, $t8, $t9
        s.d $f4, 0($t8)

        # Print the result (f12 for floats is same as a0 for integers)
        li $v0, 2         
        mov.s $f12, $f2    # Load the float value to be printed into $f12 
        syscall   

        # Save the result in Average Array (It has 1-to-1 Correspondence to Train_Data's Columns)
        andi $t2, $t2, -4    
        s.s $f2, 0($t2)
        addi $t2, $t2, 4     # Jump to next item in averages array

        # Print tab
        li $v0, 11
        la $a0, '\t'
        syscall        
       
        # Counter += 1
        addi $t4, $t4, 1
         
        # Move to the next column's first row
        la $t0, train_data
        mul $t9, $t4, 4
        add $t0, $t0, $t9

        # Check if we have reached the end of the columns
        bne $t4, $s1, print_col_sum_loop

        li $v0, 11
        la $a0, '\n'
        syscall
	
    # # # # # # # # # # The fit: every slope solved together (least squares) # # # # # # # # # # #
    # Each column is measured from its own average (dx, dy). For k X columns this fills a table of
    # k rows and k+1 columns over the TRAIN rows:
    #   A[a][b] = sum of dx_a * dx_b   (how two X columns move together; the diagonal is the old denominator)
    #   A[a][k] = sum of dx_a * dy     (how an X column moves with Y; the old numerator)
    # Solving the table gives all the slopes at once, so each slope allows for the other X columns.
    # With one X column it is the same formula as before: sum(dx * dy) / sum(dx * dx).
    # Kept in double precision: X columns can differ in size by a hundred thousand times (bedrooms
    # against the last column of data_1), and on that file a single precision solve came out wrong
    # from the fifth digit on, where the program prints seven.

    li $s4, 0                  # s4 = 1 means no line could be fitted (main then skips UDF-4)
    addi $s5, $s1, -1          # s5 = k, the number of X columns
    addi $s6, $s5, 1           # s6 = k + 1, the width of one table row

    la $t0, train_data
    andi $t0, $t0, -4          # First TRAIN row (same alignment as everywhere else)
    li $t2, 0                  # TRAIN row counter

    Build_rows:
        # dy = Y - Ybar
        lw $t6, 0($t0)
        mtc1 $t6, $f4
        cvt.d.w $f4, $f4
        la $t8, averagesD
        l.d $f6, 0($t8)
        sub.d $f20, $f4, $f6   # f20 = dy

        li $t3, 0              # a = 0
        Build_a:
            # dx_a = X(a+1) - its average
            addi $t9, $t3, 1
            sll $t9, $t9, 2
            add $t9, $t0, $t9
            lw $t6, 0($t9)
            mtc1 $t6, $f4
            cvt.d.w $f4, $f4
            addi $t9, $t3, 1
            sll $t9, $t9, 3
            la $t8, averagesD
            add $t8, $t8, $t9
            l.d $f6, 0($t8)
            sub.d $f22, $f4, $f6   # f22 = dx_a

            # t7 = address of A[a][0] = matrixA + a * (k+1) * 8
            mul $t7, $t3, $s6
            sll $t7, $t7, 3
            la $t8, matrixA
            add $t7, $t7, $t8

            # A[a][k] += dx_a * dy
            sll $t9, $s5, 3
            add $t9, $t7, $t9
            l.d $f8, 0($t9)
            mul.d $f10, $f22, $f20
            add.d $f8, $f8, $f10
            s.d $f8, 0($t9)

            li $t4, 0          # b = 0
            Build_b:
                # dx_b = X(b+1) - its average
                addi $t9, $t4, 1
                sll $t9, $t9, 2
                add $t9, $t0, $t9
                lw $t6, 0($t9)
                mtc1 $t6, $f4
                cvt.d.w $f4, $f4
                addi $t9, $t4, 1
                sll $t9, $t9, 3
                la $t8, averagesD
                add $t8, $t8, $t9
                l.d $f6, 0($t8)
                sub.d $f24, $f4, $f6   # f24 = dx_b

                # A[a][b] += dx_a * dx_b
                sll $t9, $t4, 3
                add $t9, $t7, $t9
                l.d $f8, 0($t9)
                mul.d $f10, $f22, $f24
                add.d $f8, $f8, $f10
                s.d $f8, 0($t9)

                addi $t4, $t4, 1
                bne $t4, $s5, Build_b

            addi $t3, $t3, 1
            bne $t3, $s5, Build_a

        # Next TRAIN row
        sll $t9, $s1, 2
        add $t0, $t0, $t9
        addi $t2, $t2, 1
        bne $t2, $s2, Build_rows

    # Keep each X column's own spread (the diagonal) before the solve changes it. A pivot smaller
    # than a billionth of its column's spread means two X columns move together in the TRAIN rows
    # (or one never changes), and then no single line fits.
    li $t3, 0
    Keep_spread:
        mul $t7, $t3, $s6
        add $t7, $t7, $t3      # index of A[a][a]
        sll $t7, $t7, 3
        la $t8, matrixA
        add $t7, $t7, $t8
        l.d $f4, 0($t7)
        sll $t9, $t3, 3
        la $t8, spreadD
        add $t8, $t8, $t9
        s.d $f4, 0($t8)
        addi $t3, $t3, 1
        bne $t3, $s5, Keep_spread

    # Solve the table (Gauss-Jordan elimination, largest pivot first)
    li $t3, 0                  # c = the column being solved
    Solve_column:
        # Find the row at or below c with the largest |A[row][c]|
        la $t8, matrixA
        move $t5, $t3          # best row so far
        mul $t7, $t3, $s6
        add $t7, $t7, $t3
        sll $t7, $t7, 3
        add $t7, $t7, $t8
        l.d $f4, 0($t7)
        abs.d $f26, $f4        # f26 = largest |A[row][c]| so far
        addi $t4, $t3, 1
        Find_pivot:
            beq $t4, $s5, Found_pivot
            mul $t7, $t4, $s6
            add $t7, $t7, $t3
            sll $t7, $t7, 3
            add $t7, $t7, $t8
            l.d $f4, 0($t7)
            abs.d $f4, $f4
            c.le.d $f4, $f26
            bc1t Pivot_not_bigger
            mov.d $f26, $f4
            move $t5, $t4
            Pivot_not_bigger:
            addi $t4, $t4, 1
            j Find_pivot
        Found_pivot:

        # Too small to trust?
        sll $t9, $t3, 3
        la $t7, spreadD
        add $t7, $t7, $t9
        l.d $f4, 0($t7)
        la $t7, tiny
        l.d $f6, 0($t7)
        mul.d $f4, $f4, $f6
        c.le.d $f26, $f4
        bc1t No_fit

        # Swap that row into place
        beq $t5, $t3, No_swap
        mul $t7, $t3, $s6
        sll $t7, $t7, 3
        add $t7, $t7, $t8      # t7 = address of A[c][0]
        mul $t9, $t5, $s6
        sll $t9, $t9, 3
        add $t9, $t9, $t8      # t9 = address of A[best][0]
        li $t4, 0
        Swap_entry:
            l.d $f4, 0($t7)
            l.d $f6, 0($t9)
            s.d $f6, 0($t7)
            s.d $f4, 0($t9)
            addi $t7, $t7, 8
            addi $t9, $t9, 8
            addi $t4, $t4, 1
            bne $t4, $s6, Swap_entry
        No_swap:

        # Clear column c from every other row
        mul $t7, $t3, $s6
        sll $t7, $t7, 3
        add $t7, $t7, $t8      # t7 = address of A[c][0], the pivot row
        sll $t9, $t3, 3
        add $t9, $t7, $t9
        l.d $f28, 0($t9)       # f28 = pivot A[c][c]
        li $t4, 0              # row
        Eliminate_row:
            beq $t4, $t3, Next_row
            mul $t9, $t4, $s6
            sll $t9, $t9, 3
            add $t9, $t9, $t8  # t9 = address of A[row][0]
            sll $t6, $t3, 3
            add $t6, $t9, $t6
            l.d $f4, 0($t6)
            div.d $f4, $f4, $f28   # f4 = A[row][c] / pivot
            li $t5, 0          # entry
            Eliminate_entry:
                sll $t6, $t5, 3
                add $t1, $t9, $t6  # address of A[row][entry]
                add $t6, $t7, $t6  # address of A[c][entry]
                l.d $f6, 0($t6)
                mul.d $f6, $f6, $f4
                l.d $f8, 0($t1)
                sub.d $f8, $f8, $f6
                s.d $f8, 0($t1)
                addi $t5, $t5, 1
                bne $t5, $s6, Eliminate_entry
            Next_row:
            addi $t4, $t4, 1
            bne $t4, $s5, Eliminate_row

        addi $t3, $t3, 1
        bne $t3, $s5, Solve_column

    # Read the slopes off the solved table, and the intercept from them:
    # b0 = Ybar - (b1 * X1bar + b2 * X2bar + ... + bk * Xkbar)
    la $t8, averagesD
    l.d $f20, 0($t8)           # f20 = Ybar, becomes b0
    la $t0, weights
    andi $t0, $t0, -4
    li $t3, 0
    Store_slope:
        mul $t7, $t3, $s6
        sll $t7, $t7, 3
        la $t8, matrixA
        add $t7, $t7, $t8
        sll $t9, $t3, 3
        add $t9, $t7, $t9
        l.d $f4, 0($t9)        # A[c][c]
        sll $t9, $s5, 3
        add $t9, $t7, $t9
        l.d $f6, 0($t9)        # A[c][k]
        div.d $f6, $f6, $f4    # slope of X(c+1)

        # b0 -= slope * that column's average
        addi $t9, $t3, 1
        sll $t9, $t9, 3
        la $t8, averagesD
        add $t8, $t8, $t9
        l.d $f8, 0($t8)
        mul.d $f8, $f8, $f6
        sub.d $f20, $f20, $f8

        # weights[c+1] = slope, saved as a float like every other number printed
        cvt.s.d $f6, $f6
        addi $t9, $t3, 1
        sll $t9, $t9, 2
        add $t9, $t0, $t9
        s.s $f6, 0($t9)

        addi $t3, $t3, 1
        bne $t3, $s5, Store_slope

    # weights[0] = b0, and f30 = b0 for UDF-4
    cvt.s.d $f30, $f20
    s.s $f30, 0($t0)
    j Fit_done

    No_fit:
        li $s4, 1
        li $v0, 4
        la $a0, no_fit
        syscall
        jr $ra

    Fit_done:

    # Printing weights
    li $v0, 11
    la $a0, '\n'
    syscall
    li $v0, 4
    la $a0, weight
    syscall

    # Size of Array = Number of columns --> is constant --> s1
    move $a2, $s1

    
    weights_display:
        andi $t0, $t0, -4 

        li $v0, 2            # System call code for printing float
        lwc1 $f12, 0($t0)    # Load the float value from the array into $f12
        syscall            

        li $v0, 11
        la $a0, '\t'
        syscall        

        addi $t0, $t0, 4     # Move to the next element in the array
        sub $a2, $a2, 1      # Decrement the loop counter

        bnez $a2, weights_display      


jr $ra

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# # # # # # # # # UDF-4 --> Test the data using the weights and display the data  # # # # # # # # # #

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

testModel:
    # Fill the predicted array with slope value (b0), its always added :v
    la $t4, predicted
    li $t1, 0

    Fill_predicc:
        # Adjust the addresses
        andi $t4, $t4, -4
        s.s $f30, 0($t4)
        addi $t1, $t1, 1 # counter
        addi $t4, $t4, 4
        bne $t1, $s3, Fill_predicc # One per TEST row
    
    # Test the model using weights
    la $t0, test_data
    la $t3, weights
    la $t4, predicted

    li $t1, 1
    li $t2, 0
    
    # Ignore Y elements (we are predicting them :v)
    addi $t0, $t0, 4
    addi $t3, $t3, 4

    Predictor_Loop:
        # Adjust the addresses
        andi $t0, $t0, -4
        andi $t3, $t3, -4
        andi $t4, $t4, -4

        # Load test element
        lw $t5, 0($t0)
        mtc1 $t5, $f1
        cvt.s.w $f1, $f1

        # Load weight element
        l.s $f2, 0($t3)

        # Calculate
        mul.s $f3, $f2, $f1

        # Load element from prediction at current column, add to it and save back
        l.s $f4, 0($t4)
        add.s $f4, $f4, $f3
        s.s $f4, 0($t4)

        addi $t0, $t0, 4
        addi $t1, $t1, 1 # counter
        addi $t3, $t3, 4
    	
        bne $t1, $s1, Predictor_Loop

    # Reset addresses (the prediction pointer stays on this row, and moves on below)
    la $t3, weights
    
    addi $t0, $t0, 4 # Ignoring Y value again
    addi $t3, $t3, 4
    
    # Move to next prediction
    addi $t4, $t4, 4
    
    li $t1, 1
    addi $t2, $t2, 1

    bne $t2, $s3, Predictor_Loop

    # Display the Formula
    li $v0, 4
    la $a0, formula
    syscall

    li $v0, 2
    mov.s $f12, $f30
    syscall

    la $t0, weights
    addi $t0, $t0, 4

    li $t1, 1

    Display_formula:
        li $v0, 4
        la $a0, plusX
        syscall

        li $v0, 1
        move $a0, $t1
        syscall

        li $v0, 4
        la $a0, mulsign
        syscall

        andi $t0, $t0, -4
        l.s $f1, 0($t0)
        addi $t0, $t0, 4

        li $v0, 2
        mov.s $f12, $f1
        syscall

        li $v0, 11
        la $a0, ')'
        syscall

        addi $t1, $t1, 1

        bne $t1, $s1, Display_formula

    # Display Actual data vs Predicted Data

    li $v0, 11
    la $a0, '\n'
    syscall

    la $t0, test_data
    la $t1, predicted

    li $t9, 0 # Helper variable to jump rows
    li $t2, 0 # Row counter

    Final_Display:
        andi $t0, $t0, -4
        andi $t1, $t1, -4

        li $v0, 4
        la $a0, actual
        syscall

        li $v0, 1
        lw $a0, 0($t0)
	    syscall 
	
        li $v0, 4
        la $a0, predicc
        syscall

        li $v0, 2           
        lwc1 $f12, 0($t1)   
        syscall     

        mul $t9, $s1, 4
        add $t0, $t0, $t9
        addi $t1, $t1, 4

        li $v0, 11
        la $a0, '\n'
        syscall

        addi $t2, $t2, 1
        bne $t2, $s3, Final_Display

jump_back_to_main:

jr $ra

Exit:
    li $v0, 10       
    syscall

