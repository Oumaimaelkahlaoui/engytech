import { Ic } from "../icons/Icons";
import watermarkImg from "/public/ARCH ENGY TECH.png";

// Helpers
const F = "Arial, Helvetica, sans-serif";
const fmt = (n) => Number(n || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const UNITS_FR = ["","UN","DEUX","TROIS","QUATRE","CINQ","SIX","SEPT","HUIT","NEUF","DIX","ONZE","DOUZE","TREIZE","QUATORZE","QUINZE","SEIZE","DIX-SEPT","DIX-HUIT","DIX-NEUF"];
const TENS_FR  = ["","","VINGT","TRENTE","QUARANTE","CINQUANTE","SOIXANTE","SOIXANTE","QUATRE-VINGT","QUATRE-VINGT"];

function centToStr(n) {
  if (n === 0) return "";
  if (n < 20) return UNITS_FR[n];
  const t = Math.floor(n / 10), u = n % 10;
  if (t === 7 || t === 9) return TENS_FR[t - 1] + "-" + UNITS_FR[10 + u];
  return TENS_FR[t] + (u === 1 && t !== 8 ? "-ET-UN" : u > 0 ? "-" + UNITS_FR[u] : "");
}

function numberToWords(n) {
  n = Math.round(n);
  if (n === 0) return "ZÉRO";
  let r = "";
  if (n >= 1000000) { const m = Math.floor(n / 1000000); r += (m === 1 ? "UN MILLION " : numberToWords(m) + " MILLIONS "); n %= 1000000; }
  if (n >= 1000)    { const k = Math.floor(n / 1000);    r += (k === 1 ? "MILLE " : numberToWords(k) + " MILLE "); n %= 1000; }
  if (n >= 100)     { const c = Math.floor(n / 100);     r += (c === 1 ? "CENT " : UNITS_FR[c] + " CENT" + (n % 100 === 0 && c > 1 ? "S " : " ")); n %= 100; }
  if (n > 0)        r += centToStr(n);
  return r.trim();
}

const thS = (al = "left") => ({
  background: "#1b3a6b", color: "#fff",
  padding: "7px 10px", fontSize: 11, fontWeight: "bold",
  textAlign: al, border: "1px solid #2a5080",
  whiteSpace: "nowrap", verticalAlign: "middle",
});

const tdS = (al = "left", bold = false, bg = "#fff") => ({
  padding: "8px 10px", fontSize: 11, textAlign: al,
  fontWeight: bold ? "bold" : "normal",
  background: bg, border: "1px solid #c8d4e8",
  color: "#111", verticalAlign: "middle",
});

function EngyLogo() {
  return <img src="/unnamed.png" alt="Engytech Logo" style={{ height: 129, width: "auto", objectFit: "contain", display: "block", margin: "0 auto" }} />;
}

export function PrintPreview({ facture, items, onClose }) {
  const ht  = Number(facture.total_ht  || 0);
  const tva = Number(facture.tva       || 20);
  const ttc = Number(facture.total_ttc || ht * (1 + tva / 100));
  const ttcWords = numberToWords(Math.round(ttc)) + " DIRHAMS TTC";

  const dateStr = facture.date_facture
    ? new Date(facture.date_facture + "T00:00:00").toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "—";

  const prestataire = {
    nom:     facture.prestataire_nom     || "ARCH ENGY TECH",
    adresse: facture.prestataire_adresse || "ROUIDATE 3 N°121 1 MARRAKECH",
    ice:     facture.prestataire_ice     || "003908151000015",
  };

  const row = { display: "flex", gap: 0, fontSize: 11.5, lineHeight: "1.85", alignItems: "baseline" };
  const kk  = { minWidth: 80, color: "#333", fontFamily: F };
  const vv  = { fontFamily: F };
  const sec = { fontSize: 13, fontWeight: "bold", textDecoration: "underline", color: "#000", display: "block", marginBottom: 6, fontFamily: F };

  function handlePrint() {
    const num    = (facture.numero_facture || "").replace(/\//g, "");
    const projet = facture.devis_projet ? " " + facture.devis_projet : "";
    document.title = `${num}${projet}`;

    const root = document.getElementById("root");
    const docEl = document.querySelector(".engy-print-doc");
    if (!root || !docEl) return;

    const prevRootDisplay = root.style.display;
    root.style.display = "none";

    const printContainer = document.createElement("div");
    printContainer.id = "tmp-print";
    printContainer.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: #fff;
      width: 100%; height: 100%;
      overflow: visible;
    `;
    printContainer.innerHTML = docEl.outerHTML;
    document.body.appendChild(printContainer);

    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";

    window.print();

    setTimeout(() => {
      document.getElementById("tmp-print")?.remove();
      root.style.display = prevRootDisplay;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.title = "Engytech Admin";
    }, 500);
  }

  return (
    <div className="engy-print-root g-print-overlay">
      <div className="engy-print-controls" style={{ position: "fixed", top: 16, right: 16, display: "flex", gap: 8, zIndex: 10 }}>
        <button className="g-print-btn" onClick={handlePrint}>{Ic.printer("#fff")} Imprimer / PDF</button>
        <button className="g-print-close" onClick={onClose}>{Ic.close()}</button>
      </div>

      <div className="engy-print-doc"
        style={{
          background: "#f8fafc",
          backgroundImage: `url(${watermarkImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "310% 130%",
          padding: "1.5cm 2cm 0",
          fontFamily: F,
          color: "#000",
          position: "relative",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          overflow: "hidden",
          width: "21cm",
          minHeight: "29.7cm",
        }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, position: "relative", zIndex: 1 }}>
          <EngyLogo />
          <div style={{ paddingTop: 130, textAlign: "right" }}>
            <span style={{ fontFamily: F, fontSize: 24, fontWeight: "bold", color: "#1b3a6b", textDecoration: "underline", letterSpacing: 3 }}>FACTURE</span>
          </div>
        </div>

        {/* Prestataire */}
        <div style={{ marginBottom: 14, position: "relative", zIndex: 1 }}>
          <span style={sec}>Prestataire :</span>
          <div style={row}><span style={kk}>Nom</span><span style={{ fontFamily: F }}>:&nbsp;</span><span style={vv}>{prestataire.nom}</span></div>
          <div style={row}><span style={kk}>Adresse</span><span style={{ fontFamily: F }}>:&nbsp;</span><span style={vv}>{prestataire.adresse}</span></div>
          <div style={row}><span style={kk}>ICE</span><span style={{ fontFamily: F }}>:&nbsp;</span><span style={vv}>{prestataire.ice}</span></div>
        </div>

        {/* Client */}
        <div style={{ marginBottom: 14, position: "relative", zIndex: 1 }}>
          <span style={sec}>Client :</span>
          <div style={row}><span style={kk}>Nom</span><span style={{ fontFamily: F }}>:&nbsp;</span><span style={vv}>{facture.client_nom}</span></div>
          <div style={row}><span style={kk}>ICE</span><span style={{ fontFamily: F }}>:&nbsp;</span><span style={vv}>{facture.client_ice || "—"}</span></div>
        </div>

        {/* Infos facture */}
        <div style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
          <span style={sec}>Informations Facture :</span>
          <div style={row}><span style={kk}>N° Facture</span><span style={{ fontFamily: F }}>:&nbsp;</span><span style={vv}><strong>{facture.numero_facture}</strong></span></div>
          <div style={row}><span style={kk}>Date N°</span><span style={{ fontFamily: F }}>:&nbsp;</span><span style={vv}>{dateStr}</span></div>
          <div style={row}><span style={kk}>Devis Projet</span><span style={{ fontFamily: F }}>:&nbsp;</span><span style={vv}>{facture.devis_projet || "—"}</span></div>
        </div>

        {/* Tableau */}
        <table style={{ width: "100%", borderCollapse: "collapse", position: "relative", zIndex: 1 }}>
          <thead>
            <tr><th style={{ ...thS("left"),   width: "42%" }}>Intitulé</th><th style={{ ...thS("center"), width: "8%"  }}>Unité</th><th style={{ ...thS("center"), width: "10%" }}>Qté</th><th style={{ ...thS("right"),  width: "20%" }}>Prix Unitaire</th><th style={{ ...thS("right"),  width: "20%" }}>Prix Hors Taxes</th></tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}><td style={tdS("left",   false, i % 2 === 0 ? "#eef3fb" : "#fff")}>{item.intitule}</td><td style={tdS("center", false, i % 2 === 0 ? "#eef3fb" : "#fff")}>{item.unite || "F"}</td><td style={tdS("center", false, i % 2 === 0 ? "#eef3fb" : "#fff")}>{item.quantite_label || item.quantite}</td><td style={tdS("right",  false, i % 2 === 0 ? "#eef3fb" : "#fff")}>{fmt(item.prix_unitaire)}</td><td style={tdS("right",  true,  i % 2 === 0 ? "#eef3fb" : "#fff")}>{fmt(item.total)}</td></tr>
            ))}
            <tr><td colSpan={3} style={{ border: "none", background: "transparent" }} /><td style={{ ...tdS("right", false, "#eaeff8"), fontWeight: 600 }}>Total HT</td><td style={{ ...tdS("right", true, "#eaeff8") }}>{fmt(ht)}</td></tr>
            <tr><td colSpan={3} style={{ border: "none", background: "transparent" }} /><td style={{ ...tdS("right", false, "#eaeff8"), fontWeight: 600 }}>TVA {tva}%</td><td style={{ ...tdS("right", true, "#eaeff8") }}>{fmt(ht * tva / 100)}</td></tr>
            <tr><td colSpan={3} style={{ border: "none", background: "transparent" }} /><td style={{ ...tdS("right", true, "#1b3a6b"), color: "#fff", fontSize: 12 }}>Total TTC</td><td style={{ ...tdS("right", true, "#1b3a6b"), color: "#fff", fontSize: 12 }}>{fmt(ttc)}</td></tr>
          </tbody>
        </table>

        {/* Montant en lettres */}
        <div style={{ marginTop: 22, marginBottom: 26, fontSize: 11.5, fontFamily: F, color: "#000", position: "relative", zIndex: 1 }}>
          La présente facture est arrêtée à la somme de&nbsp;<strong>{ttcWords}</strong>
        </div>

        {/* Signature */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, position: "relative", zIndex: 1 }}>
          <div style={{ border: "1.5px solid #1b3a6b", minWidth: 330 }}>
            <div style={{ background: "#1b3a6b", color: "#fff", fontSize: 11, fontWeight: "bold", padding: "6px 14px", textAlign: "center", fontFamily: F }}>
              Signature et Cachet {prestataire.nom}
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 150, fontFamily: F, color: "#000", background: "#fff" }}>
              <div style={{ fontSize: 15, fontWeight: "bold", marginBottom: 8, height: 50 }}>ANASS EL KAHLAOUI</div>
              <div style={{ fontSize: 12, color: "#000000", fontWeight: "bold", height: 40 }}>{facture.numero_facture}</div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div style={{ marginLeft: "-2cm", marginRight: "-2cm", borderTop: "1.5px solid #1b3a6b", padding: "8px 2cm 0", textAlign: "center", fontSize: 10, color: "#334155", lineHeight: 1.95, background: "#fff", fontFamily: F }}>
          <div style={{ fontWeight: "bold", fontSize: 9 }}>{prestataire.nom} SARL.AU | Siège Social : ROUIDATE 3 N°121 – Marrakech (CP : 40000) – Maroc</div>
          <div>Capital : 100 000 Dhs – Taxe professionnelle : 45318122 – RC : 177925 – IF : 71876394 – ICE : {prestataire.ice}</div>
          <div>Courriel : contact@archengytech.ma – GSM : 00212 6 62 25 78 79</div>
          <div>R.I.B : 230 450 70472552102770036</div>
          <div>I.B.A.N : MA 64230450704725522102770036 – CIHM MAMC</div>
          <div style={{ height: 10, marginTop: 6, marginLeft: "-2cm", marginRight: "-2cm", background: "linear-gradient(90deg,#1b3a6b 0%,#2a7fa5 40%,#3ab87a 100%)" }} />
        </div>

      </div>
    </div>
  );
}