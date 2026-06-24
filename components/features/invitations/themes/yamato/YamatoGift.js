"use client";

import { useEffect, useState, useRef } from "react";

function getGiftImage(providerName) {
  const name = String(providerName).toLowerCase();
  if (name.includes("bca")) return "gift-bca.png";
  if (name.includes("bjb")) return "gift-bjb.png";
  if (name.includes("bri")) return "gift-bri.png";
  if (name.includes("mandiri")) return "gift-mandiri.png";
  return "rounded-check.svg";
}

export default function YamatoGift({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [giftModalState, setGiftModalState] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [copiedType, setCopiedType] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    const timerId = setTimeout(handleResize, 0);
    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
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
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const gifts = Array.isArray(invitation?.gifts) ? invitation.gifts : [];
  if (!gifts.length) return null;

  const settings = invitation?.settings || {};
  const isOpenedGift = settings.openedGift === true;
  const giftCaption = settings.customGiftCaption || "Kami sangat bersyukur dan mengucapkan terima kasih atas dukungan dan kehadiran keluarga dan sahabat. Jika ada yang ingin mengirimkan hadiah, silahkan mengirimkannya melalui link berikut ini :";

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
      ? "/themes/yamato/component/copied.svg"
      : "/themes/yamato/component/copy.svg";
  };

  return (
    <div name="gift-section" ref={sectionRef}>
      {copiedId && (
        <div
          style={{
            position: "fixed",
            top: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#EFEAE4",
            color: "#504535",
            padding: "0.75rem 1.5rem",
            borderRadius: "1.875rem",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "poppinsR",
          }}
        >
          <img src="/themes/yamato/component/rounded-check.svg" alt="check" style={{ width: "1.25rem" }} />
          <p>{copiedType === "address" ? "Alamat berhasil disalin!" : "Nomor rekening berhasil disalin!"}</p>
        </div>
      )}

      <div className="content">
        <div className="view-content">
          <div
            className={`gift-icon md:hidden ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <img src="/themes/yamato/gift/mobile-gift-icon.svg" alt="gift-icon" />
          </div>

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

          {isOpenedGift ? (
            <div className="opened-gifts">
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
                          <span style={{ fontSize: "1rem", fontFamily: "poppinsM", color: "#504535" }}>Alamat</span>
                        ) : (
                          <img src={`/themes/yamato/component/${getGiftImage(item.providerName)}`} alt="gift-icon" />
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
                        <button
                          type="button"
                          name="yamato-button"
                          className="yamato-button"
                          onClick={() => handleCopy(code, isAddress ? "address" : "number")}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="icon">
                            <img src={getCopyIcon(code)} alt="copy-icon" />
                          </div>
                          <div className="label">
                            <p>{isAddress ? "Salin Alamat" : "Salin Nomor"}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`open-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "550ms" }}
            >
              <button
                type="button"
                name="yamato-button"
                className="yamato-button"
                onClick={() => setGiftModalState(true)}
                style={{ cursor: "pointer" }}
              >
                <div className="label">
                  <p>Kirim Hadiah</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

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
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#EFEAE4",
              backgroundImage: "url('/themes/yamato/component/modal-back.png')",
              backgroundSize: "cover",
              padding: "2rem",
              borderRadius: "1.5rem",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <div
              className="modal-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(80, 69, 53, 0.15)",
                paddingBottom: "1rem",
              }}
            >
              <div className="gift-bank">
                <span style={{ fontSize: "1.5rem", fontFamily: "poppinsM", color: "#504535" }}>Kirim Hadiah</span>
              </div>
              <div
                className="close-modal-button"
                onClick={() => setGiftModalState(false)}
                style={{ cursor: "pointer", width: "1.5rem" }}
              >
                <img src="/themes/yamato/component/close-modal.svg" alt="close-modal-icon" />
              </div>
            </div>

            <div className="modal-body" style={{ margin: "1.5rem 0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {gifts.map((item, index) => {
                const code = item.accountNumber || item.address || "";
                const isAddress = item.type === "address";
                return (
                  <div
                    key={`gift-modal-${index}`}
                    style={{
                      borderBottom: index !== gifts.length - 1 ? "1px dashed rgba(80,69,53,0.2)" : "none",
                      paddingBottom: "1.5rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div className="body-left">
                        <div className="gift-bank" style={{ marginBottom: "0.5rem" }}>
                          {isAddress ? (
                            <span style={{ fontSize: "1rem", fontFamily: "poppinsM", color: "#504535" }}>Alamat Kirim</span>
                          ) : (
                            <img
                              src={`/themes/yamato/component/${getGiftImage(item.providerName)}`}
                              alt="bank-logo"
                              style={{ height: "1.5rem", objectFit: "contain" }}
                            />
                          )}
                        </div>
                        <div className="gift-receipt" style={{ fontSize: "1.2rem", fontFamily: "poppinsM", color: "#504535" }}>
                          <p>{item.accountName || item.note || ""}</p>
                        </div>
                        <div className="gift-id" style={{ fontSize: "1.1rem", fontFamily: "poppinsR", color: "#504535", marginTop: "0.25rem" }}>
                          <p>{code}</p>
                        </div>
                      </div>
                      <div className="body-right">
                        <button
                          type="button"
                          name="yamato-button"
                          className="yamato-button"
                          onClick={() => handleCopy(code, isAddress ? "address" : "number")}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="icon">
                            <img src={getCopyIcon(code)} alt="copy" />
                          </div>
                          <div className="label">
                            <p>{isAddress ? "Salin Alamat" : "Salin Nomor"}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="modal-footer"
              style={{
                borderTop: "1px solid rgba(80, 69, 53, 0.15)",
                paddingTop: "1rem",
                textAlign: "center",
              }}
            >
              <div className="info" style={{ fontFamily: "poppinsR", fontSize: "1rem", color: "#504535" }}>
                <p>Terimakasih banyak atas hadiah yang dikirimkan kepada kami</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="decorations">
        <div className="bottom-right">
          {isDesktop && (
            <img
              className={isVisible ? "animate-fade-left" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yamato/gift/decor-bottom-right.png"
              alt="decor-bottom-right"
            />
          )}
        </div>
        <div className="bottom-left">
          {isDesktop && (
            <img
              className={isVisible ? "animate-fade-right" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yamato/gift/decor-bottom-left.png"
              alt="decor-bottom-left"
            />
          )}
        </div>
        <div className="top">
          {!isDesktop && (
            <img
              className={isVisible ? "animate-zoom-in-down" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yamato/gift/mobile-decor-top.png"
              alt="mobile-decor-top"
            />
          )}
        </div>
      </div>
    </div>
  );
}
