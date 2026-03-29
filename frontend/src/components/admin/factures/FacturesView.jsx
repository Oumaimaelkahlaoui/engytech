import { useState, useEffect } from "react";
import { supabase } from "../../../../../backend/supabaseClient";
import { Ic } from "../icons/Icons";
import { Pagination } from "../shared/Pagination";
import { EmptyState } from "../shared/Cells";
import { PrintPreview } from "./PrintPreview";
import { FactureCreate, EMPTY_ITEM } from "./FactureCreate";
import { PER_PAGE } from "../devis/devisConfig";

const DEFAULT_FORM = {
  numero_facture: "",
  date_facture: new Date().toISOString().slice(0, 10),
  prestataire_nom:     "ARCH ENGY TECH",
  prestataire_adresse: "ROUIDATE 3 N°121 1 MARRAKECH",
  prestataire_ice:     "003908151000015",
  client_nom: "",
  client_ice: "",
  devis_projet: "",
  tva: 20,
};

export function FacturesView() {
  const [tab,          setTab]          = useState("list");
  const [factures,     setFactures]     = useState([]);
  const [search,       setSearch]       = useState("");
  const [page,         setPage]         = useState(1);
  const [previewFact,  setPreviewFact]  = useState(null);
  const [previewItems, setPreviewItems] = useState([]);
  const [saving,       setSaving]       = useState(false);
  const [form,         setForm]         = useState(DEFAULT_FORM);
  const [items,        setItems]        = useState([EMPTY_ITEM()]);

  useEffect(() => { fetchFactures(); }, []);
  useEffect(() => { setPage(1); }, [search]);

  async function fetchFactures() {
    const { data, error } = await supabase.from("factures").select("*").order("created_at", { ascending: false });
    if (!error) setFactures(data || []);
  }

  async function saveFacture() {
    if (!form.client_nom.trim())      { alert("Le nom du client est requis."); return; }
    if (!form.numero_facture.trim())  { alert("Le numéro de facture est requis."); return; }
    setSaving(true);
    try {
      const tvaRate  = parseFloat(form.tva) || 0;
      const totalHT  = items.reduce((s, it) => s + (parseFloat(it.total) || 0), 0);
      const totalTTC = totalHT + totalHT * tvaRate / 100;

  const { data: factData, error: factErr } = await supabase
  .from("factures")
  .insert([{ 
    numero_facture: form.numero_facture, 
    client_nom: form.client_nom, 
    client_ice: form.client_ice || null,   // ← ajouter cette ligne
    devis_projet: form.devis_projet || null, 
    date_facture: form.date_facture, 
    total_ht: totalHT, 
    tva: tvaRate, 
    total_ttc: totalTTC,
    prestataire_nom: form.prestataire_nom || null,       // ← aussi ces 3
    prestataire_adresse: form.prestataire_adresse || null,
    prestataire_ice: form.prestataire_ice || null,
  }])
  .select()
  .single();

      if (factErr) { console.error(factErr); alert("Erreur lors de la création."); return; }

      const itemsToInsert = items
        .filter(it => it.intitule.trim())
.map(it => ({ 
  facture_id: factData.id, 
  intitule: it.intitule, 
  unite: it.unite || "F",
  quantite_label: it.quantite,              // ← "50%" conservé
  quantite: parseFloat(it.quantite) || 0, 
  prix_unitaire: parseFloat(it.prix_unitaire) || 0, 
  total: parseFloat(it.total) || 0 
}));
      if (itemsToInsert.length) {
        const { error: itemErr } = await supabase.from("facture_items").insert(itemsToInsert);
        if (itemErr) console.error(itemErr);
      }

      setForm(DEFAULT_FORM);
      setItems([EMPTY_ITEM()]);
      await fetchFactures();
      setTab("list");
    } finally {
      setSaving(false);
    }
  }

async function openPreview(fact) {
  const { data, error } = await supabase
    .from("facture_items")
    .select("*")
    .eq("facture_id", fact.id)
    .order("created_at");
  
  console.log("items:", data, "error:", error);  // ← vérifier dans F12
  setPreviewFact(fact);
  setPreviewItems(data || []);
}

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
  const totalTTC_all = factures.reduce((s, f) => s + (f.total_ttc || 0), 0);

  const STATS = [
    { lbl: "Total factures", val: factures.length,                                              ico: Ic.stat_list, c: "#2a7fa518" },
    { lbl: "CA HT total",    val: `${factures.reduce((s,f)=>s+(f.total_ht||0),0).toLocaleString("fr-MA")} MAD`, ico: Ic.euro, c: "#10b98118" },
    { lbl: "CA TTC total",   val: `${totalTTC_all.toLocaleString("fr-MA")} MAD`,                ico: Ic.euro,      c: "#6382ff18" },
  ];

  return (
    <>
      <div className="g-topbar">
        <div className="g-topbar-left">
          <div className="g-topbar-icon" style={{ background: "#f0fdf4" }}>{Ic.invoice("#059669")}</div>
          <div>
            <div className="g-topbar-title">Facturation</div>
            <div className="g-topbar-sub">{factures.length} facture{factures.length !== 1 ? "s" : ""} · {totalTTC_all.toLocaleString("fr-MA")} MAD TTC total</div>
          </div>
        </div>
        <div className="g-topbar-right">
          {tab === "list" ? (
            <>
              <div className="g-search-wrap">
                <span className="g-search-ico">{Ic.search("#94a3b8")}</span>
                <input className="g-search" type="text" placeholder="Client, numéro, projet…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="g-btn-print" onClick={() => setTab("create")}>{Ic.plus("#fff")} Nouvelle facture</button>
            </>
          ) : (
            <button className="g-cancel" style={{ padding: "7px 14px" }} onClick={() => setTab("list")}>{Ic.chevL()} Retour à la liste</button>
          )}
        </div>
      </div>

      <div className="g-content fade-in">
        {tab === "list" && (
          <>
            <div className="g-stats">
              {STATS.map(({ lbl, val, ico, c }) => (
                <div className="g-stat" key={lbl}>
                  <div className="g-stat-ico" style={{ background: c }}>{ico(c.slice(0, -2))}</div>
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
                <EmptyState message="Aucune facture" sub='Cliquez sur "Nouvelle facture" pour commencer.' />
              ) : (
                <>
                  <div className="g-table-wrap">
                    <table className="g-table">
                      <thead>
                        <tr>
                          <th>N° Facture</th><th>Client</th><th>Projet</th><th>Date</th>
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
                            <td style={{ textAlign: "right", fontWeight: 600, color: "#334155", fontSize: "0.82rem" }}>{(f.total_ht || 0).toLocaleString("fr-MA")} MAD</td>
                            <td style={{ textAlign: "right", color: "#94a3b8", fontSize: "0.78rem" }}>{f.tva || 20}%</td>
                            <td style={{ textAlign: "right" }}><span style={{ fontWeight: 800, color: "#059669", fontSize: "0.88rem" }}>{(f.total_ttc || 0).toLocaleString("fr-MA")} MAD</span></td>
                            <td>
                              <div style={{ display: "flex", gap: 4 }}>
                                <button className="g-btn g-btn-blue" onClick={() => openPreview(f)}>{Ic.eye("#4f7cff")}</button>
                                <button className="g-btn g-btn-red"  onClick={() => deleteFact(f.id)}>{Ic.trash("#b91c1c")}</button>
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

        {tab === "create" && (
          <FactureCreate form={form} setForm={setForm} items={items} setItems={setItems} onSave={saveFacture} onBack={() => setTab("list")} saving={saving} />
        )}
      </div>

      {previewFact && (
        <PrintPreview facture={previewFact} items={previewItems} onClose={() => { setPreviewFact(null); setPreviewItems([]); }} />
      )}
    </>
  );
}