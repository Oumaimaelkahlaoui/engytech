import { useEffect, useState } from "react";
import { supabase } from "../../../backend/supabaseClient";

/* ══════════════════════════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════════════════════════ */
const Ic = {
  all:       (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  structure: (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 21V7l3-4 3 4v14M9 12h6"/></svg>,
  vrd:       (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>,
  opc:       (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 5-5"/></svg>,
  fire:      (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 002.5 3z"/></svg>,
  expertise: (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v3l2 2"/></svg>,
  suivi:     (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  energy:    (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  calcul:    (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>,
  cps:       (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
  house:     (c="currentColor") => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  search:    (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  filter:    (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  check:     (c="currentColor") => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  edit:      (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:     (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  clip:      (c="currentColor") => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>,
  close:     (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  save:      (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  inbox:     (c="currentColor") => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
  arrow:     (c="currentColor") => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  stat_docs: (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
  stat_list: (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  stat_ok:   (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  stat_wait: (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  chevL:     (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevR:     (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  chevLL:    (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>,
  chevRR:    (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>,
  logout:    (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  // ── Candidature icons
  users:     (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  phone:     (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>,
  mail:      (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>,
  briefcase: (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/></svg>,
  filetext:  (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  chevDown:  (c="currentColor") => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevUp:    (c="currentColor") => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
  // ── Factures icons
  invoice:   (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  plus:      (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  euro:      (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M4 14h12M19.5 5a9.5 9.5 0 1 0 0 14"/></svg>,
  printer:   (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  eye:       (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

/* ══════════════════════════════════════════════════════════════
   CSS INJECTION
══════════════════════════════════════════════════════════════ */
function injectAll() {
  if (document.getElementById("adm-g")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(link);

  const st = document.createElement("style");
  st.id = "adm-g";
  st.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; overflow: hidden; }
    body { font-family: 'Inter', sans-serif; background: #edf0f8; color: #1e2940; cursor: auto; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-thumb { background: #c5cfe0; border-radius: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }

    /* ── ROOT LAYOUT ── */
    .g-root { display: flex; height: 100vh; overflow: hidden; }

    /* ── SIDEBAR ── */
    .g-side {
      width: 262px; min-width: 262px;
      background: linear-gradient(180deg, #08111f 0%, #0c1628 55%, #0e1c3a 100%);
      display: flex; flex-direction: column;
      height: 100vh; overflow-y: auto; flex-shrink: 0;
      box-shadow: 2px 0 24px rgba(0,0,0,0.28);
      border-right: 1px solid rgba(255,255,255,0.04);
    }

    /* Brand */
    .g-side-brand {
      padding: 18px 16px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      display: flex; align-items: center; gap: 11px;
    }
    .g-brand-orb {
      width: 36px; height: 36px; border-radius: 11px; flex-shrink: 0;
      background: linear-gradient(135deg, #2a7fa5 0%, #4ecda4 100%);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 3px 12px rgba(42,127,165,0.5);
    }
    .g-side-brand-title { font-size: 0.9rem; font-weight: 800; color: #f1f5f9; letter-spacing: -0.01em; line-height: 1.2; }
    .g-side-brand-sub { font-size: 0.62rem; color: rgba(255,255,255,0.22); margin-top: 2px; }

    /* Section collapsible */
    .g-section { overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.04); }
    .g-section-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 14px 9px;
      cursor: pointer; user-select: none;
      transition: background 0.15s;
    }
    .g-section-header:hover { background: rgba(255,255,255,0.03); }
    .g-section-header-left { display: flex; align-items: center; gap: 9px; }
    .g-section-orb {
      width: 26px; height: 26px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .g-section-title { font-size: 0.72rem; font-weight: 700; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.1em; }
    .g-section-count { font-size: 0.6rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.3); }
    .g-section-chevron { color: rgba(255,255,255,0.25); transition: transform 0.2s; flex-shrink: 0; }
    .g-section-chevron.open { transform: rotate(0deg); }
    .g-section-body { padding: 4px 8px 8px; display: flex; flex-direction: column; gap: 1px; }

    /* Nav items */
    .g-nav-item { display: flex; align-items: center; gap: 9px; width: 100%; padding: 7px 10px; border-radius: 9px; border: none; background: none; cursor: pointer; color: rgba(255,255,255,0.3); font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 500; text-align: left; transition: all 0.14s; position: relative; }
    .g-nav-item:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.65); }
    .g-nav-item.on { background: rgba(42,127,165,0.15); color: #e2e8f0; box-shadow: inset 0 0 0 1px rgba(42,127,165,0.25); }
    .g-nav-item.on::before { content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 3px; border-radius: 0 3px 3px 0; background: #4ecda4; }
    .g-nav-dot { width: 26px; height: 26px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.14s; }
    .g-nav-txt { flex: 1; line-height: 1.35; }
    .g-nav-pill { font-size: 0.6rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.25); flex-shrink: 0; transition: all 0.14s; }
    .g-nav-item.on .g-nav-pill { background: rgba(78,205,164,0.2); color: #4ecda4; }

    /* Sidebar footer */
    .g-side-foot { padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: auto; }
    .g-pbar-row { display: flex; justify-content: space-between; font-size: 0.66rem; color: rgba(255,255,255,0.22); margin-bottom: 6px; }
    .g-pbar-row strong { color: rgba(255,255,255,0.45); font-weight: 600; }
    .g-pbar { height: 3px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
    .g-pbar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #2a7fa5 0%, #4ecda4 100%); transition: width 0.55s cubic-bezier(.4,0,.2,1); }
    .g-side-totals { display: flex; gap: 7px; margin-top: 12px; }
    .g-side-total { flex: 1; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 8px 9px; text-align: center; border: 1px solid rgba(255,255,255,0.05); }
    .g-side-total-val { font-size: 1.05rem; font-weight: 700; line-height: 1; }
    .g-side-total-lbl { font-size: 0.56rem; color: rgba(255,255,255,0.22); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.06em; }

    /* Logout */
    .g-logout-wrap { padding: 8px 10px 10px; }
    .g-logout-btn { display: flex; align-items: center; gap: 9px; width: 100%; padding: 8px 12px; border-radius: 9px; border: 1px solid rgba(239,68,68,0.18); background: rgba(239,68,68,0.07); cursor: pointer; color: #f87171; font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; transition: all 0.15s; }
    .g-logout-btn:hover { background: rgba(239,68,68,0.14); border-color: rgba(239,68,68,0.38); }

    /* ── MAIN AREA ── */
    .g-main { flex: 1; display: flex; flex-direction: column; min-width: 0; height: 100vh; overflow: hidden; }
    .g-topbar { background: #fff; padding: 0 24px; border-bottom: 1px solid #e2e8f4; display: flex; align-items: center; justify-content: space-between; gap: 14px; min-height: 60px; flex-shrink: 0; box-shadow: 0 1px 0 #e2e8f4, 0 2px 8px rgba(0,0,0,0.04); flex-wrap: wrap; }
    .g-topbar-left { display: flex; align-items: center; gap: 12px; }
    .g-topbar-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .g-topbar-title { font-size: 0.93rem; font-weight: 800; color: #1e2940; }
    .g-topbar-sub { font-size: 0.69rem; color: #94a3b8; margin-top: 2px; }
    .g-topbar-right { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .g-search-wrap { position: relative; display: flex; align-items: center; }
    .g-search-ico { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; display: flex; }
    .g-search { padding: 0 12px 0 34px; height: 36px; border-radius: 9px; border: 1.5px solid #e2e8f4; font-size: 0.79rem; color: #1e2940; background: #f6f8fc; width: 200px; font-family: 'Inter', sans-serif; transition: border-color 0.15s, box-shadow 0.15s; }
    .g-search:focus { outline: none; border-color: #2a7fa5; box-shadow: 0 0 0 3px rgba(42,127,165,0.12); background: #fff; }
    .g-select-wrap { position: relative; display: flex; align-items: center; }
    .g-select-ico { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; display: flex; }
    .g-select { padding: 0 12px 0 32px; height: 36px; border-radius: 9px; border: 1.5px solid #e2e8f4; font-size: 0.79rem; color: #1e2940; background: #f6f8fc; font-family: 'Inter', sans-serif; cursor: pointer; transition: border-color 0.15s; appearance: none; }
    .g-select:focus { outline: none; border-color: #2a7fa5; }

    /* ── CONTENT ── */
    .g-content { flex: 1; overflow-y: auto; padding: 22px 24px; }
    .g-stats { display: flex; gap: 11px; margin-bottom: 18px; flex-wrap: wrap; }
    .g-stat { background: #fff; border-radius: 13px; padding: 14px 17px; display: flex; align-items: center; gap: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 14px rgba(0,0,0,0.04); flex: 1 1 110px; border: 1px solid #e8edf5; transition: transform 0.18s, box-shadow 0.18s; }
    .g-stat:hover { transform: translateY(-2px); box-shadow: 0 4px 18px rgba(0,0,0,0.09); }
    .g-stat-ico { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .g-stat-val { font-size: 1.45rem; font-weight: 700; color: #1e2940; line-height: 1; }
    .g-stat-lbl { font-size: 0.67rem; color: #94a3b8; margin-top: 4px; font-weight: 500; }
    .g-card { background: #fff; border-radius: 15px; overflow: hidden; border: 1px solid #e8edf5; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 22px rgba(0,0,0,0.04); }
    .g-card-header { padding: 13px 18px; border-bottom: 1px solid #edf0f7; display: flex; align-items: center; justify-content: space-between; background: #f8fafd; }
    .g-card-header-left { display: flex; align-items: center; gap: 9px; }
    .g-card-header-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .g-card-header-title { font-size: 0.78rem; font-weight: 700; color: #1e2940; }
    .g-card-header-count { font-size: 0.7rem; color: #94a3b8; background: #eef1f8; padding: 2px 9px; border-radius: 20px; font-weight: 600; }
    .g-table-wrap { overflow-x: auto; }
    .g-table { width: 100%; border-collapse: collapse; font-size: 0.79rem; }
    .g-table thead tr { background: #f8fafc; border-bottom: 1.5px solid #edf0f7; }
    .g-table thead th { padding: 10px 14px; text-align: left; font-size: 0.61rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9aaac0; white-space: nowrap; }
    .g-table tbody tr { transition: background 0.1s; border-bottom: 1px solid #f0f3fa; }
    .g-table tbody tr:last-child { border-bottom: none; }
    .g-table tbody tr:nth-child(even) { background: #fafbff; }
    .g-table tbody tr:hover { background: #f0f4ff !important; }
    .g-table td { padding: 11px 14px; color: #334155; vertical-align: middle; }

    /* ── PAGINATION ── */
    .g-pagination { padding: 11px 18px; border-top: 1px solid #edf0f7; background: #f8fafd; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .g-pag-info { font-size: 0.71rem; color: #94a3b8; }
    .g-pag-info strong { color: #334155; }
    .g-pag-controls { display: flex; align-items: center; gap: 3px; }
    .g-pag-btn { width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid #e2e8f4; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; transition: all 0.13s; flex-shrink: 0; }
    .g-pag-btn:hover:not(:disabled) { border-color: #2a7fa5; color: #2a7fa5; background: #f0f7ff; }
    .g-pag-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .g-pag-num { min-width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid transparent; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; font-size: 0.77rem; font-weight: 600; font-family: 'Inter', sans-serif; transition: all 0.13s; padding: 0 4px; }
    .g-pag-num:hover { background: #f0f7ff; color: #2a7fa5; }
    .g-pag-num.active { background: #2a7fa5; color: #fff; border-color: #2a7fa5; box-shadow: 0 2px 8px rgba(42,127,165,0.35); }
    .g-pag-dots { font-size: 0.77rem; color: #94a3b8; padding: 0 3px; }

    /* ── BADGES & BUTTONS ── */
    .b { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 20px; font-size: 0.67rem; font-weight: 700; border: 1px solid transparent; white-space: nowrap; }
    .b-green  { color: #047857; background: #ecfdf5; border-color: #a7f3d0; }
    .b-red    { color: #b91c1c; background: #fef2f2; border-color: #fecaca; }
    .b-blue   { color: #1d4ed8; background: #eff6ff; border-color: #bfdbfe; }
    .b-indigo { color: #4338ca; background: #eef2ff; border-color: #c7d2fe; }
    .b-violet { color: #6d28d9; background: #f5f3ff; border-color: #ddd6fe; }
    .b-amber  { color: #92400e; background: #fffbeb; border-color: #fde68a; }
    .b-teal   { color: #0f766e; background: #f0fdfa; border-color: #99f6e4; }
    .b-rose   { color: #9d174d; background: #fdf2f8; border-color: #fbcfe8; }
    .b-orange { color: #9a3412; background: #fff7ed; border-color: #fed7aa; }
    .b-gray   { color: #374151; background: #f9fafb; border-color: #e5e7eb; }
    .b-emerald{ color: #065f46; background: #d1fae5; border-color: #6ee7b7; }
    .g-btn { display: inline-flex; align-items: center; gap: 5px; padding: 5px 11px; border-radius: 8px; font-size: 0.72rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.14s; white-space: nowrap; }
    .g-btn:hover { transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,0.11); }
    .g-btn:active { transform: translateY(0); }
    .g-btn-green { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .g-btn-blue  { background: #eff4ff; color: #4f7cff; border: 1px solid #c7d7fe; }
    .g-btn-red   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

    /* ── CELLS ── */
    .g-client-name  { font-weight: 600; color: #1e2940; font-size: 0.81rem; }
    .g-client-email { font-size: 0.7rem; color: #64748b; margin-top: 2px; }
    .g-client-phone { font-size: 0.67rem; color: #94a3b8; margin-top: 1px; }
    .g-doc-link { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 6px; font-size: 0.68rem; font-weight: 600; color: #1d4ed8; background: #eff6ff; border: 1px solid #bfdbfe; text-decoration: none; transition: background 0.13s; white-space: nowrap; }
    .g-doc-link:hover { background: #dbeafe; }
    .g-empty { text-align: center; padding: 56px 20px; color: #94a3b8; }
    .g-empty-ico { margin-bottom: 12px; display: flex; justify-content: center; opacity: 0.4; }
    .g-empty h4 { font-size: 0.9rem; font-weight: 600; color: #64748b; }
    .g-empty p  { font-size: 0.82rem; margin-top: 4px; }

    /* ── WELCOME ── */
    .g-welcome { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 40px; color: #94a3b8; background: linear-gradient(135deg, #f7f9ff 0%, #edf0f8 100%); }
    .g-welcome-ico { margin-bottom: 18px; opacity: 0.22; display: flex; justify-content: center; }
    .g-welcome h2 { font-size: 1.1rem; font-weight: 800; color: #334155; margin-bottom: 8px; }
    .g-welcome p  { font-size: 0.82rem; line-height: 1.7; }
    .g-welcome-hint { margin-top: 22px; padding: 11px 18px; background: #fff; border: 1px solid #e2e8f4; border-radius: 11px; font-size: 0.77rem; color: #64748b; display: flex; align-items: center; gap: 8px; }

    /* ── MODAL ── */
    .g-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(8,12,28,0.58); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 20px; }
    .g-modal { background: #fff; border-radius: 20px; padding: 26px 30px; width: 100%; max-width: 620px; box-shadow: 0 40px 100px rgba(0,0,0,0.24); max-height: 90vh; overflow-y: auto; animation: slideUp 0.2s cubic-bezier(.4,0,.2,1) both; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(18px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .g-modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #f0f3fa; }
    .g-modal-head-left { display: flex; align-items: center; gap: 11px; }
    .g-modal-head-ico { width: 34px; height: 34px; border-radius: 10px; background: #eef1ff; border: 1px solid #c7d2fe; display: flex; align-items: center; justify-content: center; }
    .g-modal-head h3 { font-size: 0.97rem; font-weight: 800; color: #1e2940; }
    .g-modal-close { background: #f6f8fc; border: 1px solid #e2e8f4; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; transition: all 0.13s; }
    .g-modal-close:hover { background: #e8edf5; color: #1e2940; }
    .g-modal-section-lbl { font-size: 0.61rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 11px; margin-top: 2px; display: flex; align-items: center; gap: 8px; }
    .g-modal-section-lbl::after { content: ''; flex: 1; height: 1px; background: #f0f3fa; }
    .g-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px; }
    .g-field { display: flex; flex-direction: column; gap: 5px; }
    .g-field.full { grid-column: 1/-1; }
    .g-field label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; }
    .g-field input, .g-field textarea { padding: 8px 11px; border-radius: 9px; border: 1.5px solid #e2e8f4; font-size: 0.82rem; color: #1e2940; background: #f8fafc; width: 100%; font-family: 'Inter', sans-serif; transition: border-color 0.15s, box-shadow 0.15s; }
    .g-field textarea { min-height: 72px; resize: vertical; }
    .g-field input:focus, .g-field textarea:focus { outline: none; border-color: #2a7fa5; box-shadow: 0 0 0 3px rgba(42,127,165,0.12); background: #fff; }
    .g-modal-foot { display: flex; gap: 10px; justify-content: flex-end; padding-top: 14px; border-top: 1px solid #f0f3fa; }
    .g-save { padding: 9px 22px; border-radius: 10px; border: none; background: linear-gradient(135deg, #1b2f6e 0%, #2a7fa5 55%, #3ab87a 100%); color: #fff; font-weight: 700; font-size: 0.82rem; cursor: pointer; font-family: 'Inter', sans-serif; box-shadow: 0 3px 12px rgba(42,127,165,0.4); transition: all 0.15s; display: flex; align-items: center; gap: 7px; }
    .g-save:hover { box-shadow: 0 5px 18px rgba(42,127,165,0.5); transform: translateY(-1px); }
    .g-cancel { padding: 9px 18px; border-radius: 10px; border: 1.5px solid #e2e8f4; background: #fff; color: #334155; font-weight: 600; font-size: 0.82rem; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.13s; display: flex; align-items: center; gap: 7px; }
    .g-cancel:hover { background: #f6f8fc; }
    .fade-in { animation: slideUp 0.2s cubic-bezier(.4,0,.2,1) both; }

    /* ── CANDIDATURE DETAIL MODAL ── */
    .g-cand-modal-ico { width: 38px; height: 38px; border-radius: 12px; background: linear-gradient(135deg,#1b2f6e,#2a7fa5); display:flex; align-items:center; justify-content:center; }
    .g-cand-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .g-cand-info-item { background: #f8fafd; border-radius: 10px; padding: 11px 13px; border: 1px solid #edf1f8; }
    .g-cand-info-label { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 4px; display: flex; align-items: center; gap: 5px; }
    .g-cand-info-value { font-size: 0.82rem; font-weight: 500; color: #1e2940; }
    .g-cand-msg { background: #f8fafd; border-radius: 10px; padding: 13px 14px; border: 1px solid #edf1f8; font-size: 0.81rem; color: #334155; line-height: 1.65; white-space: pre-wrap; margin-top: 2px; }

    @media (max-width: 768px) { .g-side { width: 200px; min-width: 200px; } .g-content { padding: 14px; } .g-modal-grid { grid-template-columns: 1fr; } }

    /* ── FACTURES ── */
    .g-fact-form { background: #fff; border-radius: 15px; border: 1px solid #e8edf5; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 22px rgba(0,0,0,0.04); overflow: hidden; }
    .g-fact-form-header { padding: 14px 20px; border-bottom: 1px solid #edf0f7; background: #f8fafd; display: flex; align-items: center; gap: 10px; }
    .g-fact-form-body { padding: 22px; }
    .g-fact-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
    .g-fact-grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 18px; }
    .g-fact-label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 5px; display: block; }
    .g-fact-input { width: 100%; padding: 9px 12px; border-radius: 9px; border: 1.5px solid #e2e8f4; font-size: 0.82rem; color: #1e2940; background: #f8fafc; font-family: 'Inter', sans-serif; transition: border-color 0.15s, box-shadow 0.15s; }
    .g-fact-input:focus { outline: none; border-color: #2a7fa5; box-shadow: 0 0 0 3px rgba(42,127,165,0.12); background: #fff; }
    .g-items-table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
    .g-items-table th { padding: 8px 10px; text-align: left; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; background: #f8fafc; border-bottom: 1.5px solid #edf0f7; }
    .g-items-table td { padding: 7px 6px; border-bottom: 1px solid #f0f3fa; vertical-align: middle; }
    .g-items-table tr:last-child td { border-bottom: none; }
    .g-item-input { width: 100%; padding: 7px 9px; border-radius: 7px; border: 1.5px solid transparent; font-size: 0.8rem; color: #1e2940; background: transparent; font-family: 'Inter', sans-serif; transition: border-color 0.15s, background 0.15s; }
    .g-item-input:focus { outline: none; border-color: #2a7fa5; background: #fff; box-shadow: 0 0 0 2px rgba(42,127,165,0.1); }
    .g-item-total { font-size: 0.8rem; font-weight: 700; color: #1e2940; padding: 7px 9px; white-space: nowrap; }
    .g-btn-add-item { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 8px; border: 1.5px dashed #c9d4e8; background: #f8fafd; color: #64748b; font-size: 0.75rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.15s; }
    .g-btn-add-item:hover { border-color: #2a7fa5; color: #2a7fa5; background: #f0f7ff; }
    .g-fact-totals { background: #f8fafd; border-radius: 11px; border: 1px solid #edf0f7; padding: 16px 20px; display: flex; flex-direction: column; gap: 9px; }
    .g-fact-total-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #64748b; }
    .g-fact-total-row.ttc { font-size: 1rem; font-weight: 800; color: #1e2940; padding-top: 9px; border-top: 2px solid #e2e8f4; margin-top: 2px; }
    .g-fact-total-row.ttc span:last-child { color: #2a7fa5; }
    .g-btn-print { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 10px; border: none; background: linear-gradient(90deg,#1b2f6e,#2a7fa5,#3ab87a); color: #fff; font-weight: 700; font-size: 0.82rem; cursor: pointer; font-family: 'Inter', sans-serif; box-shadow: 0 3px 12px rgba(42,127,165,0.38); transition: all 0.15s; }
    .g-btn-print:hover { box-shadow: 0 6px 20px rgba(42,127,165,0.48); transform: translateY(-1px); }
    .g-fact-list-row:hover { background: #f0f4ff !important; }

    /* Print preview */
    .g-print-overlay { position: fixed; inset: 0; z-index: 400; background: rgba(8,12,28,0.65); backdrop-filter: blur(8px); display: flex; align-items: flex-start; justify-content: center; padding: 20px; overflow-y: auto; }
    .g-print-doc { background: #fff; width: 794px; min-height: 1000px; padding: 56px 64px; box-shadow: 0 40px 100px rgba(0,0,0,0.3); position: relative; border-radius: 4px; }
    .g-print-close { position: fixed; top: 18px; right: 24px; background: #fff; border: 1px solid #e2e8f4; width: 36px; height: 36px; border-radius: 10px; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 10; transition: all 0.13s; }
    .g-print-close:hover { background: #f6f8fc; color: #1e2940; }
    .g-print-btn { position: fixed; top: 18px; right: 70px; background: linear-gradient(90deg,#1b2f6e,#2a7fa5); border: none; padding: 8px 18px; border-radius: 10px; cursor: pointer; color: #fff; font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 700; display: flex; align-items: center; gap: 7px; box-shadow: 0 2px 8px rgba(42,127,165,0.35); transition: all 0.13s; z-index: 10; }
    .g-print-btn:hover { box-shadow: 0 4px 14px rgba(42,127,165,0.5); transform: translateY(-1px); }
@media print {
  body * { visibility: hidden !important; }
  .engy-print-doc, .engy-print-doc * { visibility: visible !important; }
  .engy-print-doc { position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; margin: 0 !important; box-shadow: none !important; border-radius: 0 !important; }
  .engy-print-controls { display: none !important; }
  @page { margin: 0; size: A4; }
}  `;
  document.head.appendChild(st);
}

/* ══════════════════════════════════════════════════════════════
   TYPES CONFIG
══════════════════════════════════════════════════════════════ */
const TYPES = [
  { key: "all",                                                    label: "Toutes les demandes",    icon: Ic.all,       color: "#2a7fa5", bg: "#e0f2ff" },
  { key: "Étude de structure (béton armé / métallique)",           label: "Étude de structure",     icon: Ic.structure, color: "#2563eb", bg: "#eff6ff" },
  { key: "Étude VRD (assainissement, voirie, réseaux)",            label: "Étude VRD",              icon: Ic.vrd,       color: "#0d9488", bg: "#f0fdfa" },
  { key: "OPC – Ordonnancement, Pilotage et Coordination",         label: "OPC",                    icon: Ic.opc,       color: "#7c3aed", bg: "#f5f3ff" },
  { key: "Notice de sécurité incendie",                            label: "Sécurité incendie",      icon: Ic.fire,      color: "#dc2626", bg: "#fef2f2" },
  { key: "Expertise technique et diagnostic des ouvrages",         label: "Expertise technique",    icon: Ic.expertise, color: "#b45309", bg: "#fffbeb" },
  { key: "Suivi et contrôle technique des travaux",                label: "Suivi & contrôle",       icon: Ic.suivi,     color: "#c2410c", bg: "#fff7ed" },
  { key: "Étude d’Efficacité Énergétique du Bâtiment",            label: "Efficacité énergétique", icon: Ic.energy,    color: "#059669", bg: "#ecfdf5" },
  { key: "Note calculs",                                           label: "Note de calculs",        icon: Ic.calcul,    color: "#be185d", bg: "#fdf2f8" },
  { key: "CPS - Métré - estimation",                               label: "CPS / Métré",            icon: Ic.cps,       color: "#0d9488", bg: "#f0fdfa" },
];

const PER_PAGE = 10;

/* ══════════════════════════════════════════════════════════════
   CELL COMPONENTS
══════════════════════════════════════════════════════════════ */
const Dash = () => <span style={{ color: "#dde4f0", fontSize: "0.85rem" }}>—</span>;

function ClientCell({ d }) {
  return (
    <div style={{ minWidth: 140 }}>
      <div className="g-client-name">{d.nomcompelt}</div>
      <div className="g-client-email">{d.email}</div>
      {d.telephone && <div className="g-client-phone">{d.telephone}</div>}
    </div>
  );
}
function BudgetCell({ v }) {
  if (!v) return <Dash />;
  return <span style={{ fontWeight: 700, color: "#1e2940", fontSize: "0.8rem" }}>{Number(v).toLocaleString("fr-MA")}<span style={{ fontSize: "0.65rem", color: "#94a3b8", marginLeft: 3, fontWeight: 500 }}>MAD</span></span>;
}
function DateCell({ v }) {
  if (!v) return <Dash />;
  return <span style={{ whiteSpace: "nowrap", fontSize: "0.78rem", color: "#475569" }}>{new Date(v).toLocaleDateString("fr-MA", { day: "2-digit", month: "short", year: "numeric" })}</span>;
}
function DocsCell({ docs }) {
  if (!docs?.length) return <span style={{ fontSize: "0.71rem", color: "#dde4f0" }}>Aucun</span>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{docs.map((f, i) => <SignedFileLink key={i} file={f} />)}</div>;
}
function StatutBadge({ s }) {
  return s === "traité"
    ? <span className="b b-green">{Ic.check("#047857")} Traité</span>
    : <span className="b b-red"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b91c1c", display: "inline-block", flexShrink: 0 }} /> Nouveau</span>;
}
function ActionCell({ d, cb }) {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {d.status !== "traité" && <button className="g-btn g-btn-green" onClick={() => cb.traite(d.id)}>{Ic.check("#047857")} Traité</button>}
      <button className="g-btn g-btn-blue" onClick={() => cb.edit(d)}>{Ic.edit("#4f7cff")}</button>
      <button className="g-btn g-btn-red"  onClick={() => cb.del(d.id)}>{Ic.trash("#b91c1c")}</button>
    </div>
  );
}
function SignedFileLink({ file }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    supabase.storage.from("documents-projects").createSignedUrl(file.file_path, 60).then(({ data }) => data && setUrl(data.signedUrl));
  }, [file.file_path]);
  if (!url) return <span style={{ color: "#94a3b8", fontSize: "0.71rem" }}>…</span>;
  return <a href={url} target="_blank" rel="noopener noreferrer" className="g-doc-link">{Ic.clip("#1d4ed8")} {file.file_name}</a>;
}

/* ══════════════════════════════════════════════════════════════
   COLUMNS CONFIG
══════════════════════════════════════════════════════════════ */
const COLS = {
  "all": [
    { head: "Client",        render: (d)     => <ClientCell d={d} /> },
    { head: "Type de devis", render: (d)     => <span className="b b-indigo">{d.devis_types?.nom_devis || "—"}</span> },
    { head: "Surface",       render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
    { head: "Statut",        render: (d)     => <StatutBadge s={d.status} /> },
    { head: "Actions",       render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
  ],
  "Étude de structure (béton armé / métallique)": [
    { head: "Client",         render: (d)     => <ClientCell d={d} /> },
    { head: "Type structure", render: (d)     => d.type_structure ? <span className="b b-blue">{d.type_structure}</span> : <Dash /> },
    { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
    { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
    { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
    { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
    { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
  ],
};
// Default cols for types not explicitly listed
function getColsFor(key) {
  return COLS[key] || [
    { head: "Client",      render: (d)     => <ClientCell d={d} /> },
    { head: "Type projet", render: (d)     => d.type_projet || <Dash /> },
    { head: "Surface",     render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
    { head: "Documents",   render: (d)     => <DocsCell docs={d.documents} /> },
    { head: "Statut",      render: (d)     => <StatutBadge s={d.status} /> },
    { head: "Actions",     render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
  ];
}

/* ══════════════════════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════════════════════ */
function Pagination({ total, page, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;
  const from = (page - 1) * perPage + 1;
  const to   = Math.min(page * perPage, total);
  function nums() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const a = [1];
    if (page > 3) a.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) a.push(i);
    if (page < totalPages - 2) a.push("…");
    a.push(totalPages);
    return a;
  }
  const d1 = page === 1, dN = page === totalPages;
  return (
    <div className="g-pagination">
      <div className="g-pag-info"><strong>{from}–{to}</strong> sur <strong>{total}</strong> demande{total !== 1 ? "s" : ""}</div>
      <div className="g-pag-controls">
        <button className="g-pag-btn" disabled={d1} onClick={() => onChange(1)}>{Ic.chevLL(d1 ? "#c5cfe0" : "#64748b")}</button>
        <button className="g-pag-btn" disabled={d1} onClick={() => onChange(page - 1)}>{Ic.chevL(d1 ? "#c5cfe0" : "#64748b")}</button>
        {nums().map((p, i) =>
          p === "…"
            ? <span key={`d${i}`} className="g-pag-dots">…</span>
            : <button key={p} className={`g-pag-num${page === p ? " active" : ""}`} onClick={() => onChange(p)}>{p}</button>
        )}
        <button className="g-pag-btn" disabled={dN} onClick={() => onChange(page + 1)}>{Ic.chevR(dN ? "#c5cfe0" : "#64748b")}</button>
        <button className="g-pag-btn" disabled={dN} onClick={() => onChange(totalPages)}>{Ic.chevRR(dN ? "#c5cfe0" : "#64748b")}</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   EDIT MODAL (devis)
══════════════════════════════════════════════════════════════ */
function EditModal({ data, onChange, onSave, onCancel }) {
  return (
    <div className="g-overlay" onClick={onCancel}>
      <div className="g-modal" onClick={e => e.stopPropagation()}>
        <div className="g-modal-head">
          <div className="g-modal-head-left">
            <div className="g-modal-head-ico">{Ic.edit("#2a7fa5")}</div>
            <h3>Modifier la demande</h3>
          </div>
          <button className="g-modal-close" onClick={onCancel}>{Ic.close()}</button>
        </div>
        <div className="g-modal-section-lbl">Informations client</div>
        <div className="g-modal-grid" style={{ marginBottom: 16 }}>
          {[["Nom complet","nomcompelt"],["Email","email","email"],["Téléphone","telephone","tel"],["Localisation","localisation"]].map(([l,k,t="text"]) => (
            <div className="g-field" key={k}><label>{l}</label><input type={t} value={data[k]??""} onChange={e => onChange({...data,[k]:e.target.value})} /></div>
          ))}
        </div>
        <div className="g-modal-section-lbl">Détails du projet</div>
        <div className="g-modal-grid" style={{ marginBottom: 16 }}>
          {[["Type projet","type_projet"],["Surface (m²)","surface","number"],["Type structure","type_structure"],["Budget (MAD)","budget_projet","number"],["Date démarrage","date_demarrage","date"]].map(([l,k,t="text"]) => (
            <div className="g-field" key={k}><label>{l}</label><input type={t} value={data[k]??""} onChange={e => onChange({...data,[k]:e.target.value})} /></div>
          ))}
          <div className="g-field full"><label>Description</label><textarea value={data.description??""} onChange={e => onChange({...data,description:e.target.value})} /></div>
        </div>
        <div className="g-modal-foot">
          <button className="g-cancel" onClick={onCancel}>{Ic.close()} Annuler</button>
          <button className="g-save"   onClick={onSave}>{Ic.save("#fff")} Sauvegarder</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CANDIDATURE DETAIL MODAL
══════════════════════════════════════════════════════════════ */
function CandidatureModal({ cand, onClose, onTraite, onDelete }) {
  const [cvUrl, setCvUrl] = useState(null);
  useEffect(() => {
    if (cand.cv_path) {
      supabase.storage.from("documents-projects").createSignedUrl(cand.cv_path, 120)
        .then(({ data }) => data && setCvUrl(data.signedUrl));
    }
  }, [cand.cv_path]);

  return (
    <div className="g-overlay" onClick={onClose}>
      <div className="g-modal" onClick={e => e.stopPropagation()}>
        <div className="g-modal-head">
          <div className="g-modal-head-left">
            <div className="g-cand-modal-ico">{Ic.users("#fff")}</div>
            <div>
              <h3 style={{ marginBottom: 2 }}>{cand.nom}</h3>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 400 }}>{cand.poste || "Poste non précisé"}</div>
            </div>
          </div>
          <button className="g-modal-close" onClick={onClose}>{Ic.close()}</button>
        </div>

        <div className="g-modal-section-lbl">Coordonnées</div>
        <div className="g-cand-info-grid" style={{ marginBottom: 18 }}>
          {[
            { icon: Ic.mail, label: "Email",     value: cand.email },
            { icon: Ic.phone,label: "Téléphone", value: cand.telephone || "—" },
            { icon: Ic.briefcase, label: "Poste", value: cand.poste || "—" },
            { icon: Ic.filetext, label: "CV", value: cvUrl
                ? <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="g-doc-link">{Ic.clip("#1d4ed8")} Voir le CV</a>
                : <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>Non fourni</span>
            },
          ].map(({ icon, label, value }) => (
            <div className="g-cand-info-item" key={label}>
              <div className="g-cand-info-label">{icon("#94a3b8")} {label}</div>
              <div className="g-cand-info-value">{value}</div>
            </div>
          ))}
        </div>

        {cand.message && <>
          <div className="g-modal-section-lbl">Message de motivation</div>
          <div className="g-cand-msg">{cand.message}</div>
          <div style={{ marginBottom: 18 }} />
        </>}

        <div className="g-modal-foot">
          <button className="g-btn g-btn-red" onClick={() => { onDelete(cand.id); onClose(); }}>
            {Ic.trash("#b91c1c")} Supprimer
          </button>
          <div style={{ flex: 1 }} />
          <button className="g-cancel" onClick={onClose}>{Ic.close()} Fermer</button>
          {cand.status !== "traité" && (
            <button className="g-save" onClick={() => { onTraite(cand.id); onClose(); }}>
              {Ic.check("#fff")} Marquer traité
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CANDIDATURES VIEW
══════════════════════════════════════════════════════════════ */
function CandidaturesView({ candidatures, onRefresh }) {
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("all");
  const [page, setPage]             = useState(1);
  const [selected, setSelected]     = useState(null);

  useEffect(() => { setPage(1); }, [search, filter]);

  const visible = candidatures.filter(c => {
    const mS = !search || c.nom?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()) || c.poste?.toLowerCase().includes(search.toLowerCase());
    const mF = filter === "all" || (filter === "traité" ? c.status === "traité" : c.status !== "traité");
    return mS && mF;
  });
  const current = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  async function traite(id) {
    await supabase.from("candidatures").update({ status: "traité" }).eq("id", id);
    onRefresh();
  }
  async function del(id) {
    if (!window.confirm("Supprimer cette candidature ?")) return;
    await supabase.from("candidatures").delete().eq("id", id);
    onRefresh();
  }

  const vT = visible.filter(c => c.status === "traité").length;
  const vP = visible.filter(c => c.status !== "traité").length;

  return (
    <>
      <div className="g-topbar">
        <div className="g-topbar-left">
          <div className="g-topbar-icon" style={{ background: "#f0f9ff" }}>{Ic.users("#2a7fa5")}</div>
          <div>
            <div className="g-topbar-title">Candidatures RH</div>
            <div className="g-topbar-sub">{visible.length} candidature{visible.length !== 1 ? "s" : ""} · {vT} traitée{vT !== 1 ? "s" : ""} · {vP} en attente</div>
          </div>
        </div>
        <div className="g-topbar-right">
          <div className="g-search-wrap">
            <span className="g-search-ico">{Ic.search("#94a3b8")}</span>
            <input className="g-search" type="text" placeholder="Nom, email, poste…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="g-select-wrap">
            <span className="g-select-ico">{Ic.filter("#94a3b8")}</span>
            <select className="g-select" value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">Tous les statuts</option>
              <option value="traité">Traitées</option>
              <option value="nouveau">Nouvelles</option>
            </select>
          </div>
        </div>
      </div>

      <div className="g-content fade-in">
        <div className="g-stats">
          {[
            { lbl: "Total",      val: visible.length,                                            ico: Ic.stat_list, c: "#2a7fa518" },
            { lbl: "Traitées",   val: vT,                                                        ico: Ic.stat_ok,   c: "#10b98118" },
            { lbl: "En attente", val: vP,                                                        ico: Ic.stat_wait, c: "#f59e0b18" },
            { lbl: "Avec CV",    val: visible.filter(c => c.cv_path).length,                    ico: Ic.stat_docs, c: "#6382ff18" },
          ].map(({ lbl, val, ico, c }) => (
            <div className="g-stat" key={lbl}>
              <div className="g-stat-ico" style={{ background: c }}>{ico(c.slice(0, -2))}</div>
              <div><div className="g-stat-val">{val}</div><div className="g-stat-lbl">{lbl}</div></div>
            </div>
          ))}
        </div>

        <div className="g-card">
          <div className="g-card-header">
            <div className="g-card-header-left">
              <div className="g-card-header-dot" style={{ background: "#2a7fa5" }} />
              <span className="g-card-header-title">Candidatures reçues</span>
            </div>
            <span className="g-card-header-count">{visible.length} entrée{visible.length !== 1 ? "s" : ""}</span>
          </div>

          {visible.length === 0 ? (
            <div className="g-empty">
              <div className="g-empty-ico">{Ic.inbox("#94a3b8")}</div>
              <h4>Aucune candidature</h4>
              <p>Aucune candidature ne correspond à votre recherche.</p>
            </div>
          ) : (
            <>
              <div className="g-table-wrap">
                <table className="g-table">
                  <thead>
                    <tr>
                      <th>Candidat</th>
                      <th>Poste souhaité</th>
                      <th>CV</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th style={{ width: 140 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div style={{ minWidth: 140 }}>
                            <div className="g-client-name" style={{ cursor: "pointer", color: "#1d4ed8" }} onClick={() => setSelected(c)}>{c.nom}</div>
                            <div className="g-client-email">{c.email}</div>
                            {c.telephone && <div className="g-client-phone">{c.telephone}</div>}
                          </div>
                        </td>
                        <td>
                          {c.poste
                            ? <span className="b b-indigo">{Ic.briefcase("#4338ca")} {c.poste}</span>
                            : <Dash />}
                        </td>
                        <td>
                          {c.cv_path
                            ? <span className="b b-blue">{Ic.clip("#1d4ed8")} Fourni</span>
                            : <span className="b b-gray">Non fourni</span>}
                        </td>
                        <td><DateCell v={c.created_at} /></td>
                        <td><StatutBadge s={c.status} /></td>
                        <td>
                          <div style={{ display: "flex", gap: 5 }}>
                            <button className="g-btn g-btn-blue" onClick={() => setSelected(c)}>{Ic.expertise("#4f7cff")} Voir</button>
                            {c.status !== "traité" && <button className="g-btn g-btn-green" onClick={() => traite(c.id)}>{Ic.check("#047857")}</button>}
                            <button className="g-btn g-btn-red" onClick={() => del(c.id)}>{Ic.trash("#b91c1c")}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination total={visible.length} page={page} perPage={PER_PAGE} onChange={setPage} />
            </>
          )}
        </div>
      </div>

      {selected && (
        <CandidatureModal
          cand={selected}
          onClose={() => setSelected(null)}
          onTraite={async (id) => { await traite(id); setSelected(null); }}
          onDelete={async (id) => { await del(id); setSelected(null); }}
        />
      )}
    </>
  );
}


/* ══════════════════════════════════════════════════════════════
   PRINT PREVIEW MODAL
══════════════════════════════════════════════════════════════ */
function PrintPreview({ facture, items, onClose }) {
  const ht  = Number(facture.total_ht  || 0);
  const tva = Number(facture.tva       || 20);
  const ttc = Number(facture.total_ttc || ht * (1 + tva / 100));
  const fmt = (n) => Number(n || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const dateStr = facture.date_facture
    ? new Date(facture.date_facture + "T00:00:00").toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "—";

  const UNITS = ["","UN","DEUX","TROIS","QUATRE","CINQ","SIX","SEPT","HUIT","NEUF","DIX","ONZE","DOUZE","TREIZE","QUATORZE","QUINZE","SEIZE","DIX-SEPT","DIX-HUIT","DIX-NEUF"];
  const TENS  = ["","","VINGT","TRENTE","QUARANTE","CINQUANTE","SOIXANTE","SOIXANTE","QUATRE-VINGT","QUATRE-VINGT"];
  function centToStr(n) {
    if (n === 0) return "";
    if (n < 20) return UNITS[n];
    const t = Math.floor(n / 10), u = n % 10;
    if (t === 7 || t === 9) return TENS[t - 1] + "-" + UNITS[10 + u];
    return TENS[t] + (u === 1 && t !== 8 ? "-ET-UN" : u > 0 ? "-" + UNITS[u] : "");
  }
  function toWords(n) {
    n = Math.round(n);
    if (n === 0) return "ZÉRO";
    let r = "";
    if (n >= 1000000) { const m = Math.floor(n / 1000000); r += (m === 1 ? "UN MILLION " : toWords(m) + " MILLIONS "); n %= 1000000; }
    if (n >= 1000)    { const k = Math.floor(n / 1000);    r += (k === 1 ? "MILLE " : toWords(k) + " MILLE "); n %= 1000; }
    if (n >= 100)     { const c = Math.floor(n / 100);     r += (c === 1 ? "CENT " : UNITS[c] + " CENT" + (n % 100 === 0 && c > 1 ? "S " : " ")); n %= 100; }
    if (n > 0)        r += centToStr(n);
    return r.trim();
  }
  const ttcWords = toWords(Math.round(ttc)) + " DIRHAMS TTC";

  const prestataire_nom     = facture.prestataire_nom     || "ARCH ENGY TECH";
  const prestataire_adresse = facture.prestataire_adresse || "ROUIDATE 3 N°121 1 MARRAKECH";
  const prestataire_ice     = facture.prestataire_ice     || "003908151000015";
  const F = "Arial, Helvetica, sans-serif";

  /* ── Style helpers ── */
  const thS = (al="left") => ({
    background: "#1b3a6b", color: "#fff",
    padding: "7px 10px", fontSize: 11, fontWeight: "bold",
    textAlign: al, border: "1px solid #2a5080",
    whiteSpace: "nowrap", verticalAlign: "middle",
  });
  const tdS = (al="left", bold=false, bg="#fff") => ({
    padding: "8px 10px", fontSize: 11, textAlign: al,
    fontWeight: bold ? "bold" : "normal",
    background: bg, border: "1px solid #c8d4e8",
    color: "#111", verticalAlign: "middle",
  });
  const row = { display:"flex", gap:0, fontSize:11.5, lineHeight:"1.85", alignItems:"baseline" };
  const kk  = { minWidth:80, color:"#333", fontFamily:F };
  const vv  = { fontFamily:F };
  const sec = { fontSize:13, fontWeight:"bold", textDecoration:"underline", color:"#000", display:"block", marginBottom:6, fontFamily:F };

  /* ══════════ LOGO SVG — exact Engytech ══════════
     Icon: stylized "E" with curved leaf + arrow
     Text: gradient ENGY (green→teal) + TECH (navy)
  ══════════════════════════════════════════════ */
  const EngyLogo = () => (
    <img src="/unnamed.png" alt="Engytech Logo"
      style={{ height: 129, width: "auto", objectFit: "contain", display: "block" , margin: "0 auto"  // ← centre horizontalement
}} />
  );

  /* ── Watermark logo (background) ── */
  const WatermarkLogo = () => (
    <img src="/unnamed1.png" alt=""
      style={{ position:"absolute", top:"83%", left:"83%",
        transform:"translate(-100%,-100%) rotate(-20deg)",
        opacity:0.04, pointerEvents:"none", zIndex:0,
        width: 600, objectFit:"contain" }} />
  );

  return (
    <>
      {/* ── Print CSS: hide controls, show only doc ── */}
  

      <div className="engy-print-root g-print-overlay">
        {/* ── Controls (hidden on print) ── */}
        <div className="engy-print-controls"
          style={{ position:"fixed", top:16, right:16, display:"flex", gap:8, zIndex:10 }}>
         <button className="g-print-btn" onClick={() => {
  // Construire le nom du fichier
  const num    = (facture.numero_facture || "").replace(/\//g, "");
  const projet = facture.devis_projet ? " " + facture.devis_projet : "";
  document.title = `${num}${projet}`;
  window.print();
  // Restaurer le titre après impression
  setTimeout(() => { document.title = "Engytech Admin"; }, 2000);
}}>
  {Ic.printer("#fff")} Imprimer / PDF
</button>
          <button className="g-print-close" onClick={onClose}>{Ic.close()}</button>
        </div>

        {/* ════════════ DOCUMENT A4 ════════════ */}
        <div className="engy-print-doc"
          style={{ background:"#f8fafc", width:794, minHeight:1019,
            padding:"44px 56px 100px", fontFamily:F, color:"#000",
            position:"relative", boxSizing:"border-box",
            boxShadow:"0 20px 60px rgba(0,0,0,0.25)", overflow:"hidden" }}>

          {/* Watermark */}
          <WatermarkLogo />

          {/* ── 1. HEADER: Logo centré + FACTURE droite ── */}
          <div style={{ display:"flex", justifyContent:"space-between",
            alignItems:"flex-start", marginBottom:20, position:"relative", zIndex:1 }}>
            <EngyLogo />
            <div style={{ paddingTop:130, textAlign:"right" }}>
              <span style={{ fontFamily:F, fontSize:24, fontWeight:"bold",
                color:"#1b3a6b", textDecoration:"underline", letterSpacing:3 }}>
                FACTURE
              </span>
            </div>
          </div>

          {/* ── 2. PRESTATAIRE ── */}
          <div style={{ marginBottom:14, position:"relative", zIndex:1 }}>
            <span style={sec}>Prestataire :</span>
            <div style={row}><span style={kk}>Nom</span><span style={{ fontFamily:F }}>:&nbsp;</span><span style={vv}>{prestataire_nom}</span></div>
            <div style={row}><span style={kk}>Adresse</span><span style={{ fontFamily:F }}>:&nbsp;</span><span style={vv}>{prestataire_adresse}</span></div>
            <div style={row}><span style={kk}>ICE</span><span style={{ fontFamily:F }}>:&nbsp;</span><span style={vv}>{prestataire_ice}</span></div>
          </div>

          {/* ── 3. CLIENT ── */}
          <div style={{ marginBottom:14, position:"relative", zIndex:1 }}>
            <span style={sec}>Client :</span>
            <div style={row}><span style={kk}>Nom</span><span style={{ fontFamily:F }}>:&nbsp;</span><span style={vv}>{facture.client_nom}</span></div>
          </div>

          {/* ── 4. INFORMATIONS FACTURE ── */}
          <div style={{ marginBottom:20, position:"relative", zIndex:1 }}>
            <span style={sec}>Informations Facture :</span>
            <div style={row}><span style={kk}>N° Facture</span><span style={{ fontFamily:F }}>:&nbsp;</span><span style={vv}><strong>{facture.numero_facture}</strong></span></div>
            <div style={row}><span style={kk}>Date N°</span><span style={{ fontFamily:F }}>:&nbsp;</span><span style={vv}>{dateStr}</span></div>
            <div style={row}><span style={kk}>Devis Projet</span><span style={{ fontFamily:F }}>:&nbsp;</span><span style={vv}>{facture.devis_projet || "—"}</span></div>
          </div>

          {/* ── 5. TABLEAU ── */}
          <table style={{ width:"100%", borderCollapse:"collapse", position:"relative", zIndex:1 }}>
            <thead>
              <tr>
                <th style={{ ...thS("left"),   width:"42%" }}>Intitulé</th>
                <th style={{ ...thS("center"), width:"8%"  }}>Unité</th>
                <th style={{ ...thS("center"), width:"10%" }}>Qté</th>
                <th style={{ ...thS("right"),  width:"20%" }}>Prix{"\n"}Unitaire</th>
                <th style={{ ...thS("right"),  width:"20%" }}>Prix Hors{"\n"}Taxes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td style={tdS("left",   false, i%2===0?"#eef3fb":"#fff")}>{item.intitule}</td>
                  <td style={tdS("center", false, i%2===0?"#eef3fb":"#fff")}>{item.unite||"F"}</td>
                  <td style={tdS("center", false, i%2===0?"#eef3fb":"#fff")}>{item.quantite}</td>
                  <td style={tdS("right",  false, i%2===0?"#eef3fb":"#fff")}>{fmt(item.prix_unitaire)}</td>
                  <td style={tdS("right",  true,  i%2===0?"#eef3fb":"#fff")}>{fmt(item.total)}</td>
                </tr>
              ))}
              {/* ── Totaux ── */}
              <tr>
                <td colSpan={3} style={{ border:"none", background:"transparent" }}/>
                <td style={{ ...tdS("right",false,"#eaeff8"), fontWeight:600 }}>Total HT</td>
                <td style={{ ...tdS("right",true, "#eaeff8") }}>{fmt(ht)}</td>
              </tr>
              <tr>
                <td colSpan={3} style={{ border:"none", background:"transparent" }}/>
                <td style={{ ...tdS("right",false,"#eaeff8"), fontWeight:600 }}>TVA {tva}%</td>
                <td style={{ ...tdS("right",true, "#eaeff8") }}>{fmt(ht * tva / 100)}</td>
              </tr>
              <tr>
                <td colSpan={3} style={{ border:"none", background:"transparent" }}/>
                <td style={{ ...tdS("right",true,"#1b3a6b"), color:"#fff", fontSize:12 }}>Total TTC</td>
                <td style={{ ...tdS("right",true,"#1b3a6b"), color:"#fff", fontSize:12 }}>{fmt(ttc)}</td>
              </tr>
            </tbody>
          </table>

          {/* ── 6. MONTANT EN LETTRES ── */}
          <div style={{ marginTop:22, marginBottom:26, fontSize:11.5,
            fontFamily:F, color:"#000", position:"relative", zIndex:1 }}>
            La présente facture est arrêtée à la somme de&nbsp;
            <strong>{ttcWords}</strong>
          </div>

          {/* ── 7. SIGNATURE ── */}
          <div style={{ display:"flex", justifyContent:"center",
            marginBottom:20, position:"relative", zIndex:1 }}>
            <div style={{ border:"1.5px solid #1b3a6b", minWidth:330, minHeight:132 }}>
              <div style={{ background:"#1b3a6b", color:"#fff", fontSize:11,
                fontWeight:"bold", padding:"6px 14px", textAlign:"center", fontFamily:F }}>
                Signature et Cachet {prestataire_nom}
              </div>
              <div style={{ height:137 }}/>
            </div>
          </div>

          {/* ── 8. PIED DE PAGE (absolu en bas) ── */}
          <div style={{ position:"absolute", bottom:0, left:-29, right:-29,
            borderTop:"1.5px solid #1b3a6b", padding:"8px 28px 0",
            textAlign:"center", fontSize:8.5, color:"#334155",
            lineHeight:1.95, background:"#fff", fontFamily:F, zIndex:1 }}>
            <div style={{ fontWeight:"bold", fontSize:9 }}>
              {prestataire_nom} SARL.AU | Siège Social : ROUIDATE 3 N°121 – Marrakech (CP : 40000) – Maroc
            </div>
            <div>Capital : 100 000 Dhs – Taxe professionnelle : 45318122 – RC : 177925 – IF : 71876394 – ICE : {prestataire_ice}</div>
            <div>Courriel : contact@archengytech.ma – GSM : 00212 6 62 25 78 79</div>
            <div>R.I.B : 230 450 70472552102770036</div>
            <div>I.B.A.N : MA 64230450704725522102770036 – CIHM MAMC</div>
            <div style={{ height:8, marginTop:6,
              background:"linear-gradient(90deg,#1b3a6b 0%,#2a7fa5 40%,#3ab87a 100%)" }}/>
          </div>
        </div>
      </div>
    </>
  );
}


/* ══════════════════════════════════════════════════════════════
   FACTURES VIEW
══════════════════════════════════════════════════════════════ */
const EMPTY_ITEM = () => ({ intitule: "", unite: "F", quantite: "50%", prix_unitaire: 0, total: 0 });

function FacturesView() {
  /* ── Tabs : "list" | "create" ── */
  const [tab,          setTab]          = useState("list");
  const [factures,     setFactures]     = useState([]);
  const [search,       setSearch]       = useState("");
  const [page,         setPage]         = useState(1);
  const [previewFact,  setPreviewFact]  = useState(null);
  const [previewItems, setPreviewItems] = useState([]);
  const [saving,       setSaving]       = useState(false);

  /* ── Create form state ── */
  const [form, setForm] = useState({
    numero_facture: "",
    date_facture: new Date().toISOString().slice(0, 10),
    // Prestataire (fixed Engytech info — editable)
    prestataire_nom:     "ARCH ENGY TECH",
    prestataire_adresse: "ROUIDATE 3 N°121 1 MARRAKECH",
    prestataire_ice:     "003908151000015",
    // Client
    client_nom: "",
    // Projet
    devis_projet: "",
    tva: 20,
  });
  const [items, setItems] = useState([EMPTY_ITEM()]);

  useEffect(() => { fetchFactures(); }, []);
  useEffect(() => { setPage(1); }, [search]);

  async function fetchFactures() {
    const { data, error } = await supabase
      .from("factures")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setFactures(data || []);
  }

  /* ── Item helpers ── */
function updateItem(i, field, val) {
  setItems(prev => {
    const next = [...prev];
    next[i] = { ...next[i], [field]: val };

    // 🔹 convertir quantité (% ou nombre)
    const getQty = (qte) => {
      if (!qte) return 0;
      const num = parseFloat(qte);
      if (isNaN(num)) return 0;
      return qte.toString().includes("%") ? num / 100 : num;
    };

    const q = getQty(next[i].quantite);
    const p = parseFloat(next[i].prix_unitaire) || 0;

    next[i].total = q * p;

    return next;
  });
}
  function addItem()    { setItems(prev => [...prev, EMPTY_ITEM()]); }
  function removeItem(i){ setItems(prev => prev.filter((_, idx) => idx !== i)); }

const totalHT = items.reduce((sum, it) => {
  return sum + (parseFloat(it.total) || 0);
}, 0);

const tvaRate = parseFloat(form.tva) || 0;
const tvaAmt = totalHT * tvaRate / 100;

const totalTTC = totalHT + tvaAmt;

const fmt = (n) =>
  new Intl.NumberFormat("fr-MA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(isNaN(n) ? 0 : n);
  /* ── Save facture ── */
  async function saveFacture() {
    if (!form.client_nom.trim()) { alert("Le nom du client est requis."); return; }
    if (!form.numero_facture.trim()) { alert("Le numéro de facture est requis."); return; }
    setSaving(true);
    try {
      const { data: factData, error: factErr } = await supabase
        .from("factures")
        .insert([{
          numero_facture:      form.numero_facture,
          client_nom:          form.client_nom,
          devis_projet:        form.devis_projet || null,
          date_facture:        form.date_facture,
          total_ht:            totalHT,
          tva:                 parseFloat(form.tva) || 20,
          total_ttc:           totalTTC,
        }])
        .select()
        .single();

      if (factErr) { console.error(factErr); alert("Erreur lors de la création."); return; }

      const factureId = factData.id;
      const itemsToInsert = items
        .filter(it => it.intitule.trim())
        .map(it => ({
          facture_id:   factureId,
          intitule:     it.intitule,
          quantite:     parseFloat(it.quantite) || 0,
          prix_unitaire: parseFloat(it.prix_unitaire) || 0,
          total:        parseFloat(it.total) || 0,
        }));

      if (itemsToInsert.length) {
        const { error: itemErr } = await supabase.from("facture_items").insert(itemsToInsert);
        if (itemErr) console.error(itemErr);
      }

      // Reset form
      setForm({ numero_facture: "", client_nom: "", devis_projet: "", date_facture: new Date().toISOString().slice(0, 10), tva: 20 });
      setItems([EMPTY_ITEM()]);
      await fetchFactures();
      setTab("list");
    } finally {
      setSaving(false);
    }
  }

  /* ── Preview ── */
  async function openPreview(fact) {
    const { data } = await supabase.from("facture_items").select("*").eq("facture_id", fact.id).order("created_at");
    setPreviewFact(fact);
    setPreviewItems(data || []);
  }

  /* ── Delete ── */
  async function deleteFact(id) {
    if (!window.confirm("Supprimer cette facture ?")) return;
    await supabase.from("factures").delete().eq("id", id);
    fetchFactures();
  }

  const visible = factures.filter(f =>
    !search || f.client_nom?.toLowerCase().includes(search.toLowerCase()) ||
    f.numero_facture?.toLowerCase().includes(search.toLowerCase()) ||
    f.devis_projet?.toLowerCase().includes(search.toLowerCase())
  );
  const current = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      {/* TOP BAR */}
      <div className="g-topbar">
        <div className="g-topbar-left">
          <div className="g-topbar-icon" style={{ background: "#f0fdf4" }}>{Ic.invoice("#059669")}</div>
          <div>
            <div className="g-topbar-title">Facturation</div>
            <div className="g-topbar-sub">{factures.length} facture{factures.length !== 1 ? "s" : ""} · {factures.reduce((s, f) => s + (f.total_ttc || 0), 0).toLocaleString("fr-MA")} MAD TTC total</div>
          </div>
        </div>
        <div className="g-topbar-right">
          {tab === "list" && (
            <>
              <div className="g-search-wrap">
                <span className="g-search-ico">{Ic.search("#94a3b8")}</span>
                <input className="g-search" type="text" placeholder="Client, numéro, projet…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="g-btn-print" onClick={() => setTab("create")}>
                {Ic.plus("#fff")} Nouvelle facture
              </button>
            </>
          )}
          {tab === "create" && (
            <button className="g-cancel" style={{ padding: "7px 14px" }} onClick={() => setTab("list")}>
              {Ic.chevL()} Retour à la liste
            </button>
          )}
        </div>
      </div>

      <div className="g-content fade-in">

        {/* ─── LISTE ─── */}
        {tab === "list" && (
          <>
            <div className="g-stats">
              {[
                { lbl: "Total factures",  val: factures.length,                                                                    ico: Ic.stat_list, c: "#2a7fa518" },
                { lbl: "CA HT total",     val: `${factures.reduce((s,f)=>s+(f.total_ht||0),0).toLocaleString("fr-MA")} MAD`,      ico: Ic.euro,      c: "#10b98118" },
                { lbl: "CA TTC total",    val: `${factures.reduce((s,f)=>s+(f.total_ttc||0),0).toLocaleString("fr-MA")} MAD`,     ico: Ic.euro,      c: "#6382ff18" },
              ].map(({ lbl, val, ico, c }) => (
                <div className="g-stat" key={lbl}>
                  <div className="g-stat-ico" style={{ background: c }}>{ico(c.slice(0,-2))}</div>
                  <div><div className="g-stat-val" style={{ fontSize: typeof val === "string" ? "0.9rem" : "1.45rem" }}>{val}</div><div className="g-stat-lbl">{lbl}</div></div>
                </div>
              ))}
            </div>

            <div className="g-card">
              <div className="g-card-header">
                <div className="g-card-header-left">
                  <div className="g-card-header-dot" style={{ background: "#059669" }} />
                  <span className="g-card-header-title">Liste des factures</span>
                </div>
                <span className="g-card-header-count">{visible.length} facture{visible.length !== 1 ? "s" : ""}</span>
              </div>

              {visible.length === 0 ? (
                <div className="g-empty">
                  <div className="g-empty-ico">{Ic.inbox("#94a3b8")}</div>
                  <h4>Aucune facture</h4>
                  <p>Cliquez sur "Nouvelle facture" pour commencer.</p>
                </div>
              ) : (
                <>
                  <div className="g-table-wrap">
                    <table className="g-table">
                      <thead>
                        <tr>
                          <th>N° Facture</th>
                          <th>Client</th>
                          <th>Projet</th>
                          <th>Date</th>
                          <th style={{ textAlign: "right" }}>Total HT</th>
                          <th style={{ textAlign: "right" }}>TVA</th>
                          <th style={{ textAlign: "right" }}>Total TTC</th>
                          <th style={{ width: 110 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {current.map(f => (
                          <tr key={f.id} className="g-fact-list-row">
                            <td><span className="b b-indigo">{Ic.invoice("#4338ca")} {f.numero_facture}</span></td>
                            <td><div className="g-client-name">{f.client_nom}</div></td>
                            <td><span style={{ fontSize: "0.78rem", color: "#64748b" }}>{f.devis_projet || "—"}</span></td>
                            <td>{f.date_facture ? new Date(f.date_facture).toLocaleDateString("fr-MA", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                            <td style={{ textAlign: "right", fontWeight: 600, color: "#334155", fontSize: "0.82rem" }}>{(f.total_ht||0).toLocaleString("fr-MA")} MAD</td>
                            <td style={{ textAlign: "right", color: "#94a3b8", fontSize: "0.78rem" }}>{f.tva||20}%</td>
                            <td style={{ textAlign: "right" }}>
                              <span style={{ fontWeight: 800, color: "#059669", fontSize: "0.88rem" }}>{(f.total_ttc||0).toLocaleString("fr-MA")} MAD</span>
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: 4 }}>
                                <button className="g-btn g-btn-blue"  onClick={() => openPreview(f)}>{Ic.eye("#4f7cff")}</button>
                                <button className="g-btn g-btn-red"   onClick={() => deleteFact(f.id)}>{Ic.trash("#b91c1c")}</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination total={visible.length} page={page} perPage={PER_PAGE} onChange={setPage} />
                </>
              )}
            </div>
          </>
        )}

        {/* ─── CRÉATION ─── */}
        {tab === "create" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18, alignItems: "start" }}>

            {/* Formulaire principal */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Infos générales */}
              <div className="g-fact-form">
                <div className="g-fact-form-header">
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(42,127,165,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2a7fa5" }}>{Ic.invoice("#2a7fa5")}</div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e2940" }}>Informations générales</span>
                </div>
                <div className="g-fact-form-body">
                  {/* Numéro + Date */}
                  <div className="g-fact-grid2" style={{ marginBottom: 14 }}>
                    <div>
                      <label className="g-fact-label">N° Facture *</label>
                      <input className="g-fact-input" value={form.numero_facture} onChange={e => setForm(p => ({...p, numero_facture: e.target.value}))} placeholder="FA2026/03" />
                    </div>
                    <div>
                      <label className="g-fact-label">Date de facturation</label>
                      <input className="g-fact-input" type="date" value={form.date_facture} onChange={e => setForm(p => ({...p, date_facture: e.target.value}))} />
                    </div>
                  </div>
                  {/* Prestataire */}
                  <div style={{ background: "#f0f7ff", borderRadius: 9, padding: "12px 14px", marginBottom: 14, border: "1px solid #dbeafe" }}>
                    <div style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1d4ed8", marginBottom: 10 }}>Prestataire</div>
                    <div className="g-fact-grid2" style={{ marginBottom: 10 }}>
                      <div>
                        <label className="g-fact-label">Nom prestataire</label>
                        <input className="g-fact-input" value={form.prestataire_nom} onChange={e => setForm(p => ({...p, prestataire_nom: e.target.value}))} placeholder="ARCH ENGY TECH" />
                      </div>
                      <div>
                        <label className="g-fact-label">ICE</label>
                        <input className="g-fact-input" value={form.prestataire_ice} onChange={e => setForm(p => ({...p, prestataire_ice: e.target.value}))} placeholder="003908151000015" />
                      </div>
                    </div>
                    <div>
                      <label className="g-fact-label">Adresse</label>
                      <input className="g-fact-input" value={form.prestataire_adresse} onChange={e => setForm(p => ({...p, prestataire_adresse: e.target.value}))} placeholder="ROUIDATE 3 N°121 1 MARRAKECH" />
                    </div>
                  </div>
                  {/* Client + Projet */}
                  <div className="g-fact-grid2">
                    <div>
                      <label className="g-fact-label">Nom du client *</label>
                      <input className="g-fact-input" value={form.client_nom} onChange={e => setForm(p => ({...p, client_nom: e.target.value}))} placeholder="Nom complet ou société" />
                    </div>
                    <div>
                      <label className="g-fact-label">Devis / Projet</label>
                      <input className="g-fact-input" value={form.devis_projet} onChange={e => setForm(p => ({...p, devis_projet: e.target.value}))} placeholder="REAMENAGEMENT DU RIAD BLEU…" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lignes de prestation */}
              <div className="g-fact-form">
                <div className="g-fact-form-header">
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(42,127,165,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2a7fa5" }}>{Ic.stat_list("#2a7fa5")}</div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e2940" }}>Prestations / Articles</span>
                </div>
                <div className="g-fact-form-body" style={{ paddingTop: 14 }}>
                  <div style={{ border: "1px solid #edf0f7", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
                    <table className="g-items-table">
                      <thead>
                        <tr>
                          <th style={{ width: "38%" }}>Intitulé</th>
                          <th style={{ width: "9%" }}>Unité</th>
                          <th style={{ width: "12%" }}>Qté</th>
                          <th style={{ width: "18%" }}>Prix unitaire (MAD)</th>
                          <th style={{ width: "16%" }}>Total HT</th>
                          <th style={{ width: "7%" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, i) => (
                          <tr key={i}>
                            <td><input className="g-item-input" value={item.intitule} onChange={e => updateItem(i, "intitule", e.target.value)} placeholder="Description de la prestation…" /></td>
                            <td><input className="g-item-input" value={item.unite} onChange={e => updateItem(i, "unite", e.target.value)} placeholder="F" style={{ textAlign: "center" }} /></td>
                            <td><input className="g-item-input" value={item.quantite} onChange={e => updateItem(i, "quantite", e.target.value)} placeholder="50%" style={{ textAlign: "center" }}  /></td>
                            <td><input className="g-item-input" type="number" min="0" value={item.prix_unitaire} onChange={e => updateItem(i, "prix_unitaire", e.target.value)} style={{ textAlign: "right" }} /></td>
                            <td><div className="g-item-total" style={{ textAlign: "right" }}>{fmt(item.total)}</div></td>
                            <td>
                              {items.length > 1 && (
                                <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "4px", display: "flex", alignItems: "center", borderRadius: 6 }}>
                                  {Ic.trash("#ef4444")}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="g-btn-add-item" onClick={addItem}>
                    {Ic.plus("#64748b")} Ajouter une ligne
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar droite — Totaux + TVA + Sauvegarder */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 0 }}>
              <div className="g-fact-form">
                <div className="g-fact-form-header">
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(5,150,105,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669" }}>{Ic.euro("#059669")}</div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e2940" }}>Récapitulatif</span>
                </div>
                <div className="g-fact-form-body" style={{ paddingTop: 16 }}>
                  <div style={{ marginBottom: 16 }}>
                    <label className="g-fact-label">Taux TVA (%)</label>
                    <input className="g-fact-input" type="number" min="0" max="100" value={form.tva} onChange={e => setForm(p => ({...p, tva: e.target.value}))} />
                  </div>
                  <div className="g-fact-totals">
                    <div className="g-fact-total-row">
                      <span>Total HT</span>
                      <span style={{ fontWeight: 600, color: "#334155" }}>{fmt(totalHT)} MAD</span>
                    </div>
                    <div className="g-fact-total-row">
                      <span>TVA ({form.tva}%)</span>
                      <span style={{ fontWeight: 600, color: "#334155" }}>{fmt(tvaAmt)} MAD</span>
                    </div>
                    <div className="g-fact-total-row ttc">
                      <span>Total TTC</span>
                      <span>{fmt(totalTTC)} MAD</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="g-btn-print"
                style={{ width: "100%", justifyContent: "center", opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}
                onClick={saveFacture}
                disabled={saving}
              >
                {Ic.save("#fff")} {saving ? "Enregistrement…" : "Enregistrer la facture"}
              </button>

              <div style={{ fontSize: "0.68rem", color: "#94a3b8", textAlign: "center", lineHeight: 1.5 }}>
                La facture sera sauvegardée dans<br />votre base de données Supabase.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Print preview */}
      {previewFact && (
        <PrintPreview
          facture={previewFact}
          items={previewItems}
          onClose={() => { setPreviewFact(null); setPreviewItems([]); }}
        />
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  injectAll();

  const [demandes,      setDemandes]      = useState([]);
  const [candidatures,  setCandidatures]  = useState([]);
  const [activeKey,     setActiveKey]     = useState(null);
  const [activeSection, setActiveSection] = useState("devis"); // "devis" | "rh" | "factures"
  const [search,        setSearch]        = useState("");
  const [filterStatut,  setFilterStatut]  = useState("all");
  const [editingId,     setEditingId]     = useState(null);
  const [editData,      setEditData]      = useState({});
  const [page,          setPage]          = useState(1);
  // Sections ouvertes dans la sidebar — les 2 ouvertes par défaut
  const [openSections,  setOpenSections]  = useState({ devis: true, rh: true, factures: true });

  useEffect(() => { fetchDemandes(); fetchCandidatures(); }, []);
  useEffect(() => { setPage(1); }, [activeKey, search, filterStatut, activeSection]);
  const [factures, setFactures] = useState([]);
  useEffect(() => {
    supabase.from("factures").select("*").then(({ data }) => data && setFactures(data));
  }, [activeSection]);

  async function fetchDemandes() {
    const { data, error } = await supabase
      .from("demandes_devis")
      .select("*, devis_types(nom_devis), documents(file_name, file_path)")
      .order("created_at", { ascending: false });
    if (!error) setDemandes(data);
  }
  async function fetchCandidatures() {
    const { data, error } = await supabase
      .from("candidatures")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setCandidatures(data);
  }

  async function marquerTraite(id) {
    await supabase.from("demandes_devis").update({ status: "traité" }).eq("id", id);
    fetchDemandes();
  }
  async function deleteDemande(id) {
    if (!window.confirm("Supprimer cette demande ?")) return;
    await supabase.from("demandes_devis").delete().eq("id", id);
    fetchDemandes();
  }
  function startEdit(d) { setEditingId(d.id); setEditData({ ...d }); }
  async function saveEdit() {
    await supabase.from("demandes_devis").update({
      nomcompelt: editData.nomcompelt, email: editData.email, telephone: editData.telephone,
      surface: editData.surface, type_projet: editData.type_projet, type_structure: editData.type_structure,
      budget_projet: editData.budget_projet, date_demarrage: editData.date_demarrage,
      localisation: editData.localisation, description: editData.description,
    }).eq("id", editingId);
    setEditingId(null);
    fetchDemandes();
  }
  async function handleLogout() {
    if (!window.confirm("Se déconnecter ?")) return;
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const cb = { traite: marquerTraite, edit: startEdit, del: deleteDemande };

  function countFor(key) {
    if (key === "all") return demandes.length;
    return demandes.filter(d => d.devis_types?.nom_devis === key).length;
  }
  function toggleSection(s) {
    setOpenSections(prev => ({ ...prev, [s]: !prev[s] }));
  }

  const activeConf  = TYPES.find(t => t.key === activeKey);
  const activeCols  = activeKey ? getColsFor(activeKey) : [];
  const visibleRows = demandes.filter(d => {
    const matchType   = !activeKey || activeKey === "all" || d.devis_types?.nom_devis === activeKey;
    const matchSearch = !search || d.nomcompelt?.toLowerCase().includes(search.toLowerCase()) || d.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filterStatut === "all" || (filterStatut === "traité" ? d.status === "traité" : d.status !== "traité");
    return matchType && matchSearch && matchStatut;
  });
  const currentRows = visibleRows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages  = Math.ceil(visibleRows.length / PER_PAGE);
  const vTraites    = visibleRows.filter(d => d.status === "traité").length;
  const vPending    = visibleRows.filter(d => d.status !== "traité").length;

  const total   = demandes.length;
  const traites = demandes.filter(d => d.status === "traité").length;
  const pct     = total ? Math.round((traites / total) * 100) : 0;

  const pendingCand = candidatures.filter(c => c.status !== "traité").length;

  return (
    <div className="g-root">

      {/* ════════════════ SIDEBAR ════════════════ */}
      <aside className="g-side">

        {/* Brand */}
        <div className="g-side-brand">
          <div className="g-brand-orb">{Ic.house("#fff")}</div>
          <div>
            <div className="g-side-brand-title">Engytech Admin</div>
            <div className="g-side-brand-sub">Tableau de bord</div>
          </div>
        </div>

        {/* ── Section DEVIS — ouverte par défaut ── */}
        <div className="g-section">
          <div className="g-section-header" onClick={() => toggleSection("devis")}>
            <div className="g-section-header-left">
              <div className="g-section-orb" style={{ background: "rgba(42,127,165,0.15)" }}>
                {Ic.stat_docs("#2a7fa5")}
              </div>
              <span className="g-section-title">Devis</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span className="g-section-count">{total}</span>
              <span className="g-section-chevron">{openSections.devis ? Ic.chevUp() : Ic.chevDown()}</span>
            </div>
          </div>
          {openSections.devis && (
            <div className="g-section-body">
              {TYPES.map(t => {
                const count = countFor(t.key);
                const isOn  = activeSection === "devis" && activeKey === t.key;
                return (
                  <button
                    key={t.key}
                    className={`g-nav-item${isOn ? " on" : ""}`}
                    onClick={() => { setActiveSection("devis"); setActiveKey(t.key); setSearch(""); setFilterStatut("all"); }}
                  >
                    <span className="g-nav-dot" style={{ background: isOn ? t.color + "22" : "rgba(255,255,255,0.04)", color: isOn ? t.color : "rgba(255,255,255,0.3)" }}>
                      {t.icon(isOn ? t.color : "rgba(255,255,255,0.3)")}
                    </span>
                    <span className="g-nav-txt">{t.label}</span>
                    {count > 0 && <span className="g-nav-pill">{count}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Section RH / Candidatures — ouverte par défaut ── */}
        <div className="g-section">
          <div className="g-section-header" onClick={() => toggleSection("rh")}>
            <div className="g-section-header-left">
              <div className="g-section-orb" style={{ background: "rgba(78,205,164,0.12)" }}>
                {Ic.users("#4ecda4")}
              </div>
              <span className="g-section-title">Ressources Humaines</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span className="g-section-count">{candidatures.length}</span>
              <span className="g-section-chevron">{openSections.rh ? Ic.chevUp() : Ic.chevDown()}</span>
            </div>
          </div>
          {openSections.rh && (
            <div className="g-section-body">
              <button
                className={`g-nav-item${activeSection === "rh" ? " on" : ""}`}
                onClick={() => { setActiveSection("rh"); setActiveKey(null); }}
              >
                <span className="g-nav-dot" style={{
                  background: activeSection === "rh" ? "rgba(78,205,164,0.18)" : "rgba(255,255,255,0.04)",
                  color: activeSection === "rh" ? "#4ecda4" : "rgba(255,255,255,0.3)",
                }}>
                  {Ic.briefcase(activeSection === "rh" ? "#4ecda4" : "rgba(255,255,255,0.3)")}
                </span>
                <span className="g-nav-txt">Candidatures</span>
                {candidatures.length > 0 && (
                  <span className="g-nav-pill" style={activeSection === "rh" ? { background: "rgba(78,205,164,0.2)", color: "#4ecda4" } : {}}>
                    {candidatures.length}
                  </span>
                )}
                {pendingCand > 0 && (
                  <span style={{
                    fontSize: "0.55rem", fontWeight: 700,
                    background: "#ef4444", color: "#fff",
                    padding: "1px 6px", borderRadius: 10,
                    flexShrink: 0,
                  }}>
                    {pendingCand} new
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* ── Section FACTURES ── */}
        <div className="g-section">
          <div className="g-section-header" onClick={() => toggleSection("factures")}>
            <div className="g-section-header-left">
              <div className="g-section-orb" style={{ background: "rgba(5,150,105,0.12)" }}>
                {Ic.invoice("#059669")}
              </div>
              <span className="g-section-title">Facturation</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span className="g-section-count">{factures.length}</span>
              <span className="g-section-chevron">{openSections.factures ? Ic.chevUp() : Ic.chevDown()}</span>
            </div>
          </div>
          {openSections.factures && (
            <div className="g-section-body">
              <button
                className={`g-nav-item${activeSection === "factures" ? " on" : ""}`}
                onClick={() => { setActiveSection("factures"); setActiveKey(null); }}
              >
                <span className="g-nav-dot" style={{
                  background: activeSection === "factures" ? "rgba(5,150,105,0.18)" : "rgba(255,255,255,0.04)",
                  color: activeSection === "factures" ? "#059669" : "rgba(255,255,255,0.3)",
                }}>
                  {Ic.invoice(activeSection === "factures" ? "#059669" : "rgba(255,255,255,0.3)")}
                </span>
                <span className="g-nav-txt">Toutes les factures</span>
                {factures.length > 0 && (
                  <span className="g-nav-pill" style={activeSection === "factures" ? { background: "rgba(5,150,105,0.2)", color: "#059669" } : {}}>
                    {factures.length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <div style={{ flex: 1 }} />
        <div className="g-logout-wrap">
          <button className="g-logout-btn" onClick={handleLogout}>
            {Ic.logout("#f87171")}
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Footer stats */}
        <div className="g-side-foot">
          <div className="g-pbar-row"><span>Taux traitement</span><strong>{pct}%</strong></div>
          <div className="g-pbar"><div className="g-pbar-fill" style={{ width: `${pct}%` }} /></div>
          <div className="g-side-totals">
            {[
              { val: total,          lbl: "Total",   color: "#7a9cc4" },
              { val: traites,        lbl: "Traités",  color: "#4ecda4" },
              { val: total - traites, lbl: "Attente", color: "#f87171" },
            ].map(({ val, lbl, color }) => (
              <div className="g-side-total" key={lbl}>
                <div className="g-side-total-val" style={{ color }}>{val}</div>
                <div className="g-side-total-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ════════════════ MAIN ════════════════ */}
      <div className="g-main">

        {/* ── RH / Candidatures ── */}
        {activeSection === "rh" && (
          <CandidaturesView
            candidatures={candidatures}
            onRefresh={fetchCandidatures}
          />
        )}

        {/* ── Factures ── */}
        {activeSection === "factures" && <FacturesView />}

        {/* ── Devis ── */}
        {activeSection === "devis" && !activeKey && (
          <div className="g-welcome">
            <div className="g-welcome-ico">{Ic.arrow("#94a3b8")}</div>
            <h2>Sélectionnez un type de devis</h2>
            <p>Choisissez une catégorie dans le menu de gauche.<br />Chaque type affiche ses propres colonnes.</p>
            <div className="g-welcome-hint">
              {Ic.filter("#64748b")}
              <span>{TYPES.length - 1} types · {total} demande{total !== 1 ? "s" : ""} au total</span>
            </div>
          </div>
        )}

        {activeSection === "devis" && activeKey && activeConf && (
          <>
            <div className="g-topbar">
              <div className="g-topbar-left">
                <div className="g-topbar-icon" style={{ background: activeConf.bg }}>
                  {activeConf.icon(activeConf.color)}
                </div>
                <div>
                  <div className="g-topbar-title">{activeConf.label}</div>
                  <div className="g-topbar-sub">
                    {visibleRows.length} demande{visibleRows.length !== 1 ? "s" : ""} · {vTraites} traitée{vTraites !== 1 ? "s" : ""} · {vPending} en attente
                    {totalPages > 1 && <span> · page {page}/{totalPages}</span>}
                  </div>
                </div>
              </div>
              <div className="g-topbar-right">
                <div className="g-search-wrap">
                  <span className="g-search-ico">{Ic.search("#94a3b8")}</span>
                  <input className="g-search" type="text" placeholder="Rechercher un client…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="g-select-wrap">
                  <span className="g-select-ico">{Ic.filter("#94a3b8")}</span>
                  <select className="g-select" value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
                    <option value="all">Tous les statuts</option>
                    <option value="traité">Traités</option>
                    <option value="nouveau">Nouveaux</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="g-content fade-in">
              <div className="g-stats">
                {[
                  { lbl: "Demandes",   val: visibleRows.length,                                    ico: Ic.stat_list, c: activeConf.color + "18" },
                  { lbl: "Traitées",   val: vTraites,                                              ico: Ic.stat_ok,   c: "#10b98118" },
                  { lbl: "En attente", val: vPending,                                              ico: Ic.stat_wait, c: "#f59e0b18" },
                  { lbl: "Avec docs",  val: visibleRows.filter(d => d.documents?.length > 0).length, ico: Ic.stat_docs, c: "#6382ff18" },
                ].map(({ lbl, val, ico, c }) => (
                  <div className="g-stat" key={lbl}>
                    <div className="g-stat-ico" style={{ background: c }}>{ico(c.slice(0,-2))}</div>
                    <div><div className="g-stat-val">{val}</div><div className="g-stat-lbl">{lbl}</div></div>
                  </div>
                ))}
              </div>

              <div className="g-card">
                <div className="g-card-header">
                  <div className="g-card-header-left">
                    <div className="g-card-header-dot" style={{ background: activeConf.color }} />
                    <span className="g-card-header-title">{activeConf.label}</span>
                  </div>
                  <span className="g-card-header-count">{visibleRows.length} entrée{visibleRows.length !== 1 ? "s" : ""}</span>
                </div>

                {visibleRows.length === 0 ? (
                  <div className="g-empty">
                    <div className="g-empty-ico">{Ic.inbox("#94a3b8")}</div>
                    <h4>Aucune demande</h4>
                    <p>Aucune demande pour ce filtre.</p>
                  </div>
                ) : (
                  <>
                    <div className="g-table-wrap">
                      <table className="g-table">
                        <thead>
                          <tr>{activeCols.map(c => <th key={c.head} style={c.isAction ? { width: 115 } : {}}>{c.head}</th>)}</tr>
                        </thead>
                        <tbody>
                          {currentRows.map(d => (
                            <tr key={d.id}>
                              {activeCols.map(c => <td key={c.head}>{c.render(d, cb)}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination total={visibleRows.length} page={page} perPage={PER_PAGE} onChange={setPage} />
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {editingId && (
        <EditModal
          data={editData}
          onChange={setEditData}
          onSave={saveEdit}
          onCancel={() => setEditingId(null)}
        />
      )}
    </div>
  );
}