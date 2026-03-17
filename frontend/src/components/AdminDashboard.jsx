import { useEffect, useState } from "react";
import { supabase } from "../../../backend/supabaseClient";

const Ic = {
  all:        (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  structure:  (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 21V7l3-4 3 4v14M9 12h6"/></svg>,
  vrd:        (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>,
  opc:        (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 5-5"/></svg>,
  fire:       (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 002.5 3z"/></svg>,
  expertise:  (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v3l2 2"/></svg>,
  suivi:      (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  energy:     (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  calcul:     (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>,
  cps:        (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
  house:      (c="currentColor") => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  search:     (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  filter:     (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  check:      (c="currentColor") => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  edit:       (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:      (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
  clip:       (c="currentColor") => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>,
  close:      (c="currentColor") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  save:       (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  inbox:      (c="currentColor") => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
  arrow:      (c="currentColor") => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  stat_docs:  (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
  stat_list:  (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  stat_ok:    (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  stat_wait:  (c="currentColor") => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  /* ── nouveaux icônes pour pagination + logout ── */
  chevL:   (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevR:   (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  chevLL:  (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>,
  chevRR:  (c="currentColor") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>,
  logout:  (c="currentColor") => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

/* ══════════════════════════════════════════════════════════════
   GLOBAL CSS — identique doc5 + règles pagination + logout
   ══════════════════════════════════════════════════════════════ */
function injectAll() {
  if (document.getElementById("adm-g")) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter:wght@700;800&display=swap";
  document.head.appendChild(link);

  const st = document.createElement("style");
  st.id = "adm-g";
  st.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; overflow: hidden; }
    body { font-family: 'Inter', sans-serif; background: #edf0f8; color: #1e2940; cursor:auto; }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-thumb { background: #c5cfe0; border-radius: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }

    .g-root { display: flex; height: 100vh; overflow: hidden; }

    .g-side {
      width: 258px; min-width: 258px;
      background: linear-gradient(180deg, #0c1322 0%, #0e1828 100%);
      display: flex; flex-direction: column;
      height: 100vh; overflow-y: auto; flex-shrink: 0;
      box-shadow: 2px 0 20px rgba(0,0,0,0.22);
      border-right: 1px solid rgba(255,255,255,0.04);
    }
    .g-side-brand {
      padding: 20px 18px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      display: flex; align-items: center; gap: 11px;
    }
    .g-brand-orb {
      width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, #6382ff 0%, #9f7aea 100%);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 3px 10px rgba(99,130,255,0.45);
    }
    .g-side-brand-title { font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 800; color: #f1f5f9; letter-spacing: -0.01em; line-height: 1.2; }
    .g-side-brand-sub { font-size: 0.66rem; color: #334a6a; margin-top: 2px; }
    .g-side-section { padding: 16px 10px 4px; }
    .g-side-section-lbl { font-size: 0.59rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #1e3050; padding: 0 10px; margin-bottom: 7px; display: flex; align-items: center; gap: 8px; }
    .g-side-section-lbl::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.04); }
    .g-nav-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px; border-radius: 9px; border: none; background: none; cursor: pointer; color: #344f72; font-family: 'Inter', sans-serif; font-size: 0.77rem; font-weight: 500; text-align: left; transition: all 0.14s; margin-bottom: 2px; position: relative; }
    .g-nav-item:hover { background: rgba(255,255,255,0.055); color: #7a9cc4; }
    .g-nav-item.on { background: rgba(99,130,255,0.13); color: #e2e8f0; box-shadow: inset 0 0 0 1px rgba(99,130,255,0.2); }
    .g-nav-item.on::before { content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 3px; border-radius: 0 3px 3px 0; }
    .g-nav-dot { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.14s; }
    .g-nav-txt { flex: 1; line-height: 1.35; }
    .g-nav-pill { font-size: 0.61rem; font-weight: 700; padding: 2px 7px; border-radius: 10px; min-width: 20px; text-align: center; flex-shrink: 0; background: rgba(255,255,255,0.05); color: #253a58; transition: all 0.14s; }
    .g-nav-item.on .g-nav-pill { background: rgba(99,130,255,0.24); color: #7da4ff; }

    /* ── AJOUT logout ── */
    .g-logout-wrap { padding: 10px 12px; border-top: 1px solid rgba(255,255,255,0.05); }
    .g-logout-btn { display: flex; align-items: center; gap: 9px; width: 100%; padding: 8px 10px; border-radius: 9px; border: 1px solid rgba(239,68,68,0.2); background: rgba(239,68,68,0.07); cursor: pointer; color: #f87171; font-family: 'Inter', sans-serif; font-size: 0.77rem; font-weight: 600; text-align: left; transition: all 0.15s; }
    .g-logout-btn:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4); color: #fca5a5; }

    .g-side-foot { padding: 14px 16px 18px; border-top: 1px solid rgba(255,255,255,0.05); }
    .g-pbar-row { display: flex; justify-content: space-between; font-size: 0.66rem; color: #1e3050; margin-bottom: 6px; }
    .g-pbar-row strong { color: #344f72; font-weight: 600; }
    .g-pbar { height: 4px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
    .g-pbar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #6382ff 0%, #34d399 100%); transition: width 0.55s cubic-bezier(.4,0,.2,1); }
    .g-side-totals { display: flex; gap: 8px; margin-top: 13px; }
    .g-side-total { flex: 1; background: rgba(255,255,255,0.03); border-radius: 9px; padding: 9px 10px; text-align: center; border: 1px solid rgba(255,255,255,0.05); }
    .g-side-total-val { font-size: 1.1rem; font-weight: 700; color: #7a9cc4; line-height: 1; }
    .g-side-total-lbl { font-size: 0.59rem; color: #1e3050; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.06em; }

    .g-main { flex: 1; display: flex; flex-direction: column; min-width: 0; height: 100vh; overflow: hidden; }
    .g-topbar { background: #fff; padding: 0 26px; border-bottom: 1px solid #e2e8f4; display: flex; align-items: center; justify-content: space-between; gap: 14px; min-height: 60px; flex-shrink: 0; flex-wrap: wrap; box-shadow: 0 1px 0 #e2e8f4, 0 2px 8px rgba(0,0,0,0.04); }
    .g-topbar-left { display: flex; align-items: center; gap: 13px; }
    .g-topbar-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .g-topbar-title { font-family: 'Inter', sans-serif; font-size: 0.94rem; font-weight: 800; color: #1e2940; }
    .g-topbar-sub { font-size: 0.7rem; color: #94a3b8; margin-top: 2px; }
    .g-topbar-right { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .g-search-wrap { position: relative; display: flex; align-items: center; }
    .g-search-ico { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; display: flex; }
    .g-search { padding: 0 12px 0 34px; height: 36px; border-radius: 9px; border: 1.5px solid #e2e8f4; font-size: 0.8rem; color: #1e2940; background: #f6f8fc; width: 205px; font-family: 'Inter', sans-serif; transition: border-color 0.15s, box-shadow 0.15s, background 0.15s; }
    .g-search:focus { outline: none; border-color: #6382ff; box-shadow: 0 0 0 3px rgba(99,130,255,0.12); background: #fff; }
    .g-select-wrap { position: relative; display: flex; align-items: center; }
    .g-select-ico { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; display: flex; }
    .g-select { padding: 0 12px 0 32px; height: 36px; border-radius: 9px; border: 1.5px solid #e2e8f4; font-size: 0.8rem; color: #1e2940; background: #f6f8fc; font-family: 'Inter', sans-serif; cursor: pointer; transition: border-color 0.15s; appearance: none; padding-right: 12px; }
    .g-select:focus { outline: none; border-color: #6382ff; }
    .g-content { flex: 1; overflow-y: auto; padding: 22px 26px; }
    .g-stats { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
    .g-stat { background: #fff; border-radius: 13px; padding: 14px 18px; display: flex; align-items: center; gap: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 14px rgba(0,0,0,0.03); flex: 1 1 110px; border: 1px solid #e8edf5; transition: transform 0.18s, box-shadow 0.18s; }
    .g-stat:hover { transform: translateY(-2px); box-shadow: 0 4px 18px rgba(0,0,0,0.09); }
    .g-stat-ico { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .g-stat-val { font-size: 1.5rem; font-weight: 700; color: #1e2940; line-height: 1; }
    .g-stat-lbl { font-size: 0.67rem; color: #94a3b8; margin-top: 4px; font-weight: 500; letter-spacing: 0.01em; }
    .g-card { background: #fff; border-radius: 15px; overflow: hidden; border: 1px solid #e8edf5; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 22px rgba(0,0,0,0.04); }
    .g-card-header { padding: 13px 20px; border-bottom: 1px solid #edf0f7; display: flex; align-items: center; justify-content: space-between; background: #f8fafd; }
    .g-card-header-left { display: flex; align-items: center; gap: 9px; }
    .g-card-header-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .g-card-header-title { font-size: 0.78rem; font-weight: 700; color: #1e2940; }
    .g-card-header-count { font-size: 0.7rem; color: #94a3b8; background: #eef1f8; padding: 2px 9px; border-radius: 20px; font-weight: 600; }
    .g-table-wrap { overflow-x: auto; }
    .g-table { width: 100%; border-collapse: collapse; font-size: 0.79rem; }
    .g-table thead tr { background: #f8fafc; border-bottom: 1.5px solid #edf0f7; }
    .g-table thead th { padding: 10px 15px; text-align: left; font-size: 0.61rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9aaac0; white-space: nowrap; }
    .g-table tbody tr { transition: background 0.1s; border-bottom: 1px solid #f0f3fa; }
    .g-table tbody tr:last-child { border-bottom: none; }
    .g-table tbody tr:nth-child(even) { background: #fafbff; }
    .g-table tbody tr:hover { background: #f0f4ff !important; }
    .g-table td { padding: 12px 15px; color: #334155; vertical-align: middle; }
    .g-card-footer { padding: 10px 20px; border-top: 1px solid #f0f3fa; background: #f8fafd; font-size: 0.7rem; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; }

    /* ── AJOUT pagination ── */
    .g-pagination { padding: 11px 18px; border-top: 1px solid #edf0f7; background: #f8fafd; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .g-pag-info { font-size: 0.71rem; color: #94a3b8; }
    .g-pag-info strong { color: #334155; }
    .g-pag-controls { display: flex; align-items: center; gap: 3px; }
    .g-pag-btn { width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid #e2e8f4; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; transition: all 0.13s; flex-shrink: 0; }
    .g-pag-btn:hover:not(:disabled) { border-color: #6382ff; color: #6382ff; background: #f0f2ff; }
    .g-pag-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .g-pag-num { min-width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid transparent; background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; font-size: 0.77rem; font-weight: 600; font-family: 'Inter', sans-serif; transition: all 0.13s; padding: 0 4px; }
    .g-pag-num:hover { background: #f0f2ff; color: #6382ff; }
    .g-pag-num.active { background: #6382ff; color: #fff; border-color: #6382ff; box-shadow: 0 2px 8px rgba(99,130,255,0.32); }
    .g-pag-dots { font-size: 0.77rem; color: #94a3b8; padding: 0 3px; }

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
    .g-btn { display: inline-flex; align-items: center; gap: 5px; padding: 5px 11px; border-radius: 8px; font-size: 0.72rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.14s; white-space: nowrap; }
    .g-btn:hover { transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,0.11); }
    .g-btn:active { transform: translateY(0); }
    .g-btn-green { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .g-btn-blue  { background: #eff4ff; color: #4f7cff; border: 1px solid #c7d7fe; }
    .g-btn-red   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
    .g-client-name  { font-weight: 600; color: #1e2940; font-size: 0.81rem; }
    .g-client-email { font-size: 0.7rem; color: #64748b; margin-top: 2px; }
    .g-client-phone { font-size: 0.67rem; color: #94a3b8; margin-top: 1px; }
    .g-doc-link { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 6px; font-size: 0.68rem; font-weight: 600; color: #1d4ed8; background: #eff6ff; border: 1px solid #bfdbfe; text-decoration: none; transition: background 0.13s; white-space: nowrap; }
    .g-doc-link:hover { background: #dbeafe; }
    .g-empty { text-align: center; padding: 56px 20px; color: #94a3b8; }
    .g-empty-ico { margin-bottom: 12px; display: flex; justify-content: center; opacity: 0.4; }
    .g-empty h4 { font-size: 0.9rem; font-weight: 600; color: #64748b; }
    .g-empty p  { font-size: 0.82rem; margin-top: 4px; }
    .g-welcome { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 40px; color: #94a3b8; background: linear-gradient(135deg, #f7f9ff 0%, #edf0f8 100%); }
    .g-welcome-ico { margin-bottom: 18px; opacity: 0.22; display: flex; justify-content: center; }
    .g-welcome h2 { font-family: 'Inter', sans-serif; font-size: 1.1rem; font-weight: 800; color: #334155; margin-bottom: 8px; }
    .g-welcome p  { font-size: 0.82rem; line-height: 1.7; }
    .g-welcome-hint { margin-top: 22px; padding: 11px 18px; background: #fff; border: 1px solid #e2e8f4; border-radius: 11px; font-size: 0.77rem; color: #64748b; display: flex; align-items: center; gap: 8px; }
    .g-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(8,12,28,0.58); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 20px; }
    .g-modal { background: #fff; border-radius: 20px; padding: 26px 30px; width: 100%; max-width: 620px; box-shadow: 0 40px 100px rgba(0,0,0,0.24); max-height: 90vh; overflow-y: auto; animation: slideUp 0.2s cubic-bezier(.4,0,.2,1) both; border: 1px solid rgba(255,255,255,0.9); }
    @keyframes slideUp { from { opacity: 0; transform: translateY(18px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .g-modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #f0f3fa; }
    .g-modal-head-left { display: flex; align-items: center; gap: 11px; }
    .g-modal-head-ico { width: 34px; height: 34px; border-radius: 10px; background: #eef1ff; border: 1px solid #c7d2fe; display: flex; align-items: center; justify-content: center; }
    .g-modal-head h3 { font-family: 'Inter', sans-serif; font-size: 0.97rem; font-weight: 800; color: #1e2940; }
    .g-modal-close { background: #f6f8fc; border: 1px solid #e2e8f4; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; transition: all 0.13s; }
    .g-modal-close:hover { background: #e8edf5; color: #1e2940; }
    .g-modal-section-lbl { font-size: 0.61rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 11px; margin-top: 2px; display: flex; align-items: center; gap: 8px; }
    .g-modal-section-lbl::after { content: ''; flex: 1; height: 1px; background: #f0f3fa; }
    .g-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px; }
    .g-field { display: flex; flex-direction: column; gap: 5px; }
    .g-field.full { grid-column: 1/-1; }
    .g-field label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; }
    .g-field input, .g-field textarea { padding: 8px 11px; border-radius: 9px; border: 1.5px solid #e2e8f4; font-size: 0.82rem; color: #1e2940; background: #f8fafc; width: 100%; font-family: 'Inter', sans-serif; transition: border-color 0.15s, box-shadow 0.15s, background 0.15s; }
    .g-field textarea { min-height: 72px; resize: vertical; }
    .g-field input:focus, .g-field textarea:focus { outline: none; border-color: #6382ff; box-shadow: 0 0 0 3px rgba(99,130,255,0.12); background: #fff; }
    .g-modal-foot { display: flex; gap: 10px; justify-content: flex-end; padding-top: 14px; border-top: 1px solid #f0f3fa; }
    .g-save { padding: 9px 22px; border-radius: 10px; border: none; background: linear-gradient(135deg, #6382ff 0%, #7c6aff 100%); color: #fff; font-weight: 700; font-size: 0.82rem; cursor: pointer; font-family: 'Inter', sans-serif; box-shadow: 0 3px 12px rgba(99,130,255,0.38); transition: all 0.15s; display: flex; align-items: center; gap: 7px; }
    .g-save:hover { box-shadow: 0 5px 18px rgba(99,130,255,0.48); transform: translateY(-1px); }
    .g-cancel { padding: 9px 18px; border-radius: 10px; border: 1.5px solid #e2e8f4; background: #fff; color: #334155; font-weight: 600; font-size: 0.82rem; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.13s; display: flex; align-items: center; gap: 7px; }
    .g-cancel:hover { background: #f6f8fc; border-color: #cdd5e8; }
    .fade-in { animation: slideUp 0.2s cubic-bezier(.4,0,.2,1) both; }
    @media (max-width: 768px) { .g-side { width: 200px; min-width: 200px; } .g-content { padding: 14px; } .g-modal-grid { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(st);
}

/* ══════════════════════════════════════════════════════════════
   TYPES CONFIG — identique doc5, aucun changement
   ══════════════════════════════════════════════════════════════ */
const TYPES = [
  { key: "all",                                                    label: "Toutes les demandes",    icon: Ic.all,       color: "#6382ff", bg: "#eef1ff",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type de devis",  render: (d)     => <span className="b b-indigo">{d.devis_types?.nom_devis || "—"}</span> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Budget",         render: (d)     => <BudgetCell v={d.budget_projet} /> },
      { head: "Localisation",   render: (d)     => d.localisation || <Dash /> },
      { head: "Date démarrage", render: (d)     => <DateCell v={d.date_demarrage} /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "Étude de structure (béton armé / métallique)",           label: "Étude de structure",     icon: Ic.structure, color: "#2563eb", bg: "#eff6ff",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type structure", render: (d)     => d.type_structure ? <span className="b b-blue">{d.type_structure}</span> : <Dash /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "Étude VRD (assainissement, voirie, réseaux)",            label: "Étude VRD",              icon: Ic.vrd,       color: "#0d9488", bg: "#f0fdfa",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "OPC – Ordonnancement, Pilotage et Coordination",         label: "OPC",                    icon: Ic.opc,       color: "#7c3aed", bg: "#f5f3ff",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Budget",         render: (d)     => <BudgetCell v={d.budget_projet} /> },
      { head: "Date démarrage", render: (d)     => <DateCell v={d.date_demarrage} /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "Notice de sécurité incendie",                            label: "Sécurité incendie",      icon: Ic.fire,      color: "#dc2626", bg: "#fef2f2",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "Expertise technique et diagnostic des ouvrages",         label: "Expertise technique",    icon: Ic.expertise, color: "#b45309", bg: "#fffbeb",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Localisation",   render: (d)     => d.localisation || <Dash /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "Suivi et contrôle technique des travaux",                label: "Suivi & contrôle",       icon: Ic.suivi,     color: "#c2410c", bg: "#fff7ed",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "Étude d’Efficacité Énergétique du Bâtiment",            label: "Efficacité énergétique", icon: Ic.energy,    color: "#059669", bg: "#ecfdf5",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "Note calculs",                                           label: "Note de calculs",        icon: Ic.calcul,    color: "#be185d", bg: "#fdf2f8",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
  { key: "CPS - Métré - estimation",                               label: "CPS / Métré",            icon: Ic.cps,       color: "#0d9488", bg: "#f0fdfa",
    cols: [
      { head: "Client",         render: (d)     => <ClientCell d={d} /> },
      { head: "Type CPS",       render: (d)     => d.type_cps ? <span className="b b-teal">{d.type_cps}</span> : <Dash /> },
      { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
      { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
      { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
      { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
      { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
    ],
  },
];

const PER_PAGE = 10; // ← max 10 lignes par page

/* ══════════════════════════════════════════════════════════════
   CELL COMPONENTS — identiques doc5
   ══════════════════════════════════════════════════════════════ */
const Dash = () => <span style={{ color: "#dde4f0", fontSize: "0.85rem" }}>—</span>;

function ClientCell({ d }) {
  return (
    <div style={{ minWidth: "150px" }}>
      <div className="g-client-name">{d.nomcompelt}</div>
      <div className="g-client-email">{d.email}</div>
      {d.telephone && <div className="g-client-phone">{d.telephone}</div>}
    </div>
  );
}
function BudgetCell({ v }) {
  if (!v) return <Dash />;
  return <span style={{ fontWeight: 700, color: "#1e2940", fontSize: "0.8rem" }}>{Number(v).toLocaleString("fr-MA")}<span style={{ fontSize: "0.65rem", color: "#94a3b8", marginLeft: "3px", fontWeight: 500 }}>MAD</span></span>;
}
function DateCell({ v }) {
  if (!v) return <Dash />;
  return <span style={{ whiteSpace: "nowrap", fontSize: "0.78rem", color: "#475569" }}>{new Date(v).toLocaleDateString("fr-MA", { day: "2-digit", month: "short", year: "numeric" })}</span>;
}
function DescCell({ v }) {
  if (!v) return <Dash />;
  return <span style={{ maxWidth: "170px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "0.76rem", color: "#64748b" }} title={v}>{v}</span>;
}
function DocsCell({ docs }) {
  if (!docs?.length) return <span style={{ fontSize: "0.71rem", color: "#dde4f0" }}>Aucun</span>;
  return <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>{docs.map((f, i) => <SignedFileLink key={i} file={f} />)}</div>;
}
function StatutBadge({ s }) {
  return s === "traité"
    ? <span className="b b-green">{Ic.check("#047857")} Traité</span>
    : <span className="b b-red"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b91c1c", display: "inline-block", flexShrink: 0 }} /> Nouveau</span>;
}
function ActionCell({ d, cb }) {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
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
   AJOUT : Pagination
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
        <button className="g-pag-btn" disabled={d1} onClick={() => onChange(1)} title="Première">{Ic.chevLL(d1 ? "#c5cfe0" : "#64748b")}</button>
        <button className="g-pag-btn" disabled={d1} onClick={() => onChange(page - 1)} title="Précédente">{Ic.chevL(d1 ? "#c5cfe0" : "#64748b")}</button>
        {nums().map((p, i) =>
          p === "…"
            ? <span key={`d${i}`} className="g-pag-dots">…</span>
            : <button key={p} className={`g-pag-num${page === p ? " active" : ""}`} onClick={() => onChange(p)}>{p}</button>
        )}
        <button className="g-pag-btn" disabled={dN} onClick={() => onChange(page + 1)} title="Suivante">{Ic.chevR(dN ? "#c5cfe0" : "#64748b")}</button>
        <button className="g-pag-btn" disabled={dN} onClick={() => onChange(totalPages)} title="Dernière">{Ic.chevRR(dN ? "#c5cfe0" : "#64748b")}</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   EDIT MODAL — identique doc5
   ══════════════════════════════════════════════════════════════ */
function EditModal({ data, onChange, onSave, onCancel }) {
  const F = (label, key, type = "text", full = false) => (
    <div className={`g-field${full ? " full" : ""}`} key={key}>
      <label>{label}</label>
      <input type={type} value={data[key] ?? ""} onChange={(e) => onChange({ ...data, [key]: e.target.value })} />
    </div>
  );
  const FT = (label, key) => (
    <div className="g-field full" key={key}>
      <label>{label}</label>
      <textarea value={data[key] ?? ""} onChange={(e) => onChange({ ...data, [key]: e.target.value })} />
    </div>
  );
  return (
    <div className="g-overlay" onClick={onCancel}>
      <div className="g-modal" onClick={(e) => e.stopPropagation()}>
        <div className="g-modal-head">
          <div className="g-modal-head-left">
            <div className="g-modal-head-ico">{Ic.edit("#6382ff")}</div>
            <h3>Modifier la demande</h3>
          </div>
          <button className="g-modal-close" onClick={onCancel}>{Ic.close()}</button>
        </div>
        <div className="g-modal-section-lbl">Informations client</div>
        <div className="g-modal-grid" style={{ marginBottom: "16px" }}>
          {F("Nom complet","nomcompelt")}{F("Email","email","email")}{F("Téléphone","telephone","tel")}{F("Localisation","localisation")}
        </div>
        <div className="g-modal-section-lbl">Détails du projet</div>
        <div className="g-modal-grid" style={{ marginBottom: "16px" }}>
          {F("Type projet","type_projet")}{F("Surface (m²)","surface","number")}
          {F("Type structure","type_structure")}{F("Type CPS","type_cps")}
          {F("Budget (MAD)","budget_projet","number")}{F("Date démarrage","date_demarrage","date")}
          {FT("Adresse projet","adresse_projet")}{FT("Description","description")}
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
   MAIN — doc5 + page state + logout
   ══════════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  injectAll();

  const [demandes,     setDemandes]     = useState([]);
  const [activeKey,    setActiveKey]    = useState(null);
  const [search,       setSearch]       = useState("");
  const [filterStatut, setFilterStatut] = useState("all");
  const [editingId,    setEditingId]    = useState(null);
  const [editData,     setEditData]     = useState({});
  const [page,         setPage]         = useState(1); // ← AJOUT

  useEffect(() => { fetchDemandes(); }, []);
  useEffect(() => { setPage(1); }, [activeKey, search, filterStatut]); // ← AJOUT reset

  async function fetchDemandes() {
    const { data, error } = await supabase
      .from("demandes_devis")
      .select(`*, devis_types(nom_devis), documents(file_name, file_path)`)
      .order("created_at", { ascending: false });
    if (!error) setDemandes(data);
    else console.error(error);
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
  function cancelEdit() { setEditingId(null); }
  async function saveEdit() {
    await supabase.from("demandes_devis").update({
      nomcompelt: editData.nomcompelt, email: editData.email, telephone: editData.telephone,
      surface: editData.surface, type_projet: editData.type_projet, type_structure: editData.type_structure,
      type_cps: editData.type_cps, budget_projet: editData.budget_projet,
      date_demarrage: editData.date_demarrage, localisation: editData.localisation,
      adresse_projet: editData.adresse_projet, description: editData.description,
    }).eq("id", editingId);
    setEditingId(null);
    fetchDemandes();
  }

  // ← AJOUT : déconnexion
  async function handleLogout() {
    if (!window.confirm("Se déconnecter ?")) return;
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const cb = { traite: marquerTraite, edit: startEdit, del: deleteDemande };

  function countFor(key) {
    if (key === "all") return demandes.length;
    return demandes.filter((d) => d.devis_types?.nom_devis === key).length;
  }

  const activeConf  = TYPES.find((t) => t.key === activeKey);
  const visibleRows = demandes.filter((d) => {
    const matchType   = !activeKey || activeKey === "all" || d.devis_types?.nom_devis === activeKey;
    const matchSearch = !search || d.nomcompelt?.toLowerCase().includes(search.toLowerCase()) || d.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filterStatut === "all" || (filterStatut === "traité" ? d.status === "traité" : d.status !== "traité");
    return matchType && matchSearch && matchStatut;
  });

  // ← AJOUT : slice pour la page courante
  const totalPages  = Math.ceil(visibleRows.length / PER_PAGE);
  const currentRows = visibleRows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const total    = demandes.length;
  const traites  = demandes.filter((d) => d.status === "traité").length;
  const pct      = total ? Math.round((traites / total) * 100) : 0;
  const vTraites = visibleRows.filter((d) => d.status === "traité").length;
  const vPending = visibleRows.filter((d) => d.status !== "traité").length;

  return (
    <div className="g-root">

      {/* ════ SIDEBAR ════ */}
      <aside className="g-side">
        <div className="g-side-brand">
          <div className="g-brand-orb">{Ic.house("#fff")}</div>
          <div>
            <div className="g-side-brand-title">Admin Devis</div>
            <div className="g-side-brand-sub">Tableau de bord</div>
          </div>
        </div>

        <div className="g-side-section">
          <div className="g-side-section-lbl">Types de devis</div>
          {TYPES.map((t) => {
            const count = countFor(t.key);
            const isOn  = activeKey === t.key;
            return (
              <button key={t.key} className={`g-nav-item${isOn ? " on" : ""}`}
                onClick={() => { setActiveKey(t.key); setSearch(""); setFilterStatut("all"); }}>
                <span className="g-nav-dot" style={{ background: isOn ? t.color + "22" : "rgba(255,255,255,0.04)", color: isOn ? t.color : "#344f72" }}>
                  {t.icon(isOn ? t.color : "#344f72")}
                </span>
                <span className="g-nav-txt">{t.label}</span>
                {count > 0 && <span className="g-nav-pill">{count}</span>}
              </button>
            );
          })}
        </div>

        {/* ← AJOUT bouton déconnexion */}
        <div className="g-logout-wrap">
          <button className="g-logout-btn" onClick={handleLogout}>
            {Ic.logout("#f87171")}
            <span>Déconnexion</span>
          </button>
        </div>

        <div className="g-side-foot">
          <div className="g-pbar-row"><span>Taux traitement</span><strong>{pct}%</strong></div>
          <div className="g-pbar"><div className="g-pbar-fill" style={{ width: `${pct}%` }} /></div>
          <div className="g-side-totals">
            {[{ val: total, lbl: "Total", color: "#7a9cc4" }, { val: traites, lbl: "Traités", color: "#34d399" }, { val: total - traites, lbl: "Attente", color: "#f87171" }].map(({ val, lbl, color }) => (
              <div className="g-side-total" key={lbl}>
                <div className="g-side-total-val" style={{ color }}>{val}</div>
                <div className="g-side-total-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <div className="g-main">
        {!activeKey ? (
          <div className="g-welcome">
            <div className="g-welcome-ico">{Ic.arrow("#94a3b8")}</div>
            <h2>Sélectionnez un type de devis</h2>
            <p>Choisissez une catégorie dans le menu de gauche.<br />Chaque type affiche ses propres colonnes.</p>
            <div className="g-welcome-hint">
              {Ic.filter("#64748b")}
              <span>{TYPES.length - 1} types disponibles · {total} demande{total !== 1 ? "s" : ""} au total</span>
            </div>
          </div>
        ) : (
          <>
            <div className="g-topbar">
              <div className="g-topbar-left">
                <div className="g-topbar-icon" style={{ background: activeConf.bg }}>{activeConf.icon(activeConf.color)}</div>
                <div>
                  <div className="g-topbar-title">{activeConf.label}</div>
                  <div className="g-topbar-sub">
                    {visibleRows.length} demande{visibleRows.length !== 1 ? "s" : ""} · {vTraites} traité{vTraites !== 1 ? "es" : "e"} · {vPending} en attente
                    {totalPages > 1 && <span> · page {page}/{totalPages}</span>}
                  </div>
                </div>
              </div>
              <div className="g-topbar-right">
                <div className="g-search-wrap">
                  <span className="g-search-ico">{Ic.search("#94a3b8")}</span>
                  <input className="g-search" type="text" placeholder="Rechercher un client…" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="g-select-wrap">
                  <span className="g-select-ico">{Ic.filter("#94a3b8")}</span>
                  <select className="g-select" value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)}>
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
                  { lbl: "Demandes",   val: visibleRows.length, ico: Ic.stat_list, c: activeConf.color + "18" },
                  { lbl: "Traitées",   val: vTraites,           ico: Ic.stat_ok,   c: "#10b98118" },
                  { lbl: "En attente", val: vPending,           ico: Ic.stat_wait, c: "#f59e0b18" },
                  { lbl: "Avec docs",  val: visibleRows.filter((d) => d.documents?.length > 0).length, ico: Ic.stat_docs, c: "#6382ff18" },
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
                    <div className="g-card-header-dot" style={{ background: activeConf.color }} />
                    <span className="g-card-header-title">{activeConf.label}</span>
                  </div>
                  <span className="g-card-header-count">{visibleRows.length} entrée{visibleRows.length !== 1 ? "s" : ""}</span>
                </div>

                {visibleRows.length === 0 ? (
                  <div className="g-empty">
                    <div className="g-empty-ico">{Ic.inbox("#94a3b8")}</div>
                    <h4>Aucune demande</h4>
                    <p>Aucune demande pour ce type de devis</p>
                  </div>
                ) : (
                  <>
                    <div className="g-table-wrap">
                      <table className="g-table">
                        <thead>
                          <tr>{activeConf.cols.map((c) => <th key={c.head} style={c.isAction ? { width: "115px" } : {}}>{c.head}</th>)}</tr>
                        </thead>
                        <tbody>
                          {/* ← AJOUT : currentRows au lieu de visibleRows */}
                          {currentRows.map((d) => (
                            <tr key={d.id}>
                              {activeConf.cols.map((c) => <td key={c.head}>{c.render(d, cb)}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* ← AJOUT : pagination */}
                    <Pagination total={visibleRows.length} page={page} perPage={PER_PAGE} onChange={setPage} />
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {editingId && <EditModal data={editData} onChange={setEditData} onSave={saveEdit} onCancel={cancelEdit} />}
    </div>
  );
}