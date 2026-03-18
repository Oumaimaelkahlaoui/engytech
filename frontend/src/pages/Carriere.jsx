import React, { useState, useRef, useCallback, useMemo } from 'react'
import { supabase } from "../../../backend/supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/MainFooter";

/* ─── SVG ICONS ─────────────────────────── */
const Icon = {
  user: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  mail: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
    </svg>
  ),
  phone: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
    </svg>
  ),
  briefcase: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/>
    </svg>
  ),
  message: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  upload: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  checkCircle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3ab87a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  chevronDown: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7a8faa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  send: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  rocket: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  bookOpen: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  mapPin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  clock: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  award: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  fileText: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  arrowRight: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  shield: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  briefcaseLg: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/>
    </svg>
  ),
};

/* ─── STYLES ─────────────────────────────── */
const S = {
  page: {
    background: "#f4f6fb",
    minHeight: "100vh",
    fontFamily: "'Outfit', system-ui, sans-serif",
  },

  /* HERO */
  hero: {
    position: "relative",
    background: "linear-gradient(140deg, #08111f 0%, #0e1c3a 45%, #14365a 75%, #1a5470 100%)",
    paddingTop: 68,
    overflow: "hidden",
  },
  heroBgGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)," +
      "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
    zIndex: 0,
  },
  heroBgGlow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 55% 65% at 80% 50%, rgba(42,127,165,0.22) 0%, transparent 65%)," +
      "radial-gradient(ellipse 38% 55% at 5% 65%, rgba(58,184,122,0.1) 0%, transparent 58%)",
    zIndex: 0,
  },
  heroInner: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "clamp(3rem,6vh,5.5rem) clamp(1.5rem,6vw,5rem) clamp(2.5rem,5vh,4.5rem)",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "flex-end",
    gap: 32,
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: "0.5625rem",
    fontWeight: 500,
    letterSpacing: "0.26em",
    textTransform: "uppercase",
    color: "#4ecda4",
    marginBottom: 20,
  },
  heroTagLine: { width: 28, height: 1, background: "#4ecda4", display: "inline-block" },
  heroH1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(2.4rem,5.5vw,4.25rem)",
    fontWeight: 400,
    lineHeight: 1.0,
    letterSpacing: "-0.03em",
    color: "#fff",
    margin: "0 0 16px",
  },
  heroItalic: { fontStyle: "italic", color: "#4ecda4" },
  heroSub: {
    fontSize: "clamp(0.8rem,1.3vw,0.9375rem)",
    fontWeight: 300,
    color: "rgba(255,255,255,0.45)",
    maxWidth: "46ch",
    lineHeight: 1.8,
    margin: 0,
  },
 
  /* STRIP */
  strip: {
    background: "rgb(13 27 54)",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    padding: "clamp(0.875rem,1.5vw,1.25rem) clamp(1.5rem,6vw,5rem)",
    display: "flex",
    justifyContent: "center",
  },
  stripInner: {
    maxWidth: 1100,
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 32,
    flexWrap: "wrap",
  },
  stripItem: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    fontSize: "0.7rem",
    fontWeight: 300,
    color: "rgba(255,255,255,0.35)",
  },
  stripIcon: { color: "#4ecda4", display: "flex", alignItems: "center" },

  /* MAIN */
  main: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "clamp(2rem,4vw,3.5rem) clamp(1.5rem,6vw,5rem) clamp(3rem,6vw,5rem)",
    display: "grid",
    gridTemplateColumns: "1fr 300px",
    gap: "clamp(2rem,4vw,3rem)",
    alignItems: "start",
  },

  /* FORM CARD */
  formCard: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(27,47,110,0.06), 0 8px 32px rgba(27,47,110,0.09)",
    overflow: "hidden",
  },
  formCardHeader: {
    padding: "18px 26px",
    borderBottom: "1px solid #edf1f8",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  formCardDot: {
    width: 7, height: 7, borderRadius: "50%",
    background: "linear-gradient(135deg,#2a7fa5,#4ecda4)",
    flexShrink: 0,
  },
  formCardTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "0.9375rem",
    fontWeight: 500,
    color: "#0e1c3a",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  formBody: {
    padding: "26px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  fieldCol: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: "0.6375rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#7a8faa",
  },
  labelIcon: { display: "flex", alignItems: "center", color: "#9aafc4" },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: {
    position: "absolute",
    left: 12,
    color: "#b0bfd4",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 1,
  },
  input: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 300,
    color: "#0e1c3a",
    background: "#f8fafd",
    border: "1.5px solid #dde5f0",
    borderRadius: 8,
    padding: "11px 14px 11px 38px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.22s, box-shadow 0.22s, background 0.22s",
  },
  textarea: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 300,
    color: "#0e1c3a",
    background: "#f8fafd",
    border: "1.5px solid #dde5f0",
    borderRadius: 8,
    padding: "12px 14px 12px 38px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
    minHeight: 110,
    lineHeight: 1.65,
    transition: "border-color 0.22s, box-shadow 0.22s, background 0.22s",
  },
  divider: {
    display: "flex", alignItems: "center", gap: 12, margin: "2px 0",
  },
  dividerLine: { flex: 1, height: 1, background: "#edf1f8" },
  dividerText: {
    fontSize: "0.5625rem",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#c9d4e8",
    whiteSpace: "nowrap",
  },
  fileZone: {
    border: "1.5px dashed #c9d4e8",
    borderRadius: 10,
    padding: "24px 16px",
    textAlign: "center",
    cursor: "pointer",
    background: "#f8fafd",
    transition: "border-color 0.22s, background 0.22s",
    display: "block",
  },
  fileIconWrap: {
    width: 48, height: 48, borderRadius: 12,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    transition: "background 0.2s, border-color 0.2s",
  },
  fileText: { fontSize: "0.8rem", fontWeight: 300, color: "#7a8faa", margin: "0 0 4px" },
  fileHint: { fontSize: "0.5875rem", color: "#b0bfd4", letterSpacing: "0.06em" },
  submitBtn: {
    width: "100%",
    padding: "14px 24px",
    background: "linear-gradient(90deg, #1b2f6e 0%, #2a7fa5 55%, #3ab87a 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(42,127,165,0.38)",
    transition: "filter 0.25s, transform 0.25s, box-shadow 0.25s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  formNote: {
    fontSize: "0.6875rem",
    color: "#9aafc4",
    textAlign: "center",
    margin: 0,
    lineHeight: 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  /* SIDEBAR */
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    position: "sticky",
    top: 88,
  },
  sideCard: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 2px 8px rgba(27,47,110,0.06), 0 6px 24px rgba(27,47,110,0.08)",
    overflow: "hidden",
  },
  sideHeader: {
    padding: "14px 18px",
    borderBottom: "1px solid #edf1f8",
    display: "flex",
    alignItems: "center",
    gap: 9,
  },
  sideHeaderIcon: {
    width: 30, height: 30, borderRadius: 8,
    background: "linear-gradient(135deg, rgba(27,47,110,0.07), rgba(42,127,165,0.1))",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#2a7fa5", flexShrink: 0,
  },
  sideTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#0e1c3a",
    margin: 0,
  },
  sideBody: {
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  posteRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 11px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.18s, border-color 0.18s",
    border: "1px solid transparent",
  },
  posteLeft: {
    display: "flex",
    alignItems: "center",
    gap: 9,
  },
  posteIconWrap: {
    width: 28, height: 28, borderRadius: 7,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.18s",
  },
  posteLabel: {
    fontSize: "0.775rem",
    fontWeight: 400,
    color: "#0e1c3a",
    transition: "color 0.18s",
  },
  posteBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: "0.45rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: 100,
  },
  posteDot: {
    width: 4, height: 4, borderRadius: "50%", display: "inline-block",
  },
  sideNote: {
    fontSize: "0.6375rem",
    color: "#b0bfd4",
    margin: "4px 0 0",
    lineHeight: 1.55,
  },

  /* DARK VALUES CARD */
  valCard: {
    background: "linear-gradient(160deg, #08111f 0%, #0e1c3a 100%)",
    borderRadius: 14,
    boxShadow: "0 4px 24px rgba(8,17,31,0.28)",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.04)",
  },
  valHeader: {
    padding: "14px 18px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    gap: 9,
  },
  valHeaderIcon: {
    width: 30, height: 30, borderRadius: 8,
    background: "rgba(78,205,164,0.12)",
    border: "1px solid rgba(78,205,164,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#4ecda4", flexShrink: 0,
  },
  valTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "#fff",
    margin: 0,
  },
  valBody: {
    padding: "14px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 13,
  },
  valRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 11,
  },
  valIconWrap: {
    width: 32, height: 32, borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    color: "#4ecda4",
    background: "rgba(78,205,164,0.09)",
    border: "1px solid rgba(78,205,164,0.14)",
  },
  valText: { paddingTop: 2 },
  valLabel: {
    fontSize: "0.775rem", fontWeight: 500, color: "#fff", margin: "0 0 2px",
  },
  valDesc: {
    fontSize: "0.66rem", fontWeight: 300,
    color: "rgba(255,255,255,0.3)",
    lineHeight: 1.55, margin: 0,
  },
};

/* ─── DATA ───────────────────────────────── */
const POSTES = [
  { label: "Ingénieur structure",  color: "#1b2f6e", bg: "rgba(27,47,110,0.08)"  },
  { label: "Ingénieur VRD",        color: "#2a7fa5", bg: "rgba(42,127,165,0.08)" },
  { label: "Dessinateur AutoCAD",  color: "#1d5c7a", bg: "rgba(29,92,122,0.08)"  },
  { label: "Chargé d'études",      color: "#3ab87a", bg: "rgba(58,184,122,0.08)" },
  { label: "Autre",                color: "#7a8faa", bg: "rgba(122,143,170,0.08)"},
];

const VALEURS = [
  { icon: Icon.rocket,   label: "Ambition",    desc: "Des projets d'envergure qui propulsent votre carrière." },
  { icon: Icon.users,    label: "Équipe",       desc: "Une team soudée, pluridisciplinaire et bienveillante." },
  { icon: Icon.bookOpen, label: "Formation",    desc: "Montée en compétences et accompagnement continu." },
  { icon: Icon.zap,      label: "Innovation",   desc: "Méthodes modernes et outils de pointe." },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
/* ── Field wrapper — defined OUTSIDE Career to prevent remount on each keystroke ── */
function Field({ label, icon, children }) {
  return (
    <div style={S.fieldCol}>
      <div style={S.labelRow}>
        {icon && <span style={S.labelIcon}>{icon}</span>}
        {label}
      </div>
      <div style={S.inputWrap}>
        {icon && <span style={S.inputIcon}>{icon}</span>}
        {children}
      </div>
    </div>
  )
}

export default function Career() {
  const [nom, setNom]               = useState("")
  const [email, setEmail]           = useState("")
  const [telephone, setTelephone]   = useState("")
  const [poste, setPoste]           = useState("")
  const [message, setMessage]       = useState("")
  const [cv, setCv]                 = useState(null)
  const [fileDrag, setFileDrag]     = useState(false)
  const [submitting, setSubmitting] = useState(false)

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

  React.useEffect(() => {
    const id = "career-styles"
    if (document.getElementById(id)) return
    const el = document.createElement("style")
    el.id = id
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500&display=swap');
      @media (max-width: 900px) {
        .career-main    { grid-template-columns: 1fr !important; }
        .career-sidebar { position: static !important; }
        .career-hero-inner { grid-template-columns: 1fr !important; }
        .career-hero-stats { flex-direction: row !important; align-self: flex-start !important; margin-top: 20px !important; }
      }
      @media (max-width: 600px) {
        .career-row   { grid-template-columns: 1fr !important; }
        .career-strip { display: none !important; }
      }
      .career-poste-row:hover { background: #edf1f8 !important; border-color: #dde5f0 !important; }
      .cf-input:focus {
        border-color: #2a7fa5 !important;
        box-shadow: 0 0 0 3px rgba(42,127,165,0.11) !important;
        background: #fff !important;
        outline: none !important;
      }
    `
    document.head.appendChild(el)
    return () => document.getElementById(id)?.remove()
  }, [])

  // Stable style objects — no re-render on focus
  const inpStyle = S.input
  const taStyle  = S.textarea

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      let cvPath = null
      if (cv) {
        const fileName = `${Date.now()}-${cv.name}`
        const { error } = await supabase.storage.from("documents-projects").upload(`cv/${fileName}`, cv)
        if (error) { console.log(error); return }
        cvPath = `cv/${fileName}`
      }
      const { error } = await supabase.from("candidatures").insert([{ nom, email, telephone, poste, message, cv_path: cvPath }])
      if (error) console.log(error)
      else alert("Candidature envoyée avec succès !")
    } finally {
      setSubmitting(false)
    }
  }



  return (
    <div style={S.page}>
      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot"  ref={cursorDotRef} />
      <Navbar />

      {/* ══ HERO ══ */}
      <div style={S.hero}>
        <div style={S.heroBgGrid} />
        <div style={S.heroBgGlow} />
        <div className="career-hero-inner" style={S.heroInner}>
          <div>
            <div style={S.heroTag}>
              <span style={S.heroTagLine} />
              Engytech — Recrutement
            </div>
            <h1 style={S.heroH1}>
              Rejoignez notre <span style={S.heroItalic}>équipe</span>
            </h1>
            <p style={S.heroSub}>
              Nous recherchons des talents passionnés par l'ingénierie pour
              construire ensemble les projets de demain.
            </p>
          </div>
        
        </div>
      </div>

      {/* ══ STRIP ══ */}
      <div className="career-strip" style={S.strip}>
        <div style={S.stripInner}>
          {[
            { icon: Icon.fileText, text: "CDI & CDD disponibles" },
            { icon: Icon.mapPin,   text: "Marrakech, Maroc" },
            { icon: Icon.award,    text: "Profils juniors & seniors bienvenus" },
            { icon: Icon.clock,    text: "Réponse sous 24 heures" },
          ].map(t => (
            <div key={t.text} style={S.stripItem}>
              <span style={S.stripIcon}>{t.icon}</span>
              {t.text}
            </div>
          ))}
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div className="career-main" style={S.main}>

        {/* ── FORM CARD ── */}
        <div style={S.formCard}>
          <div style={S.formCardHeader}>
            <div style={S.formCardDot} />
            <h2 style={S.formCardTitle}>Votre candidature</h2>
          </div>

          <form onSubmit={handleSubmit} style={S.formBody}>

            <div className="career-row" style={S.fieldRow}>
              <Field id="nom" label="Nom complet *" icon={Icon.user}>
                <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Mohamed Alami" required className="cf-input" style={inpStyle} />
              </Field>
              <Field id="email" label="Email *" icon={Icon.mail}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="exemple@email.com" type="email" required className="cf-input" style={inpStyle} />
              </Field>
            </div>

            <div className="career-row" style={S.fieldRow}>
              <Field id="tel" label="Téléphone *" icon={Icon.phone}>
                <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+212 6 00 00 00 00" required className="cf-input" style={inpStyle} />
              </Field>
              <Field id="poste" label="Poste souhaité" icon={Icon.briefcase}>
                <select
                  value={poste}
                  onChange={e => setPoste(e.target.value)}
                  style={{ ...inpStyle, paddingRight: 36, cursor: "pointer" }}
                >
                  <option value="">Sélectionner...</option>
                  {POSTES.map(p => <option key={p.label} value={p.label}>{p.label}</option>)}
                </select>
                <span style={{ position: "absolute", right: 12, pointerEvents: "none" }}>
                  {Icon.chevronDown}
                </span>
              </Field>
            </div>

            <Field id="msg" label="Message de motivation" icon={Icon.message}>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Décrivez votre parcours, vos motivations et ce que vous apporteriez à notre équipe..."
                className="cf-input" style={taStyle}
              />
            </Field>

            <div style={S.divider}>
              <div style={S.dividerLine} />
              <span style={S.dividerText}>CV / Portfolio</span>
              <div style={S.dividerLine} />
            </div>

            {/* FILE DROP ZONE */}
            <label
              htmlFor="cv-upload"
              style={{
                ...S.fileZone,
                borderColor: fileDrag ? "#2a7fa5" : cv ? "#3ab87a" : "#c9d4e8",
                background: fileDrag ? "rgba(42,127,165,0.04)" : cv ? "rgba(58,184,122,0.04)" : "#f8fafd",
              }}
              onDragOver={e => { e.preventDefault(); setFileDrag(true) }}
              onDragLeave={() => setFileDrag(false)}
              onDrop={e => { e.preventDefault(); setFileDrag(false); setCv(e.dataTransfer.files[0]) }}
            >
              <div style={{
                ...S.fileIconWrap,
                background: cv ? "rgba(58,184,122,0.08)" : fileDrag ? "rgba(42,127,165,0.1)" : "rgba(42,127,165,0.07)",
                border: `1px solid ${cv ? "rgba(58,184,122,0.2)" : "rgba(42,127,165,0.14)"}`,
                color: cv ? "#3ab87a" : "#2a7fa5",
              }}>
                {cv ? Icon.checkCircle : Icon.upload}
              </div>
              {cv ? (
                <p style={{ ...S.fileText, color: "#3ab87a", fontWeight: 500, margin: 0 }}>{cv.name}</p>
              ) : (
                <>
                  <p style={S.fileText}>
                    Glissez votre CV ici ou{" "}
                    <span style={{ color: "#2a7fa5", fontWeight: 500 }}>parcourir</span>
                  </p>
                  <p style={S.fileHint}>PDF, DOC, DOCX — max 10 Mo</p>
                </>
              )}
              <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" onChange={e => setCv(e.target.files[0])} style={{ display: "none" }} />
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={submitting}
              style={{ ...S.submitBtn, opacity: submitting ? 0.75 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
              onMouseEnter={e => {
                if (!submitting) {
                  e.currentTarget.style.filter = "brightness(1.1)"
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(42,127,165,0.45)"
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = ""
                e.currentTarget.style.transform = ""
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(42,127,165,0.38)"
              }}
            >
              {submitting
                ? <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.2-8.6"/>
                    </svg>
                    Envoi en cours…
                  </>
                : <>{Icon.send} Envoyer ma candidature</>
              }
            </button>

            <p style={S.formNote}>
              <span style={{ color: "#b0bfd4", display: "flex" }}>{Icon.shield}</span>
              Vos informations sont traitées de façon confidentielle.
            </p>
          </form>
        </div>

        {/* ── SIDEBAR ── */}
        <div className="career-sidebar" style={S.sidebar}>

          {/* Postes card */}
          <div style={S.sideCard}>
            <div style={S.sideHeader}>
              <div style={S.sideHeaderIcon}>{Icon.briefcaseLg}</div>
              <h3 style={S.sideTitle}>Postes recherchés</h3>
            </div>
            <div style={S.sideBody}>
              {POSTES.map(p => {
                const isSelected = poste === p.label
                return (
                  <div
                    key={p.label}
                    className="career-poste-row"
                    style={{
                      ...S.posteRow,
                      background: isSelected ? p.bg : "#f8fafd",
                      borderColor: isSelected ? `${p.color}35` : "transparent",
                    }}
                    onClick={() => setPoste(p.label)}
                  >
                    <div style={S.posteLeft}>
                      <div style={{
                        ...S.posteIconWrap,
                        background: isSelected ? p.bg : "rgba(200,210,230,0.3)",
                        color: isSelected ? p.color : "#9aafc4",
                      }}>
                        {Icon.arrowRight}
                      </div>
                      <span style={{
                        ...S.posteLabel,
                        color: isSelected ? p.color : "#0e1c3a",
                        fontWeight: isSelected ? 500 : 400,
                      }}>
                        {p.label}
                      </span>
                    </div>
                    <span style={{
                      ...S.posteBadge,
                      color: p.color,
                      background: p.bg,
                    }}>
                      <span style={{ ...S.posteDot, background: p.color }} />
                      Ouvert
                    </span>
                  </div>
                )
              })}
              <p style={S.sideNote}>Cliquez pour sélectionner dans le formulaire.</p>
            </div>
          </div>

          {/* Values card */}
          <div style={S.valCard}>
            <div style={S.valHeader}>
              <div style={S.valHeaderIcon}>{Icon.zap}</div>
              <h3 style={S.valTitle}>Pourquoi nous rejoindre ?</h3>
            </div>
            <div style={S.valBody}>
              {VALEURS.map(v => (
                <div key={v.label} style={S.valRow}>
                  <div style={S.valIconWrap}>{v.icon}</div>
                  <div style={S.valText}>
                    <p style={S.valLabel}>{v.label}</p>
                    <p style={S.valDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}