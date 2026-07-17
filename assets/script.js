// =========================================================
// TAORE LEVANYA LIMITED — site behaviour
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen ? iconClose() : iconMenu();
      document.body.classList.toggle('nav-open', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.innerHTML = iconMenu();
      document.body.classList.remove('nav-open');
    }));
  }
  function iconMenu(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';}
  function iconClose(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>';}

  /* ---------- Highlight active nav link ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- FAQ accordion + category tabs ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
      if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  const faqTabs = document.querySelectorAll('.faq-tabs button');
  const faqGroups = document.querySelectorAll('[data-faq-group]');
  faqTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      faqTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const group = tab.dataset.target;
      faqGroups.forEach(g => {
        g.style.display = (group === 'all' || g.dataset.faqGroup === group) ? '' : 'none';
      });
    });
  });

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      [name, email, message].forEach(f => f.closest('.field').classList.remove('error'));

      if (!name.value.trim()) { markError(name); valid = false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { markError(email); valid = false; }
      if (!message.value.trim()) { markError(message); valid = false; }

      if (!valid) return;

      form.style.display = 'none';
      document.getElementById('form-success').classList.add('show');
    });
  }
  function markError(field) { field.closest('.field').classList.add('error'); }

  /* ---------- AI chatbot widget (frontend simulation) ---------- */
  const fab = document.getElementById('chat-fab');
  const panel = document.getElementById('chat-panel');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input-field');
  const chatSend = document.getElementById('chat-send');

  if (fab && panel) {
    fab.addEventListener('click', () => panel.classList.toggle('open'));
    document.getElementById('chat-close')?.addEventListener('click', () => panel.classList.remove('open'));

    const responses = {
      services: "We offer four core services: Software & AI Engineering, Corporate Communication, Digital Growth Consulting, and Product & Brand Strategy. Want details on one of these?",
      pricing: "Pricing depends on project scope. Most engagements start with a free discovery call so we can recommend the right package. Want me to connect you with the team?",
      contact: "You can reach us at +234 704 563 6277 or info@taorelevanya.com. Our office is at E8 Mojisola Mall, Iyanu Bus Stop, Ibeshe, Ikorodu, Lagos.",
      products: "We build LEVANYA CRM, Communi Suite, Insight Dashboard, and Content Craft AI — all designed to help SMEs manage customers, communication, and content in one place.",
      default: "Thanks for reaching out! I can help with questions about our services, products, pricing, or getting in touch with the team. What would you like to know?"
    };

    function addMsg(text, who) {
      const div = document.createElement('div');
      div.className = 'msg ' + who;
      div.textContent = text;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function botReply(userText) {
      const t = userText.toLowerCase();
      let key = 'default';
      if (t.includes('service')) key = 'services';
      else if (t.includes('price') || t.includes('cost') || t.includes('quote')) key = 'pricing';
      else if (t.includes('contact') || t.includes('phone') || t.includes('email') || t.includes('address')) key = 'contact';
      else if (t.includes('product')) key = 'products';
      setTimeout(() => addMsg(responses[key], 'bot'), 500);
    }

    function sendMessage() {
      const val = chatInput.value.trim();
      if (!val) return;
      addMsg(val, 'user');
      chatInput.value = '';
      botReply(val);
    }

    chatSend?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });

    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        addMsg(chip.textContent, 'user');
        botReply(chip.textContent);
      });
    });
  }

});
