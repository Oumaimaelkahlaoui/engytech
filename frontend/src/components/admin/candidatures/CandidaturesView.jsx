import { useState, useEffect } from "react";
import { supabase } from "../../../../../backend/supabaseClient";
import { Ic } from "../icons/Icons";
import { Pagination } from "../shared/Pagination";
import { DateCell, StatutBadge, EmptyState } from "../shared/Cells";
import { CandidatureModal } from "./CandidatureModal";
import { PER_PAGE } from "../devis/devisConfig";

export function CandidaturesView({ candidatures, onRefresh }) {
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all");
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState(null);

  useEffect(() => { setPage(1); }, [search, filter]);

  const visible = candidatures.filter(c => {
    const matchSearch = !search || c.nom?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()) || c.poste?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "traité" ? c.status === "traité" : c.status !== "traité");
    return matchSearch && matchFilter;
  });

  const current = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const vTraites = visible.filter(c => c.status === "traité").length;
  const vPending = visible.filter(c => c.status !== "traité").length;

  async function traite(id) {
    await supabase.from("candidatures").update({ status: "traité" }).eq("id", id);
    onRefresh();
  }
  async function del(id) {
    if (!window.confirm("Supprimer cette candidature ?")) return;
    await supabase.from("candidatures").delete().eq("id", id);
    onRefresh();
  }

  const STATS = [
    { lbl: "Total",      val: visible.length,                               ico: Ic.stat_list, c: "#2a7fa518" },
    { lbl: "Traitées",   val: vTraites,                                     ico: Ic.stat_ok,   c: "#10b98118" },
    { lbl: "En attente", val: vPending,                                     ico: Ic.stat_wait, c: "#f59e0b18" },
    { lbl: "Avec CV",    val: visible.filter(c => c.cv_path).length,        ico: Ic.stat_docs, c: "#6382ff18" },
  ];

  return (
    <>
      <div className="g-topbar">
        <div className="g-topbar-left">
          <div className="g-topbar-icon" style={{ background: "#f0f9ff" }}>{Ic.users("#2a7fa5")}</div>
          <div>
            <div className="g-topbar-title">Candidatures RH</div>
            <div className="g-topbar-sub">
              {visible.length} candidature{visible.length !== 1 ? "s" : ""} · {vTraites} traitée{vTraites !== 1 ? "s" : ""} · {vPending} en attente
            </div>
          </div>
        </div>
        <div className="g-topbar-right">
          <div className="g-search-wrap">
            <span className="g-search-ico">{Ic.search("#94a3b8")}</span>
            <input className="g-search" type="text" placeholder="Nom, email, poste…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="g-select-wrap">
            <span className="g-select-ico">{Ic.filter("#94a3b8")}</span>
            <select className="g-select" value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">Tous les statuts</option>
              <option value="traité">Traitées</option>
              <option value="nouveau">Nouvelles</option>
            </select>
          </div>
        </div>
      </div>

      <div className="g-content fade-in">
        <div className="g-stats">
          {STATS.map(({ lbl, val, ico, c }) => (
            <div className="g-stat" key={lbl}>
              <div className="g-stat-ico" style={{ background: c }}>{ico(c.slice(0, -2))}</div>
              <div><div className="g-stat-val">{val}</div><div className="g-stat-lbl">{lbl}</div></div>
            </div>
          ))}
        </div>

        <div className="g-card">
          <div className="g-card-header">
            <div className="g-card-header-left">
              <div className="g-card-header-dot" style={{ background: "#2a7fa5" }} />
              <span className="g-card-header-title">Candidatures reçues</span>
            </div>
            <span className="g-card-header-count">{visible.length} entrée{visible.length !== 1 ? "s" : ""}</span>
          </div>

          {visible.length === 0 ? (
            <EmptyState message="Aucune candidature" sub="Aucune candidature ne correspond à votre recherche." />
          ) : (
            <>
              <div className="g-table-wrap">
                <table className="g-table">
                  <thead>
                    <tr>
                      <th>Candidat</th>
                      <th>Poste souhaité</th>
                      <th>CV</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th style={{ width: 140 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div style={{ minWidth: 140 }}>
                            <div className="g-client-name" style={{ cursor: "pointer", color: "#1d4ed8" }} onClick={() => setSelected(c)}>{c.nom}</div>
                            <div className="g-client-email">{c.email}</div>
                            {c.telephone && <div className="g-client-phone">{c.telephone}</div>}
                          </div>
                        </td>
                        <td>
                          {c.poste
                            ? <span className="b b-indigo">{Ic.briefcase("#4338ca")} {c.poste}</span>
                            : <span style={{ color: "#dde4f0" }}>—</span>}
                        </td>
                        <td>
                          {c.cv_path
                            ? <span className="b b-blue">{Ic.clip("#1d4ed8")} Fourni</span>
                            : <span className="b b-gray">Non fourni</span>}
                        </td>
                        <td><DateCell v={c.created_at} /></td>
                        <td><StatutBadge s={c.status} /></td>
                        <td>
                          <div style={{ display: "flex", gap: 5 }}>
                            <button className="g-btn g-btn-blue" onClick={() => setSelected(c)}>{Ic.expertise("#4f7cff")} Voir</button>
                            {c.status !== "traité" && <button className="g-btn g-btn-green" onClick={() => traite(c.id)}>{Ic.check("#047857")}</button>}
                            <button className="g-btn g-btn-red" onClick={() => del(c.id)}>{Ic.trash("#b91c1c")}</button>
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
      </div>

      {selected && (
        <CandidatureModal
          cand={selected}
          onClose={() => setSelected(null)}
          onTraite={async (id) => { await traite(id); setSelected(null); }}
          onDelete={async (id) => { await del(id); setSelected(null); }}
        />
      )}
    </>
  );
}