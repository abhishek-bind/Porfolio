// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Type the name in the hero heading unless reduced motion is requested.
const typedPrefix = document.getElementById('typedPrefix');
const typedName = document.getElementById('typedName');

if (typedPrefix && typedName && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const prefix = typedPrefix.textContent;
    const name = typedName.textContent;
    const greeting = `${prefix}${name}`;
    let characterIndex = 0;

    typedPrefix.textContent = '';
    typedName.textContent = '';

    const typeNextCharacter = () => {
        if (characterIndex < prefix.length) {
            typedPrefix.textContent = prefix.slice(0, characterIndex + 1);
        } else {
            typedName.textContent = name.slice(0, characterIndex - prefix.length + 1);
        }
        characterIndex += 1;

        if (characterIndex < greeting.length) {
            window.setTimeout(typeNextCharacter, 85);
        }
    };

    window.setTimeout(typeNextCharacter, 250);
}

// Interactive 3D profile card
const profileCard = document.getElementById('profileCard');
const profileStage = document.querySelector('.profile-stage');

if (profileCard && profileStage) {
    profileStage.addEventListener('mousemove', (event) => {
        if (window.innerWidth <= 768) return;

        const rect = profileStage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        profileCard.style.transform =
            `rotateY(${x * 16}deg) rotateX(${y * -16}deg) translateZ(8px)`;
    });

    profileStage.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        formStatus.classList.remove('is-success', 'is-error');
        formStatus.textContent = 'Sending your message...';

        if (submitButton) submitButton.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Form submission failed.');
            }

            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.classList.add('is-success');
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = 'Sorry, your message could not be sent. Please try again.';
            formStatus.classList.add('is-error');
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}
