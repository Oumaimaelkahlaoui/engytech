import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/MainFooter";
import FloatingMenu from "../components/Floatingmenu";

// CSS identique à l'original — non modifié
const css = `
  .sv { overflow-x: hidden; }
  .sv-hero { position:relative; padding-top:calc(68px + clamp(4rem,10vh,7rem)); padding-bottom:clamp(5rem,10vh,8rem); padding-inline:clamp(1.25rem,5vw,5rem); background:linear-gradient(135deg,#1a2030 0%,#1a2030 45%,#156e73 100%); overflow:hidden; text-align:center; }
  .sv-hero::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(27,138,143,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(27,138,143,.08) 1px,transparent 1px); background-size:56px 56px; mask-image:radial-gradient(ellipse 70% 80% at 50% 50%,black 20%,transparent 75%); -webkit-mask-image:radial-gradient(ellipse 70% 80% at 50% 50%,black 20%,transparent 75%); }
  .sv-hero::after { content:''; position:absolute; bottom:-20%; left:50%; transform:translateX(-50%); width:60%; height:60%; background:radial-gradient(ellipse,rgba(125,194,66,.12) 0%,transparent 65%); }
  .sv-hero__inner { position:relative; z-index:1; max-width:780px; margin-inline:auto; animation:sv-up .9s cubic-bezier(.16,1,.3,1) .15s both; }
  .sv-eyebrow { display:inline-flex; align-items:center; gap:10px; font-size:.6875rem; font-weight:500; letter-spacing:.22em; text-transform:uppercase; color:#2ab0b6; margin-bottom:1.5rem; }
  .sv-eyebrow::before,.sv-eyebrow::after { content:''; display:inline-block; width:28px; height:1.5px; background:#2ab0b6; }
  .sv-hero__title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(2.5rem,7vw,5rem); font-weight:500; line-height:1.05; letter-spacing:-.025em; color:#fff; margin-bottom:1.5rem; }
  .sv-hero__title em { font-style:italic; color:#2ab0b6; }
  .sv-hero__sub { font-size:clamp(.875rem,1.8vw,1rem); font-weight:300; color:rgba(255,255,255,.5); line-height:1.8; max-width:54ch; margin-inline:auto; margin-bottom:2.5rem; }
  .sv-hero__actions { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
  .sv-intro { padding:clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem); background:#fff; }
  .sv-intro__inner { max-width:1280px; margin-inline:auto; display:grid; grid-template-columns:1fr 1fr; gap:clamp(3rem,7vw,7rem); align-items:center; }
  .sv-intro__label { display:inline-block; font-size:.6875rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:#1B8A8F; margin-bottom:.75rem; }
  .sv-intro__title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.75rem,4vw,3rem); font-weight:500; line-height:1.12; letter-spacing:-.02em; color:#0d1117; margin-bottom:1.5rem; }
  .sv-intro__title em { font-style:italic; color:#1B8A8F; }
  .sv-intro__text p { font-size:.9375rem; font-weight:300; color:#7a909e; line-height:1.9; margin-bottom:1.25rem; max-width:46ch; }
  .sv-intro__text p:last-of-type { margin-bottom:0; }
  .sv-intro__stats { display:grid; grid-template-columns:1fr 1fr; gap:2px; border-radius:12px; overflow:hidden; }
  .sv-intro__stat { background:#f4f6f9; padding:clamp(1.5rem,3vw,2.5rem) clamp(1.25rem,2vw,2rem); display:flex; flex-direction:column; gap:6px; transition:background .25s; }
  .sv-intro__stat:hover { background:#eaf0f4; }
  .sv-intro__stat strong { font-family:'Playfair Display',Georgia,serif; font-size:clamp(2rem,4vw,3rem); font-weight:500; line-height:1; background:linear-gradient(90deg,#1B8A8F,#7DC242); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .sv-intro__stat span { font-size:.65rem; letter-spacing:.12em; text-transform:uppercase; color:#7a909e; }
  .sv-domains { background:#1a2030; padding:clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem); overflow:hidden; }
  .sv-domains__inner { max-width:1280px; margin-inline:auto; }
  .sv-domains__header { margin-bottom:clamp(3rem,6vh,5rem); text-align:center; }
  .sv-domains__header p { font-size:.9375rem; font-weight:300; color:rgba(255,255,255,.38); line-height:1.85; max-width:50ch; margin-top:1rem; margin-inline:auto; }
  .sv-domains__label { display:inline-block; font-size:.6875rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:#2ab0b6; margin-bottom:.75rem; }
  .sv-domains__title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.75rem,4vw,3.25rem); font-weight:500; line-height:1.12; letter-spacing:-.02em; color:#fff; }
  .sv-domains__title em { font-style:italic; color:#2ab0b6; }
  .sv-domains__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; align-items:end; padding-bottom:28px; }
  .sv-domain { position:relative; overflow:hidden; border-radius:12px; cursor:pointer; aspect-ratio:3/4; box-shadow:0 20px 60px rgba(0,0,0,.5); }
  .sv-domain:nth-child(1) { margin-bottom:0; animation:svf1 4.2s ease-in-out infinite; }
  .sv-domain:nth-child(2) { margin-bottom:32px; animation:svf2 4.8s ease-in-out infinite .65s; }
  .sv-domain:nth-child(3) { margin-bottom:14px; animation:svf3 4.0s ease-in-out infinite 1.1s; }
  .sv-domain:nth-child(4) { margin-bottom:24px; animation:svf4 4.6s ease-in-out infinite .3s; }
  .sv-domain:hover { animation-play-state:paused; box-shadow:0 40px 80px rgba(0,0,0,.7); }
  @keyframes svf1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(.4deg)} }
  @keyframes svf2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(-.35deg)} }
  @keyframes svf3 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(.3deg)} }
  @keyframes svf4 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-.45deg)} }
  .sv-domain img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.6) saturate(.85); transition:transform .7s cubic-bezier(.16,1,.3,1), filter .5s; }
  .sv-domain:hover img { transform:scale(1.07); filter:brightness(.3) saturate(1.15); }
  .sv-domain__overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(13,17,23,.92) 0%,rgba(13,17,23,.12) 55%,transparent 100%); transition:background .5s; }
  .sv-domain:hover .sv-domain__overlay { background:linear-gradient(to top,rgba(13,17,23,.97) 0%,rgba(13,17,23,.55) 60%,rgba(13,17,23,.1) 100%); }
  .sv-domain__line { position:absolute; bottom:0; left:0; height:3px; width:0; background:linear-gradient(90deg,#1B8A8F,#7DC242); transition:width .55s cubic-bezier(.16,1,.3,1); }
  .sv-domain:hover .sv-domain__line { width:100%; }
  .sv-domain__body { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:clamp(1.25rem,2.5vw,1.75rem); }
  .sv-domain__tag { font-size:.58rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:#7DC242; margin-bottom:7px; display:block; transition:transform .4s cubic-bezier(.16,1,.3,1); }
  .sv-domain:hover .sv-domain__tag { transform:translateY(-5px); }
  .sv-domain__title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1rem,2vw,1.5rem); font-weight:500; color:#fff; line-height:1.2; transition:transform .4s cubic-bezier(.16,1,.3,1); }
  .sv-domain:hover .sv-domain__title { transform:translateY(-5px); }
  .sv-domain__desc { font-size:clamp(.75rem,1.2vw,.85rem); font-weight:300; color:rgba(255,255,255,.7); line-height:1.65; margin-top:9px; max-height:0; overflow:hidden; opacity:0; transform:translateY(12px); transition:max-height .5s cubic-bezier(.16,1,.3,1), opacity .4s .06s, transform .45s .06s; }
  .sv-domain:hover .sv-domain__desc { max-height:120px; opacity:1; transform:translateY(0); }
  .sv-approach { background:#fff; padding:clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem); }
  .sv-approach__inner { max-width:1280px; margin-inline:auto; }
  .sv-approach__header { text-align:center; margin-bottom:clamp(3rem,6vh,5rem); }
  .sv-approach__header p { font-size:.9375rem; font-weight:300; color:#7a909e; max-width:52ch; margin-inline:auto; margin-top:1rem; line-height:1.85; }
  .sv-approach__label { display:inline-block; font-size:.6875rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:#1B8A8F; margin-bottom:.75rem; }
  .sv-approach__title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.75rem,4vw,3.25rem); font-weight:500; line-height:1.12; letter-spacing:-.02em; color:#0d1117; }
  .sv-approach__title em { font-style:italic; color:#1B8A8F; }
  .sv-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:0; position:relative; }
  .sv-steps::before { content:''; position:absolute; top:36px; left:12.5%; right:12.5%; height:1px; background:linear-gradient(90deg,transparent,#1B8A8F 20%,#7DC242 80%,transparent); }
  .sv-step { display:flex; flex-direction:column; align-items:center; text-align:center; padding:0 clamp(.75rem,2vw,1.5rem); position:relative; z-index:1; }
  .sv-step__circle { width:72px; height:72px; border-radius:50%; background:#f4f6f9; border:1.5px solid #dde5ea; display:flex; align-items:center; justify-content:center; margin-bottom:1.5rem; position:relative; transition:background .35s, border-color .35s, transform .35s cubic-bezier(.16,1,.3,1); }
  .sv-step__circle svg { width:28px; height:28px; }
  .sv-step:hover .sv-step__circle { background:linear-gradient(135deg,#2B3990,#1B8A8F); border-color:transparent; transform:translateY(-6px); }
  .sv-step:hover .sv-step__circle svg { stroke:#fff; }
  .sv-step__num { position:absolute; top:-8px; right:-8px; font-size:.6rem; font-weight:700; letter-spacing:.12em; color:#7DC242; background:#fff; padding:2px 6px; border-radius:2px; border:1px solid #eaf0f4; }
  .sv-step h4 { font-family:'Playfair Display',Georgia,serif; font-size:clamp(.9rem,1.5vw,1.0625rem); font-weight:500; color:#0d1117; margin-bottom:.5rem; line-height:1.3; transition:color .25s; }
  .sv-step:hover h4 { color:#1B8A8F; }
  .sv-step p { font-size:.8rem; font-weight:300; color:#7a909e; line-height:1.65; }
  .sv-engage { background:#f4f6f9; padding:clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem); }
  .sv-engage__inner { max-width:1280px; margin-inline:auto; }
  .sv-engage__header { text-align:center; margin-bottom:clamp(3rem,6vh,5rem); }
  .sv-engage__header p { font-size:.9375rem; font-weight:300; color:#7a909e; max-width:50ch; margin-inline:auto; margin-top:1rem; line-height:1.85; }
  .sv-engage__title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.75rem,4vw,3.25rem); font-weight:500; line-height:1.12; letter-spacing:-.02em; color:#0d1117; }
  .sv-engage__title em { font-style:italic; color:#1B8A8F; }
  .sv-engage__label { display:inline-block; font-size:.6875rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:#1B8A8F; margin-bottom:.75rem; }
  .sv-engage__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
  .sv-engage__item { background:#fff; padding:clamp(1.75rem,3vw,2.5rem) clamp(1.25rem,2.5vw,2rem); display:flex; flex-direction:column; gap:1rem; border-radius:2px; position:relative; overflow:hidden; transition:transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s; }
  .sv-engage__item::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#1B8A8F,#7DC242); transform:scaleX(0); transform-origin:left; transition:transform .4s cubic-bezier(.16,1,.3,1); }
  .sv-engage__item:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(27,138,143,.1); }
  .sv-engage__item:hover::after { transform:scaleX(1); }
  .sv-engage__icon { width:50px; height:50px; border-radius:10px; background:linear-gradient(135deg,rgba(43,57,144,.07),rgba(27,138,143,.09)); display:flex; align-items:center; justify-content:center; transition:background .3s; }
  .sv-engage__item:hover .sv-engage__icon { background:linear-gradient(135deg,#2B3990,#1B8A8F); }
  .sv-engage__icon svg { width:22px; height:22px; transition:stroke .3s; }
  .sv-engage__item:hover .sv-engage__icon svg { stroke:#fff; }
  .sv-engage__item h3 { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1rem,1.8vw,1.2rem); font-weight:500; color:#0d1117; line-height:1.25; }
  .sv-engage__item p { font-size:.8375rem; font-weight:300; color:#7a909e; line-height:1.75; }
  .sv-cta { position:relative; padding:clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem); background:linear-gradient(135deg,#1e2b70 0%,#156e73 50%,#1e2b70 100%); overflow:hidden; text-align:center; }
  .sv-cta::after { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:70%; height:100%; background:radial-gradient(ellipse,rgba(125,194,66,.12) 0%,transparent 65%); pointer-events:none; }
  .sv-cta__inner { position:relative; z-index:1; max-width:620px; margin-inline:auto; }
  .sv-cta__eyebrow { display:inline-block; font-size:.6875rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:#2ab0b6; margin-bottom:.75rem; }
  .sv-cta h2 { font-family:'Playfair Display',Georgia,serif; font-size:clamp(2rem,5vw,3.5rem); font-weight:500; line-height:1.1; color:#fff; margin:.75rem 0 1rem; letter-spacing:-.02em; }
  .sv-cta h2 em { font-style:italic; color:#2ab0b6; }
  .sv-cta p { font-size:.9375rem; font-weight:300; color:rgba(255,255,255,.5); line-height:1.75; margin-bottom:2.5rem; max-width:44ch; margin-inline:auto; }
  .sv-cta__actions { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:clamp(.875rem,1.5vw,1rem) clamp(1.75rem,3.5vw,2.5rem); font-family:'Outfit',system-ui,sans-serif; font-size:clamp(.75rem,1.5vw,.875rem); font-weight:500; letter-spacing:.08em; border:none; border-radius:4px; white-space:nowrap; text-decoration:none; cursor:pointer; transition:transform .25s, background .25s, box-shadow .25s; }
  .btn:hover { transform:translateY(-3px); }
  .btn--accent { background:#1B8A8F; color:#fff; box-shadow:0 4px 24px rgba(27,138,143,.45); }
  .btn--accent:hover { background:#2ab0b6; }
  .btn--light { background:#fff; color:#0d1117; box-shadow:0 2px 16px rgba(0,0,0,.15); }
  .btn--light:hover { box-shadow:0 8px 32px rgba(0,0,0,.25); }
  .btn--ghost { background:transparent; color:rgba(255,255,255,.85); border:1px solid rgba(255,255,255,.35); }
  .btn--ghost:hover { background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.7); }
  [data-reveal] { opacity:0; transform:translateY(28px); transition:opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
  [data-reveal].is-visible { opacity:1; transform:translateY(0); }
  [data-reveal].is-visible:nth-child(2) { transition-delay:.09s; }
  [data-reveal].is-visible:nth-child(3) { transition-delay:.18s; }
  [data-reveal].is-visible:nth-child(4) { transition-delay:.27s; }
  [data-reveal].is-visible:nth-child(5) { transition-delay:.36s; }
  [data-reveal].is-visible:nth-child(6) { transition-delay:.45s; }
  @keyframes sv-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @media (max-width:1024px) { .sv-intro__inner{grid-template-columns:1fr;gap:3rem} .sv-intro__stats{grid-template-columns:repeat(4,1fr)} .sv-domains__grid{grid-template-columns:repeat(2,1fr);gap:14px} .sv-domain:nth-child(1),.sv-domain:nth-child(2),.sv-domain:nth-child(3),.sv-domain:nth-child(4){margin-bottom:0} .sv-steps{grid-template-columns:repeat(2,1fr);gap:clamp(2rem,4vw,3rem)} .sv-steps::before{display:none} .sv-engage__grid{grid-template-columns:repeat(2,1fr)} }
  @media (max-width:768px) { .sv-intro__stats{grid-template-columns:repeat(2,1fr)} .sv-domains__grid{grid-template-columns:repeat(2,1fr);gap:12px} .sv-domain{aspect-ratio:3/4} .sv-engage__grid{grid-template-columns:1fr} }
  @media (max-width:640px) { .sv-steps{grid-template-columns:1fr} .sv-hero__actions,.sv-cta__actions{flex-direction:column;align-items:stretch} .sv-hero__actions .btn,.sv-cta__actions .btn{width:100%;justify-content:center} }
`;

/* SVG icons identiques à l'original + aria-hidden */
const IcoRuler  = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21.3 8.7L8.7 21.3a1 1 0 01-1.4 0l-4.6-4.6a1 1 0 010-1.4L15.3 2.7a1 1 0 011.4 0l4.6 4.6a1 1 0 010 1.4z"/><path d="M11 5l3 3M14 8l3 3M8 11l3 3"/></svg>);
const IcoShield = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>);
const IcoClock  = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const IcoUsers  = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>);
const IcoChart  = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>);
const IcoLeaf   = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22c-4.97 0-9-4.03-9-9 0-4.42 3.05-8.12 7.17-9.19A9.01 9.01 0 0121 13c0 4.97-4.03 9-9 9z"/><path d="M12 22V12M12 12c0-4 3-7 7-8"/></svg>);
const IcoMsg    = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>);
const IcoSearch = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const IcoPencil = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>);
const IcoCheck  = ({s="#1B8A8F"}) => (<svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);

const domains = [
  { tag:"Études techniques", title:"Conception & calcul",   desc:"Structures béton armé, charpentes métalliques, fondations spéciales.", img:"/1.webp" },
  { tag:"Suivi de chantier", title:"Pilotage & contrôle",   desc:"Maîtrise d'œuvre, OPC et assistance à maîtrise d'ouvrage.",           img:"/2.webp" },
  { tag:"Performance",       title:"Énergie & durabilité",  desc:"Audits thermiques, simulations STD, démarches HQE et bilan carbone.", img:"/3.webp" },
  { tag:"Numérique",         title:"BIM & innovation",      desc:"Maquettes numériques 3D, coordination multi-corps d'état.",           img:"/4.webp" },
];

const steps = [
  { Icon:IcoMsg,    title:"Consultation",    desc:"Écoute, cadrage du besoin et analyse du programme." },
  { Icon:IcoSearch, title:"Étude & analyse", desc:"Faisabilité, contraintes et proposition de solutions." },
  { Icon:IcoPencil, title:"Conception",      desc:"Plans d'exécution, notes de calcul, dossiers techniques." },
  { Icon:IcoCheck,  title:"Livraison",       desc:"Livrables validés, suivi chantier et réception." },
];

const engagements = [
  { Icon:IcoShield, title:"Rigueur technique",    desc:"Chaque étude est vérifiée et validée selon les normes les plus exigeantes." },
  { Icon:IcoClock,  title:"Respect des délais",   desc:"Planning contractuel tenu grâce à une organisation rigoureuse." },
  { Icon:IcoUsers,  title:"Équipe dédiée",        desc:"Un interlocuteur unique par projet, disponible et réactif." },
  { Icon:IcoChart,  title:"Transparence totale",  desc:"Reporting régulier, communication claire et accès permanent à l'avancement." },
  { Icon:IcoRuler,  title:"Précision & qualité",  desc:"Zéro compromis sur la qualité des livrables." },
  { Icon:IcoLeaf,   title:"Approche durable",     desc:"L'environnement intégré dès la phase conception." },
];

export default function Services() {
  const navigate     = useNavigate();
  const cursorRef    = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));

    const move = (e) => {
      if (cursorRef.current)    cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };
    window.addEventListener("mousemove", move);

    return () => { obs.disconnect(); window.removeEventListener("mousemove", move); };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-dot"  ref={cursorDotRef} aria-hidden="true" />
      <style>{css}</style>
      <div className="sv">
        <Navbar />

        <section className="sv-hero" aria-label="Nos services">
          <div className="sv-hero__inner">
            <p className="sv-eyebrow">Nos services</p>
            <h1 className="sv-hero__title">L'ingénierie au service<br />de <em>vos ambitions</em></h1>
            <p className="sv-hero__sub"><b>ARCH ENGY TECH</b> accompagne maîtres d'ouvrage, architectes et promoteurs dans la réalisation de leurs projets.</p>
            <div className="sv-hero__actions">
              <button className="btn btn--accent" onClick={() => navigate("/devis")}>Voir nos prestations →</button>
              <button className="btn btn--ghost"  onClick={() => navigate("/contact")}>Nous contacter</button>
            </div>
          </div>
        </section>

        <section className="sv-intro">
          <div className="sv-intro__inner">
            <div className="sv-intro__text" data-reveal>
              <span className="sv-intro__label">Qui sommes-nous</span>
              <h2 className="sv-intro__title">Un bureau d'ingénierie<br /><em>de référence</em></h2>
              <p>Fondé sur l'expertise technique et l'innovation, <b>ARCH ENGY TECH</b> intervient sur des projets de toute échelle avec une approche rigoureuse et personnalisée.</p>
              <p>Notre équipe pluridisciplinaire maîtrise l'ensemble des spécialités de l'ingénierie du bâtiment.</p>
              <br />
              <button className="btn btn--accent" onClick={() => navigate("/devis")}>Découvrir nos 10 prestations →</button>
            </div>
            <div className="sv-intro__stats" data-reveal>
              {[{num:"10+",label:"Types de prestations"},{num:"280+",label:"Projets livrés"},{num:"12+",label:"Années d'expérience"},{num:"98%",label:"Taux de satisfaction"}].map(({ num, label }) => (
                <div className="sv-intro__stat" key={label}><strong>{num}</strong><span>{label}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="sv-domains" aria-label="Nos grands domaines">
          <div className="sv-domains__inner">
            <div className="sv-domains__header" data-reveal>
              <span className="sv-domains__label">Ce que nous faisons</span>
              <h2 className="sv-domains__title">Nos grands <em>domaines</em></h2>
              <p>Quatre pôles majeurs qui structurent notre expertise.</p>
            </div>
            <div className="sv-domains__grid">
              {domains.map(({ tag, title, desc, img }) => (
                <div className="sv-domain" key={title} data-reveal>
                  {/* ✅ alt descriptif + loading lazy + dimensions */}
                  <img src={img} alt={title} loading="lazy" width={400} height={533} />
                  <div className="sv-domain__overlay" aria-hidden="true" />
                  <div className="sv-domain__line"    aria-hidden="true" />
                  <div className="sv-domain__body">
                    <span className="sv-domain__tag"   aria-hidden="true">{tag}</span>
                    <h3  className="sv-domain__title">{title}</h3>
                    <p   className="sv-domain__desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sv-approach">
          <div className="sv-approach__inner">
            <div className="sv-approach__header" data-reveal>
              <span className="sv-approach__label">Notre méthode</span>
              <h2 className="sv-approach__title">Une approche <em>structurée</em></h2>
              <p>De la prise de contact à la livraison, une méthode éprouvée.</p>
            </div>
            <div className="sv-steps">
              {steps.map(({ Icon, title, desc }, i) => (
                <div className="sv-step" key={title} data-reveal>
                  <div className="sv-step__circle">
                    <span className="sv-step__num" aria-hidden="true">0{i + 1}</span>
                    <Icon s="#1B8A8F" />
                  </div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sv-engage">
          <div className="sv-engage__inner">
            <div className="sv-engage__header" data-reveal>
              <span className="sv-engage__label">Nos engagements</span>
              <h2 className="sv-engage__title">Ce qui nous <em>distingue</em></h2>
              <p>Des valeurs concrètes qui guident chacune de nos interventions.</p>
            </div>
            <div className="sv-engage__grid">
              {engagements.map(({ Icon, title, desc }) => (
                <div className="sv-engage__item" key={title} data-reveal>
                  <div className="sv-engage__icon"><Icon /></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sv-cta">
          <div className="sv-cta__inner">
            <span className="sv-cta__eyebrow">Prêt à démarrer ?</span>
            <h2>Confiez-nous votre<br /><em>prochain projet</em></h2>
            <p>Consultez nos 10 prestations détaillées et demandez un devis personnalisé sous 48h.</p>
            <div className="sv-cta__actions">
              <button className="btn btn--light" onClick={() => navigate("/devis")}>Voir les prestations →</button>
              <button className="btn btn--ghost" onClick={() => navigate("/contact")}>Nous contacter</button>
            </div>
          </div>
        </section>

        <FloatingMenu />
        <Footer />
      </div>
    </>
  );
}