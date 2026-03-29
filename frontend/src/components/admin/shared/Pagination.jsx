import { Ic } from "../icons/Icons";

export function Pagination({ total, page, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const from = (page - 1) * perPage + 1;
  const to   = Math.min(page * perPage, total);

  function buildPageNumbers() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  const isFirst = page === 1;
  const isLast  = page === totalPages;

  return (
    <div className="g-pagination">
      <div className="g-pag-info">
        <strong>{from}–{to}</strong> sur <strong>{total}</strong> demande{total !== 1 ? "s" : ""}
      </div>
      <div className="g-pag-controls">
        <button className="g-pag-btn" disabled={isFirst} onClick={() => onChange(1)}>{Ic.chevLL(isFirst ? "#c5cfe0" : "#64748b")}</button>
        <button className="g-pag-btn" disabled={isFirst} onClick={() => onChange(page - 1)}>{Ic.chevL(isFirst ? "#c5cfe0" : "#64748b")}</button>
        {buildPageNumbers().map((p, i) =>
          p === "…"
            ? <span key={`dots-${i}`} className="g-pag-dots">…</span>
            : <button key={p} className={`g-pag-num${page === p ? " active" : ""}`} onClick={() => onChange(p)}>{p}</button>
        )}
        <button className="g-pag-btn" disabled={isLast} onClick={() => onChange(page + 1)}>{Ic.chevR(isLast ? "#c5cfe0" : "#64748b")}</button>
        <button className="g-pag-btn" disabled={isLast} onClick={() => onChange(totalPages)}>{Ic.chevRR(isLast ? "#c5cfe0" : "#64748b")}</button>
      </div>
    </div>
  );
}