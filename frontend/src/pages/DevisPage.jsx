import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/MainFooter";
import FloatingMenu from "../components/Floatingmenu";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const DEVIS_ITEMS = [
  {
    title: "Étude de structure",
    desc: "Béton armé ou métallique — analyse et calculs de stabilité des structures.",
    link: "/devis/etude-structure",
    image: "/imge2.jpg",
    accent: "#1b2f6e",
    tag: "Structure",
  },
  {
    title: "Étude VRD",
    desc: "Assainissement, voirie et réseaux — conception et planification complète.",
    link: "/devis/etude-vrd",
    image: "/imge3.jpg",
    accent: "#2a7fa5",
    tag: "Réseaux",
  },
  {
    title: "OPC – Pilotage & Coordination",
    desc: "Gestion des phases chantier et coordination des corps d'état.",
    link: "/devis/opc",
    image: "/imge4.jpg",
    accent: "#1d5c7a",
    tag: "Gestion",
  },
  {
    title: "Notice sécurité incendie",
    desc: "Évaluation des risques, plans d'évacuation et conformité SSI.",
    link: "/devis/notice-securite-incendie",
    image: "/imge5.jpg",
    accent: "#c0392b",
    tag: "Sécurité",
  },
  {
    title: "Expertise & diagnostic",
    desc: "Diagnostic des ouvrages, pathologies et rapport technique détaillé.",
    link: "/devis/expertise-technique",
    image: "/imge6.jpg",
    accent: "#1b2f6e",
    tag: "Expertise",
  },
  {
    title: "Suivi & contrôle technique",
    desc: "Contrôle qualité et suivi de chantier pour conformité et sécurité.",
    link: "/devis/suivi-controle-technique",
    image: "/imge7.jpg",
    accent: "#2a7fa5",
    tag: "Contrôle",
  },
  {
    title: "Efficacité Énergétique",
    desc: "Optimisation énergétique des bâtiments et conseils sur la performance.",
    link: "/devis/efficacite-energetique",
    image: "/imge8.jpg",
    accent: "#3ab87a",
    tag: "Énergie",
  },
  {
    title: "Note de calculs",
    desc: "Calculs techniques détaillés pour la structure et les installations.",
    link: "/devis/note-calculs",
    image: "/imge9.jpg",
    accent: "#1d5c7a",
    tag: "Calcul",
  },
  {
    title: "CPS — Métré & estimation",
    desc: "Cahier des Prescriptions Spéciales et estimation précise des coûts.",
    link: "/devis/cps-metres-estimation",
    image: "/imge10.jpg",
    accent: "#1b2f6e",
    tag: "Estimation",
  },
  {
    title: "Consultation technique",
    desc: "Premier avis gratuit et orientation personnalisée pour votre projet.",
    link: "/devis/consultation-technique",
    image: "/imge11.jpg",
    accent: "#3ab87a",
    tag: "Gratuit",
    free: true,
  },
];

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const S = {
  page: {
    background: "#f4f6fb",
    minHeight: "100vh",
    fontFamily: "'Outfit', system-ui, sans-serif",
  },

  /* ══ HERO ══
     Overlay très lumineux en haut → navbar navy visible
     Sombre uniquement en bas pour le texte */
  hero: {
    position: "relative",
    height: "72svh",
    minHeight: 540,
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
  },
  heroImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    animation: "heroZoom 18s ease-out forwards",
    zIndex: 0,
    /* Image lumineuse : intérieur moderne clair */
  },
  /* Overlay en 3 couches :
     1. Zone TOP totalement transparente → la navbar navy ressort parfaitement
     2. Zone GAUCHE sombre pour le texte
     3. Zone BOTTOM sombre pour le texte */
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: [
      /* Côté gauche — assombrir pour le texte */
      "linear-gradient(to right, rgba(61, 61, 61, 0.88) 0%, rgba(14,28,58,0.35) 50%, rgba(14,28,58,0.0) 100%)",
      /* Bas — assombrir pour le texte */
      "linear-gradient(to top, rgba(14,28,58,0.80) 0%, rgba(14,28,58,0.2) 30%, transparent 55%)",
      /* TOP — très léger vignette pour bien voir la navbar, mais PAS trop sombre */
      "linear-gradient(to bottom, rgba(14,28,58,0.30) 0%, transparent 25%)",
    ].join(", "),
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "0 clamp(1.5rem,6vw,5rem) clamp(3rem,6vh,5rem)",
    gap: 18,
  },
  heroEyebrow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: "0.625rem",
    fontWeight: 500,
    letterSpacing: "0.26em",
    textTransform: "uppercase",
    color: "#4ecda4",
    margin: 0,
  },
  heroLine: {
    width: 36,
    height: 1,
    background: "#4ecda4",
    display: "inline-block",
    flexShrink: 0,
  },
  heroH1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(3.5rem,9vw,7.5rem)",
    fontWeight: 400,
    lineHeight: 0.92,
    letterSpacing: "-0.03em",
    color: "#fff",
    margin: 0,
    textShadow: "0 2px 24px rgba(14,28,58,0.3)",
  },
  heroItalic: {
    display: "block",
    fontStyle: "italic",
    color: "#4ecda4",
  },
  heroSub: {
    fontSize: "clamp(0.875rem,1.5vw,1rem)",
    fontWeight: 300,
    color: "rgba(255,255,255,0.65)",
    maxWidth: "44ch",
    lineHeight: 1.75,
    margin: 0,
  },
  heroPills: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 4,
  },
  pill: {
    fontSize: "0.5625rem",
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: 100,
    padding: "5px 14px",
    backdropFilter: "blur(6px)",
    background: "rgba(14,28,58,0.15)",
  },

  /* ══ INTRO STRIP ══ */
  strip: {
    background: "#202b3f",
    padding: "clamp(1.25rem,2.5vw,2rem) clamp(1.5rem,6vw,5rem)",
  },
  stripInner: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 20,
  },
  stripLeft: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  stripNum: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(2.5rem,4.5vw,3.75rem)",
    fontWeight: 300,
    background: "linear-gradient(90deg,#2a7fa5,#4ecda4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1,
    flexShrink: 0,
  },
  stripH2: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(0.9375rem,1.8vw,1.25rem)",
    fontWeight: 400,
    color: "#fff",
    margin: "0 0 3px",
  },
  stripP: {
    fontSize: "0.75rem",
    fontWeight: 300,
    color: "rgba(255,255,255,0.38)",
    margin: 0,
    lineHeight: 1.6,
  },
  stripCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    padding: "10px 22px",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 4,
    fontSize: "0.625rem",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },

  /* ══ SECTION HEADER ══ */
  secHeader: {
    maxWidth: 1280,
    margin: "clamp(2.5rem,5vw,4rem) auto clamp(1.5rem,2.5vw,2.25rem)",
    padding: "0 clamp(1.5rem,6vw,5rem)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  secLabel: {
    display: "block",
    fontSize: "0.625rem",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#2a7fa5",
    marginBottom: 8,
  },
  secH3: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(1.5rem,2.8vw,2.5rem)",
    fontWeight: 400,
    color: "#0e1c3a",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    margin: 0,
  },
  secBadge: {
    fontSize: "0.6875rem",
    color: "#7a8faa",
    letterSpacing: "0.06em",
    border: "1px solid #c9d4e8",
    borderRadius: 100,
    padding: "5px 16px",
  },

  /* ══ GRID — 5 colonnes, cards moyennes ══ */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 18,
    maxWidth: 1511,
    margin: "0 auto clamp(3rem,6vw,6rem)",
    padding: "0 clamp(1.5rem,6vw,5rem)",
  },

  /* ══ CARD ══ */
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    textDecoration: "none",
    color: "#0e1c3a",
    boxShadow: "0 2px 8px rgba(27,47,110,0.06), 0 6px 24px rgba(27,47,110,0.08)",
    transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1), box-shadow 0.32s",
  },

  /* Image — aspect ratio plus grand = cards plus hautes */
  imgWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "4/3",   /* ← plus grand qu'avant (était 3/2) */
    overflow: "hidden",
    flexShrink: 0,
    background: "#dde4f0",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
  },
  imgGrad: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent 30%, rgba(14,28,58,0.6) 100%)",
  },
  tagBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    fontSize: "0.5625rem",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#fff",
    background: "rgba(14,28,58,0.58)",
    padding: "4px 11px",
    borderRadius: 100,
    backdropFilter: "blur(6px)",
  },
  numBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: "0.5625rem",
    fontWeight: 500,
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.9)",
    background: "rgba(14,28,58,0.42)",
    padding: "3px 9px",
    borderRadius: 100,
    backdropFilter: "blur(4px)",
  },
  freeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: "0.5rem",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#1cce2b",
    background: "rgba(66, 219, 125, 0.18)",
    border: "1px solid rgba(58,184,122,0.45)",
    padding: "3px 9px",
    borderRadius: 100,
    zIndex: 3,
  },

  /* Card body — padding généreux */
  body: {
    flex: 1,
    padding: "16px 18px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(1.09rem,1.15vw,1rem)",
    fontWeight: 800,
    lineHeight: 1.28,
    letterSpacing: "-0.01em",
    margin: 0,
    transition: "color 0.25s",
  },
  desc: {
    fontSize: "0.89rem",
    fontWeight: 300,
    color: "#7a8faa",
    lineHeight: 1.65,
    margin: 0,
  },

  /* Card footer */
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "11px 18px 15px",
    borderTop: "1px solid #edf1f8",
    marginTop: "auto",
  },

  /* ══ BANNER ══ */
  banner: {
    background: "#e8edf5",
    padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)",
    display: "flex",
    justifyContent: "center",
  },
  bannerInner: {
    maxWidth: 1280,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    gap: 28,
    padding: "clamp(1.5rem,3vw,2.25rem) clamp(1.5rem,3vw,2.5rem)",
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 4px 28px rgba(27,47,110,0.08)",
    borderLeft: "4px solid #2a7fa5",
  },
  bannerH3: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(1.125rem,2vw,1.625rem)",
    fontWeight: 400,
    color: "#0e1c3a",
    lineHeight: 1.2,
    margin: "0 0 7px",
  },
  bannerP: {
    fontSize: "0.8125rem",
    fontWeight: 300,
    color: "#7a8faa",
    maxWidth: "50ch",
    lineHeight: 1.7,
    margin: 0,
  },
  bannerBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "13px 28px",
    background: "linear-gradient(90deg,#1b2f6e 0%,#2a7fa5 55%,#3ab87a 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    textDecoration: "none",
    flexShrink: 0,
    boxShadow: "0 4px 18px rgba(42,127,165,0.35)",
  },
};

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function DevisPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered]   = useState(null);
  const cursorRef    = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e) => {
      cursorRef.current?.style.setProperty("transform", `translate(${e.clientX - 20}px,${e.clientY - 20}px)`);
      cursorDotRef.current?.style.setProperty("transform", `translate(${e.clientX - 4}px,${e.clientY - 4}px)`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useReveal();

  /* Keyframes + breakpoints responsive */
  useEffect(() => {
    const id = "dp-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @keyframes heroZoom {
        from { transform: scale(1.06); }
        to   { transform: scale(1.00); }
      }
      /* 5 colonnes jusqu'à 1024 */
      @media (max-width: 1100px) {
        .dp-grid { grid-template-columns: repeat(3,1fr) !important; gap: 16px !important; }
      }
      @media (max-width: 700px) {
        .dp-grid { grid-template-columns: repeat(2,1fr) !important; gap: 14px !important; }
        .dp-banner-inner { grid-template-columns: 1fr !important; }
        .dp-banner-btn   { width: 100% !important; justify-content: center !important; }
        .dp-strip-inner  { flex-direction: column !important; align-items: flex-start !important; }
      }
      @media (max-width: 420px) {
        .dp-grid { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(el);
    return () => document.getElementById(id)?.remove();
  }, []);

  return (
    <div style={S.page}>
      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot"  ref={cursorDotRef} />

      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ══ HERO ══ */}
      <section style={S.hero}>
        {/* Image lumineuse — intérieur clair, moderne */}
        <img
          src="/imge1.jpg"
          alt="Bureau d'études"
          style={S.heroImg}
        />

        {/* Overlay 3 couches : transparent en haut, sombre sur les côtés/bas */}
        <div style={S.heroOverlay}>
          <p style={S.heroEyebrow}>
            <span style={S.heroLine} />
            Engytech — Bureau d'études
          </p>
          <h1 style={S.heroH1}>
            <span style={{ display: "block" }}>Demande de</span>
            <span style={S.heroItalic}>Devis</span>
          </h1>
          <p style={S.heroSub}>
            Obtenez une estimation précise pour votre projet — réponse sous 24 heures.
          </p>
          <div style={S.heroPills}>
            {["Résidentiel", "Collectif", "Tertiaire", "Réhabilitation", "Neuf"].map((t) => (
              <span key={t} style={S.pill}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INTRO STRIP ══ */}
      <div style={S.strip}>
        <div className="dp-strip-inner" style={S.stripInner}>
          <div style={S.stripLeft}>
            <span style={S.stripNum}>{DEVIS_ITEMS.length}</span>
            <div>
              <h2 style={S.stripH2}>Prestations sur mesure</h2>
              <p style={S.stripP}>Sélectionnez votre prestation et recevez un devis sous 24h.</p>
            </div>
          </div>
          <Link to="#contact" style={S.stripCta}>
            Nous contacter <span>→</span>
          </Link>
        </div>
      </div>

      {/* ══ SECTION HEADER ══ */}
      <div style={S.secHeader} data-reveal>
        <div>
          <span style={S.secLabel}>02 — Nos prestations</span>
          <h3 style={S.secH3}>
            Choisissez votre{" "}
            <em style={{ fontStyle: "italic", color: "#2a7fa5" }}>prestation</em>
          </h3>
        </div>
        <span style={S.secBadge}>{DEVIS_ITEMS.length} offres disponibles</span>
      </div>

      {/* ══ CARDS — 5 par ligne, taille moyenne ══ */}
      <section className="dp-grid" style={S.grid}>
        {DEVIS_ITEMS.map((item, i) => {
          const isH = hovered === i;
          return (
            <Link
              key={i}
              to={item.link}
              data-reveal
              style={{
                ...S.card,
                transform: isH ? "translateY(-8px)" : "translateY(0)",
                boxShadow: isH
                  ? `0 16px 40px rgba(27,47,110,0.16), 0 2px 8px rgba(27,47,110,0.06)`
                  : S.card.boxShadow,
                ...(item.free && {
                  outline: "2px solid rgba(58,184,122,0.28)",
                  outlineOffset: 0,
                }),
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Gradient top accent au hover */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${item.accent}, #4ecda4)`,
                opacity: isH ? 1 : 0,
                transition: "opacity 0.28s",
                zIndex: 2,
                borderRadius: "14px 14px 0 0",
              }} />

              {/* Image */}
              <div style={S.imgWrap}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ ...S.img, transform: isH ? "scale(1.07)" : "scale(1)" }}
                />
                <div style={S.imgGrad} />
                <span style={S.numBadge}>0{i + 1}</span>
                {item.free
                  ? <span style={S.freeBadge}>Gratuit</span>
                  : <span style={S.tagBadge}>{item.tag}</span>
                }
              </div>

              {/* Body */}
              <div style={S.body}>
                <h3 style={{ ...S.title, color: isH ? item.accent : "#0e1c3a" }}>
                  {item.title}
                </h3>
                <p style={S.desc}>{item.desc}</p>
              </div>

              {/* Footer */}
              <div style={S.footer}>
                <span style={{
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: isH ? item.accent : "#9aafc4",
                  transition: "color 0.25s",
                }}>
                  Demander un devis
                </span>
                <span style={{
                  fontSize: "0.9375rem",
                  color: isH ? item.accent : "#9aafc4",
                  transform: isH ? "translateX(5px)" : "translateX(0)",
                  transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1), color 0.25s",
                  display: "inline-block",
                  lineHeight: 1,
                }}>
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ══ BANNER ══ */}
      <div style={S.banner} data-reveal>
        <div className="dp-banner-inner" style={S.bannerInner}>
          <div>
            <h3 style={S.bannerH3}>
              Vous ne trouvez pas votre{" "}
              <em style={{ fontStyle: "italic", color: "#2a7fa5" }}>prestation ?</em>
            </h3>
            <p style={S.bannerP}>
              Décrivez votre projet librement — notre équipe vous contactera
              pour une étude personnalisée gratuite.
            </p>
          </div>
          <Link
            to="#contact"
            className="dp-banner-btn"
            style={S.bannerBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(1.12)";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(58,184,122,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(42,127,165,0.35)";
            }}
          >
            Projet sur mesure <span>→</span>
          </Link>
        </div>
      </div>
 <FloatingMenu />
      <Footer />
    </div>
  );
}