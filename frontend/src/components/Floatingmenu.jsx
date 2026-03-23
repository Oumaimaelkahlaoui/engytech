import { useEffect, useState } from "react";

const css = `
  .float-wrap {
    position: fixed;
    bottom: 28px; right: 24px;
    display: flex; flex-direction: column;
    align-items: center; gap: 10px;
    z-index: 999;
  }

  /* scroll to top */
  .float-top {
    width: 42px; height: 42px; border-radius: 50%;
    background: #fff; border: 1.5px solid #dde5ea;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,.12);
    transition: transform .3s cubic-bezier(.16,1,.3,1), opacity .3s, box-shadow .3s;
    color: #1B8A8F;
    opacity: 0; pointer-events: none;
  }
  .float-top.visible { opacity: 1; pointer-events: all; }
  .float-top:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.18); }
  .float-top svg { width: 18px; height: 18px; }

  /* sub-buttons (wa + phone) */
  .float-sub {
    display: flex; flex-direction: column;
    align-items: center; gap: 8px;
  }
  .float-sub-btn {
    width: 46px; height: 46px; border-radius: 50%;
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 18px rgba(0,0,0,.22);
    text-decoration: none;
    transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .3s, opacity .3s;
    opacity: 0; pointer-events: none;
    transform: translateY(16px) scale(.85);
    position: relative;
  }
  .float-sub-btn.show {
    opacity: 1; pointer-events: all;
    transform: translateY(0) scale(1);
  }
  .float-sub-btn:nth-child(2) { transition-delay: .05s; }
  .float-sub-btn:hover { transform: translateY(-3px) scale(1.06) !important; box-shadow: 0 10px 28px rgba(0,0,0,.28); }
  .float-sub-btn--wa    { background: #25D366; }
  .float-sub-btn--phone { background: #1B8A8F; }
  .float-sub-btn svg { width: 22px; height: 22px; }

  /* tooltip */
  .float-sub-btn::before {
    content: attr(data-tip);
    position: absolute; right: 54px;
    background: #0d1117; color: #fff;
    font-family: 'Outfit', system-ui, sans-serif;
    font-size: .7rem; font-weight: 500; letter-spacing: .04em;
    padding: 4px 10px; border-radius: 5px;
    white-space: nowrap; opacity: 0; pointer-events: none;
    transition: opacity .2s, transform .2s;
    transform: translateX(6px);
  }
  .float-sub-btn:hover::before { opacity: 1; transform: translateX(0); }

  /* main toggle */
  .float-main {
    width: 54px; height: 54px; border-radius: 50%;
    border: none; cursor: pointer;
    background: linear-gradient(135deg, #2B3990, #1B8A8F);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 24px rgba(27,138,143,.45);
    transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .3s;
  }
  .float-main:hover { transform: scale(1.08); box-shadow: 0 10px 36px rgba(27,138,143,.6); }
  .float-main svg { width: 24px; height: 24px; transition: transform .35s cubic-bezier(.16,1,.3,1); }
  .float-main.open svg { transform: rotate(45deg); }

  @media (max-width: 480px) {
    .float-wrap { bottom: 18px; right: 16px; }
    .float-sub-btn::before { display: none; }
  }
`;

export default function FloatingMenu({ phone = "+212662257879", whatsapp = "212662257879" }) {
  const [open, setOpen]       = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{css}</style>
      <div className="float-wrap">

        {/* ── WhatsApp + Téléphone ── */}
        <div className="float-sub">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`float-sub-btn float-sub-btn--wa${open ? " show" : ""}`}
            data-tip="WhatsApp"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          <a
            href={`tel:+${phone}`}
            className={`float-sub-btn float-sub-btn--phone${open ? " show" : ""}`}
            data-tip="Appeler"
            aria-label="Téléphone"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
            </svg>
          </a>
        </div>

        {/* ── Bouton principal + / × ── */}
        <button
          className={`float-main${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Contact rapide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5"  y1="12" x2="19" y2="12"/>
          </svg>
        </button>

        {/* ── Scroll to top — visible seulement quand menu fermé ── */}
        <button
          className={`float-top${showTop && !open ? " visible" : ""}`}
          onClick={scrollTop}
          aria-label="Retour en haut"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>

      </div>
    </>
  );
}