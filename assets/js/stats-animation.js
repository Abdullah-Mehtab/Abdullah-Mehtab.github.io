function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function startStatsAnimation() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateValue(target, 0, finalValue, 1500); // 2000ms = 2 seconds
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Start the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', startStatsAnimation); 