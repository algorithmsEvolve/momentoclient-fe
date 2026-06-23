"use client";

import { useEffect, useState, useRef } from "react";

function getGiftImage(providerName) {
  const name = String(providerName).toLowerCase();
  if (name.includes("bca")) return "gift-bca.png";
  if (name.includes("bri")) return "gift-bri.png";
  if (name.includes("mandiri")) return "gift-mandiri.png";
  if (name.includes("dki")) return "gift-dki.png";
  return "rounded-check.svg"; // Fallback
}

export default function AozoraGift({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [giftModalState, setGiftModalState] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [copiedType, setCopiedType] = useState(""); // "number" or "address"
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const gifts = Array.isArray(invitation?.gifts) ? invitation.gifts : [];
  if (!gifts.length) return null;

  const settings = invitation?.settings || {};
  const isOpenedGift = settings.openedGift === true;
  const giftCaption = settings.customGiftCaption || "Bagi keluarga dan sahabat yang ingin mengirimkan hadiah. Kami akan dengan senang hati menerimanya.";

  const handleCopy = (value, type = "number") => {
    navigator.clipboard.writeText(value);
    setCopiedId(value);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedId("");
      setCopiedType("");
    }, 2000);
  };

  const getCopyIcon = (value) => {
    return copiedId === value
      ? "/themes/aozora/component/copied.svg"
      : "/themes/aozora/component/copy.svg";
  };

  const fetchGiftImage = (providerName) => {
    return `/themes/aozora/component/${getGiftImage(providerName)}`;
  };

  return (
    <div name="gift-section" ref={sectionRef}>
      {/* Toast Alert */}
      {copiedId && (
        <div
          style={{
            position: "fixed",
            top: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#EFEAE4",
            color: "#64564C",
            padding: "0.75rem 1.5rem",
            borderRadius: "1.875rem",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "poppinsR"
          }}
        >
          <img src="/themes/aozora/component/rounded-check.svg" alt="check" style={{ width: "1.25rem" }} />
          <p>{copiedType === "address" ? "Alamat berhasil disalin!" : "Nomor rekening berhasil disalin!"}</p>
        </div>
      )}

      <div className="content">
        <div className="view-content">
          {!isDesktop && (
            <div
              className={`gift-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "250ms" }}
            >
              <img src="/themes/aozora/gift/mobile-gift-icon.svg" alt="gift-icon" />
            </div>
          )}

          <div
            className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "350ms" }}
          >
            <p>Kirim Hadiah</p>
          </div>

          <div
            className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "450ms" }}
          >
            <p>{giftCaption}</p>
          </div>

          {/* Inline display if opened_gift is true */}
          {isOpenedGift ? (
            <div className="opened-gifts" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", marginTop: "2rem" }}>
              {gifts.map((item, index) => {
                const code = item.accountNumber || item.address || "";
                const isAddress = item.type === "address";
                return (
                  <div
                    key={`gift-inline-${index}`}
                    className="gift-item animate-fade-up"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="gift-left">
                      <div className="gift-bank">
                        {isAddress ? (
                          <span style={{ fontSize: "1rem", fontFamily: "poppinsM", color: "#64564C" }}>Alamat</span>
                        ) : (
                          <img src={fetchGiftImage(item.providerName)} alt="gift-icon" />
                        )}
                      </div>
                      <div className="gift-receipt">
                        <p>{item.accountName || item.note || ""}</p>
                      </div>
                      <div className="gift-id">
                        <p>{code}</p>
                      </div>
                    </div>

                    <div className="gift-right">
                      <div className="copy-button">
                        <div
                          name="aozora-button"
                          onClick={() => handleCopy(code, isAddress ? "address" : "number")}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="icon">
                            <img src={getCopyIcon(code)} alt="copy-icon" />
                          </div>
                          <div className="label">
                            <p>{isAddress ? "Salin Alamat" : "Salin Nomor"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Button overlay modal trigger */
            <div
              className={`open-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "550ms" }}
            >
              <div
                name="aozora-button"
                onClick={() => setGiftModalState(true)}
                style={{ cursor: "pointer" }}
              >
                <div className="label">
                  <p>Kirim Hadiah</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal overlay */}
      {giftModalState && (
        <div
          className="modal-backdrop"
          onClick={() => setGiftModalState(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="modal-content gift-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#EFEAE4",
              backgroundImage: "url('/themes/aozora/global/modal-back.png')",
              backgroundSize: "cover",
              padding: "2rem",
              borderRadius: "1.5rem",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "85vh",
              overflowY: "auto"
            }}
          >
            <div
              className="modal-header header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(100, 86, 76, 0.15)",
                paddingBottom: "1rem"
              }}
            >
              <div className="gift-bank">
                {gifts[0].type === "address" ? (
                  <span style={{ fontSize: "1.2rem", fontFamily: "poppinsM", color: "#64564C" }}>Alamat Kirim</span>
                ) : (
                  <img
                    src={fetchGiftImage(gifts[0].providerName)}
                    alt="gift-icon"
                    style={{ height: "1.5rem", objectFit: "contain" }}
                  />
                )}
              </div>
              <div
                className="close-modal-button"
                onClick={() => setGiftModalState(false)}
                style={{ cursor: "pointer", width: "1.5rem" }}
              >
                <img src="/themes/aozora/component/close-modal.svg" alt="close-modal-icon" />
              </div>
            </div>

            <div className="modal-body body" style={{ margin: "1.5rem 0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="body-left">
                  <div className="gift-receipt" style={{ fontSize: "1.2rem", fontFamily: "poppinsM", color: "#64564C" }}>
                    <p>{gifts[0].accountName || gifts[0].note || ""}</p>
                  </div>
                  <div className="gift-id" style={{ fontSize: "1.1rem", fontFamily: "poppinsR", color: "#64564C", marginTop: "0.25rem" }}>
                    <p>{gifts[0].accountNumber || gifts[0].address || ""}</p>
                  </div>
                </div>

                <div className="body-right">
                  <div className="copy-button">
                    <div
                      name="aozora-button"
                      onClick={() => handleCopy(gifts[0].accountNumber || gifts[0].address || "", gifts[0].type === "address" ? "address" : "number")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="icon">
                        <img src={getCopyIcon(gifts[0].accountNumber || gifts[0].address || "")} alt="copy" />
                      </div>
                      <div className="label">
                        <p>{gifts[0].type === "address" ? "Salin Alamat" : "Salin Nomor"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {gifts.length > 1 && (
                <div className="gifts" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {gifts.slice(1).map((gift_item, index) => {
                    const code = gift_item.accountNumber || gift_item.address || "";
                    const isAddress = gift_item.type === "address";
                    return (
                      <div
                        key={`gift-modal-${index}`}
                        className="gift-item"
                        style={{
                          borderTop: "1px dashed rgba(100,86,76,0.2)",
                          paddingTop: "1.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <div className="body-left">
                          <div className="header" style={{ marginBottom: "0.5rem" }}>
                            <div className="gift-bank">
                              {isAddress ? (
                                <span style={{ fontSize: "1rem", fontFamily: "poppinsM", color: "#64564C" }}>Alamat Kirim</span>
                              ) : (
                                <img
                                  src={fetchGiftImage(gift_item.providerName)}
                                  alt="gift-icon"
                                  style={{ height: "1.5rem", objectFit: "contain" }}
                                />
                              )}
                            </div>
                          </div>

                          <div className="body">
                            <div className="gift-receipt" style={{ fontSize: "1.2rem", fontFamily: "poppinsM", color: "#64564C" }}>
                              <p>{gift_item.accountName || gift_item.note || ""}</p>
                            </div>
                            <div className="gift-id" style={{ fontSize: "1.1rem", fontFamily: "poppinsR", color: "#64564C", marginTop: "0.25rem" }}>
                              <p>{code}</p>
                            </div>
                          </div>
                        </div>

                        <div className="body-right">
                          <div className="copy-button">
                            <div
                              name="aozora-button"
                              onClick={() => handleCopy(code, isAddress ? "address" : "number")}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="icon">
                                <img src={getCopyIcon(code)} alt="copy" />
                              </div>
                              <div className="label">
                                <p>{isAddress ? "Salin Alamat" : "Salin Nomor"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div
              className="modal-footer body-bottom"
              style={{
                borderTop: "1px solid rgba(100, 86, 76, 0.15)",
                paddingTop: "1rem",
                textAlign: "center"
              }}
            >
              <div className="info" style={{ fontFamily: "poppinsR", fontSize: "1rem", color: "#64564C" }}>
                <p>Terimakasih banyak atas hadiah yang dikirimkan kepada kami</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
