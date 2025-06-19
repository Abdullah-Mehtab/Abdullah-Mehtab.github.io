// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Function to handle scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.section, .card, .stat-item, .skill-item, .service-card, .timeline-item, .contact-item, .animate-text');
  
  elements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimations);

// Initial check for elements in viewport
document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimations();
});

// Text animation for the hero section
function animateText() {
  const text = "Abdullah Mehtab";
  const container = document.querySelector('.splash h1');
  if (!container) return;

  container.innerHTML = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${i * 0.1}s`;
    span.classList.add('animate-char');
    container.appendChild(span);
  });
}

// Call text animation when DOM is loaded
document.addEventListener('DOMContentLoaded', animateText); 