// Shared footer injected on every page to keep markup consistent site-wide.
document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  mount.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">
            <svg class="brand-logo" viewBox="0 8 118 104" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="62" r="46" fill="none" stroke="#AECC1E" stroke-width="6" stroke-linecap="round" stroke-dasharray="245 60" transform="rotate(-35 60 62)"/>
              <g stroke="#7FE0CE" stroke-width="3" stroke-linecap="round" fill="none">
                <circle cx="8" cy="46" r="3.2" fill="#7FE0CE"/><path d="M8 46 H22"/>
                <circle cx="6" cy="60" r="3.2" fill="#7FE0CE"/><path d="M6 60 H24"/>
                <circle cx="8" cy="74" r="3.2" fill="#7FE0CE"/><path d="M8 74 H22"/>
              </g>
              <path d="M32 34 H72 L62 46 H50 V80 H40 V46 H30 Z" fill="#fff"/>
              <path d="M56 50 H66 V78 H84 V88 H56 Z" fill="#AECC1E"/>
              <path d="M76 38 h30 a8 8 0 0 1 8 8 v10 a8 8 0 0 1 -8 8 h-16 l-8 9 v-9 h-6 a8 8 0 0 1 -8 -8 v-10 a8 8 0 0 1 8 -8 z" fill="#7FE0CE"/>
              <circle cx="86" cy="52" r="2.2" fill="#0E4B47"/><circle cx="94" cy="52" r="2.2" fill="#0E4B47"/><circle cx="102" cy="52" r="2.2" fill="#0E4B47"/>
            </svg>
            <span>TAORE LEVANYA<small style="color:#AECC1E">LIMITED</small></span>
          </a>
          <p>We empower SMEs with smart software solutions and powerful communication strategies that drive growth and build lasting customer relationships.</p>
          <div class="footer-social">
            <a href="https://www.linkedin.com/company/taorelevanya/" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48s1.34 2.98 2.98 2.98 2.98-1.34 2.98-2.98S6.62 3.5 4.98 3.5zM2.4 21.5h5.16V8.98H2.4V21.5zM9.5 8.98v12.52h5.15v-6.96c0-1.84.35-3.62 2.63-3.62 2.25 0 2.28 2.1 2.28 3.74v6.84H24v-7.7c0-4.62-1-8.18-6.4-8.18-2.6 0-4.34 1.43-5.05 2.78h-.07V8.98H9.5z"/></svg></a>
            
            <a href="https://web.facebook.com/taorelevanya/" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg></a>

            <a href="https://www.instagram.com/taorelevanya/" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.42.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.42.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.3 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"/></svg></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Our Services</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4>Our Services</h4>
          <ul class="footer-links">
            <li><a href="services.html">Software &amp; AI Engineering</a></li>
            <li><a href="services.html">Corporate Communication</a></li>
            <li><a href="services.html">Digital Growth Consulting</a></li>
            <li><a href="services.html">Product &amp; Brand Strategy</a></li>
          </ul>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <ul class="footer-contact">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/></svg><span>+234 704 563 6277</span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><path d="M2 6h20v12H2z"/></svg><span><a href="taorelevanya@gmail.com">info@taorelevanya.ng</a></span></li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>E8 Mojisola Mall, Iyanu Bus Stop, Ibeshe, Ikorodu, Lagos.</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Taore LeVanya Limited. All Rights Reserved.</span>
        <span><a href="privacy-policy.html">Privacy Policy</a> &nbsp;|&nbsp; <a href="terms-of-service.html">Terms of Service</a></span>
      </div>
    </div>
  `;
});
