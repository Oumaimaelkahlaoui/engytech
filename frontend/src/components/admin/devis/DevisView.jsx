import { useState, useEffect } from "react";
import { Ic } from "../icons/Icons";
import { Pagination } from "../shared/Pagination";
import { EmptyState } from "../shared/Cells";
import { getColsFor, PER_PAGE } from "./devisConfig";

export function DevisView({ activeKey, activeConf, demandes, callbacks }) {
  const [search,       setSearch]       = useState("");
  const [filterStatut, setFilterStatut] = useState("all");
  const [page,         setPage]         = useState(1);

  useEffect(() => { setPage(1); }, [activeKey, search, filterStatut]);

  const visibleRows = demandes.filter(d => {
    const matchType   = !activeKey || activeKey === "all" || d.devis_types?.nom_devis === activeKey;
    const matchSearch = !search || d.nomcompelt?.toLowerCase().includes(search.toLowerCase()) || d.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filterStatut === "all" || (filterStatut === "traité" ? d.status === "traité" : d.status !== "traité");
    return matchType && matchSearch && matchStatut;
  });

  const currentRows = visibleRows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages  = Math.ceil(visibleRows.length / PER_PAGE);
  const vTraites    = visibleRows.filter(d => d.status === "traité").length;
  const vPending    = visibleRows.filter(d => d.status !== "traité").length;
  const activeCols  = getColsFor(activeKey);

  const STATS = [
    { lbl: "Demandes",   val: visibleRows.length,                                       ico: Ic.stat_list, c: activeConf.color + "18" },
    { lbl: "Traitées",   val: vTraites,                                                 ico: Ic.stat_ok,   c: "#10b98118" },
    { lbl: "En attente", val: vPending,                                                 ico: Ic.stat_wait, c: "#f59e0b18" },
    { lbl: "Avec docs",  val: visibleRows.filter(d => d.documents?.length > 0).length,  ico: Ic.stat_docs, c: "#6382ff18" },
  ];

  return (
    <>
      <div className="g-topbar">
        <div className="g-topbar-left">
          <div className="g-topbar-icon" style={{ background: activeConf.bg }}>
            {activeConf.icon(activeConf.color)}
          </div>
          <div>
            <div className="g-topbar-title">{activeConf.label}</div>
            <div className="g-topbar-sub">
              {visibleRows.length} demande{visibleRows.length !== 1 ? "s" : ""} · {vTraites} traitée{vTraites !== 1 ? "s" : ""} · {vPending} en attente
              {totalPages > 1 && <span> · page {page}/{totalPages}</span>}
            </div>
          </div>
        </div>
        <div className="g-topbar-right">
          <div className="g-search-wrap">
            <span className="g-search-ico">{Ic.search("#94a3b8")}</span>
            <input className="g-search" type="text" placeholder="Rechercher un client…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="g-select-wrap">
            <span className="g-select-ico">{Ic.filter("#94a3b8")}</span>
            <select className="g-select" value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
              <option value="all">Tous les statuts</option>
              <option value="traité">Traités</option>
              <option value="nouveau">Nouveaux</option>
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
              <div className="g-card-header-dot" style={{ background: activeConf.color }} />
              <span className="g-card-header-title">{activeConf.label}</span>
            </div>
            <span className="g-card-header-count">{visibleRows.length} entrée{visibleRows.length !== 1 ? "s" : ""}</span>
          </div>

          {visibleRows.length === 0 ? (
            <EmptyState message="Aucune demande" sub="Aucune demande pour ce filtre." />
          ) : (
            <>
              <div className="g-table-wrap">
                <table className="g-table">
                  <thead>
                    <tr>{activeCols.map(c => <th key={c.head} style={c.isAction ? { width: 115 } : {}}>{c.head}</th>)}</tr>
                  </thead>
                  <tbody>
                    {currentRows.map(d => (
                      <tr key={d.id}>
                        {activeCols.map(c => <td key={c.head}>{c.render(d, callbacks)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination total={visibleRows.length} page={page} perPage={PER_PAGE} onChange={setPage} />
            </>
          )}
        </div>
      </div>
    </>
  );
}