"use client";

function AvatarDecoration() {
  return (
    <div name="avatar-decoration" className="avatar-decorations">
      <div className="animated-bottom-left flowers-stacked">
        <div
          className="top animate-fade-right"
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className="middle animate-fade-up">
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className="upper-mid animate-zoom-in">
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
        <div
          className="bottom animate-fade-up"
          style={{ animationDelay: "1000ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/bottom-flower.png"
            alt="flowers-stacked-bottom-flower"
          />
        </div>
      </div>

      <div className="animated-bottom-right flowers-stacked">
        <div
          className="top animate-fade-left"
          style={{ animationDelay: "500ms" }}
        >
          <img
            src="/themes/aozora/global/animated/flowers-stacked/top-flower.png"
            alt="flowers-stacked-top-flower"
          />
        </div>
        <div className="middle animate-fade-up">
          <img
            src="/themes/aozora/global/animated/flowers-stacked/middle-flower.png"
            alt="flowers-stacked-middle-flower"
          />
        </div>
        <div className="upper-mid animate-zoom-in">
          <img
            src="/themes/aozora/global/animated/flowers-stacked/upper-mid-flower.png"
            alt="flowers-stacked-upper-mid-flower"
          />
        </div>
      </div>
    </div>
  );
}

function formatDisplayName(fullname) {
  if (!fullname) return "";
  const maxLength = 18;
  if (fullname.length < maxLength && fullname.includes(" ")) {
    return fullname.split(" ").map((name, index) => (
      <span key={index}>
        {index > 0 && <br />}
        {name}
      </span>
    ));
  }
  return fullname;
}

export default function AozoraOpening({ invitation }) {
  const quoteText = invitation?.quote?.text;
  const quoteTitle = invitation?.quote?.title;

  const bride = invitation?.couple?.bride || {};
  const groom = invitation?.couple?.groom || {};

  const brideFullName = bride.fullName || "";
  const brideFather = bride.fatherName || "";
  const brideMother = bride.motherName || "";
  const brideInstagram = bride.instagram || "";
  const bridePhoto = bride.photoUrl || "";

  const groomFullName = groom.fullName || "";
  const groomFather = groom.fatherName || "";
  const groomMother = groom.motherName || "";
  const groomInstagram = groom.instagram || "";
  const groomPhoto = groom.photoUrl || "";

  const groomNameFullWidth = invitation?.settings?.custom?.groom_name_fullwidth === true;

  const getInstagramUrl = (username) => {
    return `https://www.instagram.com/${username.replace("@", "")}`;
  };

  return (
    <div
      id="opening"
      name="opening-section"
    >
      <div className="content">
        <div className="view-content">
          <div className="quotes">
            <div
              className="quote-text animate-zoom-in"
              style={{ animationDelay: "500ms" }}
            >
              <p>{quoteText}</p>
            </div>

            <div
              className="quote-title animate-zoom-in"
              style={{ animationDelay: "600ms" }}
            >
              <p>{quoteTitle}</p>
            </div>
          </div>

          <div className="bride-groom">
            <div
              className="bride animate-zoom-in"
              style={{ animationDelay: "750ms" }}
            >
              <div className="bride-wrapper">
                <div className="bride-photo">
                  <img src={bridePhoto} alt="bride-picture" />
                </div>

                <div className="bride-name">
                  <p>{brideFullName}</p>
                </div>

                <div className="conj">
                  <p>Putri dari pasangan :</p>
                </div>

                <div className="parent">
                  <p>{brideFather}</p>
                  <p>{brideMother}</p>
                </div>

                {brideInstagram && (
                  <div className="instagram">
                    <a
                      className="ig-wrapper"
                      href={getInstagramUrl(brideInstagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="icon">
                        <img src="/themes/aozora/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{brideInstagram}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <AvatarDecoration />
            </div>

            <div
              className="groom animate-zoom-in"
              style={{ animationDelay: "750ms" }}
            >
              <div className="groom-wrapper">
                <div className="groom-photo">
                  <img src={groomPhoto} alt="groom-picture" />
                </div>

                <div
                  className={`groom-name ${groomNameFullWidth ? "groom-name-fullwidth" : ""}`}
                >
                  <p>{formatDisplayName(groomFullName)}</p>
                </div>

                <div className="conj">
                  <p>Putra dari pasangan :</p>
                </div>

                <div className="parent">
                  <p>{groomFather}</p>
                  <p>{groomMother}</p>
                </div>

                {groomInstagram && (
                  <div className="instagram">
                    <a
                      className="ig-wrapper"
                      href={getInstagramUrl(groomInstagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="icon">
                        <img src="/themes/aozora/opening/instagram-icon.svg" alt="instagram-icon" />
                      </div>
                      <div className="label">
                        <p>@{groomInstagram}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <AvatarDecoration />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
