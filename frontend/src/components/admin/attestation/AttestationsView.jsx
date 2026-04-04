import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../../../backend/supabaseClient";
import { Ic } from "../icons/Icons";
import { Pagination } from "../shared/Pagination";
import { EmptyState } from "../shared/Cells";
import { PER_PAGE } from "../devis/devisConfig";

/* ─────────────────────────── helpers ─────────────────────────── */
const DEFAULTS = {
  stable: {
    constat:    "La structure existante est stable et ne présente pas d'anomalie structurale alarmant la sécurité des occupants.",
    conclusion: "Cette attestation est délivrée à l'intéressé, pour servir et valoir ce que de droit.",
  },
  non_stable: {
    constat:    "La structure existante ne présente pas les conditions de stabilité requises et révèle des désordres structuraux majeurs.",
    conclusion: "Cette attestation est délivrée à l'intéressé, pour servir et valoir ce que de droit.",
  },
};

function todayISO() { return new Date().toISOString().slice(0, 10); }

function fmtDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function fmtDateLong(iso) {
  const mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  if (!iso) { const n = new Date(); return `${n.getDate()} ${mois[n.getMonth()]} ${n.getFullYear()}`; }
  const [y, m, d] = iso.split("-");
  return `${parseInt(d)} ${mois[parseInt(m)-1]} ${y}`;
}

const DEFAULT_FORM = {
  type:             "stable",
  objet:            "",
  client:           "",
  adresse:          "",
  titre_foncier:    "",
  date_attestation: todayISO(),
  signataire:       "Anass EL KAHLAOUI",
  ref_st:           "",
  constat:          DEFAULTS.stable.constat,
  conclusion:       DEFAULTS.stable.conclusion,
};

/* ─────────────────────────── Modal aperçu — Design PDF exact ─────────────────────────── */
function PreviewModal({ attest, onClose }) {
  const isStable = attest.type === "stable";
  const dateStr  = fmtDate(attest.date_attestation);
  const dateLong = fmtDateLong(attest.date_attestation);

  /* Police et couleurs identiques au PDF */
  const F = "'Times New Roman', Times, serif";
  const BLUE = "#1b3a6b";

  /* Style lettre-espace comme dans le PDF */
  const trackedText = (size, weight = "normal", extra = {}) => ({
    fontFamily: F,
    fontSize: size,
    fontWeight: weight,
    letterSpacing: "0.15em",
    color: "#000",
    ...extra,
  });

  function handlePrint() {
    const root  = document.getElementById("root");
    const docEl = document.querySelector(".engy-attest-doc");
    if (!root || !docEl) return;
    const prev = root.style.display;
    root.style.display = "none";
    const tmp = document.createElement("div");
    tmp.id = "tmp-print";
    tmp.style.cssText = "position:fixed;inset:0;z-index:9999;background:#fff;width:100%;height:100%;overflow:visible;";
    tmp.innerHTML = docEl.outerHTML;
    document.body.appendChild(tmp);
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";
    const typeLabel = attest.type === "stable" ? "ATTESTATION STABLE" : "ATTESTATION NON STABLE";
    const clientPart = attest.client ? `_${attest.client.replace(/[^a-zA-Z0-9\u00C0-\u024F\s]/g, "").trim().replace(/\s+/g, " ")}` : "";
    const datePart = dateStr.replace(/\//g, "-");
    document.title = `${typeLabel}${clientPart}_${datePart}`;
    window.print();
    setTimeout(() => {
      document.getElementById("tmp-print")?.remove();
      root.style.display = prev;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.title = "Engytech Admin";
    }, 500);
  }

  return (
    <div className="engy-print-root g-print-overlay">
      {/* Boutons flottants */}
      <div style={{ position: "fixed", top: 16, right: 16, display: "flex", gap: 8, zIndex: 10 }}>
        <button className="g-print-btn" onClick={handlePrint}>{Ic.printer("#fff")} Imprimer / PDF</button>
        <button className="g-print-close" onClick={onClose}>{Ic.close()}</button>
      </div>

      {/* ── Page A4 ── */}
      <div
        className="engy-attest-doc"
        style={{
          background: "#fff",
          backgroundImage: "url('/ARCH ENGY TECH.webp')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "85%",
          width: "21cm",
          minHeight: "29.7cm",
          padding: "0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 15px 60px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden",
          fontFamily: F,
          color: "#000",
        }}
      >
        {/* ── Logo + sous-titre ── */}
        <div style={{ textAlign: "center", paddingTop: "1.2cm", paddingBottom: "0.3cm", position: "relative", zIndex: 1 }}>
          <img
            src="/unnamed.webp"
            alt="Engytech Logo"
            style={{ height: 110, width: "auto", objectFit: "contain", display: "block", margin: "0 auto 10px" }}
          />
          <div style={{ ...trackedText(25, "bold"), marginBottom: 2 }}>Bureau d'Etudes Technique</div>
          <div style={{ ...trackedText(20, "bold") }}>TCE | BIM | OPC</div>
        </div>

        {/* ── Titre principal ── */}
        <div style={{ textAlign: "center", margin: "0.6cm 0 0.5cm", position: "relative", zIndex: 1 }}>
          <span style={{
            ...trackedText(22, "bold"),
            letterSpacing: "0.28em",
            display: "inline-block",
          }}>
            ATTESTATION DE STABILITÉ
          </span>
        </div>

        {/* ── Corps principal ── */}
        <div style={{ padding: "0 2cm", position: "relative", zIndex: 1, flex: 1 }}>

          {/* Identification projet */}
          <div style={{ marginBottom: "0.5cm", lineHeight: 1.9, fontSize: 15, fontFamily: F }}>
            <div>
              <span style={{ textDecoration: "underline", fontWeight: "bold", letterSpacing: "0.1em" }}>OBJET</span>
              {" : "}
              {attest.objet}
            </div>
            {attest.client && (
              <div>
                <span style={{ textDecoration: "underline", fontWeight: "bold", letterSpacing: "0.1em" }}>CLIENT</span>
                {" : "}{attest.client.startsWith("STE") || attest.client.startsWith("Mr") ? "" : ""}
                <strong>{attest.client}</strong>
              </div>
            )}
            <div>
              <span style={{ textDecoration: "underline", fontWeight: "bold", letterSpacing: "0.1em" }}>Sis à</span>
              {" : "}
              {attest.adresse}
            </div>
            {attest.titre_foncier && (
              <div>
                <span style={{ textDecoration: "underline", letterSpacing: "0.1em" }}>Titre Foncier n°</span>
                {" : "}
                <strong>{attest.titre_foncier}</strong>
              </div>
            )}
          </div>

          {/* Date */}
          <div style={{ textAlign: "center", fontSize: 15, fontFamily: F, letterSpacing: "0.15em", marginBottom: "0.6cm" }}>
            Marrakech, le {dateStr}
          </div>

          {/* Corps de l'attestation — texte justifié comme le PDF */}
          <div style={{
            fontSize: 15,
            fontFamily: F,
            lineHeight: 2,
            textAlign: "justify",
            marginBottom: "0.5cm",
            letterSpacing: "0.05em",
          }}>
            Nous soussignés le Bureau d'Etudes Techniques (ARCH ENGY TECH SARL AU), sis à l'adresse
            ci-dessous mentionnée, attestons par la présente qu'après avoir effectué une visite technique
            ce jour, sur lieu du projet susmentionné, nous avons constaté ce qui suit :
          </div>

          {/* Constat — centré et lettre-espace */}
          <div style={{
            textAlign: "center",
            fontSize: 15,
            fontFamily: F,
            lineHeight: 1.95,
            letterSpacing: "0.15em",
            marginBottom: "0.5cm",
            padding: "0 0.5cm",
          }}>
            {attest.constat}
          </div>

          {/* Conclusion — centré */}
          <div style={{
            textAlign: "center",
            fontSize: 15,
            fontFamily: F,
            lineHeight: 1.95,
            letterSpacing: "0.08em",
            marginBottom: "0.7cm",
          }}>
            {attest.conclusion}
          </div>

          {/* Fait à — aligné à droite comme le PDF */}
          {isStable ? (
            /* Style stable : texte centré-droite, pas de boîte */
            <div style={{
              textAlign: "right",
              fontSize: 15,
              fontFamily: F,
              fontWeight: "bold",
              letterSpacing: "0.15em",
              marginBottom: "0.3cm",
              lineHeight: 2,
            }}>
              <div>Fait à Marrakech, {dateStr}</div>
              <div>Etablie et signée par {attest.signataire || "Anass EL KAHLAOUI"}</div>
            </div>
          ) : (
            /* Style non-stable : "Fait à" puis boîte signature */
            <>
              <div style={{
                textAlign: "right",
                fontSize: 15,
                fontFamily: F,
                fontWeight: "bold",
                letterSpacing: "0.15em",
                marginBottom: "0.6cm",
              }}>
                Fait à Marrakech, {dateStr}
              </div>

              {/* Bloc signature encadré */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5cm" }}>
                <div style={{ border: `1.5px solid ${BLUE}`, minWidth: 300, maxWidth: 340 }}>
                  <div style={{
                    background: BLUE, color: "#fff", fontSize: 10,
                    fontFamily: F, fontWeight: "bold", padding: "5px 14px",
                    textAlign: "center", letterSpacing: "0.08em",
                  }}>
                    Signature et Cachet ARCH ENGY TECH
                  </div>
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", minHeight: 130, padding: "14px",
                    background: "#fff", gap: 10,
                  }}>
                    <div style={{ fontSize: 14, fontFamily: F, fontWeight: "bold", letterSpacing: "0.08em", textAlign: "center" }}>
                      {(attest.signataire || "Anass EL KAHLAOUI").toUpperCase()}
                    </div>
                    {attest.ref_st && (
                      <div style={{ fontSize: 15, fontFamily: F, letterSpacing: "0.08em", textAlign: "center" }}>
                        {attest.ref_st}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Footer identique au PDF ── */}
        <div style={{
          borderTop: `1.5px solid ${BLUE}`,
          padding: "6px 2cm 0",
          textAlign: "center",
          fontSize: 10,
          color: "#334155",
          lineHeight: 1.9,
          background: "#fff",
          fontFamily: F,
          letterSpacing: "0.02em",
          position: "relative",
          zIndex: 1,
        }}>
          <div style={{ fontWeight: "bold" }}>
            ARCH ENGY TECH S.A.R.L.A.U | Siège Social : ROUIDATE 3 N°151 – Marrakech (CP : 40000) – Maroc
          </div>
          <div>Capital : 100 000 Dhs – Taxe professionnelle : 45318122 – RC : 177925 – IF : 71876394 – ICE : 003908151000015</div>
          <div>Courriel : contact@archengytech.ma – GSM : 00212 6 62 25 78 79</div>
          <div>R.I.B : 230 450 7047255221027700 36</div>
          <div>I.B.A.N : MA 64230450704725522102770036 - CIH MMAMC
</div>
          {/* Barre de couleur finale */}
          <div style={{
            height: 9,
            marginTop: 6,
            marginLeft: "-2cm",
            marginRight: "-2cm",
            background: "linear-gradient(90deg,#1b3a6b 0%,#2a7fa5 40%,#3ab87a 100%)",
          }} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Formulaire création ─────────────────────────── */
function AttestCreate({ form, setForm, onSave, onBack, saving }) {
  const constatEdited    = useRef(false);
  const conclusionEdited = useRef(false);

  function set(k, v) { setForm(p => ({ ...p, [k]: v })); }

  function changeType(t) {
    set("type", t);
    if (!constatEdited.current)    set("constat",    DEFAULTS[t].constat);
    if (!conclusionEdited.current) set("conclusion", DEFAULTS[t].conclusion);
  }

  return (
    <div className="g-fact-form">
      <div className="g-fact-form-header">
        <div style={{ width:28, height:28, borderRadius:8, background:"#eef1ff", border:"1px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>📋</div>
        <span style={{ fontWeight:700, fontSize:".88rem", color:"#1e2940" }}>Nouvelle attestation de stabilité</span>
      </div>
      <div className="g-fact-form-body">

        {/* Toggle type */}
        <div style={{ display:"flex", gap:10, marginBottom:15 }}>
          {[
            { k:"stable",     label:"✓  Structure stable",    bg:"#ecfdf5", border:"#6ee7b7", color:"#065f46" },
            { k:"non_stable", label:"✗  Structure non stable", bg:"#fef2f2", border:"#fecaca", color:"#b91c1c" },
          ].map(({ k, label, bg, border, color }) => (
            <button key={k} onClick={() => changeType(k)} style={{
              flex:1, padding:"11px 0", borderRadius:10, cursor:"pointer",
              fontFamily:"Inter,sans-serif", fontSize:".82rem", fontWeight:700,
              border: form.type===k ? `2px solid ${border}` : "1.5px solid #e2e8f4",
              background: form.type===k ? bg : "#f8fafc",
              color: form.type===k ? color : "#94a3b8",
              transition:"all .15s",
            }}>{label}</button>
          ))}
        </div>

        <div className="g-modal-section-lbl">Informations principales</div>
        <div className="g-fact-grid2" style={{ marginBottom:14 }}>
          <div style={{ gridColumn:"1/-1" }}>
            <label className="g-fact-label">Objet *</label>
            <input className="g-fact-input" value={form.objet} onChange={e => set("objet", e.target.value)}
              placeholder="Ex : Demande d'Expertise de Stabilité D'une APPARTEMENT" />
          </div>
          <div style={{ gridColumn:"1/-1" }}>
            <label className="g-fact-label">Adresse / Sis à *</label>
            <textarea className="g-fact-input" value={form.adresse} onChange={e => set("adresse", e.target.value)}
              placeholder="Ex : PREFECTURE DE MARRAKECH, QUARTIER RIAD ZITOUN..."
              style={{ minHeight:60, resize:"vertical" }} />
          </div>
          <div>
            <label className="g-fact-label">Titre Foncier n°</label>
            <input className="g-fact-input" value={form.titre_foncier} onChange={e => set("titre_foncier", e.target.value)} placeholder="Ex : 10376/M/BIS" />
          </div>
          <div>
            <label className="g-fact-label">Client / Représenté par</label>
            <input className="g-fact-input" value={form.client} onChange={e => set("client", e.target.value)} placeholder="Ex : Mr. HELMI AMALIL" />
          </div>
          <div>
            <label className="g-fact-label">Date de l'attestation</label>
            <input type="date" className="g-fact-input" value={form.date_attestation} onChange={e => set("date_attestation", e.target.value)} />
          </div>
          <div>
            <label className="g-fact-label">Signataire</label>
            <input className="g-fact-input" value={form.signataire} onChange={e => set("signataire", e.target.value)} />
          </div>
          <div>
            <label className="g-fact-label">Référence ST</label>
            <input className="g-fact-input" value={form.ref_st} onChange={e => set("ref_st", e.target.value)} placeholder="Ex : ST 1526/03" />
          </div>
        </div>

        <div className="g-modal-section-lbl">Texte de l'attestation</div>
        <div style={{ marginBottom:14 }}>
          <label className="g-fact-label">Constat</label>
          <textarea className="g-fact-input" value={form.constat}
            onChange={e => { constatEdited.current = true; set("constat", e.target.value); }}
            rows={4} style={{ resize:"vertical" }} />
        </div>
        <div style={{ marginBottom:15 }}>
          <label className="g-fact-label">Conclusion</label>
          <textarea className="g-fact-input" value={form.conclusion}
            onChange={e => { conclusionEdited.current = true; set("conclusion", e.target.value); }}
            rows={2} style={{ resize:"vertical" }} />
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", paddingTop:14, borderTop:"1px solid #f0f3fa" }}>
          <button className="g-cancel" onClick={onBack} disabled={saving}>Annuler</button>
          <button className="g-save" onClick={onSave} disabled={saving}>
            {saving ? "Enregistrement…" : "✓ Enregistrer l'attestation"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Vue principale ─────────────────────────── */
export function AttestationsView() {
  const [tab,          setTab]          = useState("list");
  const [attestations, setAttestations] = useState([]);
  const [search,       setSearch]       = useState("");
  const [filterType,   setFilterType]   = useState("all");
  const [page,         setPage]         = useState(1);
  const [preview,      setPreview]      = useState(null);
  const [saving,       setSaving]       = useState(false);
  const [form,         setForm]         = useState({ ...DEFAULT_FORM });

  useEffect(() => { fetchAttestations(); }, []);
  useEffect(() => { setPage(1); }, [search, filterType]);

  async function fetchAttestations() {
    const { data, error } = await supabase.from("attestations").select("*").order("created_at", { ascending: false });
    if (!error) setAttestations(data || []);
  }

  async function saveAttestation() {
    if (!form.objet.trim())   { alert("L'objet est requis.");    return; }
    if (!form.adresse.trim()) { alert("L'adresse est requise."); return; }
    setSaving(true);
    try {
      const { error } = await supabase.from("attestations").insert([{
        type:             form.type,
        objet:            form.objet,
        adresse:          form.adresse,
        titre_foncier:    form.titre_foncier    || null,
        client:           form.client           || null,
        date_attestation: form.date_attestation || null,
        signataire:       form.signataire,
        ref_st:           form.ref_st           || null,
        constat:          form.constat,
        conclusion:       form.conclusion,
      }]);
      if (error) { console.error(error); alert("Erreur : " + error.message); return; }
      setForm({ ...DEFAULT_FORM });
      await fetchAttestations();
      setTab("list");
    } finally { setSaving(false); }
  }

  async function deleteAttest(id) {
    if (!window.confirm("Supprimer cette attestation ?")) return;
    await supabase.from("attestations").delete().eq("id", id);
    fetchAttestations();
  }

  const visible = attestations.filter(a => {
    const s = search.toLowerCase();
    const matchSearch = !search || a.objet?.toLowerCase().includes(s) || a.client?.toLowerCase().includes(s) || a.adresse?.toLowerCase().includes(s);
    const matchType   = filterType === "all" || a.type === filterType;
    return matchSearch && matchType;
  });

  const current     = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const nbStable    = attestations.filter(a => a.type === "stable").length;
  const nbNonStable = attestations.filter(a => a.type === "non_stable").length;

  const STATS = [
    { lbl:"Total attestations", val: attestations.length, ico: Ic.stat_list, c:"#2a7fa515" },
    { lbl:"Stables",            val: nbStable,            ico: Ic.euro,      c:"#10b98115" },
    { lbl:"Non stables",        val: nbNonStable,         ico: Ic.euro,      c:"#ef444415" },
  ];

  return (
    <>
      <div className="g-topbar">
        <div className="g-topbar-left">
          <div className="g-topbar-icon" style={{ background:"#f0fdf4" }}>
            {Ic.invoice?.("#4338ca") ?? <span style={{fontSize:15}}>📋</span>}
          </div>
          <div>
            <div className="g-topbar-title">Attestations de Stabilité</div>
            <div className="g-topbar-sub">
              {attestations.length} attestation{attestations.length!==1?"s":""} · {nbStable} stable{nbStable!==1?"s":""} · {nbNonStable} non stable{nbNonStable!==1?"s":""}
            </div>
          </div>
        </div>
        <div className="g-topbar-right">
          {tab === "list" ? (
            <>
              <div className="g-search-wrap">
                <span className="g-search-ico">{Ic.search("#94a3b8")}</span>
                <input className="g-search" type="text" placeholder="Objet, client, adresse…"
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="g-select-wrap">
                <span className="g-select-ico">{Ic.filter?.("#94a3b8")}</span>
                <select className="g-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
                  <option value="all">Tous les types</option>
                  <option value="stable">Stables</option>
                  <option value="non_stable">Non stables</option>
                </select>
              </div>
              <button className="g-btn-print" onClick={() => setTab("create")}>
                {Ic.plus("#fff")} Nouvelle attestation
              </button>
            </>
          ) : (
            <button className="g-cancel" style={{ padding:"7px 14px" }} onClick={() => setTab("list")}>
              {Ic.chevL()} Retour à la liste
            </button>
          )}
        </div>
      </div>

      <div className="g-content fade-in">
        {tab === "list" && (
          <>
            <div className="g-stats">
              {STATS.map(({ lbl, val, ico, c }) => (
                <div className="g-stat" key={lbl}>
                  <div className="g-stat-ico" style={{ background:c }}>{ico(c.slice(0,-2))}</div>
                  <div>
                    <div className="g-stat-val">{val}</div>
                    <div className="g-stat-lbl">{lbl}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="g-card">
              <div className="g-card-header">
                <div className="g-card-header-left">
                  <div className="g-card-header-dot" style={{ background:"#4338ca" }} />
                  <span className="g-card-header-title">Liste des attestations</span>
                </div>
                <span className="g-card-header-count">{visible.length} attestation{visible.length!==1?"s":""}</span>
              </div>

              {visible.length === 0 ? (
                <EmptyState message="Aucune attestation" sub='Cliquez sur "Nouvelle attestation" pour commencer.' />
              ) : (
                <>
                  <div className="g-table-wrap">
                    <table className="g-table">
                      <thead>
                        <tr>
                          <th>Type</th><th>Objet</th><th>Client</th><th>Adresse</th>
                          <th>T.F.</th><th>Date</th><th>Signataire</th>
                          <th style={{ width:100 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {current.map(a => (
                          <tr key={a.id} className="g-fact-list-row">
                            <td>
                              {a.type === "stable"
                                ? <span className="b b-green">✓ Stable</span>
                                : <span className="b b-red">✗ Non stable</span>}
                            </td>
                            <td><div className="g-client-name" style={{ maxWidth:150, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.objet||"—"}</div></td>
                            <td><div className="g-client-name">{a.client||"—"}</div></td>
                            <td><div style={{ fontSize:".75rem", color:"#64748b", maxWidth:150, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.adresse||"—"}</div></td>
                            <td><span style={{ fontSize:".75rem", color:"#64748b" }}>{a.titre_foncier||"—"}</span></td>
                            <td><span style={{ fontSize:".78rem", color:"#334155", whiteSpace:"nowrap" }}>{fmtDate(a.date_attestation)}</span></td>
                            <td><span style={{ fontSize:".78rem", color:"#334155" }}>{a.signataire||"—"}</span></td>
                            <td>
                              <div style={{ display:"flex", gap:4 }}>
                                <button className="g-btn g-btn-blue" title="Aperçu" onClick={() => setPreview(a)}>{Ic.eye("#4f7cff")}</button>
                                <button className="g-btn g-btn-red"  title="Supprimer" onClick={() => deleteAttest(a.id)}>{Ic.trash("#b91c1c")}</button>
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
          <AttestCreate form={form} setForm={setForm} onSave={saveAttestation} onBack={() => setTab("list")} saving={saving} />
        )}
      </div>

      {preview && <PreviewModal attest={preview} onClose={() => setPreview(null)} />}
    </>
  );
}