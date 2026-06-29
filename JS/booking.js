
let currentStep = 1;
let selectedType = '';
let selectedPkg = '';
let selectedPkgPrice = 0;
let addons = [];
let addonTotal = 0;
const pkgPrices = { 'Essential': 8000, 'Classic': 15000, 'Premium': 28000 };
const addonPrices = { 'Drone / Aerial': 4000, 'Highlight Reel': 5000, 'Printed Album': 3500, 'Same-Day Preview': 2000 };

function goToStep(n) {
  document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.step-tab').forEach((t, i) => {
    t.classList.remove('active', 'done');
    if (i + 1 < n) t.classList.add('done');
    if (i + 1 === n) t.classList.add('active');
  });
  const el = document.getElementById('step-' + n);
  if (el) { el.classList.add('active'); currentStep = n; }
  window.scrollTo({ top: document.querySelector('.stepper').offsetTop - 80, behavior: 'smooth' });
  updateConfirm();
}

function selectType(card, type) {
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  selectedType = type;
  document.getElementById('sum-type').textContent = type;
  document.getElementById('sum-type').classList.remove('placeholder');
}

function selectPkg(card, name, price) {
  document.querySelectorAll('.pkg-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  selectedPkg = name;
  selectedPkgPrice = pkgPrices[name] || 0;
  document.getElementById('sum-pkg').textContent = name + ' — ' + price;
  document.getElementById('sum-pkg').classList.remove('placeholder');
  document.getElementById('price-base').textContent = price;
  updateTotal();
}

function toggleAddon(item, name, price) {
  item.classList.toggle('selected');
  const priceNum = addonPrices[name] || 0;
  if (item.classList.contains('selected')) {
    addons.push(name);
    addonTotal += priceNum;
  } else {
    addons = addons.filter(a => a !== name);
    addonTotal -= priceNum;
  }
  updateTotal();
}

function updateTotal() {
  const total = selectedPkgPrice + addonTotal;
  document.getElementById('price-total').textContent = total > 0 ? '₹' + total.toLocaleString('en-IN') : '—';
  // Addon rows
  const row = document.getElementById('addon-rows');
  row.innerHTML = addons.map(a => `<div class="price-row"><span>${a}</span><strong>+₹${addonPrices[a]?.toLocaleString('en-IN')}</strong></div>`).join('');
}

function updateSummary() {
  const date = document.getElementById('b-date').value;
  const loc = document.getElementById('b-location').value;
  if (date) {
    const d = new Date(date);
    document.getElementById('sum-date').textContent = d.toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
    document.getElementById('sum-date').classList.remove('placeholder');
  }
  if (loc) {
    document.getElementById('sum-loc').textContent = loc;
    document.getElementById('sum-loc').classList.remove('placeholder');
  }
}

function updateConfirm() {
  document.getElementById('confirm-type').textContent = selectedType || '—';
  document.getElementById('confirm-pkg').textContent = selectedPkg || '—';
  const d = document.getElementById('b-date')?.value;
  document.getElementById('confirm-date').textContent = d ? new Date(d).toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'}) : '—';
  document.getElementById('confirm-location').textContent = document.getElementById('b-location')?.value || '—';
  document.getElementById('confirm-name').textContent = document.getElementById('b-name')?.value || '—';
  document.getElementById('confirm-addons').textContent = addons.length ? addons.join(', ') : 'None selected';
}

function submitBooking() {
  if (!document.getElementById('terms').checked) {
    alert('Please confirm the terms before submitting.');
    return;
  }
  // Build mailto
  const name = document.getElementById('b-name').value;
  const email = document.getElementById('b-email').value;
  const phone = document.getElementById('b-phone').value;
  const date = document.getElementById('b-date').value;
  const loc = document.getElementById('b-location').value;
  const dur = document.getElementById('b-duration').value;
  const notes = document.getElementById('b-notes').value;

  const body = `BOOKING REQUEST — ShutterVerse

Photography Type: ${selectedType}
Package: ${selectedPkg}
Add-ons: ${addons.join(', ') || 'None'}
Estimated Total: ₹${(selectedPkgPrice + addonTotal).toLocaleString('en-IN')}

Name: ${name}
Phone: ${phone}
Email: ${email}
Date: ${date}
Location: ${loc}
Duration: ${dur}

Notes:
${notes}`;

  window.location.href = `mailto:hello@shutterverse.in?subject=${encodeURIComponent('Booking Request – ' + selectedType + ' – ' + name)}&body=${encodeURIComponent(body)}`;

  // Show success
  document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
  document.querySelector('.stepper').style.display = 'none';
  document.getElementById('success-panel').style.display = 'block';
}

window.addEventListener('scroll', () => {
  document.querySelector('nav').style.background = window.scrollY > 40 ? 'rgba(12,12,10,0.98)' : 'rgba(12,12,10,0.92)';
});
