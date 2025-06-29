document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const liveMessages = document.getElementById('liveMessages');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.textContent = '';
        formMessage.style.opacity = 0.7;

        // Get form values
        const name = form.elements['name'].value;
        const email = form.elements['email'].value;
        const message = form.elements['message'].value;

        // Create message element
        const msgDiv = document.createElement('div');
        msgDiv.className = 'single-message';
        msgDiv.innerHTML = `<strong>${name}</strong> (<em>${email}</em>):<br>${message}`;
        liveMessages.prepend(msgDiv);

        const formData = new FormData(form);
        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formMessage.textContent = 'Thank you for contacting me!';
                formMessage.style.color = '#fff';
                form.reset();
            } else {
                formMessage.textContent = data.error || 'Something went wrong. Please try again.';
                formMessage.style.color = '#ffecd2';
            }
            formMessage.style.opacity = 1;
        })
        .catch(() => {
            formMessage.textContent = 'Could not send message. Please try again later.';
            formMessage.style.color = '#fcb69f';
            formMessage.style.opacity = 1;
        });
    });

    // Animate form fields on focus
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 4px 16px rgba(102,126,234,0.28)';
        });
        input.addEventListener('blur', () => {
            input.style.boxShadow = '';
        });
    });
}); 