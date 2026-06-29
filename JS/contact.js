
function updateCount(el) {
    document.getElementById('charCount').textContent = el.value.length;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Build mailto
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const subject = document.getElementById('subject').value || 'New Inquiry from LifeToLenz';
    const message = document.getElementById('message').value;

    const body = `Name: ${name}
                  Email: ${email}
                  Phone: ${phone}
                  Service: ${service}
                  Event Date: ${date}
                  Location: ${location}
                  Message:${message}`;

    // const mailtoLink = `mailto:lifetolenz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // window.location.href = mailtoLink;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=lifetolenz@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');

    setTimeout(() => {
      document.getElementById('successMsg').style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Send Message';
      document.getElementById("contactForm").reset();
    }, 1500);
  }

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.background = window.scrollY > 40 ? 'rgba(12,12,10,0.98)' : 'rgba(12,12,10,0.92)';
  });