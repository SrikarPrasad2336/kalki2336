// A simple script to handle the contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the default form submission

            // In a real scenario, you would use fetch() here to send data
            // to a backend service (like Flask/Python, or a serverless function)

            // Simulate successful form submission
            formStatus.style.display = 'block';
            formStatus.style.color = 'green';
            formStatus.textContent = '✅ Message sent successfully! I will get back to you soon.';
            contactForm.reset(); // Clear the form

            // Hide the status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    }

    // Optional: Highlight active navigation link on scroll
    // (A more advanced feature you can add later)
});