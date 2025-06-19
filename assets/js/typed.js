document.addEventListener('DOMContentLoaded', function() {
  const typed = document.querySelector('.typed');
  if (typed) {
    const typedItems = typed.getAttribute('data-typed-items').split(',');
    let currentItem = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseTime = 2000;

    function type() {
      const item = typedItems[currentItem];
      
      if (isDeleting) {
        currentText = item.substring(0, currentText.length - 1);
        typingSpeed = deletingSpeed;
      } else {
        currentText = item.substring(0, currentText.length + 1);
        typingSpeed = 100;
      }

      typed.textContent = currentText;

      if (!isDeleting && currentText === item) {
        isDeleting = true;
        typingSpeed = pauseTime;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentItem = (currentItem + 1) % typedItems.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }
}); 