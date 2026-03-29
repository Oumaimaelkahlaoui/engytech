import { Ic } from "../icons/Icons";

const FIELDS_CLIENT = [
  { label: "Nom complet",  key: "nomcompelt" },
  { label: "Email",        key: "email",       type: "email" },
  { label: "Téléphone",    key: "telephone",   type: "tel" },
  { label: "Localisation", key: "localisation" },
];

const FIELDS_PROJET = [
  { label: "Type projet",        key: "type_projet" },
  { label: "Surface (m²)",       key: "surface",         type: "number" },
  { label: "Type structure",     key: "type_structure" },
  { label: "Budget (MAD)",       key: "budget_projet",   type: "number" },
  { label: "Date démarrage",     key: "date_demarrage",  type: "date" },
];

export function EditModal({ data, onChange, onSave, onCancel }) {
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
          {FIELDS_CLIENT.map(({ label, key, type = "text" }) => (
            <div className="g-field" key={key}>
              <label>{label}</label>
              <input type={type} value={data[key] ?? ""} onChange={e => onChange({ ...data, [key]: e.target.value })} />
            </div>
          ))}
        </div>

        <div className="g-modal-section-lbl">Détails du projet</div>
        <div className="g-modal-grid" style={{ marginBottom: 16 }}>
          {FIELDS_PROJET.map(({ label, key, type = "text" }) => (
            <div className="g-field" key={key}>
              <label>{label}</label>
              <input type={type} value={data[key] ?? ""} onChange={e => onChange({ ...data, [key]: e.target.value })} />
            </div>
          ))}
          <div className="g-field full">
            <label>Description</label>
            <textarea value={data.description ?? ""} onChange={e => onChange({ ...data, description: e.target.value })} />
          </div>
        </div>

        <div className="g-modal-foot">
          <button className="g-cancel" onClick={onCancel}>{Ic.close()} Annuler</button>
          <button className="g-save"   onClick={onSave}>{Ic.save("#fff")} Sauvegarder</button>
        </div>
      </div>
    </div>
  );
}