export function GlobalStyles() {
  if (document.getElementById("adm-g")) return null;

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
.g-print-doc {
  background: #fff;
  box-shadow: 0 40px 100px rgba(0,0,0,0.3);
  position: relative;
  border-radius: 4px;
  width: 210mm;        /* ← largeur A4 exacte */
  min-height: 297mm;   /* ← hauteur A4 */
  margin: 0 auto;      /* ← centré dans l'overlay */
}    .g-print-close { position: fixed; top: 18px; right: 24px; background: #fff; border: 1px solid #e2e8f4; width: 36px; height: 36px; border-radius: 10px; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.12); z-index: 10; transition: all 0.13s; }
    .g-print-close:hover { background: #f6f8fc; color: #1e2940; }
    .g-print-btn { position: fixed; top: 18px; right: 70px; background: linear-gradient(90deg,#1b2f6e,#2a7fa5); border: none; padding: 8px 18px; border-radius: 10px; cursor: pointer; color: #fff; font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 700; display: flex; align-items: center; gap: 7px; box-shadow: 0 2px 8px rgba(42,127,165,0.35); transition: all 0.13s; z-index: 10; }
    .g-print-btn:hover { box-shadow: 0 4px 14px rgba(42,127,165,0.5); transform: translateY(-1px); }
/* APRÈS */
@media print {
  @page { margin: 0; size: A4 portrait; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body > *:not(#tmp-print) { display: none !important; }
  #tmp-print {
    display: block !important;
    position: fixed !important;
    inset: 0 !important;
    width: 100% !important;
    background: #fff !important;
  }
  .engy-print-doc {
    width: 100% !important;
    min-height: 100vh !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    padding: 1.5cm 2cm 0 !important;
  }
}
`;
    document.head.appendChild(st);

  return null;
}