import Image from "next/image";

export default function BotanLocation({ invitation }) {
  const akad = invitation?.opening?.akad;
  const reception = invitation?.opening?.reception;
  const locationName = akad?.locationName || reception?.locationName || "Lokasi belum tersedia";
  const address = akad?.address || reception?.address || "Alamat acara belum diisi.";
  const mapUrl = akad?.mapUrl || reception?.mapUrl;

  return (
    <div id="location" name="location-section">
      <div className="content">
        <div className="view-content">
          <div className="icon">
            <img src="/themes/botan/location/location-icon.svg" alt="location-icon" />
          </div>
          <div className="title">
            <p>{locationName}</p>
          </div>
          <div className="desc">
            <p>{address}</p>
          </div>
          {mapUrl && (
            <div className="maps">
              <iframe
                src={mapUrl}
                className="g-maps"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          )}
          <div className="decorations">
            <div className="decor-top-left">
              <picture>
                <source media="(min-width: 601px)" srcSet="/themes/botan/location/decor-top-left.png" />
                <img src="/themes/botan/location/mobile-decor-top-left.png" alt="decor-top-left" />
              </picture>
            </div>
            <div className="decor-top-right">
              <picture>
                <source media="(min-width: 601px)" srcSet="/themes/botan/location/decor-top-right.png" />
                <img src="/themes/botan/location/mobile-decor-top-right.png" alt="decor-top-right" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

