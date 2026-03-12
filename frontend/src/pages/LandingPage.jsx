import { useEffect, useRef, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/MainFooter";


/* ── Intersection Observer hook for scroll reveals ── */
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
  {
    src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=90",
    alt: "Intérieur lumineux moderne",
  },
  {
    src: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920&q=90",
    alt: "Architecture lumineuse contemporaine",
  },
  {
    src: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1920&q=90",
    alt: "Espace de vie clair et aéré",
  },
  {
    src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1920&q=90",
    alt: "Villa moderne lumineuse",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  /* Hero slideshow auto-advance */
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  /* Navbar scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Custom cursor */
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useReveal();

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot" ref={cursorDotRef} />

      {/* ── NAVBAR ── */}
       <Navbar />

      {/* ── HERO ── */}
      <section className="hero" id="accueil">
        <div className="hero__bg">
          <div className="hero__overlay" />
          {HERO_SLIDES.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`hero__img hero__img--slide ${i === slideIndex ? "hero__img--active" : ""}`}
            />
          ))}
        </div>
        <div className="hero__dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === slideIndex ? "hero__dot--active" : ""}`}
              onClick={() => setSlideIndex(i)}
            />
          ))}
        </div>
        <div className="hero__eyebrow">Bureau d'études — Marrakech, Maroc</div>
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="line line--1">Ingénierie</span>
            <span className="line line--2">de précision</span>
          </h1>
          <p className="hero__sub">
            Conception architecturale &amp; génie civil — de l'esquisse à la livraison.
          </p>
          <div className="hero__actions">
            <button className="btn btn--light">Découvrir nos projets</button>
            <button className="btn btn--ghost">Notre approche →</button>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
        <div className="hero__counter">
          <span className="counter-num">12</span>
          <span className="counter-label">ans d'expertise</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-band">
        <div className="marquee-track">
          {["Architecture", "Génie Civil", "Design d'Intérieur", "Suivi de Chantier", "Plans BET", "Urbanisme"].map((t, i) => (
            <span key={i} className="marquee-item">{t} <em>—</em></span>
          ))}
          {["Architecture", "Génie Civil", "Design d'Intérieur", "Suivi de Chantier", "Plans BET", "Urbanisme"].map((t, i) => (
            <span key={i + 10} className="marquee-item">{t} <em>—</em></span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="about" id="apropos">
        <div className="about__left" data-reveal>
          <span className="section-label">01 — À propos</span>
          <h2 className="section-title">
            Nous bâtissons ce qui <em>dure</em>
          </h2>
          <p>
            Engytech est un bureau d'études pluridisciplinaire alliant rigueur technique et
            sensibilité architecturale. Chaque projet est une réponse unique à un contexte,
            un client, un territoire.
          </p>
          <a href="#services" className="text-link">Explorer nos services →</a>
        </div>
        <div className="about__right" data-reveal>
          <div className="about__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80"
              alt="Architecture intérieure lumineuse"
            />
            <div className="about__img-caption">Projet — Villa Moderne, 2024</div>
          </div>
        </div>
        <div className="about__stats" data-reveal>
          {[
            { n: "75+", l: "Projets livrés" },
            { n: "150+", l: "Clients satisfaits" },
            { n: "99%", l: "Taux de satisfaction" },
            { n: "12", l: "Années d'expertise" },
          ].map(({ n, l }) => (
            <div className="stat" key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="services">
        <div className="services__header" data-reveal>
          <span className="section-label">02 — Services</span>
          <h2 className="section-title">Ce que nous faisons</h2>
        </div>
        <div className="services__grid">
          {[
            {
              num: "01",
              title: "Étude Architecturale",
              desc: "Conception complète de A à Z : esquisses, avant-projet, dépôt de permis, plans d'exécution.",
              img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
            },
            {
              num: "02",
              title: "Plans Béton Armé",
              desc: "Calcul de structure, plans coffrage et ferraillage aux normes en vigueur.",
              img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
            },
            {
              num: "03",
              title: "Suivi de Chantier",
              desc: "Pilotage de l'exécution, coordination des corps d'état, réception des travaux.",
              img: "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=600&q=80",
            },
            {
              num: "04",
              title: "Design d'Intérieur",
              desc: "Aménagement, sélection des matériaux, rendus 3D photoréalistes.",
              img: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80",
            },
          ].map(({ num, title, desc, img }) => (
            <div className="service-card" key={num} data-reveal>
              <div className="service-card__img">
                <img src={img} alt={title} />
              </div>
              <div className="service-card__body">
                <span className="service-num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="service-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE SPLIT ── */}
      <section className="feature-split">
        <div className="feature-split__img" data-reveal>
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80"
            alt="Plan architectural lumineux"
          />
          <div className="feature-split__badge">
            <span>98%</span>
            <small>succès des permis déposés</small>
          </div>
        </div>
        <div className="feature-split__text" data-reveal>
          <span className="section-label">Notre approche</span>
          <h2 className="section-title">
            Expertise &amp; créativité, <em>réunies</em>
          </h2>
          <p>
            Notre équipe d'architectes et d'ingénieurs travaille en synergie pour produire
            des projets qui résistent à l'épreuve du temps — techniquement solides,
            esthétiquement cohérents.
          </p>
          <ul className="feature-list">
            {["Respect strict des délais", "Transparence totale sur les coûts", "Processus collaboratif et itératif"].map((f) => (
              <li key={f}><span className="check">✓</span>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="projects" id="projets">
        <div className="projects__header" data-reveal>
          <span className="section-label">03 — Réalisations</span>
          <h2 className="section-title">Nos projets phares</h2>
          <a href="#contact" className="text-link">Voir tout →</a>
        </div>
        <div className="projects__grid">
          {[
            { title: "Villa Moderne", tag: "Résidentiel", img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", size: "large" },
            { title: "Immeuble R+4", tag: "Collectif", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", size: "small" },
            { title: "Complexe Commercial", tag: "Tertiaire", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", size: "small" },
            { title: "Résidence Balnéaire", tag: "Luxe", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80", size: "medium" },
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

      {/* ── TESTIMONIAL ── */}
      <section className="testimonial">
        <div className="testimonial__inner" data-reveal>
          <span className="quote-mark">"</span>
          <blockquote>
            L'équipe a parfaitement compris notre vision. Le résultat dépasse toutes nos attentes
            — une architecture qui conjugue élégance et fonctionnalité.
          </blockquote>
          <cite>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Client"
              className="cite-avatar"
            />
            <div>
              <strong>Mehdi Benali</strong>
              <span>Promoteur Immobilier, Casablanca</span>
            </div>
          </cite>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta" id="devis">
        <div className="cta__bg" />
        <div className="cta__content" data-reveal>
          <span className="section-label section-label--light">Prêt à construire ?</span>
          <h2>Obtenez votre devis <em>instantanément</em></h2>
          <p>Décrivez votre projet en quelques clics et recevez une estimation en 24h.</p>
          <button className="btn btn--accent btn--lg">Calculer mon devis →</button>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="contact__info" data-reveal>
          <span className="section-label">04 — Contact</span>
          <h2 className="section-title">Parlons de votre projet</h2>
          <div className="contact__details">
            <a href="mailto:contact@engytech.com">contact@engytech.com</a>
            <a href="tel:+212600000000">+212 6 00 00 00 00</a>
            <span>Marrakech, Maroc</span>
          </div>
        </div>
        <form className="contact__form" data-reveal>
          <div className="field-group">
            <input type="text" placeholder="Votre nom" />
            <input type="email" placeholder="Email" />
          </div>
          <input type="text" placeholder="Sujet du projet" />
          <textarea rows="5" placeholder="Décrivez votre projet…" />
          <button type="submit" className="btn btn--dark btn--full">Envoyer le message →</button>
        </form>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </>
  );
}