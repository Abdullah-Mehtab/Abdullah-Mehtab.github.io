CC = emcc
DIST_DIR ?= ../dist

CFLAGS = -O3 \
         -msimd128 \
         -s WASM=1 \
         -s EXPORTED_FUNCTIONS='["_init_engine","_update","_get_state_ptr","_get_input_ptr","_get_map_ptr","_get_trigger_ptr","_get_game_flags_ptr","_check_interaction","_malloc","_free"]' \
         -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","HEAPF32","HEAP32","HEAPU8"]' \
         -s ALLOW_MEMORY_GROWTH=0 \
         -s INITIAL_MEMORY=1048576 \
         -s MAXIMUM_MEMORY=1048576 \
         -s NO_EXIT_RUNTIME=1 \
         -s MODULARIZE=1 \
         -s EXPORT_NAME='createEngine' \
         --no-entry

SRCS = engine.c collision.c entities.c map.c interaction.c
TARGET = $(DIST_DIR)/engine.js

all: $(TARGET)

$(TARGET): $(SRCS) types.h collision.h entities.h map.h interaction.h
	mkdir -p $(DIST_DIR)
	$(CC) $(CFLAGS) $(SRCS) -o $(TARGET)

clean:
	rm -f $(DIST_DIR)/engine.js $(DIST_DIR)/engine.wasm
