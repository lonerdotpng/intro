let isRunning = false;

function toggleNyanCat() {
  const nyanCat = document.getElementById('nyanCat');
  const nyanText = document.querySelector('.nyan-text');

  if (!isRunning) {
    nyanCat.classList.add('running');
    nyanText.textContent = 'Nyaaaaan! 🌈';
    isRunning = true;

    setTimeout(() => {
      nyanCat.classList.remove('running');
      nyanText.textContent = '';
      isRunning = false;
    }, 3000);
  }
}

// Navigation functionality
function navigateTo(section) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  event.target.classList.add('active');

  document.querySelectorAll('.card, .contact, .projectblocktwo').forEach(element => {
    element.classList.remove('highlighted');
  });

  switch(section) {
    case 'home':
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;

    case 'about':
      const card = document.querySelector('.card');
      card.classList.add('highlighted');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        card.classList.remove('highlighted');
      }, 3000);
      break;

    case 'contact':
      const contact = document.querySelector('.contact');
      contact.classList.add('highlighted');
      contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        contact.classList.remove('highlighted');
      }, 3000);
      break;

    case 'projects':
      const projects = document.querySelector('.projectblocktwo');
      projects.classList.add('highlighted');
      projects.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        projects.classList.remove('highlighted');
      }, 3000);
      break;
  }
}

// Initialize all event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Card 3D effect
  const card = document.querySelector('.card');
  const coords = document.getElementById('mouse-hov');
  const cursor = document.getElementById('animatedCursor');
  const cursorText = document.getElementById('cursorText');
  const body = document.body;
  const backToTopBtn = document.getElementById("button-top");
  const backToTopInnerBtn = backToTopBtn.querySelector(".button");
  const playButton = document.getElementById('playButton');
  const audio = document.getElementById('audioclass');
  const playIcon = playButton.querySelector('.play-icon');
  const pauseIcon = playButton.querySelector('.pause-icon');
  
  // Slider elements
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevButton = document.querySelector('.slider-arrow.prev');
  const nextButton = document.querySelector('.slider-arrow.next');
  
  let currentSlide = 0;
  const totalSlides = slides.length;

  // Update active nav item based on scroll position
  function updateActiveNavItem() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    if (scrollPosition < windowHeight * 0.3) {
      document.querySelector('.nav-item:nth-child(2)').classList.add('active');
    } else if (scrollPosition < windowHeight * 0.7) {
      document.querySelector('.nav-item:nth-child(3)').classList.add('active');
    } else {
      document.querySelector('.nav-item:nth-child(5)').classList.add('active');
    }
  }

  // Card 3D effect handlers
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', function() {
    coords.textContent = '';
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
  });

  // Overlay functionality
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');

  card.addEventListener('click', () => {
    overlay.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
    }
  });

  // Back to Top functionality
  window.addEventListener("scroll", function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopInnerBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Custom cursor functionality
  const glitchMessages = ['CLICK_ME'];
  let messageIndex = 0;

  document.addEventListener('mousemove', (e) => {
    if (body.classList.contains('show-custom-cursor')) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorText.style.left = (e.clientX + 25) + 'px';
      cursorText.style.top = (e.clientY - 10) + 'px';
    }
  });

  card.addEventListener('mouseenter', () => {
    body.classList.add('show-custom-cursor');
    cursorText.textContent = glitchMessages[messageIndex];
  });

  card.addEventListener('mouseleave', () => {
    body.classList.remove('show-custom-cursor');
  });

  document.addEventListener('mouseleave', () => {
    body.classList.remove('show-custom-cursor');
  });

  setInterval(() => {
    if (body.classList.contains('show-custom-cursor')) {
      messageIndex = (messageIndex + 1) % glitchMessages.length;
      cursorText.textContent = glitchMessages[messageIndex];
    }
  }, 1500);

  // Slider functionality
  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlider();
    });
  });

  // Audio functionality
  audio.volume = 0.3;

  let firstClick = true;
  document.addEventListener('click', function firstClickHandler() {
    if (firstClick) {
      audio.play();
      updateButtonState();
      firstClick = false;
      document.removeEventListener('click', firstClickHandler);
    }
  });

  function updateButtonState() {
    if (audio.paused) {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    } else {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    }
  }

  audio.addEventListener('play', updateButtonState);
  audio.addEventListener('pause', updateButtonState);
  audio.addEventListener('playing', updateButtonState);
  
  updateButtonState();

  playButton.addEventListener('click', function(e) {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    updateButtonState();
  });

  // Listen for scroll events
  window.addEventListener('scroll', updateActiveNavItem);
});