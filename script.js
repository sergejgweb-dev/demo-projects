// The mobile menu opens and closes with this button.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu after a navigation link is selected.
navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Demo form: show a confirmation in the browser without sending data.
const trialForm = document.querySelector('.trial-form');
const successMessage = document.querySelector('.form-success');

trialForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(trialForm);
  const firstName = formData.get('ime').trim().split(/\s+/)[0];
  successMessage.textContent = `Thanks, ${firstName}! Your request has been recorded on this demo page. The team can follow up once the form is connected to a real service.`;
  trialForm.reset();
});

