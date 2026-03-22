import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/MainFooter";

const css = `
  .about-page { overflow-x: hidden; }

  /* ── HERO ──────────────────────────────────── */
  .ap-hero {
    position: relative;
    padding-top: calc(68px + clamp(4rem, 10vh, 7rem));
    padding-bottom: clamp(5rem, 10vh, 8rem);
    padding-inline: clamp(1.25rem, 5vw, 5rem);
    background: linear-gradient(135deg, #1a2030 0%, #1a2030 45%, #156e73 100%);
    overflow: hidden;
    text-align: center;
  }
  .ap-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(27,138,143,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(27,138,143,.08) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 75%);
  }
  .ap-hero::after {
    content: '';
    position: absolute; bottom: -20%; left: 50%; transform: translateX(-50%);
    width: 60%; height: 60%;
    background: radial-gradient(ellipse, rgba(125,194,66,.12) 0%, transparent 65%);
  }
  .ap-hero__inner {
    position: relative; z-index: 1;
    max-width: 720px; margin-inline: auto;
    animation: ap-up .9s cubic-bezier(.16,1,.3,1) .15s both;
  }
  .ap-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: .6875rem; font-weight: 500;
    letter-spacing: .22em; text-transform: uppercase;
    color: #2ab0b6; margin-bottom: 1.5rem;
  }
  .ap-eyebrow::before, .ap-eyebrow::after {
    content: ''; display: inline-block;
    width: 28px; height: 1.5px; background: #2ab0b6;
  }
  .ap-hero__title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2.5rem, 7vw, 5rem);
    font-weight: 500; line-height: 1.05;
    letter-spacing: -.025em; color: #fff;
    margin-bottom: 1.5rem;
  }
  .ap-hero__title em { font-style: italic; color: #2ab0b6; }
  .ap-hero__sub {
    font-size: clamp(.875rem, 1.8vw, 1rem);
    font-weight: 300; color: rgba(255,255,255,.5);
    line-height: 1.8; max-width: 50ch; margin-inline: auto;
  }

  /* ── STATS BAND ─────────────────────────────── */
  .ap-stats { background: #fff; border-bottom: 1px solid #eaf0f4; box-shadow: 0 4px 32px rgba(43,57,144,.06); }
  .ap-stats__grid {
    max-width: 1280px; margin-inline: auto;
    padding-inline: clamp(1.25rem, 5vw, 5rem);
    display: grid; grid-template-columns: repeat(4,1fr);
  }
  .ap-stat {
    padding: clamp(1.75rem,3.5vw,2.75rem) clamp(1rem,2vw,1.75rem);
    display: flex; flex-direction: column; gap: 6px; text-align: center;
    border-right: 1px solid #eaf0f4; transition: background .25s;
  }
  .ap-stat:last-child { border-right: none; }
  .ap-stat:hover { background: #f4f6f9; }
  .ap-stat strong {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2rem,4vw,3rem); font-weight: 500; line-height: 1;
    background: linear-gradient(90deg, #1B8A8F 0%, #7DC242 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .ap-stat span { font-size: .65rem; letter-spacing: .12em; text-transform: uppercase; color: #7a909e; }

  /* ── BODY TEXT ───────────────────────────────── */
  .ap-body {
    max-width: 860px; margin-inline: auto;
    padding: clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem);
  }
  .ap-body__h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.75rem,4vw,2.5rem); font-weight: 500;
    line-height: 1.15; letter-spacing: -.02em; color: #0d1117;
    text-align: center; margin-bottom: .75rem;
  }
  .ap-body__tagline { text-align: center; color: #1B8A8F; font-size: .9rem; font-weight: 500; letter-spacing: .06em; margin-bottom: clamp(2.5rem,5vh,4rem); }
  .ap-body p {
    font-size: clamp(.9375rem,1.8vw,1.0625rem);
    font-weight: 300; color: #7a909e; line-height: 1.95;
    margin-bottom: 1.5rem; max-width: 68ch; margin-inline: auto;
  }
  .ap-body__sh { text-align: center; margin-top: clamp(3rem,6vh,5rem); margin-bottom: clamp(1.25rem,2.5vh,2rem); }
  .ap-body__sh-label {
    display: inline-block; font-size: .6875rem; font-weight: 500;
    letter-spacing: .18em; text-transform: uppercase; color: #1B8A8F; margin-bottom: .75rem;
  }
  .ap-body__sh h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.5rem,3.5vw,2.25rem);
    font-weight: 500; line-height: 1.2; letter-spacing: -.02em; color: #0d1117;
  }
  .ap-body__sh h2 em { font-style: italic; color: #1B8A8F; }
  .ap-divider { display: flex; align-items: center; gap: 16px; margin: clamp(2.5rem,5vh,4rem) auto; max-width: 320px; }
  .ap-divider::before, .ap-divider::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #c8d6de, transparent); }
  .ap-gem { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg,#1B8A8F,#7DC242); }

  /* ══════════════════════════════════════════════
     EXPERTISE — CAROUSEL AUTO-SCROLL
  ══════════════════════════════════════════════ */
  .ap-expertise {
    background: #1a2030;
    padding: clamp(4rem,8vh,7rem) 0;
    overflow: hidden;
  }
  .ap-expertise__header {
    max-width: 1280px; margin-inline: auto;
    padding-inline: clamp(1.25rem,5vw,5rem);
    text-align: center;
    margin-bottom: clamp(3rem,6vh,5rem);
  }
  .ap-expertise__header p {
    font-size: .9375rem; font-weight: 300; color: rgba(255,255,255,.38);
    line-height: 1.85; max-width: 54ch; margin-inline: auto; margin-top: 1rem;
  }
  .section-label {
    display: inline-block; font-size: .6875rem; font-weight: 500;
    letter-spacing: .18em; text-transform: uppercase; color: #2ab0b6; margin-bottom: .75rem;
  }
  .section-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.75rem,4vw,3.25rem); font-weight: 500;
    line-height: 1.12; letter-spacing: -.02em; color: #fff;
  }
  .section-title em { font-style: italic; color: #2ab0b6; }

  .ap-car-outer { overflow: hidden; width: 100%; cursor: grab; user-select: none; }
  .ap-car-outer:active { cursor: grabbing; }
  .ap-car-track {
    display: flex; gap: 16px;
    padding: 0 clamp(1.25rem,5vw,5rem) 8px;
    width: max-content;
    animation: ap-car-scroll 28s linear infinite;
    will-change: transform;
  }
  .ap-car-track:hover { animation-play-state: paused; }
  @keyframes ap-car-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ap-car-card {
    position: relative;
    width: clamp(220px, 22vw, 300px);
    aspect-ratio: 3 / 4;
    border-radius: 12px; overflow: hidden; flex-shrink: 0; cursor: pointer;
    transition: transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s;
  }
  .ap-car-card:hover { transform: translateY(-20px) scale(1.03); box-shadow: 0 40px 80px rgba(0,0,0,.65); z-index: 2; }
  .ap-car-card__img {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
    filter: brightness(.65) saturate(.85);
    transition: transform .7s cubic-bezier(.16,1,.3,1), filter .5s; pointer-events: none;
  }
  .ap-car-card:hover .ap-car-card__img { transform: scale(1.07); filter: brightness(.32) saturate(1.15); }
  .ap-car-card__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(13,17,23,.92) 0%, rgba(13,17,23,.15) 50%, transparent 100%);
    transition: background .5s; pointer-events: none;
  }
  .ap-car-card:hover .ap-car-card__overlay { background: linear-gradient(to top, rgba(13,17,23,.97) 0%, rgba(13,17,23,.55) 55%, rgba(13,17,23,.1) 100%); }
  .ap-car-card__line {
    position: absolute; bottom: 0; left: 0; height: 3px; width: 0;
    background: linear-gradient(90deg, #1B8A8F, #7DC242);
    transition: width .55s cubic-bezier(.16,1,.3,1); pointer-events: none;
  }
  .ap-car-card:hover .ap-car-card__line { width: 100%; }
  .ap-car-card__body {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: clamp(1rem,2.5vw,1.75rem);
  }
  .ap-car-card__num {
    font-size: .6rem; font-weight: 600; letter-spacing: .22em; text-transform: uppercase;
    color: #7DC242; margin-bottom: 6px; display: block;
    transition: transform .45s cubic-bezier(.16,1,.3,1);
  }
  .ap-car-card:hover .ap-car-card__num { transform: translateY(-6px); }
  .ap-car-card h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(.95rem,1.8vw,1.25rem); font-weight: 500;
    color: #fff; line-height: 1.2; margin: 0;
    transition: transform .45s cubic-bezier(.16,1,.3,1);
  }
  .ap-car-card:hover h3 { transform: translateY(-6px); }
  .ap-car-card__desc {
    font-size: clamp(.75rem,1.2vw,.85rem); font-weight: 300;
    color: rgba(255,255,255,.72); line-height: 1.65; margin-top: 9px;
    max-height: 0; overflow: hidden; opacity: 0; transform: translateY(12px);
    transition: max-height .5s cubic-bezier(.16,1,.3,1), opacity .4s .06s, transform .45s cubic-bezier(.16,1,.3,1) .06s;
  }
  .ap-car-card:hover .ap-car-card__desc { max-height: 90px; opacity: 1; transform: translateY(0); }

  /* ── INNOVATION (dark) ───────────────────────── */
  .ap-innov {
    background: #1a2030; padding: clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem);
    position: relative; overflow: hidden;
  }
  .ap-innov::before {
    content: ''; position: absolute; top: -30%; right: -10%; width: 55%; height: 120%;
    background: radial-gradient(ellipse, rgba(27,138,143,.12) 0%, transparent 65%);
  }
  .ap-innov__inner {
    max-width: 1280px; margin-inline: auto;
    display: grid; grid-template-columns: 1fr 1.2fr;
    gap: clamp(3rem,7vw,7rem); align-items: center; position: relative; z-index: 1;
  }
  .ap-innov__label { display: inline-block; font-size: .6875rem; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; color: #2ab0b6; margin-bottom: .75rem; }
  .ap-innov h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.75rem,4vw,3rem); font-weight: 500; line-height: 1.12;
    letter-spacing: -.02em; color: #fff; margin-bottom: 1.5rem;
  }
  .ap-innov h2 em { font-style: italic; color: #2ab0b6; }
  .ap-innov__text p { font-size: .9375rem; font-weight: 300; color: rgba(255,255,255,.43); line-height: 1.9; margin-bottom: 1rem; }
  .ap-innov__features { display: flex; flex-direction: column; gap: 2px; }
  .ap-innov-item {
    display: flex; align-items: flex-start; gap: 1rem;
    background: rgba(255,255,255,.03); border: 1px solid rgba(27,138,143,.12);
    border-radius: 4px; padding: clamp(1.25rem,2.5vw,1.75rem) clamp(1rem,2vw,1.5rem);
    transition: background .3s, border-color .3s;
  }
  .ap-innov-item:hover { background: rgba(27,138,143,.06); border-color: rgba(27,138,143,.3); }
  .ap-innov-item__icon {
    width: 44px; height: 44px; min-width: 44px; border-radius: 10px;
    background: linear-gradient(135deg,#2B3990 0%,#1B8A8F 100%);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 2px;
  }
  .ap-innov-item__icon svg { width: 22px; height: 22px; }
  .ap-innov-item h4 { font-family: 'Playfair Display', Georgia, serif; font-size: 1rem; font-weight: 500; color: #fff; margin-bottom: 4px; }
  .ap-innov-item p { font-size: .8rem; font-weight: 300; color: rgba(255,255,255,.37); line-height: 1.6; margin: 0; }

  /* ── ENGAGEMENT CARDS ───────────────────────── */
  .ap-engage { background: #fff; padding: clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem); }
  .ap-engage__inner { max-width: 1280px; margin-inline: auto; }
  .ap-section-header { text-align: center; margin-bottom: clamp(3rem,6vh,5rem); }
  .ap-section-header p { font-size: .9375rem; font-weight: 300; color: #7a909e; line-height: 1.85; max-width: 54ch; margin-inline: auto; margin-top: 1rem; }
  .ap-engage-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: clamp(1rem,2vw,1.5rem); }
  .ap-engage-card {
    display: flex; align-items: flex-start; gap: 1.25rem;
    padding: clamp(1.5rem,3vw,2.25rem);
    border: 1px solid #eaf0f4; border-radius: 10px;
    transition: border-color .3s, box-shadow .3s, transform .35s cubic-bezier(.16,1,.3,1);
  }
  .ap-engage-card:hover { border-color: #1B8A8F; box-shadow: 0 8px 40px rgba(27,138,143,.1); transform: translateY(-4px); }
  .ap-engage-card__icon {
    width: 44px; height: 44px; min-width: 44px; border-radius: 10px;
    background: linear-gradient(135deg, rgba(43,57,144,.08) 0%, rgba(27,138,143,.1) 100%);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
    transition: background .3s;
  }
  .ap-engage-card:hover .ap-engage-card__icon { background: linear-gradient(135deg, #2B3990 0%, #1B8A8F 100%); }
  .ap-engage-card__icon svg { width: 22px; height: 22px; transition: stroke .3s; }
  .ap-engage-card:hover .ap-engage-card__icon svg { stroke: #fff; }
  .ap-engage-card h3 { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1rem,1.5vw,1.125rem); font-weight: 500; color: #0d1117; margin-bottom: 6px; line-height: 1.3; }
  .ap-engage-card p { font-size: .8375rem; font-weight: 300; color: #7a909e; line-height: 1.7; }

  /* ── CTA ─────────────────────────────────────── */
  .ap-cta {
    position: relative;
    padding: clamp(4rem,8vh,7rem) clamp(1.25rem,5vw,5rem);
    background: linear-gradient(135deg,#1e2b70 0%,#156e73 50%,#1e2b70 100%);
    overflow: hidden; text-align: center;
  }
  .ap-cta::after {
    content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 70%; height: 100%;
    background: radial-gradient(ellipse, rgba(125,194,66,.12) 0%, transparent 65%);
    pointer-events: none;
  }
  .ap-cta__inner { position: relative; z-index: 1; max-width: 620px; margin-inline: auto; }
  .ap-cta__eyebrow { display: inline-block; font-size: .6875rem; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; color: #2ab0b6; margin-bottom: .75rem; }
  .ap-cta h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2rem,5vw,3.5rem); font-weight: 500; line-height: 1.1;
    color: #fff; margin: .75rem 0 1rem; letter-spacing: -.02em;
  }
  .ap-cta h2 em { font-style: italic; color: #2ab0b6; }
  .ap-cta__desc { font-size: .9375rem; font-weight: 300; color: rgba(255,255,255,.5); line-height: 1.75; margin-bottom: 2.5rem; max-width: 44ch; margin-inline: auto; }
  .ap-cta__actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: clamp(.875rem,1.5vw,1rem) clamp(1.75rem,3.5vw,2.5rem);
    font-family: 'Outfit', system-ui, sans-serif;
    font-size: clamp(.75rem,1.5vw,.875rem); font-weight: 500; letter-spacing: .08em;
    border: none; border-radius: 4px; white-space: nowrap; text-decoration: none;
    transition: transform .25s, background .25s, box-shadow .25s;
  }
  .btn:hover { transform: translateY(-3px); }
  .btn--light { background: #fff; color: #0d1117; box-shadow: 0 2px 16px rgba(0,0,0,.15); }
  .btn--light:hover { box-shadow: 0 8px 32px rgba(0,0,0,.25); }
  .btn--ghost { background: transparent; color: rgba(255,255,255,.85); border: 1px solid rgba(255,255,255,.35); }
  .btn--ghost:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.7); }

  /* ── SCROLL REVEAL ───────────────────────────── */
  [data-reveal] { opacity: 0; transform: translateY(32px); transition: opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
  [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
  [data-reveal].is-visible:nth-child(2) { transition-delay: .08s; }
  [data-reveal].is-visible:nth-child(3) { transition-delay: .16s; }
  [data-reveal].is-visible:nth-child(4) { transition-delay: .24s; }

  @keyframes ap-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 1024px) { .ap-innov__inner { grid-template-columns: 1fr; gap: 3rem; } }
  @media (max-width: 768px) {
    .ap-stats__grid { grid-template-columns: repeat(2,1fr); }
    .ap-stat { border-right: none !important; border-bottom: 1px solid #eaf0f4; }
    .ap-stat:nth-child(odd) { border-right: 1px solid #eaf0f4 !important; }
    .ap-stat:nth-last-child(-n+2) { border-bottom: none; }
    .ap-engage-grid { grid-template-columns: 1fr; }
    .ap-car-card { width: clamp(180px,55vw,240px); }
  }
  @media (max-width: 480px) {
    .ap-cta__actions { flex-direction: column; align-items: stretch; }
    .ap-cta__actions .btn { width: 100%; justify-content: center; }
  }
`;

/* ── SVG ICONS ─────────────────────────────────── */
const IconStructure = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V11h6v10"/>
  </svg>
);
const IconVRD = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20M6 20V10l6-7 6 7v10M10 20v-5h4v5"/>
    <circle cx="12" cy="8" r="1" fill="#fff"/>
  </svg>
);
const IconEnergy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H13L13 2z"/>
  </svg>
);
const IconControl = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/>
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
  </svg>
);
const IconBIM = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconEco = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c-4.97 0-9-4.03-9-9 0-4.42 3.05-8.12 7.17-9.19A9.01 9.01 0 0121 13c0 4.97-4.03 9-9 9z"/>
    <path d="M12 22V12M12 12c0-4 3-7 7-8"/>
  </svg>
);

// Innovation section icons
const IconBIMSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconCalc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="10" y2="10"/>
    <line x1="14" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="14" x2="10" y2="14"/>
    <line x1="14" y1="14" x2="16" y2="14"/>
    <line x1="8" y1="18" x2="16" y2="18"/>
  </svg>
);
const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
    <path d="M12 22c-4.97 0-9-4.03-9-9 0-4.42 3.05-8.12 7.17-9.19A9.01 9.01 0 0121 13c0 4.97-4.03 9-9 9z"/>
    <path d="M12 22V12M12 12c0-4 3-7 7-8"/>
  </svg>
);

// Engagement icons
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1B8A8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1B8A8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1B8A8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconHandshake = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1B8A8F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

/* ── DATA ─────────────────────────────────────── */

const expertises = [
  { num: "01", title: "Structures béton armé & métal",       desc: "Conception, calcul et dimensionnement pour tous types de bâtiments et ouvrages d'art.",       img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=75" },
  { num: "02", title: "VRD & Aménagement",                   desc: "Voirie, réseaux divers, drainage, assainissement — études complètes du sol à la surface.",      img: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500&q=75" },
  { num: "03", title: "Optimisation énergétique",            desc: "Audit thermique, solutions passives et actives pour des bâtiments performants et durables.",    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=75" },
  { num: "04", title: "Contrôle & suivi de travaux",         desc: "Missions OPC, maîtrise d'œuvre et assistance à maîtrise d'ouvrage sur chantier.",              img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&q=75" },
  { num: "05", title: "Modélisation BIM",                    desc: "Maquettes numériques 3D, coordination pluridisciplinaire et clash-detection intégrée.",         img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75" },
  { num: "06", title: "Éco-conception & durabilité",         desc: "HQE, matériaux biosourcés et bilan carbone — l'environnement comme paramètre de conception.",  img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=75" },
];

const innovItems = [
  { Icon: IconBIMSmall,  title: "Modélisation BIM",        desc: "Maquettes numériques 3D et coordination pluridisciplinaire pour zéro conflit en phase chantier." },
  { Icon: IconCalc,      title: "Calcul haute performance", desc: "Logiciels certifiés, méthodes éléments finis, simulations dynamiques avancées." },
  { Icon: IconLeaf,      title: "Éco-conception",           desc: "HQE, matériaux biosourcés, bilan carbone — l'environnement comme paramètre de conception." },
];

const engagements = [
  { Icon: IconShield,    title: "Qualité sans compromis",  desc: "Nos livrables respectent les normes les plus exigeantes. Chaque étude est vérifiée et validée en interne avant remise." },
  { Icon: IconEye,       title: "Transparence totale",     desc: "Un interlocuteur dédié, des reportings réguliers et une communication claire à chaque étape du projet." },
  { Icon: IconClock,     title: "Respect des délais",      desc: "Planning contractuel tenu grâce à une organisation rigoureuse et des outils de gestion de projet éprouvés." },
  { Icon: IconHandshake, title: "Partenariat durable",     desc: "Nous construisons des relations de long terme basées sur la confiance, la réactivité et la performance." },
];

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
export default function About() {
  const trackRef  = useRef(null);
  const cursorRef    = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    /* scroll reveal */
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));

    /* drag carousel */
    const outer = trackRef.current?.parentElement;
    if (!outer) return;
    let isDragging = false, startX = 0;
    const onDown = (e) => { isDragging = true; startX = e.pageX; };
    const onUp   = () => { isDragging = false; };
    const onMove = (e) => {
      if (!isDragging) return;
      const track = trackRef.current;
      if (!track) return;
      const dx = e.pageX - startX;
      const cur = new WebKitCSSMatrix(getComputedStyle(track).transform).m41;
      track.style.transform = `translateX(${cur + dx}px)`;
      track.style.animation = "none";
      startX = e.pageX;
    };
    outer.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    outer.addEventListener("mousemove", onMove);

    /* custom cursor */
    const move = (e) => {
      if (cursorRef.current)    cursorRef.current.style.transform    = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px,  ${e.clientY - 4}px)`;
    };
    window.addEventListener("mousemove", move);

    return () => {
      observer.disconnect();
      outer.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      outer.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const allCards = [...expertises, ...expertises];

  return (
    <>
      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot"  ref={cursorDotRef} />
      <style>{css}</style>

      <div className="about-page">
        <Navbar />

        {/* HERO */}
        <section className="ap-hero">
          <div className="ap-hero__inner">
            <p className="ap-eyebrow">À propos d'ENGYTECH</p>
            <h1 className="ap-hero__title">Ingénierie, <em>Performance</em><br />et Innovation Durable</h1>
            <p className="ap-hero__sub">Bureau d'ingénierie spécialisé dans les études techniques, la conception et le suivi de projets de construction.</p>
          </div>
        </section>

   

        {/* TEXTE ORIGINAL */}
        <div className="ap-body">
          <h1 className="ap-body__h1">À propos de nous</h1>
          <p className="ap-body__tagline"><b>ENGYTECH</b> – Ingénierie, Performance et Innovation Durable</p>
          <p><b>ENGYTECH</b> est un bureau d'ingénierie spécialisé dans les études techniques, la conception et le suivi de projets de construction. Forts d'une vision moderne de l'ingénierie, nous accompagnons nos clients en leur proposant des solutions fiables, optimisées et conformes aux exigences techniques les plus élevées.</p>
          <p>Notre approche repose sur une compréhension approfondie des besoins du client, une analyse rigoureuse des contraintes du projet et l'utilisation d'outils d'ingénierie avancés. Chaque projet est traité avec précision, dans le respect des normes en vigueur et des objectifs de qualité, de coût et de délai.</p>
          <div className="ap-divider"><div className="ap-gem" /></div>
          <div className="ap-body__sh"><span className="ap-body__sh-label">Savoir-faire</span><h2>Notre <em>expertise</em></h2></div>
          <p>Nous intervenons dans plusieurs domaines clés de l'ingénierie, notamment les structures en béton armé et métalliques, les études VRD, l'optimisation énergétique des bâtiments ainsi que le suivi et le contrôle technique des travaux. Notre expertise nous permet de garantir la fiabilité et la durabilité des ouvrages, tout en optimisant leur performance globale.</p>
          <p>Grâce à une maîtrise des outils numériques et des méthodes de calcul modernes, nous sommes en mesure de proposer des solutions innovantes, adaptées aux exigences techniques les plus complexes.</p>
          <div className="ap-divider"><div className="ap-gem" /></div>
          <div className="ap-body__sh"><span className="ap-body__sh-label">Relation client</span><h2>Une approche <em>orientée client</em></h2></div>
          <p>Chez <b>ENGYTECH</b>, chaque projet est unique. Nous accordons une attention particulière à l'écoute de nos clients afin de comprendre leurs attentes et leur proposer des solutions personnalisées. Notre objectif est de bâtir une relation de confiance durable basée sur la transparence, la réactivité et la qualité du service.</p>
        </div>

        {/* CAROUSEL */}
        <section className="ap-expertise">
          <div className="ap-expertise__header" data-reveal>
            <span className="section-label">Domaines clés</span>
            <h2 className="section-title">Nos <em>domaines</em> d'intervention</h2>
          </div>
          <div className="ap-car-outer">
            <div className="ap-car-track" ref={trackRef}>
              {allCards.map(({ num, title, desc, img }, i) => (
                <div className="ap-car-card" key={`${num}-${i}`}>
                  <img className="ap-car-card__img" src={img} alt={title} loading="lazy" />
                  <div className="ap-car-card__overlay" />
                  <div className="ap-car-card__line" />
                  <div className="ap-car-card__body">
                    <span className="ap-car-card__num">{num}</span>
                    <h3>{title}</h3>
                    <p className="ap-car-card__desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEXTE — Innovation */}
        <div className="ap-body" style={{ paddingTop: "clamp(3rem,6vh,5rem)" }}>
          <div className="ap-body__sh"><span className="ap-body__sh-label">Innovation et durabilité</span><h2>Innovation et <em>durabilité</em></h2></div>
          <p>Conscients des enjeux environnementaux actuels, nous intégrons une démarche de développement durable dans l'ensemble de nos projets. Nous favorisons des solutions techniques permettant de réduire l'impact environnemental tout en améliorant l'efficacité énergétique des constructions.</p>
          <p>L'innovation est au cœur de notre stratégie. Nous exploitons les nouvelles technologies pour optimiser les performances des projets et anticiper les défis de demain dans le secteur de la construction.</p>
        </div>

        {/* INNOVATION DARK — SVG icons */}
        <section className="ap-innov">
          <div className="ap-innov__inner">
            <div className="ap-innov__text" data-reveal>
              <span className="ap-innov__label">Technologies & méthodes</span>
              <h2>Au cœur de<br /><em>l'innovation</em> technique</h2>
              <p>Des outils numériques de pointe au service de votre projet, pour des résultats précis, fiables et durables.</p>
              <p>Nous anticipons les défis de demain en intégrant les méthodes les plus avancées du secteur.</p>
            </div>
            <div className="ap-innov__features">
              {innovItems.map(({ Icon, title, desc }) => (
                <div className="ap-innov-item" key={title} data-reveal>
                  <div className="ap-innov-item__icon"><Icon /></div>
                  <div><h4>{title}</h4><p>{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEXTE — Engagement */}
        <div className="ap-body" style={{ paddingTop: "clamp(3rem,6vh,5rem)" }}>
          <div className="ap-body__sh"><span className="ap-body__sh-label">Notre engagement</span><h2>Notre <em>engagement</em></h2></div>
          <p><b>ENGYTECH</b> s'engage à fournir des prestations de haute qualité en respectant les standards les plus exigeants de l'ingénierie. Notre équipe met tout en œuvre pour garantir la réussite des projets, en alliant expertise technique, rigueur professionnelle et esprit d'innovation.</p>
          <p>Notre ambition est de devenir un partenaire de référence dans le domaine de l'ingénierie, reconnu pour la qualité de ses services et la confiance accordée par ses clients.</p>
        </div>

        {/* ENGAGEMENT CARDS — SVG icons */}
        <section className="ap-engage">
          <div className="ap-engage__inner">
            <div className="ap-section-header" data-reveal>
              <span className="section-label" style={{ color: "#1B8A8F" }}>Nos promesses</span>
              <h2 className="section-title" style={{ color: "#0d1117" }}>Ce que nous vous <em style={{ color: "#1B8A8F" }}>garantissons</em></h2>
              <p>Des engagements concrets qui guident chacune de nos interventions.</p>
            </div>
            <div className="ap-engage-grid">
              {engagements.map(({ Icon, title, desc }) => (
                <div className="ap-engage-card" key={title} data-reveal>
                  <div className="ap-engage-card__icon"><Icon /></div>
                  <div><h3>{title}</h3><p>{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ap-cta">
          <div className="ap-cta__inner">
            <span className="ap-cta__eyebrow">Travaillons ensemble</span>
            <h2>Votre projet mérite<br /><em>l'excellence technique</em></h2>
            <p className="ap-cta__desc">Discutons de vos besoins et construisons ensemble la solution d'ingénierie la plus adaptée à vos objectifs.</p>
            <div className="ap-cta__actions">
              <a href="/devis" className="btn btn--light">Demander un devis →</a>
              <a href="#contact" className="btn btn--ghost">Nous contacter</a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}