/**
 * Здесь нет никакой «logики скролла» в стиле
 * window.addEventListener('scroll', ...) для подсчёта offsetTop, 
 * никакой ручной проверкb scrollPos и т. д.
 *
 * Мы используем только IntersectionObserver, чтобы:
 * 1) Подсветить активный пункт меню (scroll-spy);
 * 2) Показать/скрыть кнопку "Back to Top" (по sentinel-а);
 * 3) (Анимации для контента мы отдали AOS);
 */

document.addEventListener('DOMContentLoaded', () => {
	// 1. ============ SCROLL-SPY (подсветка активного пункта меню) ============
	const sections = document.querySelectorAll('section, header');
	const navLinks = document.querySelectorAll('.nav-link');
  
	const observerOptions = {
	  root: null,
	  rootMargin: '0px',
	  threshold: 0.6, 
	  // 0.6 => считаем секцию «активной», когда 60% её высоты влезает в viewport
	};
  
	const sectionObserver = new IntersectionObserver((entries) => {
	  entries.forEach(entry => {
		const id = entry.target.getAttribute('id');
		if (entry.isIntersecting) {
		  // Сбросим у всех nav-link класс 'active'
		  navLinks.forEach(link => link.classList.remove('active'));
		  // Добавим класс только тому, чей href совпадает с ID секции
		  const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
		  if (activeLink) {
			activeLink.classList.add('active');
		  }
		}
	  });
	}, observerOptions);
  
	sections.forEach(sec => {
	  // Обрабатываем header + все section'ы
	  sectionObserver.observe(sec);
	});
  
  
	// 2. ============ Back-to-Top Button через IntersectionObserver ============
	const backToTopBtn = document.getElementById('backToTop');
	const topSentinel = document.getElementById('top-sentinel');
  
	const sentinelObserver = new IntersectionObserver((entries) => {
	  entries.forEach(entry => {
		if (!entry.isIntersecting) {
		  // Если sentinel (начало страницы) вышел из видимости — показываем кнопку
		  backToTopBtn.classList.add('show');
		} else {
		  // Если sentinel снова в зоне видимости (мы вверху) — скрываем кнопку
		  backToTopBtn.classList.remove('show');
		}
	  });
	});
	sentinelObserver.observe(topSentinel);
  
	backToTopBtn.addEventListener('click', () => {
	  window.scrollTo({ top: 0, behavior: 'smooth' });
	});
  });
  