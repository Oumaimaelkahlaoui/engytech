const F = "Arial, Helvetica, sans-serif";

function EngyLogo() {
  return <img src="/unnamed.png" alt="Engytech Logo" style={{ height: 120, display: "block", margin: "0 auto" }} />;
}

export function PrintPreviewAttestation({ data = {}, onClose }) {
  const dateStr = data.date
    ? new Date(data.date + "T00:00:00").toLocaleDateString("fr-FR")
    : "—";

  return (
    <>
      <div style={{ position: "fixed", top: 16, right: 16, display: "flex", gap: 8 }}>
        <button onClick={() => window.print()}>🖨️ Imprimer</button>
        <button onClick={onClose}>❌</button>
      </div>

      <div style={{ width: 794, minHeight: 1123, margin: "auto", background: "#fff", padding: "40px 60px", fontFamily: F, lineHeight: 1.6, position: "relative" }}>
        <EngyLogo />

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <div style={{ fontSize: 12 }}>Bureau d'Etudes Technique</div>
          <div style={{ fontSize: 12 }}>TCE | BIM | OPC</div>
          <h2 style={{ marginTop: 20, textDecoration: "underline", letterSpacing: 1 }}>ATTESTATION DE STABILITÉ</h2>
        </div>

        <div style={{ marginTop: 30 }}><strong>OBJET :</strong> {data.objet}</div>
        <div style={{ marginTop: 10 }}><strong>Sis à :</strong> {data.adresse}</div>
        <div style={{ marginTop: 5 }}><strong>T.F :</strong> {data.tf}</div>
        <div style={{ textAlign: "right", marginTop: 20 }}>Marrakech, le {dateStr}</div>
        <div style={{ marginTop: 25, textAlign: "justify" }}>{data.contenu}</div>

        <div style={{ marginTop: 60, textAlign: "center" }}>
          <div>Fait à Marrakech, {dateStr}</div>
          <div style={{ marginTop: 20 }}>Etablie et signée par {data.signataire}</div>
        </div>

        <div style={{ position: "absolute", bottom: 20, left: 40, right: 40, textAlign: "center", fontSize: 10, lineHeight: 1.6 }}>
          ARCH ENGY TECH S.A.R.L A.U | ROUIDATE 3 N°121 – Marrakech (CP : 40000)<br />
          Capital : 100 000 Dhs – RC : 177925 – IF : 71876394 – ICE : 003908151000015<br />
          contact@archengytech.ma – GSM : 06 62 25 78 79
        </div>
      </div>
    </>
  );
}