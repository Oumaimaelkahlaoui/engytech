import { Ic } from "../icons/Icons";
import { TYPES } from "../devis/devisConfig";

export function Sidebar({ activeSection, activeKey, demandes, candidatures, factures, attestations = [], openSections, onToggleSection, onNavigate, onLogout }) {
  const total   = demandes.length;
  const traites = demandes.filter(d => d.status === "traité").length;
  const pct     = total ? Math.round((traites / total) * 100) : 0;
  const pendingCand = candidatures.filter(c => c.status !== "traité").length;

  function countFor(key) {
    if (key === "all") return total;
    return demandes.filter(d => d.devis_types?.nom_devis === key).length;
  }

  return (
    <aside className="g-side">
      {/* Brand */}
      <div className="g-side-brand">
        <div className="g-brand-orb">{Ic.house("#fff")}</div>
        <div>
          <div className="g-side-brand-title">Engytech Admin</div>
          <div className="g-side-brand-sub">Tableau de bord</div>
        </div>
      </div>

      {/* Section Devis */}
      <div className="g-section">
        <div className="g-section-header" onClick={() => onToggleSection("devis")}>
          <div className="g-section-header-left">
            <div className="g-section-orb" style={{ background: "rgba(42,127,165,0.15)" }}>{Ic.stat_docs("#2a7fa5")}</div>
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
                <button key={t.key} className={`g-nav-item${isOn ? " on" : ""}`} onClick={() => onNavigate("devis", t.key)}>
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

      {/* Section RH */}
      <div className="g-section">
        <div className="g-section-header" onClick={() => onToggleSection("rh")}>
          <div className="g-section-header-left">
            <div className="g-section-orb" style={{ background: "rgba(78,205,164,0.12)" }}>{Ic.users("#4ecda4")}</div>
            <span className="g-section-title">Ressources Humaines</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span className="g-section-count">{candidatures.length}</span>
            <span className="g-section-chevron">{openSections.rh ? Ic.chevUp() : Ic.chevDown()}</span>
          </div>
        </div>
        {openSections.rh && (
          <div className="g-section-body">
            <button className={`g-nav-item${activeSection === "rh" ? " on" : ""}`} onClick={() => onNavigate("rh", null)}>
              <span className="g-nav-dot" style={{ background: activeSection === "rh" ? "rgba(78,205,164,0.18)" : "rgba(255,255,255,0.04)", color: activeSection === "rh" ? "#4ecda4" : "rgba(255,255,255,0.3)" }}>
                {Ic.briefcase(activeSection === "rh" ? "#4ecda4" : "rgba(255,255,255,0.3)")}
              </span>
              <span className="g-nav-txt">Candidatures</span>
              {candidatures.length > 0 && <span className="g-nav-pill" style={activeSection === "rh" ? { background: "rgba(78,205,164,0.2)", color: "#4ecda4" } : {}}>{candidatures.length}</span>}
              {pendingCand > 0 && <span style={{ fontSize: "0.55rem", fontWeight: 700, background: "#ef4444", color: "#fff", padding: "1px 6px", borderRadius: 10, flexShrink: 0 }}>{pendingCand} new</span>}
            </button>
          </div>
        )}
      </div>

      {/* Section Factures */}
      <div className="g-section">
        <div className="g-section-header" onClick={() => onToggleSection("factures")}>
          <div className="g-section-header-left">
            <div className="g-section-orb" style={{ background: "rgba(5,150,105,0.12)" }}>{Ic.invoice("#059669")}</div>
            <span className="g-section-title">Facturation</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span className="g-section-count">{factures.length}</span>
            <span className="g-section-chevron">{openSections.factures ? Ic.chevUp() : Ic.chevDown()}</span>
          </div>
        </div>
        {openSections.factures && (
          <div className="g-section-body">
            <button className={`g-nav-item${activeSection === "factures" ? " on" : ""}`} onClick={() => onNavigate("factures", null)}>
              <span className="g-nav-dot" style={{ background: activeSection === "factures" ? "rgba(5,150,105,0.18)" : "rgba(255,255,255,0.04)", color: activeSection === "factures" ? "#059669" : "rgba(255,255,255,0.3)" }}>
                {Ic.invoice(activeSection === "factures" ? "#059669" : "rgba(255,255,255,0.3)")}
              </span>
              <span className="g-nav-txt">Toutes les factures</span>
              {factures.length > 0 && <span className="g-nav-pill" style={activeSection === "factures" ? { background: "rgba(5,150,105,0.2)", color: "#059669" } : {}}>{factures.length}</span>}
            </button>
          </div>
        )}
      </div>

      {/* Section Attestation */}
      <div className="g-section">
        <div className="g-section-header" onClick={() => onToggleSection("Attestation")}>
          <div className="g-section-header-left">
            <div className="g-section-orb" style={{ background: "rgba(5,150,105,0.12)" }}>{Ic.invoice("#059669")}</div>
            <span className="g-section-title">Attestation</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span className="g-section-count">{attestations.length}</span>  {/* ← corrigé */}
            <span className="g-section-chevron">{openSections.Attestation ? Ic.chevUp() : Ic.chevDown()}</span>
          </div>
        </div>
        {openSections.Attestation && (
          <div className="g-section-body">
            <button className={`g-nav-item${activeSection === "Attestation" ? " on" : ""}`} onClick={() => onNavigate("Attestation", null)}>
              <span className="g-nav-dot" style={{ background: activeSection === "Attestation" ? "rgba(5,150,105,0.18)" : "rgba(255,255,255,0.04)", color: activeSection === "Attestation" ? "#059669" : "rgba(255,255,255,0.3)" }}>
                {Ic.invoice(activeSection === "Attestation" ? "#059669" : "rgba(255,255,255,0.3)")}
              </span>
              <span className="g-nav-txt">Toutes les attestations</span>
              {attestations.length > 0 && (
                <span className="g-nav-pill" style={activeSection === "Attestation" ? { background: "rgba(5,150,105,0.2)", color: "#059669" } : {}}>
                  {attestations.length}
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* Logout */}
      <div className="g-logout-wrap">
        <button className="g-logout-btn" onClick={onLogout}>
          {Ic.logout("#f87171")} <span>Déconnexion</span>
        </button>
      </div>

      {/* Footer stats */}
      <div className="g-side-foot">
        <div className="g-pbar-row"><span>Taux traitement</span><strong>{pct}%</strong></div>
        <div className="g-pbar"><div className="g-pbar-fill" style={{ width: `${pct}%` }} /></div>
        <div className="g-side-totals">
          {[
            { val: total,           lbl: "Total",  color: "#7a9cc4" },
            { val: traites,         lbl: "Traités", color: "#4ecda4" },
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
  );
}