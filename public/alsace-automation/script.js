const animateOnScroll = () => {
  const items = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));
};

const enableSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};

const handleForm = () => {
  const form = document.getElementById('lead-form');
  const message = document.getElementById('form-message');
  const button = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    message.textContent = '';
    button.disabled = true;
    button.textContent = 'Envoi...';

    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/mwkjekon', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        message.textContent = 'Merci ! Le guide OPCO IA Alsace arrive dans votre boîte mail.';
        message.style.color = '#1dbf73';
      } else {
        throw new Error('Une erreur est survenue.');
      }
    } catch (error) {
      console.error(error);
      message.textContent = 'Impossible d\'envoyer le formulaire pour le moment. Contactez-nous par email.';
      message.style.color = '#e63946';
    } finally {
      button.disabled = false;
      button.textContent = 'Je veux le guide';
    }
  });
};

const cycleTestimonials = () => {
  const testimonials = Array.from(document.querySelectorAll('.testimonial'));
  if (testimonials.length <= 1) return;
  let current = 0;
  setInterval(() => {
    testimonials[current].classList.remove('visible');
    current = (current + 1) % testimonials.length;
    testimonials[current].classList.add('visible');
  }, 5000);
};

window.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  enableSmoothScroll();
  handleForm();
  cycleTestimonials();
});
