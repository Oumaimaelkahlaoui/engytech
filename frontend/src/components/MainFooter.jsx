import { Link } from "react-router-dom";

export default function MainFooter() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
<img
  src="/unnamed.webp"
  alt="Logo ARCH ENGYTECH"
   width={200}
  height={60}
  fetchPriority="high"
/>

        </div>

        <nav className="footer__nav" aria-label="Navigation footer">
          {[
            { label: "Accueil",   path: "/" },
            { label: "Services",  path: "/services" },
            { label: "À propos",  path: "/about" },
            { label: "Contact",   path: "/contact" },
            { label: "Carriere",  path: "/carriere" },
          ].map((item) => (
            <Link key={item.label} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer__socials">
          {/* ✅ aria-label ajouté sur chaque lien réseau social */}
          <a href="#" aria-label="Suivez-nous sur LinkedIn">LinkedIn</a>
          <a href="#" aria-label="Suivez-nous sur Instagram">Instagram</a>
          <a href="#" aria-label="Suivez-nous sur Facebook">Facebook</a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Engytech. Tous droits réservés.</p>
        <p>Génie Civil &amp; Architecture</p>
      </div>
    </footer>
  );
}