import { Ic } from "../icons/Icons";
import { ClientCell, ActionCell, DocsCell, StatutBadge, Dash } from "../shared/Cells";

export const TYPES = [
  { key: "all",                                                    label: "Toutes les demandes",    icon: Ic.all,       color: "#2a7fa5", bg: "#e0f2ff" },
  { key: "Étude de structure (béton armé / métallique)",           label: "Étude de structure",     icon: Ic.structure, color: "#2563eb", bg: "#eff6ff" },
  { key: "Étude VRD (assainissement, voirie, réseaux)",            label: "Étude VRD",              icon: Ic.vrd,       color: "#0d9488", bg: "#f0fdfa" },
  { key: "OPC – Ordonnancement, Pilotage et Coordination",         label: "OPC",                    icon: Ic.opc,       color: "#7c3aed", bg: "#f5f3ff" },
  { key: "Notice de sécurité incendie",                            label: "Sécurité incendie",      icon: Ic.fire,      color: "#dc2626", bg: "#fef2f2" },
  { key: "Expertise technique et diagnostic des ouvrages",         label: "Expertise technique",    icon: Ic.expertise, color: "#b45309", bg: "#fffbeb" },
  { key: "Suivi et contrôle technique des travaux",                label: "Suivi & contrôle",       icon: Ic.suivi,     color: "#c2410c", bg: "#fff7ed" },
  { key: "Étude d’Efficacité Énergétique du Bâtiment",            label: "Efficacité énergétique", icon: Ic.energy,    color: "#059669", bg: "#ecfdf5" },
  { key: "Note calculs",                                           label: "Note de calculs",        icon: Ic.calcul,    color: "#be185d", bg: "#fdf2f8" },
  { key: "CPS - Métré - estimation",                               label: "CPS / Métré",            icon: Ic.cps,       color: "#0d9488", bg: "#f0fdfa" },
];

export const PER_PAGE = 10;

const COLS_MAP = {
  "all": [
    { head: "Client",        render: (d)     => <ClientCell d={d} /> },
    { head: "Type de devis", render: (d)     => <span className="b b-indigo">{d.devis_types?.nom_devis || "—"}</span> },
    { head: "Surface",       render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
    { head: "Statut",        render: (d)     => <StatutBadge s={d.status} /> },
    { head: "Actions",       render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
  ],
  "Étude de structure (béton armé / métallique)": [
    { head: "Client",         render: (d)     => <ClientCell d={d} /> },
    { head: "Type structure", render: (d)     => d.type_structure ? <span className="b b-blue">{d.type_structure}</span> : <Dash /> },
    { head: "Type projet",    render: (d)     => d.type_projet || <Dash /> },
    { head: "Surface",        render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
    { head: "Documents",      render: (d)     => <DocsCell docs={d.documents} /> },
    { head: "Statut",         render: (d)     => <StatutBadge s={d.status} /> },
    { head: "Actions",        render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
  ],
};

export function getColsFor(key) {
  return COLS_MAP[key] || [
    { head: "Client",      render: (d)     => <ClientCell d={d} /> },
    { head: "Type projet", render: (d)     => d.type_projet || <Dash /> },
    { head: "Surface",     render: (d)     => d.surface ? <><b>{d.surface}</b> m²</> : <Dash /> },
    { head: "Documents",   render: (d)     => <DocsCell docs={d.documents} /> },
    { head: "Statut",      render: (d)     => <StatutBadge s={d.status} /> },
    { head: "Actions",     render: (d, cb) => <ActionCell d={d} cb={cb} />, isAction: true },
  ];
}