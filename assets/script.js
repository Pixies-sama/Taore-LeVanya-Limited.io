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

    /* ─────────────────────────────────────────────
       RESPONSE LIBRARY
       Each key maps to one string or an array of strings
       (Bob rotates through them to feel less repetitive
       on multi-turn conversations).
    ───────────────────────────────────────────── */
    const responses = {
      /* ── GREETINGS ─────────────────────────── */
      greeting: [
        "Hey there! I'm Bob 👋 Taore LeVanya's AI assistant. I can help with questions about our services, products, pricing, AI features, business hours, or how to reach the team. What would you like to know?",
        "Hi! Great to have you here. I'm Bob — ask me anything about Taore LeVanya: services, pricing, our products, or how to get in touch. What's on your mind?",
        "Hello! 👋 I'm Bob, your Taore LeVanya guide. Whether it's building software, marketing it to the right audience, or finding the right AI solution for your business, I've got you covered. What can I help with today?"
      ],
      /* ── SERVICES (general) ─────────────────── */
      services: [
        "We offer five core service areas:\n\n• Software & AI Engineering — custom AI tools, chatbots, automations, and smart web/app development\n• Software Product Marketing — helping tech companies and software businesses reach the right customers through digital marketing, media communication, and go-to-market strategy\n• Corporate Communication — professional writing, PR, brand messaging, and media relations\n• Digital Growth Consulting — SEO, digital marketing strategy, content marketing, and growth planning\n• Product & Brand Strategy — brand identity, positioning, and merchandising\n\nWant details on any of these?",
        "Taore LeVanya does two big things really well: we build software and AI products, and we help businesses market and communicate them effectively. Our services span Software & AI Engineering, Software Product Marketing, Corporate Communication, Digital Growth Consulting, and Product & Brand Strategy. Which area are you most interested in?"
      ],
      /* ── SOFTWARE PRODUCT MARKETING (new) ──── */
      softwareMarketing: [
        "We specialise in marketing software products to the right audience. Whether you've just launched an app, a SaaS platform, or an AI tool, we help you:\n\n• Define your ideal users and craft messaging that resonates\n• Build a go-to-market strategy tailored to your product\n• Run digital marketing campaigns that drive sign-ups and conversions\n• Manage media and press communication to build credibility\n• Create content that educates your market and positions your product as the go-to solution\n\nThis is a key differentiator for us — we understand both the tech and the storytelling. Want to explore this for your product?",
        "Got a software product but struggling to reach the right customers? That's exactly what we help with. We combine deep tech knowledge with strategic communication to position, market, and grow software businesses. From press coverage to digital campaigns to user acquisition strategy — we handle the full picture. Want to chat about your product?"
      ],
      /* ── CORPORATE COMMUNICATION (new) ──────── */
      corpcomm: [
        "Our Corporate Communication service helps businesses speak with clarity, authority, and consistency. We handle:\n\n• Press releases and media relations\n• Corporate newsletters and stakeholder communications\n• Brand voice development and messaging frameworks\n• Executive communications and thought leadership content\n• Crisis communication strategy\n\nWhether you're a startup trying to establish credibility or an established business managing your reputation, we can help. Want to know more?",
        "Strong communication builds trust — and trust builds revenue. Our corporate communication work covers media relations, press writing, brand messaging, stakeholder communications, and executive content. We help your business say the right thing to the right people at the right time. Interested in exploring this?"
      ],
      /* ── DIGITAL MARKETING ───────────────────── */
      digitalMarketing: [
        "Our Digital Growth Consulting covers the full digital marketing spectrum:\n\n• SEO strategy and content optimisation\n• Social media marketing and management\n• Email marketing campaigns\n• Paid digital advertising (Google, Meta, LinkedIn)\n• Content marketing — blogs, thought leadership, and multimedia\n• Analytics and performance reporting\n\nWe don't just drive traffic — we focus on the right traffic that converts. Want to talk about your growth goals?",
        "We help businesses grow their digital footprint through SEO, social media, email campaigns, paid ads, and content marketing. If you have a product or service that needs more visibility and more customers, this is where we come in. What does your current digital presence look like?"
      ],
      /* ── MEDIA COMMUNICATION (new) ──────────── */
      mediaComm: [
        "Media communication is a key part of how we help businesses build credibility. We manage:\n\n• Press release writing and distribution\n• Media pitching and journalist relations\n• Product launch PR campaigns\n• Interview preparation and media training\n• Online reputation management\n\nFor software businesses especially, getting the right media coverage can accelerate user adoption dramatically. Want to explore a media strategy for your business?",
        "We help businesses earn the right kind of media attention — not just noise, but coverage that builds trust with your target audience. From press releases to media pitches to launch PR, we handle the relationship between your brand and the press. This is especially powerful for software product launches. Interested?"
      ],
      /* ── MERCHANDISING (new) ─────────────────── */
      merch: [
        "Branded merchandising is one of the ways we help businesses stay visible and memorable. Through our Oroaje platform, we offer:\n\n• Custom branded merchandise for businesses and events\n• Marketing-intelligent ordering — so you know what's working\n• Branded items for product launches, corporate gifting, and team swag\n\nMerchandising is often an underused marketing channel. When done right, it turns your brand into something people can see, touch, and remember. Want to explore this?",
        "Our merchandising service — powered by Oroaje — helps businesses create branded items that extend their marketing reach. Think product launch swag, corporate gifts, event merchandise, or everyday branded items your customers will actually use. It's physical marketing that works. Want to know more?"
      ],
      /* ── GO-TO-MARKET STRATEGY (new) ─────────── */
      gtm: [
        "A great product with a weak go-to-market strategy often fails in silence. We help businesses — especially software and AI companies — build robust GTM strategies that cover:\n\n• Target audience definition and user persona development\n• Competitive positioning and differentiation messaging\n• Channel strategy (where to reach your users)\n• Launch planning and execution\n• Post-launch growth and retention planning\n\nIf you've built something and aren't sure how to bring it to market, let's talk. Book a free discovery call at info@taorelevanya.ng.",
        "Go-to-market strategy is one of our most in-demand services for tech companies. We work with you to figure out who your product is for, why they should care, and how to reach them efficiently. It's the bridge between a great product and a successful business. Want to explore this for your company?"
      ],
      /* ── PRODUCTS ────────────────────────────── */
      products: [
        "We currently have three active product lines:\n\n🧠 CVPly — An AI-powered career assistant and CV builder for professionals\n🛍 Oroaje — A print merchandise ordering platform with built-in marketing intelligence\n✍️ Buff My Profile — Our human-led writing and communication service: CV/LinkedIn revamps, business writing, academic publication review, book writing, and AI content training\n\nWant more details on any of these?",
        "Our products include CVPly (AI career assistant & CV builder), Oroaje (smart branded merchandise platform), and Buff My Profile (our writing and communication service). Which one would you like to know more about?"
      ],
      /* ── CVPly ───────────────────────────────── */
      cvply: "CVPly is our AI-powered career assistant and CV builder. It helps professionals create compelling CVs, optimise their LinkedIn profiles, and prepare for job opportunities — all powered by AI. Want to know how to get started?",
      /* ── Oroaje ──────────────────────────────── */
      oroaje: "Oroaje is a smart print merchandise ordering platform with built-in marketing intelligence. It helps businesses order branded items — for launches, events, corporate gifting, or everyday brand visibility — while giving you insights into what works for your audience. Interested in learning more?",
      /* ── Buff My Profile ─────────────────────── */
      buff: "Buff My Profile is Taore LeVanya's human-led writing and communication service. We offer:\n\n✍️ CV and LinkedIn revamps\n📄 Business writing (proposals, reports, pitch decks)\n🎓 Academic publication review — editing, proofreading, and structuring research papers, journal articles, and dissertations to publication standard\n📚 Book writing and ghostwriting\n🤖 AI content training for professionals and SMEs\n\nWhether you're a professional, a researcher, or a business owner, we help you communicate with impact. Want to explore a package?",
      /* ── ACADEMIC / RESEARCH WRITING (new) ───── */
      academic: [
        "Through our Buff My Profile service, we offer academic publication support — including:\n\n• Research paper editing and proofreading\n• Journal article structuring and review\n• Dissertation and thesis review\n• Abstract writing and refinement\n• Citation and referencing checks (APA, MLA, Harvard, Chicago)\n\nWe work with researchers, PhD candidates, academics, and institutions who need their work polished to publication standard. Want to discuss your research project?",
        "Academic writing is one of Buff My Profile's specialist areas. We review and edit research papers, journal articles, dissertations, and theses — ensuring your work meets the rigorous standards required for publication or academic submission. Interested in having your work reviewed?"
      ],
      /* ── PRICING ─────────────────────────────── */
      pricing: [
        "Pricing is always tailored to your project scope — no two briefs are exactly alike. Most engagements start with a free discovery call so we can recommend the right package and give you an accurate quote. Want me to help you set one up?",
        "Our pricing is scope-based, so we don't do one-size-fits-all packages. The best first step is a free discovery call where we understand your needs and tell you exactly what to expect. Shall I connect you with the team?"
      ],
      /* ── DISCOVERY CALL ──────────────────────── */
      discovery: "A discovery call is a free, no-obligation session with our team to understand your business goals and recommend the right solution. It usually takes 20–30 minutes. Want to book one? Reach us at info@taorelevanya.ng or call +234 704 563 6277.",
      /* ── AI ──────────────────────────────────── */
      ai: [
        "AI is at the core of everything we build — and also how we work. Our AI offerings include:\n\n• Custom AI chatbots for round-the-clock lead capture and support\n• AI lead scoring to help you focus on the right prospects\n• AI content generators for blog posts, social media, and marketing copy\n• AI product recommenders and quiz tools for your website\n• WhatsApp automation bots for customer service and sales\n• AI-assisted go-to-market strategy for software products\n\nWant details on any of these?",
        "We build practical AI tools for real business impact — chatbots, lead scorers, content generators, WhatsApp bots, and smart automations. And because we also do marketing and communication, we help you launch and position those AI products too. Which aspect interests you most?"
      ],
      /* ── CHATBOT ─────────────────────────────── */
      chatbot: "We build custom AI chatbots for websites and WhatsApp that handle lead capture, FAQs, product recommendations, and customer support — 24/7, without a human in the loop. They're trained on your business data and can be live within days. Want to explore this for your business?",
      /* ── AUTOMATION ──────────────────────────── */
      automation: "Our automation solutions use tools like N8N, Make, and WhatsApp Business API to automate repetitive tasks — lead follow-ups, appointment booking, social media posting, marketing workflows, and more. This frees up your team for higher-value work. Interested in what we could automate for you?",
      /* ── WHATSAPP ────────────────────────────── */
      whatsapp: "We build WhatsApp Business bots that handle customer enquiries, qualify leads, send updates, and even take orders — all automatically. It's one of our most popular services for Nigerian businesses. Want to know how it works?",
      /* ── ABOUT ───────────────────────────────── */
      about: [
        "Taore LeVanya Limited is a technology and communication consulting firm headquartered in Lagos, Nigeria. We help businesses — especially in the tech and SME space — do two things: build smart digital products and market them effectively to the right audience. We combine software & AI engineering with strategic communication, digital marketing, and brand positioning. We're a subsidiary of Catalysium Holdings. Want to know more?",
        "We're a Lagos-based AI and communication consultancy — part of the Catalysium Holdings group. Our team builds software products and also helps companies communicate and market those products to reach their ideal customers. It's a rare combination, and it's what makes us different. There's more on our About page at taorelevanya.ng."
      ],
      /* ── CATALYSIUM ──────────────────────────── */
      catalysium: "Taore LeVanya Limited is a subsidiary of Catalysium Holdings — a group focused on technology, strategy, and business innovation. Want to know more about what we do under the Taore LeVanya brand?",
      /* ── HOURS ───────────────────────────────── */
      hours: "We're open Monday to Friday, 9:00 AM – 5:00 PM (WAT). Feel free to send a message anytime though — we'll get back to you the next business day, or sooner!",
      /* ── EMAIL ───────────────────────────────── */
      email: "You can email us at info@taorelevanya.ng — we typically respond within one business day. Prefer a quicker conversation? Call us on +234 704 563 6277.",
      /* ── PHONE ───────────────────────────────── */
      phone: "Our phone number is +234 704 563 6277. You can also reach us on WhatsApp at the same number. We're available Monday to Friday, 9 AM – 5 PM.",
      /* ── ADDRESS ─────────────────────────────── */
      address: "You'll find us at E8 Mojisola Mall, Iyanu Bus Stop, Ibeshe, Ikorodu, Lagos. Need directions or want to schedule a visit? Drop us a line at info@taorelevanya.ng.",
      /* ── CONTACT (full) ──────────────────────── */
      contact: "Here's everything you need to reach us:\n\n📞 Phone / WhatsApp: +234 704 563 6277\n📧 Email: info@taorelevanya.ng\n📍 Office: E8 Mojisola Mall, Iyanu Bus Stop, Ibeshe, Ikorodu, Lagos\n🕐 Hours: Mon–Fri, 9 AM – 5 PM\n\nWe'd love to hear from you!",
      /* ── WEBSITE ─────────────────────────────── */
      website: "Our website is taorelevanya.ng — you'll find our full portfolio, service breakdowns, blog, and more there. Is there something specific I can help you find?",
      /* ── SOCIAL ──────────────────────────────── */
      social: "You can find us on LinkedIn, Instagram, and X (Twitter). Links are in the footer of our website at taorelevanya.ng. We post tips on AI, software marketing, business growth, and communication regularly.",
      /* ── SME ─────────────────────────────────── */
      sme: "We work extensively with SMEs and tech startups — in fact, most of our clients are small and mid-sized businesses looking to punch above their weight with better technology, sharper communication, and smarter marketing. If that sounds like you, we'd love to show you what's possible. Want to start with a free discovery call?",
      /* ── BLOG ────────────────────────────────── */
      blog: "We publish regularly on AI, software marketing, business strategy, and communication on our blog at taorelevanya.ng. It's a great way to see how we think before you commit to working with us.",
      /* ── BOOKING ─────────────────────────────── */
      booking: "You can book a free discovery call by reaching us at info@taorelevanya.ng or calling +234 704 563 6277. Alternatively, use the contact form on our website at taorelevanya.ng and we'll schedule a time that works for you.",
      /* ── TECH COMPANY (new) ──────────────────── */
      techCompany: [
        "We work with tech companies and software businesses at multiple levels — building AI and digital products for them, and also helping them connect with the right users through marketing and communication. If you've built a product and need help either enhancing it with AI or bringing it to market effectively, we're the right partner. Want to explore what that looks like for your company?",
        "Tech companies are one of our primary client types. We either build software and AI products for them, or we help market and communicate existing ones to reach the right customers. Sometimes both. What stage is your product at?"
      ],
      /* ── SAAS / APP LAUNCH (new) ─────────────── */
      productLaunch: [
        "Launching a software product or app is one of the most exciting — and most challenging — things a company does. We help make it land well by handling:\n\n• Pre-launch positioning and messaging\n• Press and media coverage\n• Digital marketing campaigns to drive early sign-ups\n• Content strategy to build awareness\n• Post-launch retention and user communication\n\nWe've helped software businesses get in front of the right audience and build momentum from day one. Want to talk through your launch?",
        "Whether you're launching a SaaS product, a mobile app, or an AI tool, we can help you build the right launch strategy — from press releases and media outreach to digital campaigns and user onboarding content. A great launch sets the tone for everything that follows. Want to start planning yours?"
      ],
      /* ── THANKS ──────────────────────────────── */
      thanks: [
        "You're very welcome! Is there anything else I can help you with?",
        "Happy to help! Let me know if you have any other questions.",
        "Anytime! Feel free to ask if there's anything else on your mind."
      ],
      /* ── FALLBACK ────────────────────────────── */
      fallback: [
        "That's a great question — let me point you in the right direction. You can reach our team directly at info@taorelevanya.ng or call +234 704 563 6277 and they'll be happy to help. Is there something else I can assist with?",
        "I want to make sure you get the right answer. For anything specific or detailed, our team at info@taorelevanya.ng are the best people to talk to. In the meantime, can I help with services, pricing, or getting in touch?",
        "I'm still learning, but our team definitely knows the answer! Drop them a line at info@taorelevanya.ng or call +234 704 563 6277. What else can I help with?"
      ]
    };

    /* ─────────────────────────────────────────────
       HELPERS
    ───────────────────────────────────────────── */
    // Cycle through response arrays so Bob feels less robotic
    const _useCounts = {};
    function pick(key) {
      const val = responses[key];
      if (!Array.isArray(val)) return val;
      _useCounts[key] = (_useCounts[key] || 0);
      const text = val[_useCounts[key] % val.length];
      _useCounts[key]++;
      return text;
    }
    // Whole-word match — prevents "again" triggering "ai", "called" triggering "call", etc.
    function hasWord(text, word) {
      return new RegExp('(?:^|[\\s,!?])' + word + '(?=[\\s,!?.]|$)', 'i').test(text);
    }
    // Any-of helper — true if text contains at least one phrase/word in the list.
    // Multi-word phrases use includes(); single words use whole-word regex.
    function anyOf(text, terms) {
      return terms.some(term =>
        term.includes(' ') ? text.includes(term) : hasWord(text, term)
      );
    }

    /* ─────────────────────────────────────────────
       INTENT CLASSIFIER
       Rules run most-specific first. Multi-word phrases
       are tested before single keywords so e.g. "how do
       I reach you" maps to 'contact' rather than 'phone'.
    ───────────────────────────────────────────── */
    function classify(t) {
      // ── GREETINGS ──────────────────────────────
      if (anyOf(t, ['hi', 'hello', 'hey', 'howdy', 'good morning', 'good afternoon',
                    'good evening', 'sup', 'yo', 'hiya', "what's up", 'whats up',
                    'how are you', "how's it going", 'greetings']))
        return 'greeting';
      // ── GRATITUDE ──────────────────────────────
      if (anyOf(t, ['thank', 'thanks', 'thank you', 'cheers', 'appreciate',
                    'great help', 'helpful', "you're great", 'well done']))
        return 'thanks';
      // ── SPECIFIC CONTACT DETAILS (before generic 'contact') ──
      if (anyOf(t, ['email', 'e-mail', 'mail address', 'email address',
                    'send a message', 'inbox', 'message you', 'write to you']))
        return 'email';
      if (anyOf(t, ['phone', 'phone number', 'call you', 'call us', 'ring you',
                    'mobile', 'telephone', 'whatsapp number', 'contact number',
                    "what's your number", 'what is your number', 'give me a number']))
        return 'phone';
      if (anyOf(t, ['address', 'location', 'where are you', 'where is your office',
                    'find you', 'your office', 'physical address', 'office address',
                    'come to you', 'visit you', 'directions', 'map', 'ikorodu',
                    'ibeshe', 'mojisola', 'where in lagos']))
        return 'address';
      // ── GENERAL CONTACT ─────────────────────────
      if (anyOf(t, ['contact', 'reach', 'get in touch', 'talk to someone', 'talk to the team',
                    'speak to', 'connect me', 'connect with', 'reach out', 'how do i reach',
                    'how do i contact', 'reach you', 'contact you', 'get hold of']))
        return 'contact';
      // ── BOOKING / DISCOVERY CALL ───────────────
      if (anyOf(t, ['what is a discovery call', 'what is the discovery call',
                    'how does the discovery call work', 'tell me about the discovery call']))
        return 'discovery';
      if (anyOf(t, ['book', 'booking', 'schedule', 'appointment', 'discovery call',
                    'free call', 'free session', 'consultation', 'set up a call',
                    'arrange a meeting', 'meeting', 'talk to an expert', 'speak to the team']))
        return 'booking';
      // ── BUSINESS HOURS ─────────────────────────
      if (anyOf(t, ['hours', 'business hours', 'opening hours', 'open', 'closed',
                    'when are you open', 'what time', 'office hours',
                    'working hours', 'when do you close', 'open on weekends', 'weekend']))
        return 'hours';
      // ── ACADEMIC / RESEARCH WRITING (before buff so specific wins) ────
      if (anyOf(t, ['academic', 'research paper', 'journal article', 'journal paper',
                    'dissertation', 'thesis', 'publication review', 'academic writing',
                    'academic editing', 'academic proofreading', 'research writing',
                    'paper review', 'paper editing', 'phd', 'postgraduate',
                    'citation', 'referencing', 'apa', 'mla', 'harvard style',
                    'manuscript', 'abstract', 'peer review', 'scholarly']))
        return 'academic';
      // ── BUFF MY PROFILE ────────────────────────
      if (anyOf(t, ['buff', 'buff my profile', 'linkedin revamp', 'cv revamp',
                    'business writing', 'book writing', 'write my cv', 'professional writing',
                    'content training', 'ai content training', 'writing service',
                    'ghostwriting', 'ghostwrite', 'rewrite my cv']))
        return 'buff';
      // ── SOFTWARE PRODUCT MARKETING ─────────────
      if (anyOf(t, ['market my software', 'market my app', 'market my product',
                    'software marketing', 'app marketing', 'product marketing',
                    'saas marketing', 'tech marketing', 'market a tech product',
                    'help me sell my software', 'promote my app', 'promote my software',
                    'user acquisition', 'get users', 'attract users', 'grow my app',
                    'grow my saas', 'software go to market', 'app go to market']))
        return 'softwareMarketing';
      // ── GO-TO-MARKET STRATEGY ──────────────────
      if (anyOf(t, ['go to market', 'go-to-market', 'gtm', 'launch strategy',
                    'market entry', 'how to launch', 'product launch strategy',
                    'bring to market', 'market positioning', 'positioning strategy',
                    'target audience', 'user persona', 'ideal customer']))
        return 'gtm';
      // ── PRODUCT / APP LAUNCH ───────────────────
      if (anyOf(t, ['launching', 'product launch', 'app launch', 'launch my product',
                    'launch my app', 'launch my software', 'launch campaign',
                    'launch pr', 'pre-launch', 'post-launch', 'release']))
        return 'productLaunch';
      // ── MEDIA COMMUNICATION ─────────────────────
      if (anyOf(t, ['press release', 'media coverage', 'media communication',
                    'media relations', 'journalist', 'press', 'pr agency', 'public relations',
                    'media pitch', 'press pitch', 'get press coverage', 'media strategy',
                    'news coverage', 'media training', 'reputation management',
                    'online reputation', 'brand reputation']))
        return 'mediaComm';
      // ── CORPORATE COMMUNICATION ─────────────────
      if (anyOf(t, ['corporate communication', 'corporate comms', 'stakeholder communication',
                    'internal communication', 'brand voice', 'brand messaging',
                    'corporate newsletter', 'executive communication',
                    'thought leadership', 'crisis communication', 'comms strategy',
                    'communication strategy', 'messaging framework']))
        return 'corpcomm';
      // ── DIGITAL MARKETING ──────────────────────
      if (anyOf(t, ['digital marketing', 'seo', 'search engine', 'social media marketing',
                    'content marketing', 'email marketing', 'paid ads', 'google ads',
                    'facebook ads', 'meta ads', 'linkedin ads', 'online marketing',
                    'grow my audience', 'increase traffic', 'online visibility',
                    'digital strategy', 'marketing strategy', 'marketing campaign',
                    'advertising', 'digital advertising']))
        return 'digitalMarketing';
      // ── MERCHANDISING ──────────────────────────
      if (anyOf(t, ['merchandise', 'merch', 'branded items', 'branded merch',
                    'corporate gifts', 'corporate gifting', 'swag', 'branded swag',
                    'event merchandise', 'branded products', 'promotional items',
                    'branded clothing', 'branded print', 'print merchandise']))
        return 'merch';
      // ── TECH COMPANY / SOFTWARE BUSINESS ───────
      if (anyOf(t, ['tech company', 'software company', 'software business',
                    'tech startup', 'software startup', 'i have a product',
                    'i built a product', 'we built a product', 'i have an app',
                    'we have an app', 'saas company', 'saas business',
                    'help my tech company', 'help my startup']))
        return 'techCompany';
      // ── WHATSAPP (before generic chatbot) ──────
      if (anyOf(t, ['whatsapp', 'whats app', 'wp bot', 'whatsapp bot',
                    'whatsapp automation', 'wa bot']))
        return 'whatsapp';
      // ── AUTOMATION ─────────────────────────────
      if (anyOf(t, ['automat', 'automation', 'workflow', 'n8n', 'make.com', 'zapier',
                    'automate', 'automated', 'trigger', 'pipeline']))
        return 'automation';
      // ── CHATBOT ────────────────────────────────
      if (anyOf(t, ['chatbot', 'chat bot', 'bot like you', 'build me a bot',
                    'bot for my website', 'website bot', 'ai assistant', 'virtual assistant',
                    'customer service bot', '24/7 support']))
        return 'chatbot';
      // ── AI (broad) ─────────────────────────────
      if (anyOf(t, ['ai', 'artificial intelligence', 'machine learning', 'llm',
                    'language model', 'generative ai', 'ai tools', 'ai solution',
                    'smart', 'intelligent', 'ai feature', 'ai services', 'openai',
                    'claude', 'gpt', 'ai engineering']))
        return 'ai';
      // ── SPECIFIC PRODUCTS ──────────────────────
      if (anyOf(t, ['cvply', 'cv builder', 'cv tool', 'career assistant', 'resume builder',
                    'cv ai', 'career tool', 'build my cv', 'improve my cv', 'cv app']))
        return 'cvply';
      if (anyOf(t, ['oroaje', 'print', 'print platform', 'ordering platform']))
        return 'oroaje';
      // ── PRODUCTS (general) ─────────────────────
      if (anyOf(t, ['product', 'products', 'what do you sell', 'what do you offer',
                    'what have you built', 'your tools', 'your platform', 'your app',
                    'your software', 'show me what you have']))
        return 'products';
      // ── PRICING ────────────────────────────────
      if (anyOf(t, ['price', 'pricing', 'cost', 'costs', 'how much', 'fee', 'fees',
                    'quote', 'quotation', 'rate', 'rates', 'charge', 'charges', 'invoice',
                    'package', 'packages', 'plan', 'affordable', 'expensive', 'budget',
                    'what do you charge', 'how much do you charge', 'payment']))
        return 'pricing';
      // ── SERVICES (general) ─────────────────────
      if (anyOf(t, ['service', 'services', 'what do you do', 'what can you do',
                    'what do you provide', 'your offerings', 'what you offer',
                    'capabilities', 'specialise', 'specialize', 'expertise',
                    'help me with', 'can you help']))
        return 'services';
      // ── SME / WHO YOU WORK WITH ────────────────
      if (anyOf(t, ['sme', 'small business', 'startup', 'start-up', 'entrepreneur',
                    'mid-size', 'midsize', 'medium business', 'who do you work with',
                    'type of client', 'do you work with', 'clients']))
        return 'sme';
      // ── ABOUT / COMPANY INFO ───────────────────
      if (anyOf(t, ['about', 'who are you', 'who is taore', 'what is taore',
                    'tell me about', 'your company', 'background', 'founded', 'history',
                    'team', 'your team', 'taore levanya', 'about you']))
        return 'about';
      // ── CATALYSIUM ──────────────────────────────
      if (anyOf(t, ['catalysium', 'parent company', 'holding', 'subsidiary', 'group']))
        return 'catalysium';
      // ── SOCIAL MEDIA ────────────────────────────
      if (anyOf(t, ['instagram', 'linkedin', 'twitter', 'x.com', 'facebook', 'tiktok',
                    'social media', 'follow you', 'social', 'socials', 'social accounts']))
        return 'social';
      // ── BLOG / CONTENT ──────────────────────────
      if (anyOf(t, ['blog', 'article', 'articles', 'post', 'read more',
                    'insights', 'newsletter', 'publication', 'write up']))
        return 'blog';
      // ── WEBSITE ─────────────────────────────────
      if (anyOf(t, ['website', 'site', 'web address', 'url', 'taorelevanya.ng',
                    'your website', 'online', 'web presence']))
        return 'website';

      return 'fallback';
    }

    /* ─────────────────────────────────────────────
       MESSAGE RENDERING
    ───────────────────────────────────────────── */
    function addMsg(text, who) {
      const div = document.createElement('div');
      div.className = 'msg ' + who;
      div.style.whiteSpace = 'pre-line';
      div.textContent = text;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    /* ─────────────────────────────────────────────
       BOT REPLY ORCHESTRATOR
    ───────────────────────────────────────────── */
    function botReply(userText) {
      const t = userText.toLowerCase().trim();
      const key = classify(t);
      const delay = key === 'fallback' ? 800 : 500;
      setTimeout(() => addMsg(pick(key), 'bot'), delay);
    }

    /* ─────────────────────────────────────────────
       EVENT LISTENERS
    ───────────────────────────────────────────── */
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

  /* ---------- Legal page: table-of-contents scroll-spy ---------- */
  const legalToc = document.querySelector('.legal-toc');
  if (legalToc) {
    const tocLinks = legalToc.querySelectorAll('a');
    const targets = Array.from(tocLinks)
      .map(a => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(Boolean);
    if ('IntersectionObserver' in window && targets.length) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tocLinks.forEach(a => a.classList.remove('active'));
            const match = legalToc.querySelector(`a[href="#${entry.target.id}"]`);
            if (match) match.classList.add('active');
          }
        });
      }, { rootMargin: '-110px 0px -70% 0px' });
      targets.forEach(t => spy.observe(t));
    }
  }

});
