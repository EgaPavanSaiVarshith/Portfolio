// ====== DOM ELEMENTS ======
const nav = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const typedTextSpan = document.getElementById('typed-text');
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const yearSpan = document.getElementById('year');
const filterBtns = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.filter-item');

// Set current year in footer
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ====== NAVIGATION TOGGLE ======
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close mobile menu when link is clicked
links.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// ====== SCROLL EFFECTS ======
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Navbar hide/show on scroll down/up
  if (nav) {
    if (scrollTop > 100) {
      nav.style.background = 'rgba(10, 10, 10, 0.9)';
      nav.style.backdropFilter = 'blur(15px)';
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        nav.classList.add('nav-hidden');
      } else {
        // Scrolling up
        nav.classList.remove('nav-hidden');
      }
    } else {
      nav.classList.remove('nav-hidden');
      nav.style.background = 'rgba(15, 15, 15, 0.6)';
    }
  }
  lastScrollTop = scrollTop;

  // Active navigation link update based on section
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 250) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });

  // Back to top button visibility
  if (backToTopBtn) {
    if (scrollTop > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ====== REVEAL ANIMATIONS ON SCROLL ======
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
  
  // Trigger skill bar animation
  const skillBars = document.querySelectorAll('.skill-fill');
  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < window.innerHeight - 50) {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    }
  });
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// ====== TYPING ANIMATION ======
const textArray = [
  "Building scalable web apps...", 
  "Bridging AI and Web...", 
  "Solving real-world problems...", 
  "A Full Stack Developer."
];
const typingDelay = 80;
const erasingDelay = 40;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (!typedTextSpan) return;
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (!typedTextSpan) return;
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length && typedTextSpan) setTimeout(type, newTextDelay + 250);
});

// ====== PROJECT FILTERING ======
if (filterBtns && filterItems) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      filterItems.forEach(item => {
        if (filterValue === 'all') {
          item.classList.remove('hide');
        } else {
          if (item.classList.contains(filterValue)) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        }
      });
    });
  });
}

// ====== CONTACT FORM SUBMISSION ======
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('send-message-btn');
    const originalText = btn.innerHTML;
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email-input').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !subject || !message) {
      formFeedback.textContent = "Please fill out all fields.";
      formFeedback.className = 'form-feedback';
      formFeedback.style.color = '#ff4d4d';
      formFeedback.style.display = 'block';
      setTimeout(() => { formFeedback.style.display = 'none'; }, 3000);
      return;
    }
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    fetch("https://formsubmit.co/ajax/chintit401@gmail.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          _template: "box"
      })
    })
    .then(response => response.json())
    .then(data => {
      contactForm.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
      
      formFeedback.textContent = "Message sent successfully! I'll get back to you soon.";
      formFeedback.className = 'form-feedback success';
      formFeedback.style.color = '#00ff88';
      formFeedback.style.display = 'block';
      
      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 5000);
    })
    .catch(error => {
      console.error("Form submission error:", error);
      btn.innerHTML = originalText;
      btn.disabled = false;
      
      formFeedback.textContent = "Oops! Something went wrong. Please try again later.";
      formFeedback.className = 'form-feedback error';
      formFeedback.style.color = '#ff4d4d';
      formFeedback.style.display = 'block';
      
      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 5000);
    });
  });
}

// ====== PARTICLE NETWORK BACKGROUND ======
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particlesArray;

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    
    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }
      
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.5;
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 0.5) - 0.25;
      let directionY = (Math.random() * 0.5) - 0.25;
      let color = 'rgba(0, 240, 255, 0.5)';
      
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connectParticles();
  }

  function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                       ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                       
        if (distance < (canvas.width / 15) * (canvas.height / 15)) {
          opacityValue = 1 - (distance / 15000);
          ctx.strokeStyle = 'rgba(0, 240, 255,' + opacityValue * 0.2 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  initParticles();
  animateParticles();
}
