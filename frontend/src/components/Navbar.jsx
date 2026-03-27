import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Accueil",  path: "/" },
  { label: "À propos", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact",  path: "/contact" }, // scroll anchor si Contact reste dans la page
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar navbar--visible ${scrolled ? "navbar--scrolled" : ""}`}>
    <Link to="/" className="navbar__logo">
  <img src="/unnamed.png" className="logo-img" alt="Logo" />
</Link>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {navItems.map(({ label, path }) => (
          <li key={label} onClick={() => setMenuOpen(false)}>
            <Link to={path}><span>{label}</span></Link>
          </li>
        ))}
      </ul>

      <button className="navbar__cta" onClick={() => navigate("/devis")}>
        Devis gratuit →
      </button>

      <button
        className={`burger ${menuOpen ? "burger--open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}