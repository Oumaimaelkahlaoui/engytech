import { Link } from "react-router-dom";

export default function MainFooter() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
           
    <img src="/unnamed.png" className="logo-img" />
        </div>

    

<nav className="footer__nav">
  {[
    { label: "Accueil", path: "/" },
    { label: "Services", path: "/services" },
    { label: "À propos", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Carriere", path: "/carriere" },
  ].map((item) => (
    <Link key={item.label} to={item.path}>
      {item.label}
    </Link>
  ))}
</nav>

        <div className="footer__socials">
          {["LinkedIn", "Instagram", "Facebook"].map((s) => (
            <a key={s} href="#">{s}</a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Engytech. Tous droits réservés.</p>
        <p>Marrakech — Génie Civil & Architecture</p>
      </div>
    </footer>
  );
}