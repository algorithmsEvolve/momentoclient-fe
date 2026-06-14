import Image from "next/image";

export default function BotanFooter({ invitation }) {
  const withIllustration = invitation?.settings?.withFooterIllustration;
  const brideIllustration = invitation?.couple?.bride?.illustrationUrl || "/themes/botan/dummy/bride-illustration.png";
  const groomIllustration = invitation?.couple?.groom?.illustrationUrl || "/themes/botan/dummy/groom-illustration.png";
  const footerLink = "https://momentoproject.com";

  return (
    <div name="footer-section" className="botan-footer">
      <div className="content">
        <div className="view-content">
          {withIllustration && (
            <div className="couple">
              <div className="bride-illustration">
                <img src={brideIllustration} alt="bride-illustration" />
              </div>
              <div className="groom-illustration">
                <img src={groomIllustration} alt="groom-illustration" />
              </div>
            </div>
          )}

          <a href={footerLink} target="_blank" rel="noreferrer" className="logo">
            <img src="/themes/botan/footer/footer-momento-logo.svg" alt="footer-logo" />
          </a>
        </div>
      </div>

      <div className="decorations">
        <img className="decor-desktop-left" src="/themes/botan/footer/decor-bottom-left.png" alt="decor-left" />
        <img className="decor-desktop-right" src="/themes/botan/footer/decor-bottom-right.png" alt="decor-right" />
        <img className="decor-mobile-top" src="/themes/botan/footer/mobile-decor-top-right.png" alt="decor-top" />
        <img className="decor-mobile-bottom" src="/themes/botan/footer/mobile-decor-bottom-center.png" alt="decor-bottom" />
      </div>
    </div>
  );
}
