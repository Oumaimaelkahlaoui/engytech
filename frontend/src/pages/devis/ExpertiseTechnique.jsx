import React, { useState, useRef } from 'react'
import { supabase } from '../../../../backend/supabaseClient'
import Navbar from "../../components/Navbar";
import Footer from "../../components/MainFooter";
import FloatingMenu from "../../components/Floatingmenu";

const S = {
  page: { background: "#f4f6fb", minHeight: "100vh", fontFamily: "'Outfit', system-ui, sans-serif" },
  hero: { position: "relative", background: "linear-gradient(135deg, #0e1c3a 0%, #1b3a6b 45%, #1d5c7a 100%)", paddingTop: 68, overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(42,127,165,0.22) 0%, transparent 70%),radial-gradient(ellipse 40% 80% at 10% 50%, rgba(58,184,122,0.08) 0%, transparent 65%)", zIndex: 0 },
  heroInner: { position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "clamp(2.5rem,5vh,4rem) clamp(1.5rem,6vw,5rem) clamp(2rem,4vh,3rem)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 },
  heroEye: { display: "flex", alignItems: "center", gap: 12, fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "#4ecda4", marginBottom: 14 },
  heroEyeLine: { width: 32, height: 1, background: "#4ecda4", display: "inline-block", flexShrink: 0 },
  heroH1: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 400, lineHeight: 1.0, letterSpacing: "-0.025em", color: "#fff", margin: "0 0 10px" },
  heroItalic: { fontStyle: "italic", color: "#4ecda4" },
  heroSub: { fontSize: "clamp(0.8125rem,1.3vw,0.9rem)", fontWeight: 300, color: "rgba(255,255,255,0.5)", maxWidth: "44ch", lineHeight: 1.7, margin: 0 },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "rgba(58,184,122,0.12)", border: "1px solid rgba(58,184,122,0.3)", borderRadius: 100, fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#4ecda4", alignSelf: "flex-start", marginTop: 8 },
  main: { maxWidth: 1100, margin: "0 auto", padding: "clamp(2rem,4vw,3.5rem) clamp(1.5rem,6vw,5rem) clamp(3rem,6vw,5rem)", display: "grid", gridTemplateColumns: "1fr 340px", gap: "clamp(2rem,4vw,3.5rem)", alignItems: "start" },
  formCard: { background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px rgba(27,47,110,0.06), 0 8px 32px rgba(27,47,110,0.09)", overflow: "hidden" },
  formHeader: { padding: "20px 28px 18px", borderBottom: "1px solid #edf1f8", display: "flex", alignItems: "center", gap: 12 },
  formHeaderDot: { width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg, #2a7fa5, #4ecda4)", flexShrink: 0 },
  formHeaderTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", fontWeight: 500, color: "#0e1c3a", margin: 0, letterSpacing: "-0.01em" },
  formBody: { padding: "28px", display: "flex", flexDirection: "column", gap: 22 },
  fieldRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  fieldCol: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a8faa" },
  input: { fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 300, color: "#0e1c3a", background: "#f8fafd", border: "1.5px solid #dde5f0", borderRadius: 8, padding: "11px 14px", outline: "none", width: "100%", transition: "border-color 0.22s, box-shadow 0.22s, background 0.22s", WebkitAppearance: "none", appearance: "none" },
  divider: { display: "flex", alignItems: "center", gap: 12, margin: "4px 0" },
  dividerLine: { flex: 1, height: 1, background: "#edf1f8" },
  dividerText: { fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "#c9d4e8", whiteSpace: "nowrap" },
  fileZone: { border: "1.5px dashed #c9d4e8", borderRadius: 10, padding: "20px 16px", textAlign: "center", cursor: "pointer", background: "#f8fafd", transition: "border-color 0.22s, background 0.22s" },
  fileIcon: { fontSize: "1.5rem", marginBottom: 6, display: "block", opacity: 0.5 },
  fileText: { fontSize: "0.75rem", fontWeight: 300, color: "#7a8faa", margin: "0 0 4px" },
  fileHint: { fontSize: "0.6rem", color: "#c9d4e8", letterSpacing: "0.06em" },
  submitBtn: { width: "100%", padding: "15px 24px", background: "linear-gradient(90deg, #1b2f6e 0%, #2a7fa5 55%, #3ab87a 100%)", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 4px 20px rgba(42,127,165,0.38)", transition: "filter 0.25s, transform 0.25s, box-shadow 0.25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 },
  sidebar: { display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 88 },
  stepsCard: { background: "#0e1c3a", borderRadius: 14, boxShadow: "0 4px 24px rgba(14,28,58,0.2)", overflow: "hidden" },
  stepsHeader: { padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" },
  stepsTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "0.9375rem", fontWeight: 400, color: "#fff", margin: 0 },
  stepsBody: { padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 },
  step: { display: "flex", alignItems: "flex-start", gap: 12 },
  stepNum: { width: 28, height: 28, borderRadius: "50%", border: "1.5px solid rgba(78,205,164,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5625rem", fontWeight: 600, letterSpacing: "0.1em", color: "#4ecda4", flexShrink: 0 },
  stepText: { paddingTop: 4 },
  stepTitle: { fontSize: "0.8125rem", fontWeight: 500, color: "#fff", margin: "0 0 2px" },
  stepDesc: { fontSize: "0.6875rem", fontWeight: 300, color: "rgba(255,255,255,0.38)", lineHeight: 1.55, margin: 0 },
};

export default function ExpertiseTechnique() {
  const [nomcompelt, setNomCompelt]     = useState('')
  const [email, setEmail]               = useState('')
  const [telephone, setTelephone]       = useState('')
  const [typeProjet, setTypeProjet]     = useState('')
  const [surface, setSurface]           = useState('')
  const [localisation, setLocalisation] = useState('')
  const [files, setFiles]               = useState([])
  const [focusedField, setFocusedField] = useState(null)
  const [submitting, setSubmitting]     = useState(false)
  const [fileDrag, setFileDrag]         = useState(false)
  const [sent, setSent]                 = useState(false)  // ← nouveau
  const cursorRef    = useRef(null)
  const cursorDotRef = useRef(null)

  React.useEffect(() => {
    const move = (e) => {
      cursorRef.current?.style.setProperty("transform", `translate(${e.clientX - 20}px,${e.clientY - 20}px)`)
      cursorDotRef.current?.style.setProperty("transform", `translate(${e.clientX - 4}px,${e.clientY - 4}px)`)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  const handleFiles = (e) => setFiles(prev => [...prev, ...Array.from(e.target.files)])

  const resetForm = () => {
    setSent(false); setNomCompelt(''); setEmail(''); setTelephone('');
    setTypeProjet(''); setSurface(''); setLocalisation(''); setFiles([]);
  }

  const inputStyle = (id) => ({
    ...S.input,
    borderColor: focusedField === id ? "#2a7fa5" : "#dde5f0",
    boxShadow: focusedField === id ? "0 0 0 3px rgba(42,127,165,0.12)" : "none",
    background: focusedField === id ? "#fff" : "#f8fafd",
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const { data: devisData, error: devisError } = await supabase
        .from("devis_types").select("id")
        .eq("nom_devis", "Expertise technique et diagnostic des ouvrages").single()
      if (devisError) { console.log("ERREUR TYPE DEVIS:", devisError); return }

      const { data: newDemande, error: insertError } = await supabase
        .from('demandes_devis')
        .insert([{ devis_type_id: devisData.id, nomcompelt, email, telephone, type_projet: typeProjet, surface, localisation }])
        .select()
      if (insertError) { console.log("INSERT DEMANDE ERROR:", insertError); return }

      const demandeId = newDemande[0].id
      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`
        const { error } = await supabase.storage.from("documents-projects").upload(`files/${fileName}`, file)
        if (error) { console.log("UPLOAD ERROR:", error); continue }
        await supabase.from("documents").insert({ demande_id: demandeId, file_name: file.name, file_path: `files/${fileName}` })
      }

      setSent(true)  // ← remplace alert()
    } catch (err) {
      console.log("GLOBAL ERROR:", err)
    } finally {
      setSubmitting(false)
    }
  }

  React.useEffect(() => {
    const id = "cf-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500&display=swap');
      @keyframes cf-pop {
        from { opacity:0; transform:scale(.7) translateY(12px); }
        to   { opacity:1; transform:scale(1) translateY(0); }
      }
      @keyframes cf-fadein {
        from { opacity:0; transform:translateY(16px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @media (max-width: 900px) {
        .cf-main   { grid-template-columns: 1fr !important; }
        .cf-sidebar { position: static !important; }
      }
      @media (max-width: 600px) {
        .cf-row { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(el);
    return () => document.getElementById(id)?.remove();
  }, []);

  const STEPS = [
    { n: "01", title: "Remplissez le formulaire", desc: "Décrivez votre projet avec précision." },
    { n: "02", title: "Analyse par notre équipe", desc: "Étude de votre demande sous 24h." },
    { n: "03", title: "Devis personnalisé",        desc: "Vous recevez une offre détaillée." },
    { n: "04", title: "Lancement du projet",       desc: "Validation et démarrage des études." },
  ];

  /* ── Page succès ── */
  const SuccessPage = () => (
    <div style={{ padding: "clamp(3rem,6vw,5rem) clamp(2rem,4vw,3rem)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 28 }}>

      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #2a7fa5, #3ab87a)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(58,184,122,0.4)", animation: "cf-pop .55s cubic-bezier(.16,1,.3,1) both" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: "44ch", animation: "cf-fadein .6s .15s both" }}>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 500, color: "#0e1c3a", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15 }}>
          Demande envoyée avec{" "}
          <em style={{ fontStyle: "italic", color: "#2a7fa5" }}>succès</em>
        </h3>
        <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#7a8faa", lineHeight: 1.8, margin: 0 }}>
          Notre équipe a bien reçu votre demande de devis et vous contactera sous{" "}
          <strong style={{ color: "#0e1c3a", fontWeight: 500 }}>24 heures ouvrées</strong>.
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", width: "100%", animation: "cf-fadein .6s .25s both" }}>
        {[
          { icon: "👤", label: "Nom",              value: nomcompelt },
          { icon: "📧", label: "Email",             value: email },
          { icon: "⏱️", label: "Délai de réponse", value: "Sous 24h ouvrées" },
        ].map(({ icon, label, value }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", background: "#f8fafd", borderRadius: 10, border: "1px solid #edf1f8", flex: "1 1 180px", textAlign: "left" }}>
            <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{icon}</span>
            <div>
              <p style={{ fontSize: "0.6rem", color: "#9aafc4", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 2px" }}>{label}</p>
              <p style={{ fontSize: "0.8125rem", fontWeight: 400, color: "#0e1c3a", margin: 0, wordBreak: "break-word" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", background: "#0e1c3a", borderRadius: 12, padding: "20px 24px", textAlign: "left", animation: "cf-fadein .6s .35s both" }}>
        <p style={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#4ecda4", margin: "0 0 14px" }}>Prochaines étapes</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {["Notre équipe analyse votre demande sous 24h", "Vous recevez un devis personnalisé par email", "Validation et démarrage des études"].map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, border: "1.5px solid rgba(78,205,164,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 700, color: "#4ecda4" }}>0{i + 2}</div>
              <p style={{ fontSize: "0.8125rem", fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.55 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", animation: "cf-fadein .6s .45s both" }}>
        <button onClick={resetForm}
          style={{ padding: "12px 22px", borderRadius: 8, border: "1.5px solid #dde5f0", background: "#fff", color: "#7a8faa", fontFamily: "'Outfit',system-ui,sans-serif", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em", transition: "border-color .2s, color .2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#2a7fa5"; e.currentTarget.style.color = "#2a7fa5"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#dde5f0"; e.currentTarget.style.color = "#7a8faa"; }}
        >← Nouvelle demande</button>
        <a href="/" style={{ padding: "12px 22px", borderRadius: 8, border: "none", background: "linear-gradient(90deg, #1b2f6e, #2a7fa5)", color: "#fff", fontFamily: "'Outfit',system-ui,sans-serif", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.08em", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(42,127,165,0.35)" }}>
          Retour à l'accueil →
        </a>
      </div>
    </div>
  );

  return (
    <>
      <div style={S.page}>
        <div className="cursor-ring" ref={cursorRef} />
        <div className="cursor-dot"  ref={cursorDotRef} />
        <Navbar />

        {/* ── HERO ── */}
        <div style={S.hero}>
          <div style={S.heroBg} />
          <div style={S.heroInner}>
            <div>
              <div style={S.heroEye}><span style={S.heroEyeLine} />Engytech — Bureau d'études</div>
              <h1 style={S.heroH1}>Expertise <span style={S.heroItalic}>Technique</span></h1>
              <p style={S.heroSub}>Diagnostic des pathologies des ouvrages, analyse structurelle et recommandations techniques pour assurer la sécurité et la durabilité du bâtiment.</p>
            </div>
            <div style={S.heroBadge}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ecda4", display: "inline-block" }} />
              Réponse sous 24h
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="cf-main" style={S.main}>

          <div style={S.formCard}>
            {sent ? <SuccessPage /> : (
              <>
                <div style={S.formHeader}>
                  <div style={S.formHeaderDot} />
                  <h2 style={S.formHeaderTitle}>Informations du projet</h2>
                </div>

                <form onSubmit={handleSubmit} style={S.formBody}>

                  <div className="cf-row" style={S.fieldRow}>
                    <div style={S.fieldCol}>
                      <label style={S.label}>Nom complet *</label>
                      <input value={nomcompelt} onChange={e => setNomCompelt(e.target.value)} placeholder="Ex : Mohamed Alami" required style={inputStyle("nom")} onFocus={() => setFocusedField("nom")} onBlur={() => setFocusedField(null)} />
                    </div>
                    <div style={S.fieldCol}>
                      <label style={S.label}>Adresse email *</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="exemple@email.com" type="email" required style={inputStyle("email")} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} />
                    </div>
                  </div>

                  <div className="cf-row" style={S.fieldRow}>
                    <div style={S.fieldCol}>
                      <label style={S.label}>Téléphone *</label>
                      <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+212 6 00 00 00 00" required style={inputStyle("tel")} onFocus={() => setFocusedField("tel")} onBlur={() => setFocusedField(null)} />
                    </div>
                    <div style={S.fieldCol}>
                      <label style={S.label}>Surface (m²) *</label>
                      <input value={surface} onChange={e => setSurface(e.target.value)} placeholder="Ex : 250" type="number" required style={inputStyle("surface")} onFocus={() => setFocusedField("surface")} onBlur={() => setFocusedField(null)} />
                    </div>
                  </div>

                  <div style={S.fieldCol}>
                    <label style={S.label}>Type de projet *</label>
                    <input value={typeProjet} onChange={e => setTypeProjet(e.target.value)} placeholder="Ex : Villa R+2, Immeuble collectif, Entrepôt..." required style={inputStyle("projet")} onFocus={() => setFocusedField("projet")} onBlur={() => setFocusedField(null)} />
                  </div>

                  <div style={S.fieldCol}>
                    <label style={S.label}>Localisation du projet *</label>
                    <input value={localisation} onChange={e => setLocalisation(e.target.value)} placeholder="Ex : Marrakech, Guéliz" required style={inputStyle("localisation")} onFocus={() => setFocusedField("localisation")} onBlur={() => setFocusedField(null)} />
                  </div>

                  <div style={S.divider}>
                    <div style={S.dividerLine} />
                    <span style={S.dividerText}>Documents (Plan topo de masse ...)</span>
                    <div style={S.dividerLine} />
                  </div>

                  <div style={S.fieldCol}>
                    <label htmlFor="file-upload" style={{ ...S.fileZone, borderColor: fileDrag ? "#2a7fa5" : files.length > 0 ? "#3ab87a" : "#c9d4e8", background: fileDrag ? "rgba(42,127,165,0.04)" : files.length > 0 ? "rgba(58,184,122,0.04)" : "#f8fafd" }}
                      onDragOver={(e) => { e.preventDefault(); setFileDrag(true); }}
                      onDragLeave={() => setFileDrag(false)}
                      onDrop={(e) => { e.preventDefault(); setFileDrag(false); setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]) }}
                    >
                      <span style={S.fileIcon}>{files.length > 0 ? "" : "📎"}</span>
                      {files.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                          {files.map((file, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "7px 12px", background: "rgba(58,184,122,0.08)", border: "1px solid rgba(58,184,122,0.25)", borderRadius: 6 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                                <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>📄</span>
                                <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#0e1c3a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</span>
                              </div>
                              <span style={{ fontSize: "0.6rem", color: "#9aafc4", flexShrink: 0 }}>{(file.size / 1024).toFixed(0)} Ko</span>
                            </div>
                          ))}
                          <p style={{ ...S.fileText, color: "#3ab87a", fontWeight: 400, margin: "4px 0 0" }}>+ Ajouter d'autres fichiers</p>
                        </div>
                      ) : (
                        <>
                          <p style={S.fileText}>Glissez vos fichiers ici ou <span style={{ color: "#2a7fa5", fontWeight: 500 }}>parcourir</span></p>
                          <p style={S.fileHint}>PDF, DWG, PNG, JPG — max 20 Mo</p>
                        </>
                      )}
                      <input id="file-upload" type="file" multiple onChange={handleFiles} style={{ display: "none" }} />
                    </label>
                  </div>

                  <button type="submit" style={{ ...S.submitBtn, opacity: submitting ? 0.75 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                    onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(42,127,165,0.45)"; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(42,127,165,0.38)"; }}
                    disabled={submitting}>
                    {submitting ? <><span style={{ fontSize: "0.9rem" }}></span>Envoi en cours…</> : <>Envoyer ma demande de devis <span style={{ fontSize: "1rem" }}>→</span></>}
                  </button>

                  <p style={{ fontSize: "0.6875rem", color: "#9aafc4", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
                    Vos informations sont confidentielles et ne seront jamais partagées.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="cf-sidebar" style={S.sidebar}>
            <div style={S.stepsCard}>
              <div style={S.stepsHeader}><h3 style={S.stepsTitle}>Comment ça fonctionne ?</h3></div>
              <div style={S.stepsBody}>
                {STEPS.map((s) => (
                  <div key={s.n} style={S.step}>
                    <div style={S.stepNum}>{s.n}</div>
                    <div style={S.stepText}>
                      <p style={S.stepTitle}>{s.title}</p>
                      <p style={S.stepDesc}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FloatingMenu />
        <Footer />
      </div>
    </>
  );
}