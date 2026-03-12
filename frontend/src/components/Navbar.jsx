import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      
      <div className="navbar__logo">
        <img src="/unnamed.png" className="logo-img" />
      </div>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {["Accueil", "À propos", "Services", "Projets", "Contact"].map((item) => (
          <li key={item} onClick={() => setMenuOpen(false)}>
            <a href={`#${item.toLowerCase().replace(" ", "").replace("à", "a")}`}>
              <span>{item}</span>
            </a>
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
        <span />
        <span />
        <span />
      </button>

    </nav>
  );
}