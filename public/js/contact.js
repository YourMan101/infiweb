const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xayrvaap';

async function handleContactSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const isSwedish = document.documentElement.lang === 'sv';
    const formObject = Object.fromEntries(new FormData(form));

    if (!validateForm(formObject)) {
        return;
    }

    const submitButton = form.querySelector('.submit-btn');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = isSwedish ? 'Skickar...' : 'Sending...';

    try {
        // Bots fill the hidden field; pretend success without sending.
        if (!formObject.website) {
            const payload = { ...formObject, language: isSwedish ? 'sv' : 'en', _subject: 'Website enquiry from ' + formObject.name };
            delete payload.website;
            form.querySelectorAll('select').forEach(select => {
                payload[select.name] = select.value ? select.options[select.selectedIndex].text : '';
            });

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Formspree responded with ' + response.status);
            }
        }

        showMessage(
            isSwedish
                ? 'Tack! Vi har tagit emot er förfrågan och återkommer så snart vi kan.'
                : 'Thank you, we’ve received your message. We’ll get back to you as soon as we can.',
            'success'
        );
        form.reset();
    } catch (error) {
        console.error('Contact form request failed:', error);
        showMessage(
            isSwedish
                ? 'Det gick inte att skicka förfrågan just nu. Mejla oss på info@infinitymk.se.'
                : 'We could not send your enquiry right now. Please email info@infinitymk.se.',
            'error'
        );
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

function validateForm(data) {
    const isSwedish = document.documentElement.lang === 'sv';

    if (!data.name || data.name.trim().length < 2) {
        showMessage(
            isSwedish ? 'Ange ett giltigt namn (minst 2 tecken).' : 'Please enter a valid name (at least 2 characters).',
            'error'
        );
        return false;
    }

    if (!data.email || !isValidEmail(data.email)) {
        showMessage(
            isSwedish ? 'Ange en giltig e-postadress.' : 'Please enter a valid email address.',
            'error'
        );
        return false;
    }

    if (!data.message || data.message.trim().length < 10) {
        showMessage(
            isSwedish ? 'Beskriv projektet med minst 10 tecken.' : 'Please describe the project in at least 10 characters.',
            'error'
        );
        return false;
    }

    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    messageElement.textContent = message || (
        document.documentElement.lang === 'sv'
            ? 'Något gick fel. Försök igen eller mejla oss på info@infinitymk.se.'
            : 'Something went wrong. Please try again or email info@infinitymk.se.'
    );
    messageElement.className = `message ${type}`;
    messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageElement.hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function () {
            this.parentNode.classList.add('focused');
        });

        field.addEventListener('blur', function () {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
    });

    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', function () {
            const maxLength = Number(this.maxLength);
            const remaining = maxLength - this.value.length;
            let counter = this.parentNode.querySelector('.char-counter');

            if (!counter) {
                counter = document.createElement('div');
                counter.className = 'char-counter';
                counter.style.fontSize = '0.8rem';
                counter.style.textAlign = 'right';
                counter.style.marginTop = '0.5rem';
                this.parentNode.appendChild(counter);
            }

            counter.textContent = document.documentElement.lang === 'sv'
                ? `${this.value.length}/${maxLength} tecken`
                : `${this.value.length}/${maxLength} characters`;
            counter.style.color = remaining < 100 ? (remaining < 50 ? '#dc3545' : '#ffc107') : '#666';
        });

        document.getElementById('contactForm').addEventListener('reset', () => {
            setTimeout(() => messageField.dispatchEvent(new Event('input', { bubbles: true })), 0);
        });
    }
});
