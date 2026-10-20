'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from './Icons';
import { languages, translations } from './translations';

/* ---- Contact details: change these to your real ones ---- */
const CONTACTS = {
  whatsapp: { label: '+45 12 34 56 78', href: 'https://wa.me/4512345678' },
  telegram: { label: '@anna_dansk', href: 'https://t.me/anna_dansk' },
  email: { label: 'anna.dansk@mail.com', href: 'mailto:anna.dansk@mail.com' },
  instagram: { label: '@dansk_med_anna', href: 'https://instagram.com/dansk_med_anna' },
};

const STORAGE_KEY = 'dansk-lang';

/* Fades a block in once, when it scrolls into view */
function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add('in');
      return;
    }
    el.classList.add('armed');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function Leaf() {
  return (
    <svg className="leaf" viewBox="0 0 120 220" fill="none" aria-hidden="true">
      <path d="M62 218C58 160 64 90 96 8" stroke="#6f7f66" strokeWidth="1.5" />
      <g fill="#8b9a83" fillOpacity=".85">
        <ellipse cx="82" cy="48" rx="9" ry="30" transform="rotate(18 82 48)" />
        <ellipse cx="46" cy="76" rx="9" ry="32" transform="rotate(-34 46 76)" />
        <ellipse cx="84" cy="98" rx="10" ry="34" transform="rotate(26 84 98)" />
        <ellipse cx="44" cy="128" rx="10" ry="34" transform="rotate(-36 44 128)" />
        <ellipse cx="80" cy="150" rx="10" ry="32" transform="rotate(28 80 150)" />
        <ellipse cx="46" cy="178" rx="9" ry="28" transform="rotate(-32 46 178)" />
      </g>
    </svg>
  );
}

export default function Landing() {
  const [lang, setLang] = useState('en'); // language currently rendered
  const [active, setActive] = useState('en'); // language highlighted in the switcher
  const [fading, setFading] = useState(false);

  // restore a previously chosen language (English is always the default)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) {
        setLang(saved);
        setActive(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const switchLang = (next) => {
    if (next === active) return;
    setActive(next);
    setFading(true);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setTimeout(() => {
      setLang(next);
      setFading(false);
    }, 180);
  };

  const t = translations[lang];

  return (
    <div className={`page${fading ? ' fading' : ''}`}>
      {/* ---------- Header ---------- */}
      <header className="header wrap">
        <a href="#top" className="brand" aria-label="Dansk">
          <span className="logo">DANSK</span>
          <span className="tagline">Sprog · Muligheder · Fremtid</span>
        </a>

        <nav className="nav" aria-label="Main">
          <a href="#about">{t.nav.about}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#why">{t.nav.reviews}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>

        <div className="header-right">
          <div className="lang" role="group" aria-label="Language">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                className={active === l.code ? 'on' : ''}
                aria-pressed={active === l.code}
                title={l.name}
                onClick={() => switchLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a href="#contact" className="btn btn-small">
            {t.write}
          </a>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow rise" style={{ '--i': 0 }}>{t.hero.eyebrow}</p>
            <h1 className="rise" style={{ '--i': 1 }}>{t.hero.title}</h1>
            <p className="lead rise" style={{ '--i': 2 }}>{t.hero.text}</p>
            <div className="hero-actions rise" style={{ '--i': 3 }}>
              <a href="#contact" className="btn">
                {t.hero.cta}
                <Icon name="arrow" size={18} />
              </a>
              <p className="hero-note">{t.hero.note}</p>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-frame">
              <Image src="/images/hero.jpg" alt="Nyhavn, Copenhagen" width={974} height={744} priority />
            </div>
            <p className="hero-quote" lang="da">
              <span>Lær dansk</span>
              <span>– åbne nye døre</span>
            </p>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="about">
          <Reveal className="portrait">
            <Image src="/images/anna.jpg" alt="Anna" width={628} height={604} />
          </Reveal>

          <Reveal className="about-body" delay={100}>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2>{t.about.title}</h2>
            <p className="role">{t.about.role}</p>
            <p className="about-text">{t.about.text}</p>
            <ul className="facts">
              {['cap', 'pin', 'star'].map((icon, i) => (
                <li key={icon}>
                  <Icon name={icon} size={24} />
                  <span>{t.about.facts[i]}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about-quote" delay={200}>
            <blockquote>{t.about.quote}</blockquote>
            <p className="signature">{t.about.signature}</p>
          </Reveal>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="services">
          <div className="section-head">
            <Reveal>
              <p className="eyebrow">{t.services.eyebrow}</p>
              <h2>{t.services.title}</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="section-note">{t.services.note}</p>
            </Reveal>
          </div>

          <ul className="cards">
            {t.services.items.map((item, i) => (
              <Reveal as="li" key={i} delay={i * 80}>
                <a href="#contact" className="card">
                  <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Icon name="arrow" size={20} />
                </a>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---------- Why me ---------- */}
        <section id="why" className="why">
          <div className="why-media">
            <Image src="/images/notebook.jpg" alt="" width={626} height={412} />
          </div>
          <div className="why-panel">
            <Reveal>
              <p className="eyebrow">{t.why.eyebrow}</p>
              <h2>{t.why.title}</h2>
            </Reveal>
            <ul className="features">
              {['check', 'monitor', 'book', 'heart'].map((icon, i) => (
                <Reveal as="li" key={icon} delay={i * 90}>
                  <Icon name={icon} size={24} />
                  <h3>{t.why.items[i].title}</h3>
                  <p>{t.why.items[i].text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="contact">
          <Reveal className="contact-intro">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.text}</p>
          </Reveal>

          <Reveal className="channels" delay={120}>
            <a href={CONTACTS.whatsapp.href} target="_blank" rel="noopener noreferrer" className="channel">
              <Icon name="whatsapp" size={24} />
              <span><small>WhatsApp</small>{CONTACTS.whatsapp.label}</span>
            </a>
            <a href={CONTACTS.email.href} className="channel">
              <Icon name="mail" size={24} />
              <span><small>E-mail</small>{CONTACTS.email.label}</span>
            </a>
            <a href={CONTACTS.telegram.href} target="_blank" rel="noopener noreferrer" className="channel">
              <Icon name="send" size={24} />
              <span><small>Telegram</small>{CONTACTS.telegram.label}</span>
            </a>
            <a href={CONTACTS.instagram.href} target="_blank" rel="noopener noreferrer" className="channel">
              <Icon name="instagram" size={24} />
              <span><small>Instagram</small>{CONTACTS.instagram.label}</span>
            </a>
          </Reveal>

          <Reveal className="contact-cta" delay={200}>
            <a href={CONTACTS.email.href} className="btn">
              {t.write}
              <Icon name="arrow" size={18} />
            </a>
          </Reveal>

          <Leaf />
        </section>
      </main>

      <footer className="footer wrap">
        <span className="logo">DANSK</span>
        <span className="footer-line" />
        <span className="tagline">Sprog · Muligheder · Fremtid</span>
      </footer>
    </div>
  );
}
