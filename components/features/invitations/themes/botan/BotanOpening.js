import Image from "next/image";

export default function BotanOpening({ invitation }) {
  const bride = invitation?.couple?.bride;
  const groom = invitation?.couple?.groom;

  return (
    <div id="opening" name="opening-section">
      <div className="content">
        <div className="view-content">
          <div className="quotes">
            <div className="quote-text">
              <p>{invitation?.quote?.text}</p>
            </div>
            <div className="quote-title">
              <p>{invitation?.quote?.title}</p>
            </div>
          </div>

          <div className="bride-groom">
            <div className="bride">
              <div className="bride-photo">
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

            <div className="groom">
              <div className="groom-photo">
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

          <div className="bottom-icon animate-fade-up">
            <img src="/themes/botan/date/date-icon.svg" alt="date-icon" />
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="back">
          <img src="/themes/botan/opening/decor-back.png" alt="decor-back" />
        </div>
        <div className="top">
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/opening/decor-top.png" />
            <img src="/themes/botan/opening/mobile-decor-top.png" alt="decor-top" />
          </picture>
        </div>
        <div className="bottom-left">
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/opening/decor-bottom-left.png" />
            <img src="/themes/botan/opening/mobile-decor-bottom-left.png" alt="decor-bottom-left" />
          </picture>
        </div>
        <div className="bottom-right">
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/opening/decor-bottom-right.png" />
            <img src="/themes/botan/opening/decor-bottom-right.png" alt="decor-bottom-right" />
          </picture>
        </div>
      </div>
    </div>
  );
}
