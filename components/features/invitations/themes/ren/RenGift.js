"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";

function getGiftImage(providerName) {
  const name = String(providerName).toLowerCase();
  if (name.includes("bca")) return "gift-bca.png";
  if (name.includes("bjb")) return "gift-bjb.png";
  if (name.includes("bri")) return "gift-bri.png";
  if (name.includes("mandiri")) return "gift-mandiri.png";
  if (name.includes("dki")) return "gift-dki.png";
  return "rounded-check.svg";
}

export default function RenGift({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const [giftModalState, setGiftModalState] = useState(false);
  const [giftModalClosing, setGiftModalClosing] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [copiedType, setCopiedType] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

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

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isDesktop || !isVisible) return undefined;

    const flowerItems = Array.from(
      sectionRef.current?.querySelectorAll('[name="side-flowers"] img') || []
    );

    flowerItems.forEach((item) => item.classList.add("animated"));

    return () => {
      flowerItems.forEach((item) => item.classList.remove("animated"));
    };
  }, [isDesktop, isVisible]);

  const gifts = Array.isArray(invitation?.gifts) ? invitation.gifts : [];
  if (!gifts.length) return null;

  const primaryGift = gifts[0];
  const additionalGifts = gifts.slice(1);

  const getGiftCode = (giftItem) => giftItem?.accountNumber || giftItem?.address || "";
  const getGiftName = (giftItem) => giftItem?.accountName || giftItem?.note || "";
  const getGiftLabel = (giftItem) => giftItem?.label || "Alamat Rumah";
  const isAddressGift = (giftItem) => giftItem?.type === "address";

  const openGiftModal = () => {
    setGiftModalClosing(false);
    setGiftModalState(true);
  };

  const closeGiftModal = () => {
    setGiftModalClosing(true);
    window.setTimeout(() => {
      setGiftModalState(false);
      setGiftModalClosing(false);
    }, 280);
  };

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
      ? "/themes/ren/component/copied.svg"
      : "/themes/ren/component/copy.svg";
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
            color: "#782626",
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
          <img src="/themes/ren/component/rounded-check.svg" alt="check" style={{ width: "1.25rem" }} />
          <p>{copiedType === "address" ? "Alamat berhasil disalin!" : "Nomor rekening berhasil disalin!"}</p>
        </div>
      )}

      <div className="content">
        <div className="view-content">
          <div
            className={`gift-icon md:hidden ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <img src="/themes/ren/gift/mobile-gift-icon.svg" alt="gift-icon" />
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
            <p>Bagi keluarga dan sahabat yang ingin mengirimkan hadiah. Kami akan dengan senang hati menerimanya.</p>
          </div>

          <div
            className={`open-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "550ms" }}
          >
            <button
              type="button"
              name="ren-button"
              className="ren-button"
              onClick={() => openGiftModal()}
              style={{ cursor: "pointer" }}
            >
              <div className="label">
                <p>Kirim Hadiah</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {giftModalState &&
        isClient &&
        createPortal(
          <div name="ren-theme">
            <div name="gift-section">
              <div
                className={`ren-gift-modal modal-backdrop${giftModalClosing ? " closing" : ""}`}
                onClick={() => closeGiftModal()}
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
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="header">
                <div className="gift-bank">
                  {!isAddressGift(primaryGift) && (
                    <img
                      src={`/themes/ren/component/${getGiftImage(primaryGift.providerName)}`}
                      alt="gift-icon"
                    />
                  )}
                </div>
                <div className="close-modal-button" onClick={() => closeGiftModal()} style={{ cursor: "pointer" }}>
                  <img src="/themes/ren/component/close-modal.svg" alt="close-modal-icon" />
                </div>
              </div>

              <div className="body">
                <div className="body-left">
                  {isAddressGift(primaryGift) ? (
                    <>
                      <div className="gift-label">
                        <p>{getGiftLabel(primaryGift)}</p>
                      </div>
                      <div className="gift-address">
                        <p>{getGiftCode(primaryGift)}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="gift-receipt">
                        <p>{getGiftName(primaryGift)}</p>
                      </div>
                      <div className="gift-id">
                        <p>{getGiftCode(primaryGift)}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="body-right">
                  <div className="copy-button">
                    <button
                      type="button"
                      name="ren-button"
                      className="ren-button"
                      onClick={() => handleCopy(getGiftCode(primaryGift), isAddressGift(primaryGift) ? "address" : "number")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="icon">
                        <img src={getCopyIcon(getGiftCode(primaryGift))} alt="copy" />
                      </div>
                      <div className="label">
                        <p>{isAddressGift(primaryGift) ? "Salin Alamat" : "Salin Nomor"}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {additionalGifts.length > 0 && (
                <div className="gifts">
                  {additionalGifts.map((giftItem, index) => (
                    <div key={`gift-item-${index}`} className="gift-item">
                      {!isAddressGift(giftItem) ? (
                        <>
                          <div className="header">
                            <div className="gift-bank">
                              <img
                                src={`/themes/ren/component/${getGiftImage(giftItem.providerName)}`}
                                alt="gift-icon"
                              />
                            </div>
                          </div>

                          <div className="body">
                            <div className="body-left">
                              <div className="gift-receipt">
                                <p>{getGiftName(giftItem)}</p>
                              </div>
                              <div className="gift-id">
                                <p>{getGiftCode(giftItem)}</p>
                              </div>
                            </div>

                            <div className="body-right">
                              <div className="copy-button">
                                <button
                                  type="button"
                                  name="ren-button"
                                  className="ren-button"
                                  onClick={() => handleCopy(getGiftCode(giftItem), "number")}
                                  style={{ cursor: "pointer" }}
                                >
                                  <div className="icon">
                                    <img src={getCopyIcon(getGiftCode(giftItem))} alt="copy" />
                                  </div>
                                  <div className="label">
                                    <p>Salin Nomor</p>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="body">
                          <div className="body-left">
                            <div className="gift-label">
                              <p>{getGiftLabel(giftItem)}</p>
                            </div>
                            <div className="gift-address">
                              <p>{getGiftCode(giftItem)}</p>
                            </div>
                          </div>

                          <div className="body-right">
                            <div className="copy-button">
                              <button
                                type="button"
                                name="ren-button"
                                className="ren-button"
                                onClick={() => handleCopy(getGiftCode(giftItem), "address")}
                                style={{ cursor: "pointer" }}
                              >
                                <div className="icon">
                                  <img src={getCopyIcon(getGiftCode(giftItem))} alt="copy" />
                                </div>
                                <div className="label">
                                  <p>Salin Alamat</p>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="body-bottom">
                <div className="info">
                  <p>Terimakasih banyak atas hadiah yang dikirimkan kepada kami</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
      document.body
    )}

      <div className="decorations">
        {!isDesktop && (
          <>
            <div className="middle-left">
              <div name="side-flowers">
                <div className="bottom-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/bottom-leaf.png" alt="side-flowers" />
                </div>
                <div className="bottom-flower">
                  <img src="/themes/ren/global/animated/side-flowers/bottom-flower.png" alt="side-flowers" />
                </div>
                <div className="upper-bottom-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/upper-bottom-leaf.png" alt="side-flowers" />
                </div>
                <div className="middle-pink-flower">
                  <img src="/themes/ren/global/animated/side-flowers/middle-pink-flower.png" alt="side-flowers" />
                </div>
                <div className="middle-right-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/middle-right-leaf.png" alt="side-flowers" />
                </div>
                <div className="middle-red-flower">
                  <img src="/themes/ren/global/animated/side-flowers/middle-red-flower.png" alt="side-flowers" />
                </div>
                <div className="middle-left-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/middle-left-leaf.png" alt="side-flowers" />
                </div>
                <div className="top-pink-flower">
                  <img src="/themes/ren/global/animated/side-flowers/top-pink-flower.png" alt="side-flowers" />
                </div>
                <div className="top-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/top-leaf.png" alt="side-flowers" />
                </div>
              </div>
            </div>
            <div className="middle-right">
              <div name="side-flowers">
                <div className="bottom-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/bottom-leaf.png" alt="side-flowers" />
                </div>
                <div className="bottom-flower">
                  <img src="/themes/ren/global/animated/side-flowers/bottom-flower.png" alt="side-flowers" />
                </div>
                <div className="upper-bottom-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/upper-bottom-leaf.png" alt="side-flowers" />
                </div>
                <div className="middle-pink-flower">
                  <img src="/themes/ren/global/animated/side-flowers/middle-pink-flower.png" alt="side-flowers" />
                </div>
                <div className="middle-right-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/middle-right-leaf.png" alt="side-flowers" />
                </div>
                <div className="middle-red-flower">
                  <img src="/themes/ren/global/animated/side-flowers/middle-red-flower.png" alt="side-flowers" />
                </div>
                <div className="middle-left-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/middle-left-leaf.png" alt="side-flowers" />
                </div>
                <div className="top-pink-flower">
                  <img src="/themes/ren/global/animated/side-flowers/top-pink-flower.png" alt="side-flowers" />
                </div>
                <div className="top-leaf">
                  <img src="/themes/ren/global/animated/side-flowers/top-leaf.png" alt="side-flowers" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
