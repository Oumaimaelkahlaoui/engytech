import { useEffect, useRef, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/MainFooter";
import FloatingMenu from "../components/Floatingmenu";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const HERO_SLIDES = [
  { src: "/img1.jpg", alt: "Intérieur lumineux moderne",           pos: "center 55%" },
  { src: "/img2.jpg", alt: "Architecture lumineuse contemporaine", pos: "center center" },
  { src: "/img3.jpg", alt: "Espace de vie clair et aéré",          pos: "center 40%" },
  { src: "/img4.jpg", alt: "Villa moderne lumineuse",              pos: "center center" },
];

const TESTIMONIALS = [
  {
    quote: "L'équipe a parfaitement compris notre vision. Le résultat dépasse toutes nos attentes — une ingénierie qui conjugue rigueur technique et innovation.",
    name: "Mehdi Benali",
    role: "Promoteur Immobilier, Casablanca",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "Un bureau d'études sérieux et réactif. Les délais ont été respectés à la lettre et la qualité des livrables est irréprochable. Je recommande sans hésiter.",
    name: "Salma Kettani",
    role: "Architecte, Rabat",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "ENGYTECH a su transformer un projet complexe en réussite. Leur expertise en structure et leur maîtrise du BIM ont fait toute la différence.",
    name: "Youssef Chraibi",
    role: "Maître d'Ouvrage, Marrakech",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[idx];

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        .tc-wrap { position:relative; }
        .tc-slide { animation:tc-fade .45s cubic-bezier(.16,1,.3,1) both; }
        @keyframes tc-fade {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .tc-nav { display:flex; align-items:center; justify-content:center; gap:1rem; margin-top:2.5rem; }
        .tc-btn {
          width:42px; height:42px; border-radius:50%;
          border:1.5px solid #c8d6de; background:#fff;
          display:flex; align-items:center; justify-content:center;
          font-size:1rem; cursor:pointer; color:#7a909e;
          transition:border-color .25s, color .25s, transform .25s;
        }
        .tc-btn:hover { border-color:#1B8A8F; color:#1B8A8F; transform:scale(1.08); }
        .tc-dots { display:flex; gap:7px; align-items:center; }
        .tc-dot {
          height:6px; border-radius:3px; width:6px;
          background:#c8d6de; border:none; padding:0; cursor:pointer;
          transition:background .3s, width .35s cubic-bezier(.16,1,.3,1);
        }
        .tc-dot.active { background:#1B8A8F; width:22px; }
      `}</style>
      <div className="tc-wrap">
        <div className="tc-slide" key={idx}>
          <span className="quote-mark">"</span>
          <blockquote>{t.quote}</blockquote>
          <cite>
            <img src={t.avatar} alt={t.name} className="cite-avatar" />
            <div><strong>{t.name}</strong><span>{t.role}</span></div>
          </cite>
        </div>
        <div className="tc-nav">
          <button className="tc-btn" onClick={prev} aria-label="Précédent">←</button>
          <div className="tc-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`tc-dot${i === idx ? " active" : ""}`} onClick={() => setIdx(i)} aria-label={`Témoignage ${i + 1}`} />
            ))}
          </div>
          <button className="tc-btn" onClick={next} aria-label="Suivant">→</button>
        </div>
      </div>
    </>
  );
}

const css = `
  .lp-services {
    background: var(--ink-2);
    padding: var(--space-3xl) var(--side-padding);
  }
  .lp-services__header {
    max-width: var(--container); margin-inline: auto;
    display: flex; align-items: flex-end; justify-content: space-between;
    flex-wrap: wrap; gap: var(--space-md);
    margin-bottom: var(--space-2xl);
  }
  .lp-services__header .section-title { color: #fff; }
  .lp-services__header .section-title em { color: #2ab0b6; }
  .lp-svc-grid {
    max-width: var(--container); margin-inline: auto;
    display: grid; grid-template-columns: repeat(3,1fr); gap: 2px;
  }
  .lp-svc-card {
    background: var(--ink-3);
    padding: clamp(1.5rem,3vw,2.5rem) clamp(1.25rem,2.5vw,2rem);
    display: flex; flex-direction: column; gap: 1rem;
    border-radius: 2px; position: relative; overflow: hidden;
    transition: transform .4s cubic-bezier(.16,1,.3,1);
  }
  .lp-svc-card::after {
    content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
    background: linear-gradient(90deg,#1B8A8F,#7DC242);
    transform: scaleX(0); transform-origin: left;
    transition: transform .4s cubic-bezier(.16,1,.3,1);
  }
  .lp-svc-card:hover { transform: translateY(-6px); }
  .lp-svc-card:hover::after { transform: scaleX(1); }
  .lp-svc-card__num { font-size:.6rem; letter-spacing:.2em; color:#7DC242; font-weight:600; }
  .lp-svc-card h3 {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(1rem,1.8vw,1.25rem); font-weight:500; color:#fff; line-height:1.2;
  }
  .lp-svc-card p { font-size:.8125rem; font-weight:300; color:rgba(255,255,255,.42); line-height:1.75; flex:1; }
  .lp-svc-card__arrow { font-size:1rem; color:#1B8A8F; align-self:flex-end; transition:transform .3s; }
  .lp-svc-card:hover .lp-svc-card__arrow { transform:translateX(5px); }

  .lp-about-teaser {
    display: grid; grid-template-columns:1fr 1fr;
    gap: var(--space-2xl);
    max-width: var(--container); margin-inline: auto;
    padding: var(--space-3xl) var(--side-padding);
    align-items: center;
  }
  .lp-about-teaser__img { position:relative; aspect-ratio:4/5; border-radius: var(--r-md); overflow:hidden; }
  .lp-about-teaser__img img { width:100%; height:100%; object-fit:cover; transition: transform .8s cubic-bezier(.16,1,.3,1); }
  .lp-about-teaser__img:hover img { transform:scale(1.04); }
  .lp-about-teaser__badge {
    position:absolute; bottom:clamp(1rem,3vw,1.75rem); right:clamp(-2rem,-3vw,-1rem);
    background:#fff; border-radius:var(--r-md);
    padding:clamp(.875rem,1.5vw,1.25rem) clamp(1rem,1.5vw,1.5rem);
    box-shadow:0 8px 40px rgba(27,138,143,.2);
    text-align:center; min-width:120px; z-index:2; border-left:3px solid #1B8A8F;
  }
  .lp-about-teaser__badge span {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(1.5rem,3vw,2.25rem); font-weight:700; color:#1B8A8F; display:block; line-height:1;
  }
  .lp-about-teaser__badge small {
    font-size:.6rem; letter-spacing:.08em; text-transform:uppercase;
    color:#7a909e; margin-top:4px; display:block; max-width:12ch; line-height:1.4;
  }
  .lp-about-teaser__text .section-title { margin:var(--space-sm) 0 var(--space-md); }
  .lp-about-teaser__text > p {
    font-size:.9375rem; font-weight:300; color:#7a909e;
    line-height:1.9; margin-bottom:var(--space-lg); max-width:44ch;
  }
  .lp-about-teaser__stats {
    display:grid; grid-template-columns:repeat(2,1fr); gap:1px;
    background:var(--mist); border-radius:var(--r-md); overflow:hidden; margin-bottom:var(--space-xl);
  }
  .lp-about-stat {
    background:#fff; padding:clamp(1rem,2vw,1.5rem) clamp(.875rem,1.5vw,1.25rem);
    display:flex; flex-direction:column; gap:4px; transition:background .25s;
  }
  .lp-about-stat:hover { background:var(--smoke); }
  .lp-about-stat strong {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(1.5rem,3vw,2.25rem); font-weight:500; line-height:1;
    background:linear-gradient(90deg,#1B8A8F,#7DC242);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .lp-about-stat span { font-size:.6rem; letter-spacing:.1em; text-transform:uppercase; color:#7a909e; }

  .lp-contact-teaser { background:#fff; padding: var(--space-3xl) var(--side-padding); }
  .lp-contact-teaser__inner {
    max-width:var(--container); margin-inline:auto;
    display:grid; grid-template-columns:1fr 1fr;
    gap:clamp(3rem,7vw,7rem); align-items:center;
  }
  .lp-contact-teaser__text .section-title { margin:var(--space-sm) 0 var(--space-md); }
  .lp-contact-teaser__text > p {
    font-size:.9375rem; font-weight:300; color:#7a909e;
    line-height:1.9; margin-bottom:var(--space-xl); max-width:44ch;
  }
  .lp-contact-teaser__actions { display:flex; gap:1rem; flex-wrap:wrap; }
  .lp-contact-infos { display:flex; flex-direction:column; gap:1.25rem; }
  .lp-contact-item {
    display:flex; align-items:center; gap:1rem;
    padding:1.25rem 1.5rem; background:var(--smoke);
    border-radius:10px; border:1px solid var(--cloud);
    transition:border-color .25s, box-shadow .25s, transform .3s cubic-bezier(.16,1,.3,1);
    text-decoration:none;
  }
  .lp-contact-item:hover { border-color:#1B8A8F; box-shadow:0 8px 32px rgba(27,138,143,.1); transform:translateX(6px); }
  .lp-contact-item__icon {
    width:44px; height:44px; min-width:44px; border-radius:10px;
    background:linear-gradient(135deg,rgba(43,57,144,.08),rgba(27,138,143,.1));
    display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .3s;
  }
  .lp-contact-item:hover .lp-contact-item__icon { background:linear-gradient(135deg,#2B3990,#1B8A8F); }
  .lp-contact-item__icon svg { width:20px; height:20px; transition:stroke .3s; }
  .lp-contact-item:hover .lp-contact-item__icon svg { stroke:#fff; }
  .lp-contact-item__text strong { display:block; font-size:.875rem; font-weight:500; color:#0d1117; }
  .lp-contact-item__text span  { display:block; font-size:.8rem; font-weight:300; color:#7a909e; }

  @media (max-width:1024px) {
    .lp-svc-grid { grid-template-columns:repeat(2,1fr); }
    .lp-about-teaser { grid-template-columns:1fr; gap:var(--space-xl); }
    .lp-contact-teaser__inner { grid-template-columns:1fr; gap:var(--space-xl); }
  }
  @media (max-width:640px) {
    .lp-svc-grid { grid-template-columns:1fr; }
    .lp-about-teaser__badge { right:.5rem; bottom:.5rem; }
  }
`;

const services = [
  { num:"01", title:"Étude de structure",           desc:"Béton armé ou métallique — analyse et calculs de stabilité des structures." },
  { num:"02", title:"VRD & Aménagement",             desc:"Assainissement, voirie et réseaux — conception et planification complète." },
  { num:"03", title:"OPC – Pilotage & Coordination", desc:"Gestion des phases chantier et coordination des corps d'état." },
  { num:"04", title:"Efficacité Énergétique",        desc:"Optimisation des bâtiments et conseils sur la performance thermique." },
  { num:"05", title:"Modélisation BIM",              desc:"Maquettes numériques 3D et coordination pluridisciplinaire." },
  { num:"06", title:"Éco-conception & HQE",          desc:"HQE, matériaux biosourcés et bilan carbone dès la phase conception." },
];

export default function LandingPage() {
  const navigate     = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const cursorRef    = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setSlideIndex((i) => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current)    cursorRef.current.style.transform = `translate(${e.clientX-20}px,${e.clientY-20}px)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${e.clientX-4}px,${e.clientY-4}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useReveal();

  return (
    <>
      <style>{css}</style>
      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot"  ref={cursorDotRef} />
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="hero" id="accueil">
        <div className="hero__bg">
          <div className="hero__overlay" />
          {HERO_SLIDES.map((slide, i) => (
            <img
              key={slide.src} src={slide.src} alt={slide.alt}
              style={{ objectPosition: slide.pos }}
              className={`hero__img hero__img--slide ${i === slideIndex ? "hero__img--active" : ""}`}
            />
          ))}
        </div>
        <div className="hero__dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`hero__dot ${i === slideIndex ? "hero__dot--active" : ""}`} onClick={() => setSlideIndex(i)} />
          ))}
        </div>
        <div className="hero__eyebrow">Bureau d'études — Marrakech, Maroc</div>
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="line line--1">Ingénierie</span>
            <span className="line line--2">de précision</span>
          </h1>
          <p className="hero__sub">Conception architecturale &amp; génie civil — de l'esquisse à la livraison.</p>
          <div className="hero__actions">
            <button className="btn btn--light" onClick={() => navigate("/services")}>Découvrir nos services</button>
            <button className="btn btn--ghost"  onClick={() => navigate("/about")}>Notre approche →</button>
          </div>
        </div>
        <div className="hero__scroll-hint"><span>Scroll</span><div className="scroll-line" /></div>
        <div className="hero__counter"><span className="counter-num">12</span><span className="counter-label">ans d'expertise</span></div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="marquee-band">
        <div className="marquee-track">
          {["Étude Structure","VRD","Pilotage Chantier","BIM","Efficacité Énergétique","HQE","Note de Calculs","Expertise Diagnostic"].map((t, i) => (
            <span key={i} className="marquee-item">{t} <em>—</em></span>
          ))}
          {["Étude Structure","VRD","Pilotage Chantier","BIM","Efficacité Énergétique","HQE","Note de Calculs","Expertise Diagnostic"].map((t, i) => (
            <span key={i+10} className="marquee-item">{t} <em>—</em></span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT TEASER ══ */}
      <section className="lp-about-teaser" id="apropos">
        <div className="lp-about-teaser__img" data-reveal>
          <img src="/img5.jpg" alt="ENGYTECH bureau d'études" />
          <div className="lp-about-teaser__badge"><span>98%</span><small>taux de satisfaction client</small></div>
        </div>
        <div className="lp-about-teaser__text" data-reveal>
          <span className="section-label">01 — À propos</span>
          <h2 className="section-title">Nous bâtissons ce qui <em>dure</em></h2>
          <p>ENGYTECH est un bureau d'ingénierie pluridisciplinaire alliant rigueur technique et innovation. Nous accompagnons maîtres d'ouvrage, architectes et promoteurs sur des projets de toute envergure.</p>
          <div className="lp-about-teaser__stats">
            {[{n:"280+",l:"Projets livrés"},{n:"12+",l:"Années d'expertise"},{n:"10+",l:"Types de prestations"},{n:"98%",l:"Clients satisfaits"}].map(({n,l}) => (
              <div className="lp-about-stat" key={l}><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
          <button className="btn btn--accent" onClick={() => navigate("/a-propos")}>En savoir plus →</button>
        </div>
      </section>

      {/* ══ SERVICES PREVIEW ══ */}
      <section className="lp-services" id="services">
        <div className="lp-services__header" data-reveal>
          <div>
            <span className="section-label section-label--light">02 — Nos services</span>
            <h2 className="section-title">Ce que nous <em>proposons</em></h2>
          </div>
          <button className="btn btn--ghost" onClick={() => navigate("/devis")}>Voir les 10 prestations →</button>
        </div>
        <div className="lp-svc-grid">
          {services.map(({ num, title, desc }) => (
            <div className="lp-svc-card" key={num} data-reveal>
              <span className="lp-svc-card__num">{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="lp-svc-card__arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section className="projects" id="projets">
        <div className="projects__header" data-reveal>
          <span className="section-label">03 — Réalisations</span>
          <h2 className="section-title">Nos projets phares</h2>
          <button className="btn btn--light" onClick={() => navigate("/projets")}>Voir tous les projets →</button>
        </div>
        <div className="projects__grid">
          {[
            { title:"Villa Moderne",       tag:"Résidentiel", img:"/img6.jpg",  size:"large"  },
            { title:"Immeuble",            tag:"Collectif",   img:"/img7.jpg",  size:"small"  },
            { title:"Complexe Commercial", tag:"Tertiaire",   img:"/img8.jpg",  size:"small"  },
            { title:"Résidence Balnéaire", tag:"Luxe",        img:"/img10.jpg", size:"medium" },
          ].map(({ title, tag, img, size }) => (
            <div className={`project-card project-card--${size}`} key={title} data-reveal>
              <img src={img} alt={title} />
              <div className="project-card__overlay">
                <span className="project-tag">{tag}</span>
                <h3>{title}</h3>
                <span className="project-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="testimonial">
        <div className="testimonial__inner" data-reveal>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ══ CTA DEVIS ══ */}
      <section className="cta" id="devis">
        <div className="cta__bg" />
        <div className="cta__content" data-reveal>
          <span className="section-label section-label--light">Prêt à construire ?</span>
          <h2>Obtenez votre devis <em>instantanément</em></h2>
          <p>Choisissez parmi nos 10 prestations et recevez une estimation sous 24h.</p>
          <button className="btn btn--accent btn--lg" onClick={() => navigate("/devis")}>Voir nos prestations →</button>
        </div>
      </section>

      {/* ══ CONTACT TEASER ══ */}
      <section className="lp-contact-teaser" id="contact">
        <div className="lp-contact-teaser__inner">
          <div className="lp-contact-teaser__text" data-reveal>
            <span className="section-label">04 — Contact</span>
            <h2 className="section-title">Parlons de votre <em>projet</em></h2>
            <p>Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans la réalisation de vos projets d'ingénierie.</p>
            <div className="lp-contact-teaser__actions">
              <button className="btn btn--accent"  onClick={() => navigate("/contact")}>Nous contacter →</button>
              <button className="btn btn--primary" onClick={() => navigate("/devis")}>Demander un devis</button>
            </div>
          </div>
          <div className="lp-contact-infos" data-reveal>
            {[
              { icon:<svg viewBox="0 0 24 24" fill="none" stroke="#1B8A8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/></svg>, label:"Téléphone", value:"(+212) 6 62 25 78 79", href:"tel:+212662257879" },
              { icon:<svg viewBox="0 0 24 24" fill="none" stroke="#1B8A8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:"Email", value:"contact@archengytech.ma", href:"mailto:contact@archengytech.ma" },
              { icon:<svg viewBox="0 0 24 24" fill="none" stroke="#1B8A8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label:"Adresse", value:"Marrakech, Maroc", href:"#" },
            ].map(({ icon, label, value, href }) => (
              <a href={href} className="lp-contact-item" key={label}>
                <div className="lp-contact-item__icon">{icon}</div>
                <div className="lp-contact-item__text"><strong>{label}</strong><span>{value}</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FLOATING MENU ══ */}
      <FloatingMenu />

      <Footer />
    </>
  );
}