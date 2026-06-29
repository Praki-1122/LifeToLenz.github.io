 // Filter tag toggle
 document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  // Sticky nav
  window.addEventListener('scroll', () => {
    document.querySelector('nav').style.background = window.scrollY > 40 ? 'rgba(12,12,10,0.98)' : 'rgba(12,12,10,0.92)';
  });