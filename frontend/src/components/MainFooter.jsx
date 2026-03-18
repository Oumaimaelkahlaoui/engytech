export default function MainFooter() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
           
    <img src="/unnamed.png" className="logo-img" />
        </div>

        <nav className="footer__nav">
          {["Accueil", "Services", "Projets", "Contact" ,"Carriere"].map((l) => (
            <a key={l} href="/">{l}</a>
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