// ============================================
// CURSOR CON INERCIA
// ============================================
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0;
let mouseY = 0;
let ringX  = 0;
let ringY  = 0;

const velocidadCursor = 0.04;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const seccionContacto = document.querySelector('.section-contact');

// ============================================
// NAV — logo se encoge al scrollear
// ============================================
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// ============================================
// PARALLAX CON INERCIA
// ============================================
const heroBg      = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');
const heroScrollHint = document.querySelector('.hero-scroll-hint');

let scrollActual = 0;
let scrollSuave  = 0;

const velocidadScroll = 0.03;

window.addEventListener('scroll', () => {
  scrollActual = window.scrollY;
});


// ============================================
// SCROLL HINT — click lleva a About
// ============================================
const seccionAbout = document.querySelector('.section-about');
const scrollHint = document.querySelector('.hero-scroll-hint');

scrollHint.addEventListener('click', () => {
  seccionAbout.scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// PARALLAX ABOUT
// ============================================
const aboutSection      = document.querySelector('.section-about');
const aboutPhotoWrapper = document.querySelector('.about-photo-wrapper');
const aboutTextCol      = document.querySelector('.about-text-col');

let scrollSuavePhoto = 0;
let scrollSuaveText  = 0;


// ============================================
// PROYECTOS — SCROLL HORIZONTAL
// ============================================
const sectionProjects = document.querySelector('.section-projects');
const projectsTrack   = document.querySelector('.projects-track');

let trackX = 0;
let trackXTarget = 0;

// Calcula el height exacto que necesita la sección
function calcularAlturaProjects() {
  const trackAncho = projectsTrack.scrollWidth - window.innerWidth + 128;
  sectionProjects.style.height = (window.innerHeight + trackAncho) + 'px';
}

calcularAlturaProjects();
window.addEventListener('resize', calcularAlturaProjects);



// ============================================
// UN SOLO LOOP — todo junto, cada frame
// ============================================
function loop() {

  // — Cursor —
  const distanciaX = mouseX - ringX;
  const distanciaY = mouseY - ringY;

  ringX += (mouseX - ringX) * velocidadCursor;
  ringY += (mouseY - ringY) * velocidadCursor;

  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

  // — Color cursor según sección —
  const rectContacto = seccionContacto.getBoundingClientRect();
  if (rectContacto.top < window.innerHeight * 0.5) {
  cursorRing.style.borderColor = 'rgba(255, 255, 255, 0.8)';
  } else {
  cursorRing.style.borderColor = 'var(--color-negro)';
  } 

  // — Parallax —
  scrollSuave += (scrollActual - scrollSuave) * velocidadScroll;

  heroBg.style.transform      = `translateY(${scrollActual * 0.4}px)`;
  heroContent.style.transform = `translateY(${scrollSuave * -0.8}px)`;
  heroScrollHint.style.transform = `translateY(${scrollSuave * -0.8}px)`;
  

   // — Parallax About —
  const rectAbout = aboutSection.getBoundingClientRect();
  if (rectAbout.top < window.innerHeight) {
    scrollSuavePhoto += (scrollActual - scrollSuavePhoto) * 0.04;
    scrollSuaveText  += (scrollActual - scrollSuaveText)  * 0.06;

    aboutPhotoWrapper.style.transform = `translateY(${-scrollSuavePhoto * 0.7 + 600}px)`;
    aboutTextCol.style.transform      = `translateY(${-scrollSuaveText  * 0.08}px)`;
  }


  // — Proyectos scroll horizontal —
  const rectProjects = sectionProjects.getBoundingClientRect();

  if (rectProjects.top <= 0 && rectProjects.bottom >= window.innerHeight) {
    const scrollDentro = -rectProjects.top;
    const maxScroll = sectionProjects.offsetHeight - window.innerHeight;
    const trackAncho = projectsTrack.scrollWidth - window.innerWidth + 128;
    const progreso = scrollDentro / maxScroll;

    trackXTarget = -(progreso * trackAncho);
  }

  trackX += (trackXTarget - trackX) * 0.06;
  projectsTrack.style.transform = `translateX(${trackX}px)`;


  requestAnimationFrame(loop);
}

loop();

// ============================================
// AOS — Scroll animations
// ============================================
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true  // La animación ocurre solo la primera vez
});



// ============================================
// SKILLS — ANIMACIÓN DE ENTRADA
// ============================================
const skillRows = document.querySelectorAll('.skill-row');

const observadorSkills = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const index = Array.from(skillRows).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observadorSkills.unobserve(entry.target);
    }
  });
}, {
  threshold: .17
});

skillRows.forEach(row => observadorSkills.observe(row));


