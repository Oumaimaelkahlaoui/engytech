import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/MainFooter";
import FloatingMenu from "../components/Floatingmenu";

const css = `
  .ct { overflow-x: hidden; }

  /* ── HERO ─────────────────────────────────────── */
  .ct-hero {
    position: relative;
    padding-top: calc(68px + clamp(3.5rem,8vh,6rem));
    padding-bottom: clamp(4rem,8vh,6rem);
    padding-inline: clamp(1.25rem,5vw,5rem);
    background: linear-gradient(135deg,#1a2030 0%,#1a2030 45%,#156e73 100%);
    overflow: hidden; text-align: center;
  }
  .ct-hero::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(27,138,143,.08) 1px,transparent 1px),
      linear-gradient(90deg,rgba(27,138,143,.08) 1px,transparent 1px);
    background-size:56px 56px;
    mask-image:radial-gradient(ellipse 70% 80% at 50% 50%,black 20%,transparent 75%);
    -webkit-mask-image:radial-gradient(ellipse 70% 80% at 50% 50%,black 20%,transparent 75%);
  }
  .ct-hero::after {
    content:''; position:absolute; bottom:-20%; left:50%; transform:translateX(-50%);
    width:60%; height:60%;
    background:radial-gradient(ellipse,rgba(125,194,66,.12) 0%,transparent 65%);
  }
  .ct-hero__inner {
    position:relative; z-index:1;
    max-width:680px; margin-inline:auto;
    animation:ct-up .9s cubic-bezier(.16,1,.3,1) .15s both;
  }
  .ct-eyebrow {
    display:inline-flex; align-items:center; gap:10px;
    font-size:.6875rem; font-weight:500; letter-spacing:.22em; text-transform:uppercase;
    color:#2ab0b6; margin-bottom:1.25rem;
  }
  .ct-eyebrow::before,.ct-eyebrow::after {
    content:''; display:inline-block; width:28px; height:1.5px; background:#2ab0b6;
  }
  .ct-hero__title {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(2.25rem,6vw,4.5rem); font-weight:500; line-height:1.05;
    letter-spacing:-.025em; color:#fff; margin-bottom:1.25rem;
  }
  .ct-hero__title em { font-style:italic; color:#2ab0b6; }
  .ct-hero__sub {
    font-size:clamp(.875rem,1.8vw,1rem); font-weight:300;
    color:rgba(255,255,255,.5); line-height:1.8; max-width:48ch; margin-inline:auto;
  }

  /* ── INFO BAND ────────────────────────────────── */
  .ct-band {
    background:#fff;
    border-bottom:1px solid #eaf0f4;
    box-shadow:0 4px 32px rgba(43,57,144,.05);
  }
  .ct-band__inner {
    max-width:1280px; margin-inline:auto;
    padding-inline:clamp(1.25rem,5vw,5rem);
    display:grid; grid-template-columns:repeat(3,1fr);
  }
  .ct-info {
    padding:clamp(1.75rem,3.5vw,2.75rem) clamp(1rem,2vw,1.75rem);
    display:flex; align-items:flex-start; gap:1rem;
    border-right:1px solid #eaf0f4; transition:background .25s;
  }
  .ct-info:last-child { border-right:none; }
  .ct-info:hover { background:#f4f6f9; }
  .ct-info__icon {
    width:46px; height:46px; min-width:46px; border-radius:10px;
    background:linear-gradient(135deg,rgba(43,57,144,.08),rgba(27,138,143,.1));
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; margin-top:2px;
    transition:background .3s;
  }
  .ct-info:hover .ct-info__icon { background:linear-gradient(135deg,#2B3990,#1B8A8F); }
  .ct-info__icon svg { width:22px; height:22px; transition:stroke .3s; }
  .ct-info:hover .ct-info__icon svg { stroke:#fff; }
  .ct-info__body h4 {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(.9rem,1.5vw,1.0625rem); font-weight:500; color:#0d1117;
    margin-bottom:4px; line-height:1.3;
  }
  .ct-info__body p, .ct-info__body a {
    font-size:.8375rem; font-weight:300; color:#7a909e; line-height:1.65;
    text-decoration:none; display:block; transition:color .2s;
  }
  .ct-info__body a:hover { color:#1B8A8F; }

  /* ── MAIN SECTION ─────────────────────────────── */
  .ct-main {
    padding:clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem);
    background:#f4f6f9;
  }
  .ct-main__inner {
    max-width:1280px; margin-inline:auto;
    display:grid; grid-template-columns:1fr 1.5fr;
    gap:clamp(3rem,7vw,7rem); align-items:start;
  }

  /* ── LEFT — infos détaillées ── */
  .ct-left { position:sticky; top:calc(68px + 2rem); }
  .ct-left__label {
    display:inline-block; font-size:.6875rem; font-weight:500;
    letter-spacing:.18em; text-transform:uppercase; color:#1B8A8F; margin-bottom:.75rem;
  }
  .ct-left__title {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(1.5rem,3vw,2.25rem); font-weight:500; line-height:1.2;
    letter-spacing:-.02em; color:#0d1117; margin-bottom:1.25rem;
  }
  .ct-left__title em { font-style:italic; color:#1B8A8F; }
  .ct-left__desc {
    font-size:.9375rem; font-weight:300; color:#7a909e;
    line-height:1.9; margin-bottom:2rem; max-width:40ch;
  }

  /* horaires */
  .ct-hours {
    background:#fff; border-radius:10px; padding:1.5rem;
    border:1px solid #eaf0f4; margin-bottom:1.75rem;
  }
  .ct-hours h5 {
    font-size:.65rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
    color:#1B8A8F; margin-bottom:1rem;
  }
  .ct-hours__row {
    display:flex; justify-content:space-between; align-items:center;
    padding:.5rem 0; border-bottom:1px solid #f4f6f9; font-size:.8375rem;
  }
  .ct-hours__row:last-child { border-bottom:none; }
  .ct-hours__row span:first-child { font-weight:400; color:#0d1117; }
  .ct-hours__row span:last-child { font-weight:300; color:#7a909e; }
  .ct-hours__row .open { color:#7DC242; font-weight:500; }

  /* réseaux sociaux */
  .ct-socials { display:flex; gap:.75rem; flex-wrap:wrap; }
  .ct-social {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 14px; border-radius:6px;
    border:1px solid #dde5ea; background:#fff;
    font-size:.75rem; font-weight:500; color:#7a909e;
    text-decoration:none; transition:border-color .25s, color .25s, background .25s;
  }
  .ct-social svg { width:14px; height:14px; }
  .ct-social:hover { border-color:#1B8A8F; color:#1B8A8F; background:#f0fafa; }

  /* ── RIGHT — formulaire ── */
  .ct-form-wrap {
    background:#fff; border-radius:16px;
    padding:clamp(2rem,4vw,3.5rem);
    box-shadow:0 8px 48px rgba(43,57,144,.07);
    border:1px solid #eaf0f4;
  }
  .ct-form-wrap h3 {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(1.25rem,2.5vw,1.75rem); font-weight:500;
    color:#0d1117; margin-bottom:.5rem;
  }
  .ct-form-wrap > p {
    font-size:.875rem; font-weight:300; color:#7a909e;
    line-height:1.7; margin-bottom:2rem;
  }

  .ct-form { display:flex; flex-direction:column; gap:1.25rem; }

  .ct-row { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }

  .ct-field { display:flex; flex-direction:column; gap:.4rem; }
  .ct-field label {
    font-size:.7rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase;
    color:#7a909e;
  }
  .ct-field input, .ct-field textarea, .ct-field select {
    font-family:'Outfit',system-ui,sans-serif;
    font-size:.9375rem; font-weight:300; color:#0d1117;
    background:#f4f6f9; border:1.5px solid transparent;
    border-radius:8px; padding:.875rem 1.125rem;
    width:100%; outline:none; resize:none;
    transition:border-color .25s, background .25s, box-shadow .25s;
    -webkit-appearance:none; appearance:none;
  }
  .ct-field input::placeholder, .ct-field textarea::placeholder { color:#b0bec5; }
  .ct-field input:focus, .ct-field textarea:focus, .ct-field select:focus {
    border-color:#1B8A8F; background:#fff;
    box-shadow:0 0 0 3px rgba(27,138,143,.1);
  }
  .ct-field select { cursor:pointer; }

  /* subject chips */
  .ct-chips { display:flex; flex-wrap:wrap; gap:.5rem; }
  .ct-chip {
    padding:6px 14px; border-radius:20px; border:1.5px solid #dde5ea;
    font-size:.75rem; font-weight:500; color:#7a909e; background:#fff;
    cursor:pointer; transition:border-color .2s, color .2s, background .2s;
    -webkit-tap-highlight-color:transparent;
  }
  .ct-chip.active, .ct-chip:hover {
    border-color:#1B8A8F; color:#1B8A8F; background:#f0fafa;
  }
  .ct-chip.active { background:#e8f7f7; }

  /* submit */
  .ct-submit {
    display:inline-flex; align-items:center; justify-content:center; gap:8px;
    width:100%; padding:1rem 2rem;
    background:linear-gradient(90deg,#2B3990,#1B8A8F);
    color:#fff; border:none; border-radius:8px;
    font-family:'Outfit',system-ui,sans-serif;
    font-size:.875rem; font-weight:500; letter-spacing:.08em;
    cursor:pointer; transition:opacity .25s, transform .25s, box-shadow .25s;
    box-shadow:0 4px 24px rgba(27,138,143,.35);
  }
  .ct-submit:hover { opacity:.9; transform:translateY(-2px); box-shadow:0 8px 36px rgba(27,138,143,.5); }
  .ct-submit:active { transform:translateY(0); }
  .ct-submit svg { width:18px; height:18px; }

  /* success message */
  .ct-success {
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; gap:1rem; padding:3rem 1rem;
    animation:ct-up .6s cubic-bezier(.16,1,.3,1) both;
  }
  .ct-success__icon {
    width:64px; height:64px; border-radius:50%;
    background:linear-gradient(135deg,#1B8A8F,#7DC242);
    display:flex; align-items:center; justify-content:center;
  }
  .ct-success__icon svg { width:28px; height:28px; stroke:#fff; }
  .ct-success h3 {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(1.25rem,2.5vw,1.75rem); font-weight:500; color:#0d1117;
  }
  .ct-success p { font-size:.9375rem; font-weight:300; color:#7a909e; line-height:1.7; max-width:38ch; }

  /* ── MAP placeholder ──────────────────────────── */
  .ct-map {
    background:#1a2030;
    padding:clamp(3rem,6vh,5rem) clamp(1.25rem,5vw,5rem) 0;
  }
  .ct-map__inner { max-width:1280px; margin-inline:auto; }
  .ct-map__label {
    display:inline-block; font-size:.6875rem; font-weight:500;
    letter-spacing:.18em; text-transform:uppercase; color:#2ab0b6; margin-bottom:.75rem;
  }
  .ct-map__title {
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(1.5rem,3vw,2.5rem); font-weight:500; color:#fff;
    margin-bottom:2rem; line-height:1.2;
  }
  .ct-map__title em { font-style:italic; color:#2ab0b6; }
  .ct-map__frame {
    width:100%; height:380px; border-radius:12px 12px 0 0;
    overflow:hidden; border:1px solid rgba(255,255,255,.06);
    background:#0d1117;
    display:flex; align-items:center; justify-content:center;
  }
  .ct-map__frame iframe {
    width:100%; height:100%; border:none; filter:invert(90%) hue-rotate(180deg) saturate(.8);
  }

  /* ── SCROLL REVEAL ───────────────────────────── */
  [data-reveal] {
    opacity:0; transform:translateY(28px);
    transition:opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1);
  }
  [data-reveal].is-visible { opacity:1; transform:translateY(0); }
  [data-reveal].is-visible:nth-child(2) { transition-delay:.08s; }
  [data-reveal].is-visible:nth-child(3) { transition-delay:.16s; }

  @keyframes ct-up {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ── RESPONSIVE ──────────────────────────────── */
  @media (max-width:1024px) {
    .ct-main__inner { grid-template-columns:1fr; gap:3rem; }
    .ct-left { position:static; }
  }
  @media (max-width:768px) {
    .ct-band__inner { grid-template-columns:1fr; }
    .ct-info { border-right:none; border-bottom:1px solid #eaf0f4; }
    .ct-info:last-child { border-bottom:none; }
    .ct-row { grid-template-columns:1fr; }
  }
  @media (max-width:480px) {
    .ct-form-wrap { padding:1.5rem; }
  }
`;

/* ── SVG ICONS ─────────────────────────────────── */
const IcoPhone = ({s="#1B8A8F"}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
  </svg>
);
const IcoMail = ({s="#1B8A8F"}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IcoPin = ({s="#1B8A8F"}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcoSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IcoCheck2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IcoLi = ({s="#7a909e"}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const IcoInsta = ({s="#7a909e"}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IcoFb = ({s="#7a909e"}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const subjects = ["Étude de structure","VRD & Réseaux","Suivi de chantier","Énergie & HQE","Modélisation BIM","Autre"];

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
export default function Contact() {
  const navigate = useNavigate();
  const cursorRef    = useRef(null);
  const cursorDotRef = useRef(null);
  const [subject, setSubject] = useState("");
  const [sent, setSent]       = useState(false);
  const [form, setForm]       = useState({ nom:"", prenom:"", email:"", tel:"", societe:"", message:"" });

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));

    const move = (e) => {
      if (cursorRef.current)    cursorRef.current.style.transform    = `translate(${e.clientX-20}px,${e.clientY-20}px)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${e.clientX-4}px,${e.clientY-4}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => { obs.disconnect(); window.removeEventListener("mousemove", move); };
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot"  ref={cursorDotRef} />
      <style>{css}</style>
      <div className="ct">
        <Navbar />

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="ct-hero__inner">
            <p className="ct-eyebrow">Contactez-nous</p>
            <h1 className="ct-hero__title">
              Parlons de votre<br /><em>prochain projet</em>
            </h1>
            <p className="ct-hero__sub">
              Notre équipe est disponible pour répondre à vos questions et
              vous accompagner dans vos projets d'ingénierie.
            </p>
          </div>
        </section>

        {/* ── INFO BAND ── */}
        <div className="ct-band">
          <div className="ct-band__inner">
            {[
              { Icon:IcoPhone, title:"Téléphone",  lines:["(+212)  6 62 25 78 79", "Lun – Ven · 8h – 18h"] },
              { Icon:IcoMail,  title:"Email",       lines:[" contact@archengytech.ma", "Réponse sous 24h"] },
              { Icon:IcoPin,   title:"Adresse",     lines:["Marrakech, Maroc", "Sur rendez-vous"] },
            ].map(({ Icon, title, lines }) => (
              <div className="ct-info" key={title} data-reveal>
                <div className="ct-info__icon"><Icon /></div>
                <div className="ct-info__body">
                  <h4>{title}</h4>
                  {lines.map((l, i) => (
                    l.includes("@")
                      ? <a href={`mailto:${l}`} key={i}>{l}</a>
                      : <p key={i}>{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN ── */}
        <section className="ct-main">
          <div className="ct-main__inner">

            {/* LEFT */}
            <div className="ct-left" data-reveal>
              <span className="ct-left__label">Nous écrire</span>
              <h2 className="ct-left__title">
                Une question,<br />un <em>projet</em> ?
              </h2>
              <p className="ct-left__desc">
                Remplissez le formulaire et nous vous répondons sous 24h ouvrées.
                Pour un devis détaillé, rendez-vous sur notre page prestations.
              </p>

              {/* Horaires */}
              <div className="ct-hours">
                <h5>Horaires d'ouverture</h5>
                {[
                  { j:"Lundi – Vendredi", h:"08:00 – 18:00", open:true },
                  { j:"Samedi",           h:"09:00 – 13:00", open:true },
                  { j:"Dimanche",         h:"Fermé",          open:false },
                ].map(({ j, h, open }) => (
                  <div className="ct-hours__row" key={j}>
                    <span>{j}</span>
                    <span className={open ? "open" : ""}>{h}</span>
                  </div>
                ))}
              </div>

              {/* Réseaux */}
              <div className="ct-socials">
                {[
                  { Icon:IcoLi,    label:"LinkedIn"  },
                  { Icon:IcoInsta, label:"Instagram" },
                  { Icon:IcoFb,    label:"Facebook"  },
                ].map(({ Icon, label }) => (
                  <a href="#" className="ct-social" key={label}>
                    <Icon />{label}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="ct-form-wrap" data-reveal>
              {sent ? (
                <div className="ct-success">
                  <div className="ct-success__icon"><IcoCheck2 /></div>
                  <h3>Message envoyé !</h3>
                  <p>Merci pour votre message. Notre équipe vous contactera dans les 24h ouvrées.</p>
                  <button
                    className="ct-submit"
                    style={{ marginTop:"1rem", width:"auto", padding:".75rem 2rem" }}
                    onClick={() => { setSent(false); setForm({ nom:"",prenom:"",email:"",tel:"",societe:"",message:"" }); setSubject(""); }}
                  >
                    Nouveau message
                  </button>
                </div>
              ) : (
                <>
                  <h3>Envoyez-nous un message</h3>
                  <p>Tous les champs marqués * sont obligatoires.</p>

                  <form className="ct-form" onSubmit={handleSubmit}>
                    <div className="ct-row">
                      <div className="ct-field">
                        <label>Nom *</label>
                        <input name="nom" required placeholder="Votre nom" value={form.nom} onChange={handleChange} />
                      </div>
                      <div className="ct-field">
                        <label>Prénom *</label>
                        <input name="prenom" required placeholder="Votre prénom" value={form.prenom} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="ct-row">
                      <div className="ct-field">
                        <label>Email *</label>
                        <input name="email" type="email" required placeholder="votre@email.com" value={form.email} onChange={handleChange} />
                      </div>
                      <div className="ct-field">
                        <label>Téléphone</label>
                        <input name="tel" type="tel" placeholder="+212 6 XX XX XX XX" value={form.tel} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="ct-field">
                      <label>Société / Organisation</label>
                      <input name="societe" placeholder="Nom de votre entreprise" value={form.societe} onChange={handleChange} />
                    </div>

                    <div className="ct-field">
                      <label>Sujet de votre demande</label>
                      <div className="ct-chips">
                        {subjects.map((s) => (
                          <button
                            type="button"
                            className={`ct-chip${subject === s ? " active" : ""}`}
                            key={s}
                            onClick={() => setSubject(s)}
                          >{s}</button>
                        ))}
                      </div>
                    </div>

                    <div className="ct-field">
                      <label>Message *</label>
                      <textarea
                        name="message" required rows={5}
                        placeholder="Décrivez votre projet ou votre question..."
                        value={form.message} onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="ct-submit">
                      <IcoSend /> Envoyer le message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── MAP ── 
        <section className="ct-map">
          <div className="ct-map__inner" data-reveal>
            <span className="ct-map__label">Notre localisation</span>
            <h2 className="ct-map__title">Nous <em>trouver</em></h2>
            <div className="ct-map__frame">
              <iframe
                title="ENGYTECH localisation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72!2d-7.6892!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1"
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
*/}
 <FloatingMenu />
        <Footer />
      </div>
    </>
  );
}