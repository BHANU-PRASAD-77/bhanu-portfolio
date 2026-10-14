const loading = document.querySelector('.loading');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('load', () => setTimeout(() => loading?.classList.add('done'), 900));
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const hero = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-video');
heroVideo?.play().catch(() => document.documentElement.classList.add('video-fallback'));
heroVideo?.addEventListener('error', () => document.documentElement.classList.add('video-fallback'));
hero?.addEventListener('pointermove', event => {
  const x = (event.clientX / window.innerWidth - .5) * 10;
  const y = (event.clientY / window.innerHeight - .5) * 10;
  const bg = hero.querySelector('.hero-bg');
  if (bg) bg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
});

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .12 });
document.querySelectorAll('.section,.project-card,.service-card,.step').forEach(item => {
  item.style.opacity = '0'; item.style.transform = 'translateY(18px)'; item.style.transition = 'opacity .7s ease, transform .7s ease'; revealObserver.observe(item);
});
const revealStyle = document.createElement('style');
revealStyle.textContent = '.visible{opacity:1!important;transform:translateY(0)!important}';
document.head.appendChild(revealStyle);

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.toggle('active', item === filter));
  const category = filter.dataset.filter;
  projects.forEach(project => project.classList.toggle('hidden', category !== 'all' && !project.dataset.category.includes(category)));
}));

const modal = document.querySelector('.modal');
const modalTitle = modal?.querySelector('.modal-title');
const modalDescription = modal?.querySelector('.modal-description');
const modalCategory = modal?.querySelector('.modal-category');
const modalSoftware = modal?.querySelector('.modal-software');
document.querySelectorAll('.view-project').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('.project-card');
  modalTitle.textContent = card.dataset.title;
  modalDescription.textContent = card.dataset.description;
  modalCategory.textContent = card.dataset.category.replace('-', ' ');
  modalSoftware.textContent = card.dataset.software;
  modal.querySelector('.modal-preview').style.backgroundImage = getComputedStyle(card.querySelector('.project-thumb')).backgroundImage;
  modal.showModal();
}));
modal?.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const serviceModal = document.querySelector('.service-modal');
const serviceTitle = serviceModal?.querySelector('.service-modal-title');
const serviceDescription = serviceModal?.querySelector('.service-modal-description');
document.querySelectorAll('.service-card').forEach(card => {
  const openService = () => {
    serviceTitle.textContent = card.dataset.service;
    serviceDescription.textContent = card.dataset.serviceDescription;
    serviceModal.showModal();
  };
  card.querySelector('.service-open')?.addEventListener('click', event => { event.stopPropagation(); openService(); });
  card.addEventListener('click', event => { if (!event.target.closest('.service-open')) openService(); });
  card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openService(); } });
});
serviceModal?.querySelector('.modal-close')?.addEventListener('click', () => serviceModal.close());
serviceModal?.addEventListener('click', event => { if (event.target === serviceModal) serviceModal.close(); });

const form = document.querySelector('.contact-form');
const createContactMessage = () => {
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const type = data.get('type');
  const details = data.get('message');
  return { name, type, text: `Hello Bhanu,\n\nName: ${name}\nEmail: ${email}\nProject: ${type}\n\n${details}` };
};
document.querySelector('#send-email')?.addEventListener('click', () => {
  const message = form.querySelector('.form-message');
  if (!form.checkValidity()) { message.textContent = 'Please complete every field.'; form.reportValidity(); return; }
  const { name, type, text } = createContactMessage();
  const subject = `${type} inquiry from ${name}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vankayalaptibhanuprasad%40gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  message.textContent = 'Opening Gmail with your completed message...';
  window.open(gmailUrl, '_blank', 'noopener');
});
form?.addEventListener('submit', event => {
  event.preventDefault();
  const message = form.querySelector('.form-message');
  if (!form.checkValidity()) { message.textContent = 'Please complete every field.'; form.reportValidity(); return; }
  const data = new FormData(form);
  const { name, type, text } = createContactMessage();
  const action = event.submitter?.dataset.send;
  if (action === 'whatsapp') {
    window.open(`https://api.whatsapp.com/send?phone=919347302994&text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    message.textContent = 'WhatsApp opened with your project details.';
  }
});
