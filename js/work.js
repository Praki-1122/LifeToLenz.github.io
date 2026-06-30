
  // SLIDER ENGINE
  const sliders = {};
  const INTERVAL = 1500; // 1.5 seconds

  function initSlider(id) {
    const track = document.getElementById('track-' + id);
    const dotsEl = document.getElementById('dots-' + id);
    const prog = document.getElementById('prog-' + id);
    if (!track) return;

    const slides = track.querySelectorAll('.slide');
    const visible = window.innerWidth <= 900 ? 2 : 4;
    const total = slides.length;
    const maxIndex = total - visible;

    // Build dots
    dotsEl.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.onclick = () => goTo(id, i);
      dotsEl.appendChild(d);
    }

    sliders[id] = { index: 0, total, visible, maxIndex, track, dotsEl, prog, timer: null };
    startAuto(id);
  }

  function goTo(id, idx) {
    const s = sliders[id];
    if (!s) return;
    idx = Math.max(0, Math.min(idx, s.maxIndex));
    s.index = idx;
    const slideWidth = s.track.offsetWidth / s.visible;
    s.track.style.transform = `translateX(-${idx * slideWidth}px)`;
    s.dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    // Reset + restart progress
    s.prog.style.transition = 'none';
    s.prog.style.width = '0%';
    requestAnimationFrame(() => {
      s.prog.style.transition = `width ${INTERVAL}ms linear`;
      s.prog.style.width = '100%';
    });
  }

  function startAuto(id) {
    const s = sliders[id];
    if (s.timer) clearInterval(s.timer);
    s.timer = setInterval(() => {
      const next = s.index >= s.maxIndex ? 0 : s.index + 1;
      goTo(id, next);
    }, INTERVAL);
    goTo(id, 0);
  }

  // Init all sliders
  ['wedding','event','corporate','wildlife','portrait','sports'].forEach(initSlider);

  // Filter scroll
  function scrollTo(id) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    if (id === 'all') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // LIGHTBOX
  let lbImages = [];
  let lbCurrent = 0;
  function openLightbox(slide) {
    const img = slide.querySelector('img');
    const title = slide.querySelector('h4')?.textContent || '';
    const cat = slide.querySelector('span')?.textContent || '';
    // Collect all slides on the page
    lbImages = Array.from(document.querySelectorAll('.slide img')).map(i => ({
      src: i.src, alt: i.alt,
      title: i.closest('.slide').querySelector('h4')?.textContent || '',
      cat: i.closest('.slide').querySelector('span')?.textContent || ''
    }));
    lbCurrent = lbImages.findIndex(i => i.src === img.src);
    showLb();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function showLb() {
    const item = lbImages[lbCurrent];
    document.getElementById('lbImg').src = item.src;
    document.getElementById('lbTitle').textContent = item.title;
    document.getElementById('lbCat').textContent = item.cat;
  }
  function lbNav(dir) {
    lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
    showLb();
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lbNav(1);
    if (e.key === 'ArrowLeft') lbNav(-1);
  });

  // Sticky nav
  window.addEventListener('scroll', () => {
    document.querySelector('nav').style.background = window.scrollY > 40 ? 'rgba(12,12,10,0.98)' : 'rgba(12,12,10,0.92)';
  });