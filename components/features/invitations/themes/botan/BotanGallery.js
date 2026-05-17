import Image from "next/image";

export default function BotanGallery({ invitation, galleryType }) {
  const galleryItems = Array.isArray(invitation?.galleries)
    ? invitation.galleries
    : [];

  return (
    <div id="gallery" name="gallery-section">
      <div className="content">
        <div className="view-content">
          <div className="logo">
            <img src={invitation?.quote?.nickLogo || "/themes/botan/component/smile-face.png"} alt="nick-logo" />
          </div>

          {galleryType === '4P1L' && galleryItems.length >= 5 && (
            <>
              <div className="hidden md:flex galleries" name="gt-4P1L">
                <div className="left-image">
                  <div className="left-left">
                    <div className="first-image">
                      <img src={galleryItems[0].imageUrl} alt="gallery-1" />
                    </div>
                  </div>
                  <div className="left-right">
                    <div className="second-image">
                      <img src={galleryItems[2].imageUrl} alt="gallery-3" />
                    </div>
                    <div className="third-image">
                      <img src={galleryItems[1].imageUrl} alt="gallery-2" />
                    </div>
                  </div>
                </div>
                <div className="right-image">
                  <div className="right-left">
                    <div className="fourth-image">
                      <img src={galleryItems[4].imageUrl} alt="gallery-5" />
                    </div>
                  </div>
                  <div className="right-right">
                    <div className="fifth-image">
                      <img src={galleryItems[3].imageUrl} alt="gallery-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden mobile-galleries" name="gt-4P1L">
                <div className="top-image">
                  <div className="top-left">
                    <div className="first-image">
                      <img src={galleryItems[0].imageUrl} alt="gallery-1" />
                    </div>
                  </div>
                  <div className="top-right">
                    <div className="second-image">
                      <img src={galleryItems[1].imageUrl} alt="gallery-2" />
                    </div>
                  </div>
                </div>
                <div className="middle-image">
                  <div className="third-image">
                    <img src={galleryItems[2].imageUrl} alt="gallery-3" />
                  </div>
                </div>
                <div className="bottom-image">
                  <div className="bottom-left">
                    <div className="fourth-image">
                      <img src={galleryItems[3].imageUrl} alt="gallery-4" />
                    </div>
                  </div>
                  <div className="bottom-right">
                    <div className="fifth-image">
                      <img src={galleryItems[4].imageUrl} alt="gallery-5" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className="top-left">
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/gallery/decor-top-left.png" />
            <img src="/themes/botan/gallery/mobile-decor-top-left.png" alt="decor-top-left" />
          </picture>
        </div>
        <div className="top-right">
          <picture>
            <source media="(min-width: 768px)" srcSet="/themes/botan/gallery/decor-top-right.png" />
            <img src="/themes/botan/gallery/mobile-decor-top-right.png" alt="decor-top-right" />
          </picture>
        </div>
        <div className="md:hidden back">
          <img src="/themes/botan/gallery/mobile-decor-back.png" alt="decor-back" />
        </div>
      </div>
    </div>
  );
}

