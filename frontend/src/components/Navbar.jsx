import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Accueil",  path: "/" },
  { label: "À propos", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar navbar--visible ${scrolled ? "navbar--scrolled" : ""}`}>

      {/* ✅ alt ajouté + dimensions */}
      <Link to="/" className="navbar__logo" aria-label="Retour à l'accueil">
<img
  src="/unnamed.webp"
  alt="Logo ARCH ENGYTECH"
  width={200}
  height={60}
  fetchPriority="high"
/>
      </Link>

      <ul
        className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        role="list"
      >
        {navItems.map(({ label, path }) => (
          <li key={label} onClick={() => setMenuOpen(false)}>
            <Link to={path}><span>{label}</span></Link>
          </li>
        ))}
      </ul>

      <button
        className="navbar__cta"
        onClick={() => navigate("/devis")}
      >
        Devis gratuit →
      </button>

      {/* ✅ aria-label + aria-expanded + aria-controls ajoutés */}
      <button
        className={`burger ${menuOpen ? "burger--open" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
        aria-controls="navbar-links"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

    </nav>
  );
}