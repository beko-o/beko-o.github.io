// ======== 1. Reveal on Scroll с помощью IntersectionObserver ========
document.addEventListener('DOMContentLoaded', function () {
	const reveals = document.querySelectorAll('.reveal');
  
	const options = {
	  root: null,
	  rootMargin: '0px',
	  threshold: 0.01, // чуть ниже, чтобы анимация точно срабатывала
	};
  
	const revealOnScroll = new IntersectionObserver(function (entries, observer) {
	  entries.forEach((entry) => {
		if (entry.isIntersecting) {
		  entry.target.classList.add('active');
		  observer.unobserve(entry.target);
		}
	  });
	}, options);
  
	reveals.forEach((element) => {
	  revealOnScroll.observe(element);
	});
  });
  
  // ======== 2. Плавный Scroll Spy для навигации ========
  window.addEventListener('scroll', function () {
	const sections = document.querySelectorAll('section');
	const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
  
	sections.forEach((sec) => {
	  const top = sec.offsetTop - 100; // немного сдвигаем «точку активации»
	  const bottom = top + sec.offsetHeight;
  
	  const id = sec.getAttribute('id');
	  const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
  
	  if (scrollPos >= top && scrollPos < bottom) {
		document.querySelectorAll('.nav-link').forEach((link) => link.classList.remove('active'));
		if (navLink) navLink.classList.add('active');
	  }
	});
  });
  
  // ======== 3. Кнопка "Back to Top" ========
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
	if (window.pageYOffset > 300) {
	  backToTopBtn.classList.add('show');
	} else {
	  backToTopBtn.classList.remove('show');
	}
  });
  backToTopBtn.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // ======== 4. Дополнительные эффекты (например, плавная загрузка хедера) ========
  window.addEventListener('load', () => {
	const headerText = document.querySelectorAll('.fade-in');
	headerText.forEach((el) => {
	  // чтобы сработала CSS-анимация (fadeInUp + delay)
	  el.style.visibility = 'visible';
	});
  });
  