// ======== 1. Функция для показа нужной страницы и скрытия остальных ========
document.addEventListener('DOMContentLoaded', () => {
	const pages = document.querySelectorAll('.page');
	const navButtons = document.querySelectorAll('.nav-btn');
	const backToTopBtn = document.getElementById('backToTop');
  
	// Показывает страницу с id=pageId, скрывает остальные
	function showPage(pageId) {
	  pages.forEach(page => {
		if (page.id === pageId) {
		  page.classList.add('active');
		  // Триггерим анимации внутри страницы
		  runRevealAnimations(page);
		} else {
		  page.classList.remove('active');
		  // Сбрасываем reveal-анимации (чтобы при возвращении на страницу они снова сыграли)
		  resetRevealAnimations(page);
		}
	  });
  
	  // Обновляем активный пункт меню
	  navButtons.forEach(btn => {
		btn.classList.toggle('active', btn.dataset.target === pageId);
	  });
  
	  // Появление/исчезновение кнопки BackToTop
	  if (pageId === 'page-header') {
		backToTopBtn.classList.remove('show');
	  } else {
		backToTopBtn.classList.add('show');
	  }
	}
  
	// Изначально показываем Home (Header)
	showPage('page-header');
  
	// Вешаем обработчики на кнопки меню
	navButtons.forEach(btn => {
	  btn.addEventListener('click', () => {
		const targetId = btn.dataset.target;
		showPage(targetId);
	  });
	});
  
	// Кнопка стрелка вниз на Header, чтобы перейти в About
	const scrollBtn = document.querySelector('.scroll-btn');
	scrollBtn.addEventListener('click', () => {
	  showPage(scrollBtn.dataset.target);
	});
  
	// Обработчик для BackToTop (возвращение к Header)
	backToTopBtn.addEventListener('click', () => {
	  showPage('page-header');
	});
  });
  
  // ======== 2. Reveal-анимации внутри каждой страницы ========
  // При показе страницы обозначенные .reveal-элементы плавно проявляются
  function runRevealAnimations(pageElement) {
	const revealItems = pageElement.querySelectorAll('.reveal');
	revealItems.forEach((item, idx) => {
	  // Устанавливаем небольшую задержку, чтобы элементы появлялись поочерёдно
	  setTimeout(() => {
		item.classList.add('active');
	  }, idx * 200); // задержка 200ms между элементами
	});
  }
  
  // Сбрасываем классы reveal, чтобы при повторном заходе на страницу анимация сыграла заново
  function resetRevealAnimations(pageElement) {
	const revealItems = pageElement.querySelectorAll('.reveal');
	revealItems.forEach(item => {
	  item.classList.remove('active');
	});
  }
  