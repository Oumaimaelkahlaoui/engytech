import { useState, useEffect } from "react";
import { supabase } from "../../../../../backend/supabaseClient";
import { Ic } from "../icons/Icons";

export function CandidatureModal({ cand, onClose, onTraite, onDelete }) {
  const [cvUrl, setCvUrl] = useState(null);

  useEffect(() => {
    if (!cand.cv_path) return;
    supabase.storage
      .from("documents-projects")
      .createSignedUrl(cand.cv_path, 120)
      .then(({ data }) => data && setCvUrl(data.signedUrl));
  }, [cand.cv_path]);

  const infoItems = [
    { icon: Ic.mail,      label: "Email",     value: cand.email },
    { icon: Ic.phone,     label: "Téléphone", value: cand.telephone || "—" },
    { icon: Ic.briefcase, label: "Poste",     value: cand.poste || "—" },
    {
      icon: Ic.filetext,
      label: "CV",
      value: cvUrl
        ? <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="g-doc-link">{Ic.clip("#1d4ed8")} Voir le CV</a>
        : <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>Non fourni</span>,
    },
  ];

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
          {infoItems.map(({ icon, label, value }) => (
            <div className="g-cand-info-item" key={label}>
              <div className="g-cand-info-label">{icon("#94a3b8")} {label}</div>
              <div className="g-cand-info-value">{value}</div>
            </div>
          ))}
        </div>

        {cand.message && (
          <>
            <div className="g-modal-section-lbl">Message de motivation</div>
            <div className="g-cand-msg">{cand.message}</div>
            <div style={{ marginBottom: 18 }} />
          </>
        )}

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