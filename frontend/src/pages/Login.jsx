import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../backend/supabaseClient'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [remember, setRemember]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [showPwd, setShowPwd]     = useState(false)
  const [focused, setFocused]     = useState(null)
  const cursorRef    = useRef(null)
  const cursorDotRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      cursorRef.current?.style.setProperty('transform', `translate(${e.clientX - 20}px,${e.clientY - 20}px)`)
      cursorDotRef.current?.style.setProperty('transform', `translate(${e.clientX - 4}px,${e.clientY - 4}px)`)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin', { replace: true })
    })
  }, [])

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        if (authError.message.includes('Invalid login')) setError('Email ou mot de passe incorrect.')
        else setError(authError.message)
        return
      }
      navigate('/admin', { replace: true })
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (id) => ({
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: '0.875rem',
    fontWeight: 300,
    color: '#0e1c3a',
    background: focused === id ? '#fff' : '#f8fafd',
    border: `1.5px solid ${focused === id ? '#1B8A8F' : error ? '#ef4444' : '#dde5f0'}`,
    borderRadius: 10,
    padding: '13px 44px 13px 16px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.22s, box-shadow 0.22s, background 0.22s',
    boxShadow: focused === id ? '0 0 0 3px rgba(27,138,143,0.12)' : 'none',
    WebkitAppearance: 'none',
    appearance: 'none',
  })

  /* ── SVG Icons ── */
  const IconDashboard = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  )
  const IconFolder = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
    </svg>
  )
  const IconShield = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  )

  const badges = [
    { Icon: IconDashboard, color: "#4ecda4", bg: "rgba(27,138,143,0.15)",  title: "Demandes en temps réel", sub: "Tableau de bord" },
    { Icon: IconFolder,    color: "#7b8fcf", bg: "rgba(43,57,144,0.2)",    title: "Gestion des projets",   sub: "Suivi complet" },
    { Icon: IconShield,    color: "#8fcf5a", bg: "rgba(125,194,66,0.15)",  title: "Accès sécurisé",        sub: "Supabase Auth" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        @media (pointer: fine) {
          body { cursor: none; }
          button, a { cursor: none; }
        }

        @keyframes lg-fade {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lg-bg-shift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Outfit', system-ui, sans-serif;
          background: #f4f6fb;
        }

        .login-left {
          position: relative;
          background: linear-gradient(135deg, #1a1f35 0%, #1e2d5a 35%, #0f4a5c 70%, #0d3a48 100%);
          background-size: 300% 300%;
          animation: lg-bg-shift 12s ease infinite;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(2.5rem, 5vw, 4rem);
          overflow: hidden;
        }
        .login-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 80% 30%, rgba(27,138,143,0.25) 0%, transparent 65%),
            radial-gradient(ellipse 50% 70% at 20% 80%, rgba(43,57,144,0.3) 0%, transparent 60%);
          pointer-events: none;
        }
        .login-left__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(27,138,143,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,138,143,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%);
          pointer-events: none;
        }
        .login-left__logo {
          position: relative;
          z-index: 1;
        }
        .login-left__body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 0;
        }
        .login-left__eyebrow {
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4ecda4;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.25rem;
        }
        .login-left__eyebrow::before {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: #4ecda4;
          flex-shrink: 0;
        }
        .login-left__h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #fff;
          margin-bottom: 1.25rem;
        }
        .login-left__h1 em { font-style: italic; color: #4ecda4; }
        .login-left__sub {
          font-size: 0.875rem;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.75;
          max-width: 36ch;
          margin-bottom: 2.5rem;
        }
        .login-left__badges {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 280px;
        }
        .lg-badge {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          animation: float-badge 4s ease-in-out infinite;
        }
        .lg-badge:nth-child(2) { animation-delay: 1.3s; }
        .lg-badge:nth-child(3) { animation-delay: 2.6s; }
        .lg-badge__icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .lg-badge__text strong {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #fff;
          line-height: 1.2;
        }
        .lg-badge__text span {
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .login-left__footer {
          position: relative;
          z-index: 1;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        .login-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: clamp(2rem, 5vw, 4rem);
          background: #f4f6fb;
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(27,47,110,0.06), 0 16px 48px rgba(27,47,110,0.1);
          padding: clamp(2rem, 4vw, 2.75rem);
          animation: lg-fade .55s cubic-bezier(.16,1,.3,1) both;
        }

        /* Logo row dans la card */
        .login-card__logorow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #f0f4f8;
        }

        .login-card__header { margin-bottom: 2rem; }
        .login-card__greeting {
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1B8A8F;
          margin-bottom: 6px;
        }
        .login-card__title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 1.875rem);
          font-weight: 500;
          color: #0e1c3a;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .login-card__title em { font-style: italic; color: #1B8A8F; }
        .login-card__sub {
          font-size: 0.8125rem;
          font-weight: 300;
          color: #7a8faa;
          margin-top: 6px;
          line-height: 1.5;
        }

        .login-form { display: flex; flex-direction: column; gap: 16px; }
        .login-field { display: flex; flex-direction: column; gap: 6px; }
        .login-label {
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7a8faa;
        }
        .login-input-wrap { position: relative; }
        .login-input-icon {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          color: #c9d4e8;
          pointer-events: none;
          display: flex; align-items: center;
        }
        .login-eye-btn {
          position: absolute;
          right: 11px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          padding: 5px; cursor: pointer;
          color: #b0c0d4;
          display: flex; align-items: center;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
        }
        .login-eye-btn:hover { color: #1B8A8F; background: rgba(27,138,143,0.07); }

        .login-remember {
          display: flex; align-items: center; gap: 10px; margin-top: 2px;
        }
        .login-checkbox {
          appearance: none; -webkit-appearance: none;
          width: 18px; height: 18px;
          border: 1.5px solid #dde5f0;
          border-radius: 5px; background: #f8fafd;
          flex-shrink: 0; cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
        }
        .login-checkbox:checked { background: #1B8A8F; border-color: #1B8A8F; }
        .login-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 4px; top: 1px;
          width: 6px; height: 10px;
          border: 2px solid #fff;
          border-top: none; border-left: none;
          transform: rotate(45deg);
        }
        .login-remember-label {
          font-size: 0.8rem; font-weight: 400;
          color: #7a8faa; cursor: pointer; user-select: none;
        }

        .login-error {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px;
          font-size: 0.8rem; color: #dc2626; line-height: 1.4;
        }

        .login-submit {
          width: 100%; padding: 14px 24px;
          background: linear-gradient(90deg, #1e2b70 0%, #1B8A8F 55%, #2ab0b6 100%);
          color: #fff; border: none; border-radius: 10px;
          font-family: 'Outfit', system-ui, sans-serif;
          font-size: 0.8125rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(27,138,143,0.4);
          transition: filter 0.25s, transform 0.25s, box-shadow 0.25s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-top: 4px;
        }
        .login-submit:hover:not(:disabled) {
          filter: brightness(1.08); transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(27,138,143,0.5);
        }
        .login-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .login-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin-slow 0.7s linear infinite;
        }

        .login-card__footer {
          margin-top: 1.5rem; padding-top: 1.5rem;
          border-top: 1px solid #edf1f8; text-align: center;
        }
        .login-card__footer p { font-size: 0.75rem; font-weight: 300; color: #9aafc4; line-height: 1.5; }
        .login-card__footer span {
          display: block; margin-top: 4px;
          font-size: 0.6rem; letter-spacing: 0.08em;
          text-transform: uppercase; color: #c9d4e8;
        }

        @media (max-width: 768px) {
          .login-page { grid-template-columns: 1fr; }
          .login-left { display: none; }
          .login-right { padding: 2rem 1.25rem; }
          .login-card { padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot"  ref={cursorDotRef} />

      <div className="login-page">

        {/* ── LEFT ── */}
        <div className="login-left">
          <div className="login-left__grid" />

          {/* ✅ Logo réel - blanc inversé sur fond sombre */}
          <div className="login-left__logo">
            <img
              src="/unnamed.webp"
              alt="ENGYTECH"
              style={{ height: 40, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.92 }}
            />
          </div>

          <div className="login-left__body">
            <div className="login-left__eyebrow">Espace administration</div>
            <h1 className="login-left__h1">
              Gérez vos<br />
              projets avec <em>précision</em>
            </h1>
            <p className="login-left__sub">
              Accédez à votre tableau de bord, suivez les demandes de devis et pilotez vos chantiers depuis un seul endroit.
            </p>

            {/* ✅ Badges avec icônes SVG pros */}
            <div className="login-left__badges">
              {badges.map(({ Icon, color, bg, title, sub }) => (
                <div className="lg-badge" key={title}>
                  <div className="lg-badge__icon" style={{ background: bg, color }}>
                    <Icon />
                  </div>
                  <div className="lg-badge__text">
                    <strong>{title}</strong>
                    <span>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="login-left__footer">© 2025 ENGYTECH — Bureau d'études · Marrakech</div>
        </div>

        {/* ── RIGHT ── */}
        <div className="login-right">
          <div className="login-card">

            {/* ✅ Logo couleur dans la card */}
       
            <div className="login-card__header">
              <p className="login-card__greeting">Accès réservé</p>
              <h2 className="login-card__title">
                Bon retour, <em>bienvenue</em>
              </h2>
              <p className="login-card__sub">Connectez-vous pour accéder à votre espace.</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>

              {/* Email */}
              <div className="login-field">
                <label className="login-label" htmlFor="email">Adresse email</label>
                <div className="login-input-wrap">
                  <input
                    id="email" type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@engytech.ma" required autoComplete="email"
                    style={inputStyle("email")}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  />
                  {/* ✅ Icône email SVG */}
                  <span className="login-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Password */}
              <div className="login-field">
                <label className="login-label" htmlFor="password">Mot de passe</label>
                <div className="login-input-wrap">
                  <input
                    id="password" type={showPwd ? "text" : "password"} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••" required autoComplete="current-password"
                    style={inputStyle("password")}
                    onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                  />
                  {/* ✅ Bouton œil SVG */}
                  <button type="button" className="login-eye-btn"
                    onClick={() => setShowPwd(v => !v)} tabIndex={-1}
                    aria-label={showPwd ? "Masquer" : "Afficher"}>
                    {showPwd ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="login-remember">
                <input type="checkbox" id="remember" className="login-checkbox"
                  checked={remember} onChange={e => setRemember(e.target.checked)} />
                <label htmlFor="remember" className="login-remember-label">
                  Se souvenir de moi
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="login-error">
                  {/* ✅ Icône alerte triangle SVG */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? (
                  <><div className="login-spinner" />Connexion…</>
                ) : (
                  <>
                    Se connecter
                    {/* ✅ Icône flèche SVG */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>

            </form>

            <div className="login-card__footer">
              <p>Accès réservé aux administrateurs ENGYTECH</p>
              <span>Mot de passe oublié ? Contactez l'administrateur</span>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}