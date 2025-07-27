// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in animation for elements as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Modal functionality for "More"
document.addEventListener('DOMContentLoaded', function() {
    const moreBtn = document.getElementById('more-btn');
    const modal = document.getElementById('more-modal');
    const closeModal = document.getElementById('close-modal');
    const modalText = document.getElementById('modal-text');

    if (moreBtn && modal && closeModal) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            // You can set modalText.innerHTML here if you want dynamic content
        });

        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Optional: close modal when clicking outside the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
}); 