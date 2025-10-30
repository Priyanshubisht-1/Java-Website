document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body; // Reference to the body

    // Function to toggle the navigation menu
    const navToggle = () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        // Prevent scrolling when nav is open
        if (navLinks.classList.contains('nav-active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    };

    // Event listener for the burger icon
    if (burger) {
        burger.addEventListener('click', navToggle);
    }

    // Close the navigation when a link is clicked (for smooth scrolling)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navToggle(); // Close the menu
            }
        });
    });

    // Simple form submission handler (for demonstration)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset(); // Clear the form
        });
    }
});
