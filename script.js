// ── Custom cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
});
function animateFollower() {
  fx += (mx - fx - 18) * 0.12;
  fy += (my - fy - 18) * 0.12;
  follower.style.transform = `translate(${fx}px, ${fy}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();
document.querySelectorAll('a, button, .dish-card, .event-card, .menu-item').forEach(el => {
  el.addEventListener('mouseenter', () => { follower.style.width = '60px'; follower.style.height = '60px'; follower.style.borderColor = 'rgba(201,168,76,0.4)'; });
  el.addEventListener('mouseleave', () => { follower.style.width = '36px'; follower.style.height = '36px'; follower.style.borderColor = 'var(--gold)'; });
});

// ── Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Hamburger
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});
function closeMobileNav() {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('active');
}

// ── Scroll Reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), (parseFloat(e.target.style.transitionDelay)||0)*1000);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── Menu Tabs
function switchTab(id, btn) {
  document.querySelectorAll('.menu-items').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// ── Guest selector
let guests = 2;
function changeGuests(d) {
  guests = Math.min(10, Math.max(1, guests + d));
  document.getElementById('guest-count').textContent = guests;
}

// ── Reservation Submit
function submitReservation() {
  const name = document.getElementById('fname').value;
  const email = document.getElementById('remail').value;
  const date = document.getElementById('rdate').value;
  const time = document.getElementById('rtime').value;
  if (!name || !email || !date || !time) {
    alert('Please fill in all required fields.');
    return;
  }
  const formContent = document.getElementById('reservationForm');
  formContent.style.opacity = '0';
  setTimeout(() => {
    formContent.style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
  }, 400);
}

// ── Reviews
let currentReview = 0;
const totalReviews = 3;
function updateReviews() {
  document.getElementById('reviewTrack').style.transform = `translateX(-${currentReview * 100}%)`;
  document.querySelectorAll('.review-dot').forEach((d, i) => d.classList.toggle('active', i === currentReview));
}
function nextReview() { currentReview = (currentReview + 1) % totalReviews; updateReviews(); }
function prevReview() { currentReview = (currentReview - 1 + totalReviews) % totalReviews; updateReviews(); }
function goToReview(i) { currentReview = i; updateReviews(); }
setInterval(nextReview, 6000);

// ── Cart
let cart = [];
function toggleCart() {
  const overlay = document.getElementById('cartOverlay');
  const sidebar = document.getElementById('cartSidebar');
  overlay.classList.toggle('open');
  sidebar.classList.toggle('open');
}
document.getElementById('cartTrigger').addEventListener('click', toggleCart);
function addToCart(name, price, btn) {
  cart.push({ name, price });
  renderCart();
  // Button feedback
  const orig = btn.textContent;
  btn.textContent = '✓';
  btn.style.background = 'var(--gold)';
  btn.style.color = 'var(--dark)';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1500);
}
function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
}
function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const badge = document.getElementById('cartBadge');
  badge.style.display = cart.length ? 'flex' : 'none';
  badge.textContent = cart.length;
  if (!cart.length) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty.<br><br>Add dishes to get started.</div>';
    footer.style.display = 'none';
    return;
  }
  const total = cart.reduce((s, i) => s + i.price, 0);
  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
    </div>
  `).join('');
  document.getElementById('cartTotal').textContent = `$${total}`;
  footer.style.display = 'block';
}

// ── Newsletter
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
  document.getElementById('newsletterEmail').value = '';
  alert('Welcome to The Inner Table. Your exclusive offer is on its way! 🥂');
}

// ── Parallax subtle effect on hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-img');
  if (hero) hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
});

// ── Set min date for reservation to today
const dateInput = document.getElementById('rdate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}