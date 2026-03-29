import { useState, useEffect } from "react";
import { supabase } from "../../../../../backend/supabaseClient";
import { Ic } from "../icons/Icons";

export const Dash = () => (
  <span style={{ color: "#dde4f0", fontSize: "0.85rem" }}>—</span>
);

export function ClientCell({ d }) {
  return (
    <div style={{ minWidth: 140 }}>
      <div className="g-client-name">{d.nomcompelt}</div>
      <div className="g-client-email">{d.email}</div>
      {d.telephone && <div className="g-client-phone">{d.telephone}</div>}
    </div>
  );
}

export function BudgetCell({ v }) {
  if (!v) return <Dash />;
  return (
    <span style={{ fontWeight: 700, color: "#1e2940", fontSize: "0.8rem" }}>
      {Number(v).toLocaleString("fr-MA")}
      <span style={{ fontSize: "0.65rem", color: "#94a3b8", marginLeft: 3, fontWeight: 500 }}>MAD</span>
    </span>
  );
}

export function DateCell({ v }) {
  if (!v) return <Dash />;
  return (
    <span style={{ whiteSpace: "nowrap", fontSize: "0.78rem", color: "#475569" }}>
      {new Date(v).toLocaleDateString("fr-MA", { day: "2-digit", month: "short", year: "numeric" })}
    </span>
  );
}

export function StatutBadge({ s }) {
  return s === "traité"
    ? <span className="b b-green">{Ic.check("#047857")} Traité</span>
    : <span className="b b-red"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b91c1c", display: "inline-block", flexShrink: 0 }} /> Nouveau</span>;
}

export function SignedFileLink({ file }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    supabase.storage
      .from("documents-projects")
      .createSignedUrl(file.file_path, 60)
      .then(({ data }) => data && setUrl(data.signedUrl));
  }, [file.file_path]);

  if (!url) return <span style={{ color: "#94a3b8", fontSize: "0.71rem" }}>…</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="g-doc-link">
      {Ic.clip("#1d4ed8")} {file.file_name}
    </a>
  );
}

export function DocsCell({ docs }) {
  if (!docs?.length) return <span style={{ fontSize: "0.71rem", color: "#dde4f0" }}>Aucun</span>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {docs.map((f, i) => <SignedFileLink key={i} file={f} />)}
    </div>
  );
}

export function ActionCell({ d, cb }) {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {d.status !== "traité" && (
        <button className="g-btn g-btn-green" onClick={() => cb.traite(d.id)}>
          {Ic.check("#047857")} Traité
        </button>
      )}
      <button className="g-btn g-btn-blue" onClick={() => cb.edit(d)}>{Ic.edit("#4f7cff")}</button>
      <button className="g-btn g-btn-red"  onClick={() => cb.del(d.id)}>{Ic.trash("#b91c1c")}</button>
    </div>
  );
}

export function EmptyState({ message = "Aucune donnée", sub = "" }) {
  return (
    <div className="g-empty">
      <div className="g-empty-ico">{Ic.inbox("#94a3b8")}</div>
      <h4>{message}</h4>
      {sub && <p>{sub}</p>}
    </div>
  );
}