import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Accueil",  path: "/" },
  { label: "À propos", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

      <Link to="/" className="navbar__logo">
        <img src="/unnamed.png" className="logo-img" alt="Logo" />
      </Link>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position:"fixed", inset:0,
          background:"rgba(13,17,23,0.5)",
          zIndex:189,
        }}/>
      )}

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {navItems.map(({ label, path }) => (
          <li key={label} onClick={() => setMenuOpen(false)}>
            <Link to={path}><span>{label}</span></Link>
          </li>
        ))}
      </ul>

      {/* ✅ BURGER — toujours dans le DOM, visibilité gérée UNIQUEMENT par CSS */}
      <button
        className={`burger ${menuOpen ? "burger--open" : ""}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>

    </nav>
  );
}