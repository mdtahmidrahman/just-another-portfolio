// Toggle menu
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        menuIcon.classList.toggle('fa-bars');
        navbar.classList.toggle('active');
    };
}

// Remove menu icon on scroll
window.onscroll = () => {
    if (menuIcon && navbar) {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        navbar.classList.remove('active');
    }
};

// Show more projects
let showMoreBtn = document.getElementById('showMoreBtn');
let portfolioExtraContainer = document.getElementById('portfolioExtraContainer');

if (showMoreBtn && portfolioExtraContainer) {
    showMoreBtn.onclick = () => {
        portfolioExtraContainer.classList.toggle('expanded');
        showMoreBtn.classList.toggle('expanded');
    };
}

// Typing Animation
var typed = new Typed('.typing', {
    strings: ["Software Engineer", "Android App Developer", "Web Developer", "AI & ML Enthusiast"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    contentType: 'text'
});

// Contact Form Submission Handling
const contactForm = document.getElementById('contactForm');
const contactSubmitBtn = document.getElementById('contactSubmitBtn');
const toastContainer = document.getElementById('toastContainer');

if (contactForm && contactSubmitBtn && toastContainer) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Access internal button elements
        const btnText = contactSubmitBtn.querySelector('.btn-text');
        const btnSpinner = contactSubmitBtn.querySelector('.btn-spinner');

        // Check if access key has been replaced in HTML
        const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
        if (!accessKeyInput || !accessKeyInput.value || accessKeyInput.value === 'YOUR_ACCESS_KEY_HERE') {
            showToast('Please set your Web3Forms Access Key in index.html first.', 'error');
            return;
        }

        // Set Loading State
        contactSubmitBtn.disabled = true;
        if (btnText) btnText.textContent = 'Sending...';
        if (btnSpinner) btnSpinner.classList.remove('hidden');

        try {
            const formData = new FormData(contactForm);
            
            // Format form data as standard JSON key-value pairs
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (response.status === 200 && result.success) {
                showToast('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showToast(result.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            showToast('Network error. Please check your internet connection.', 'error');
        } finally {
            // Restore normal submit button state
            contactSubmitBtn.disabled = false;
            if (btnText) btnText.textContent = 'Send Message';
            if (btnSpinner) btnSpinner.classList.add('hidden');
        }
    });
}

// Function to trigger a beautiful Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Choose appropriate FontAwesome icon based on type
    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Slide in
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);
    
    // Automatically fade out and remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        // Wait for CSS slide transition to end before deleting element
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

