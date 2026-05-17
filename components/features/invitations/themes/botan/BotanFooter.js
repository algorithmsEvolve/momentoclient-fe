import Image from "next/image";

export default function BotanFooter({ invitation }) {
  return (
    <div name="footer-section">
      <div className="content">
        <div className="view-content">
          {invitation?.settings?.withFooterIllustration && (
            <div className="couple">
              <div className="bride-illustration">
                <img
                  src={invitation?.couple?.bride?.illustrationUrl || "/themes/botan/dummy/bride-illustration.png"}
                  alt="bride-illustration"
                />
              </div>
              <div className="groom-illustration">
                <img
                  src={invitation?.couple?.groom?.illustrationUrl || "/themes/botan/dummy/groom-illustration.png"}
                  alt="groom-illustration"
                />
              </div>
            </div>
          )}

          <a href="https://momentoproject.com" target="_blank" rel="noreferrer" className="logo">
            <img src="/themes/botan/footer/footer-momento-logo.svg" alt="footer-logo" />
          </a>
        </div>
      </div>

      <div className="decorations">
        <div className="md:hidden top-right">
          <img src="/themes/botan/footer/mobile-decor-top-right.png" alt="decor-top-right" />
        </div>

        <div className="hidden md:block bottom-left">
          <img src="/themes/botan/footer/decor-bottom-left.png" alt="decor-bottom-left" />
        </div>

        <div className="hidden md:block bottom-right">
          <img src="/themes/botan/footer/decor-bottom-right.png" alt="decor-bottom-right" />
        </div>

        <div className="md:hidden bottom-center">
          <img src="/themes/botan/footer/mobile-decor-bottom-center.png" alt="decor-bottom-center" />
        </div>
      </div>
    </div>
  );
}

