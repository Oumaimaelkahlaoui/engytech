import { Ic } from "../icons/Icons";

const EMPTY_ITEM = () => ({ intitule: "", unite: "F", quantite: "50%", prix_unitaire: 0, total: 0 });

export { EMPTY_ITEM };

export function FactureCreate({ form, setForm, items, setItems, onSave, onBack, saving }) {
  function getQty(qte) {
    if (!qte) return 0;
    const num = parseFloat(qte);
    if (isNaN(num)) return 0;
    return qte.toString().includes("%") ? num / 100 : num;
  }

  function updateItem(i, field, val) {
    setItems(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: val };
      const q = getQty(next[i].quantite);
      const p = parseFloat(next[i].prix_unitaire) || 0;
      next[i].total = q * p;
      return next;
    });
  }

  function addItem()      { setItems(prev => [...prev, EMPTY_ITEM()]); }
  function removeItem(i)  { setItems(prev => prev.filter((_, idx) => idx !== i)); }

  const tvaRate  = parseFloat(form.tva) || 0;
  const totalHT  = items.reduce((sum, it) => sum + (parseFloat(it.total) || 0), 0);
  const tvaAmt   = totalHT * tvaRate / 100;
  const totalTTC = totalHT + tvaAmt;

  const fmt = (n) => new Intl.NumberFormat("fr-MA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(isNaN(n) ? 0 : n);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18, alignItems: "start" }}>

      {/* ─── Formulaire principal ─── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Infos générales */}
        <div className="g-fact-form">
          <div className="g-fact-form-header">
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(42,127,165,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.invoice("#2a7fa5")}</div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e2940" }}>Informations générales</span>
          </div>
          <div className="g-fact-form-body">
            {/* N° + Date */}
            <div className="g-fact-grid2" style={{ marginBottom: 14 }}>
              <div>
                <label className="g-fact-label">N° Facture *</label>
                <input className="g-fact-input" value={form.numero_facture} onChange={e => setForm(p => ({ ...p, numero_facture: e.target.value }))} placeholder="FA2026/03" />
              </div>
              <div>
                <label className="g-fact-label">Date de facturation</label>
                <input className="g-fact-input" type="date" value={form.date_facture} onChange={e => setForm(p => ({ ...p, date_facture: e.target.value }))} />
              </div>
            </div>

            {/* Prestataire */}
            <div style={{ background: "#f0f7ff", borderRadius: 9, padding: "12px 14px", marginBottom: 14, border: "1px solid #dbeafe" }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1d4ed8", marginBottom: 10 }}>Prestataire</div>
              <div className="g-fact-grid2" style={{ marginBottom: 10 }}>
                <div>
                  <label className="g-fact-label">Nom prestataire</label>
                  <input className="g-fact-input" value={form.prestataire_nom} onChange={e => setForm(p => ({ ...p, prestataire_nom: e.target.value }))} />
                </div>
                <div>
                  <label className="g-fact-label">ICE</label>
                  <input className="g-fact-input" value={form.prestataire_ice} onChange={e => setForm(p => ({ ...p, prestataire_ice: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="g-fact-label">Adresse</label>
                <input className="g-fact-input" value={form.prestataire_adresse} onChange={e => setForm(p => ({ ...p, prestataire_adresse: e.target.value }))} />
              </div>
            </div>

            {/* Client + Projet */}
            <div className="g-fact-grid2">
              <div>
                <label className="g-fact-label">Nom du client *</label>
                <input className="g-fact-input" value={form.client_nom} onChange={e => setForm(p => ({ ...p, client_nom: e.target.value }))} placeholder="Nom complet ou société" />
                 <div>
      <label className="g-fact-label">ICE client</label>
      <input className="g-fact-input" value={form.client_ice || ""} onChange={e => setForm(p => ({ ...p, client_ice: e.target.value }))} placeholder="000000000000000" />
    </div>
              </div>
              <div>
                <label className="g-fact-label">Devis / Projet</label>
                <input className="g-fact-input" value={form.devis_projet} onChange={e => setForm(p => ({ ...p, devis_projet: e.target.value }))} placeholder="REAMENAGEMENT DU RIAD…" />
              </div>
            </div>
          </div>
        </div>

        {/* Lignes de prestation */}
        <div className="g-fact-form">
          <div className="g-fact-form-header">
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(42,127,165,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.stat_list("#2a7fa5")}</div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e2940" }}>Prestations / Articles</span>
          </div>
          <div className="g-fact-form-body" style={{ paddingTop: 14 }}>
            <div style={{ border: "1px solid #edf0f7", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
              <table className="g-items-table">
                <thead>
                  <tr>
                    <th style={{ width: "38%" }}>Intitulé</th>
                    <th style={{ width: "9%"  }}>Unité</th>
                    <th style={{ width: "12%" }}>Qté</th>
                    <th style={{ width: "18%" }}>Prix unitaire (MAD)</th>
                    <th style={{ width: "16%" }}>Total HT</th>
                    <th style={{ width: "7%"  }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td><input className="g-item-input" value={item.intitule} onChange={e => updateItem(i, "intitule", e.target.value)} placeholder="Description de la prestation…" /></td>
                      <td><input className="g-item-input" value={item.unite} onChange={e => updateItem(i, "unite", e.target.value)} style={{ textAlign: "center" }} /></td>
                      <td><input className="g-item-input" value={item.quantite} onChange={e => updateItem(i, "quantite", e.target.value)} style={{ textAlign: "center" }} /></td>
                      <td><input className="g-item-input" type="number" min="0" value={item.prix_unitaire} onChange={e => updateItem(i, "prix_unitaire", e.target.value)} style={{ textAlign: "right" }} /></td>
                      <td><div className="g-item-total" style={{ textAlign: "right" }}>{fmt(item.total)}</div></td>
                      <td>
                        {items.length > 1 && (
                          <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 4, display: "flex", alignItems: "center", borderRadius: 6 }}>
                            {Ic.trash("#ef4444")}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="g-btn-add-item" onClick={addItem}>{Ic.plus("#64748b")} Ajouter une ligne</button>
          </div>
        </div>
      </div>

      {/* ─── Sidebar récapitulatif ─── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 0 }}>
        <div className="g-fact-form">
          <div className="g-fact-form-header">
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(5,150,105,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ic.euro("#059669")}</div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e2940" }}>Récapitulatif</span>
          </div>
          <div className="g-fact-form-body" style={{ paddingTop: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <label className="g-fact-label">Taux TVA (%)</label>
              <input className="g-fact-input" type="number" min="0" max="100" value={form.tva} onChange={e => setForm(p => ({ ...p, tva: e.target.value }))} />
            </div>
            <div className="g-fact-totals">
              <div className="g-fact-total-row"><span>Total HT</span><span style={{ fontWeight: 600, color: "#334155" }}>{fmt(totalHT)} MAD</span></div>
              <div className="g-fact-total-row"><span>TVA ({form.tva}%)</span><span style={{ fontWeight: 600, color: "#334155" }}>{fmt(tvaAmt)} MAD</span></div>
              <div className="g-fact-total-row ttc"><span>Total TTC</span><span>{fmt(totalTTC)} MAD</span></div>
            </div>
          </div>
        </div>

        <button className="g-btn-print" style={{ width: "100%", justifyContent: "center", opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }} onClick={onSave} disabled={saving}>
          {Ic.save("#fff")} {saving ? "Enregistrement…" : "Enregistrer la facture"}
        </button>
        <div style={{ fontSize: "0.68rem", color: "#94a3b8", textAlign: "center", lineHeight: 1.5 }}>
          La facture sera sauvegardée dans<br />votre base de données Supabase.
        </div>
      </div>
    </div>
  );
}