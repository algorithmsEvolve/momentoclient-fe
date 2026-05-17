function wrapQuote(text) {
  if (!text) return "";
  const trimmedText = text.trim();
  const hasOpeningQuote = trimmedText.startsWith("“") || trimmedText.startsWith('"');
  const hasClosingQuote = trimmedText.endsWith("”") || trimmedText.endsWith('"');

  if (hasOpeningQuote && hasClosingQuote) return trimmedText;

  return `“${trimmedText}”`;
}

export default function BotanOpening({ invitation }) {
  const bride = invitation?.couple?.bride;
  const groom = invitation?.couple?.groom;

  return (
    <div id="opening" name="opening-section">
      <div className="content">
        <div className="view-content">
          <div className="quotes animate-fade-up" style={{ animationDelay: "1s" }}>
            <div className="quote-text">
              <p>{wrapQuote(invitation?.quote?.text)}</p>
            </div>
            <div className="quote-title">
              <p>{invitation?.quote?.title}</p>
            </div>
          </div>

          <div className="bride-groom mobile-bride-groom">
            <div className="mobile-decorations">
              <div className="top-right animate-zoom-slide-from-right" style={{ animationDelay: "1.5s" }}>
                <img src="/themes/botan/opening/mobile-decor-top-right.png" alt="decor" />
              </div>
              <div className="bottom-left animate-zoom-slide-from-left" style={{ animationDelay: "1.7s" }}>
                <img src="/themes/botan/opening/mobile-decor-bottom-left.png" alt="decor" />
              </div>
            </div>

            <div className="bride animate-fade-right" style={{ animationDelay: "1.2s" }}>
              <div className="bride-photo animate-zoom-in" style={{ animationDelay: "1.4s" }}>
                <img
                  src={bride?.photoUrl || "/themes/botan/dummy/bride-aira.jpg"}
                  alt="bride-picture"
                />
              </div>
              <div className="bride-name">
                <p>{bride?.fullName || bride?.displayName || "Bride"}</p>
              </div>
              <div className="conj">
                <p>Putri dari pasangan :</p>
              </div>
              <div className="parent">
                <p>{bride?.fatherName}</p>
                <p>{bride?.motherName}</p>
              </div>
              {bride?.instagram && (
                <div className="instagram">
                  <a className="ig-wrapper" href={`https://instagram.com/${bride.instagram}`} target="_blank" rel="noreferrer">
                    <div className="icon">
                      <img src="/themes/botan/opening/instagram-icon.svg" alt="instagram-icon" />
                    </div>
                    <div className="label">
                      <p>@{bride.instagram}</p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <div className="groom animate-fade-left" style={{ animationDelay: "1.2s" }}>
              <div className="groom-photo animate-zoom-in" style={{ animationDelay: "1.4s" }}>
                <img
                  src={groom?.photoUrl || "/themes/botan/dummy/groom-bima.jpg"}
                  alt="groom-picture"
                />
              </div>
              <div className="groom-name">
                <p>{groom?.fullName || groom?.displayName || "Groom"}</p>
              </div>
              <div className="conj">
                <p>Putra dari pasangan :</p>
              </div>
              <div className="parent">
                <p>{groom?.fatherName}</p>
                <p>{groom?.motherName}</p>
              </div>
              {groom?.instagram && (
                <div className="instagram">
                  <a className="ig-wrapper" href={`https://instagram.com/${groom.instagram}`} target="_blank" rel="noreferrer">
                    <div className="icon">
                      <img src="/themes/botan/opening/instagram-icon.svg" alt="instagram-icon" />
                    </div>
                    <div className="label">
                      <p>@{groom.instagram}</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bottom-icon animate-fade-up" style={{ animationDelay: "1.8s" }}>
            <img src="/themes/botan/date/date-icon.svg" alt="date-icon" />
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="back animate-zoom-slide-from-top" style={{ animationDelay: "0.8s" }}>
          <img src="/themes/botan/opening/decor-back.png" alt="decor-back" />
        </div>
        <div className="top opening-top-decoration animate-zoom-slide-from-top" style={{ animationDelay: "0.8s" }}>
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/opening/decor-top.png" />
            <img src="/themes/botan/opening/mobile-decor-top.png" alt="decor-top" />
          </picture>
        </div>
        <div className="bottom-left opening-bottom-left-decoration animate-zoom-slide-from-left" style={{ animationDelay: "1.5s" }}>
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/opening/decor-bottom-left.png" />
            <img src="/themes/botan/opening/mobile-decor-bottom-left.png" alt="decor-bottom-left" />
          </picture>
        </div>
        <div className="bottom-right opening-bottom-right-decoration animate-zoom-slide-from-right" style={{ animationDelay: "1.5s" }}>
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/opening/decor-bottom-right.png" />
            <img src="/themes/botan/opening/decor-bottom-right.png" alt="decor-bottom-right" />
          </picture>
        </div>
      </div>
    </div>
  );
}
