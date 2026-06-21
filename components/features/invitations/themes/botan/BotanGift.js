"use client";

import { useState, useEffect, useRef } from "react";

export default function BotanGift({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState("");
  const [giftModalState, setGiftModalState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const gifts = Array.isArray(invitation?.gifts) ? invitation.gifts : [];

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

  const copyToClipboard = async (value, key) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  };

  const getCopyIcon = (key) => copied === key ? "/themes/botan/component/copied.svg" : "/themes/botan/component/copy.svg";

  const fetchGiftImage = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("mandiri")) return "/themes/botan/component/gift-mandiri.png";
    if (t.includes("bri")) return "/themes/botan/component/gift-bri.png";
    if (t.includes("bca")) return "/themes/botan/component/gift-bca.png";
    if (t.includes("jago")) return "/themes/botan/component/gift-jago.webp";
    if (t.includes("dki")) return "/themes/botan/component/gift-dki.png";
    return "/themes/botan/gift/mobile-gift-icon.svg";
  };

  useEffect(() => {
    let timer;
    if (giftModalState) {
      document.body.style.overflow = "hidden";
      timer = setTimeout(() => setShowModal(true), 10);
    } else {
      document.body.style.overflow = "";
      timer = setTimeout(() => setShowModal(false), 0);
    }
    return () => {
      if (timer) clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [giftModalState]);

  const closeGiftModal = () => {
    setShowModal(false);
    setTimeout(() => setGiftModalState(false), 300);
  };

  if (gifts.length === 0) return null;

  const firstGift = gifts[0];
  const restGifts = gifts.slice(1);

  return (
    <div id="gift" name="gift-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className={`md:hidden gift-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
            <img src="/themes/botan/gift/mobile-gift-icon.svg" alt="gift-icon" />
          </div>
          <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
            <p>Kirim Hadiah</p>
          </div>
          <div className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "450ms" }}>
            <p>Bagi keluarga dan sahabat yang ingin mengirimkan hadiah. Kami akan dengan senang hati menerimanya.</p>
          </div>
          <div className={`open-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "550ms" }}>
            <button
              name="botan-button"
              className="botan-button"
              onClick={() => setGiftModalState(true)}
            >
              <div className="label"><p>Kirim Hadiah</p></div>
            </button>
          </div>
        </div>
      </div>

      <div className="modals">
        {giftModalState && (
          <div className={`modal-overlay ${showModal ? 'active' : ''}`} onClick={closeGiftModal}>
            <div className="gift-modal bg-[#efeae4] rounded-[1.875rem] w-full" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <div className="header">
                    <div className="gift-bank">
                      <img src={fetchGiftImage(firstGift.providerName)} alt="gift-icon" />
                    </div>
                    <div className="close-modal-button" onClick={closeGiftModal}>
                      <img src="/themes/botan/component/close-modal.svg" alt="close-modal-icon" />
                    </div>
                  </div>
                </div>

                <div className="body">
                  <div className="body-left">
                    {firstGift.accountNumber ? (
                      <>
                        <div className="gift-receipt">
                          <p>{firstGift.accountName}</p>
                        </div>
                        <div className="gift-id">
                          <p>{firstGift.accountNumber}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="gift-label">
                          <p>Alamat Pengiriman</p>
                        </div>
                        <div className="gift-address">
                          <p>{firstGift.address}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="body-right">
                    <div className="copy-button">
                      <button
                        name="botan-button"
                        className="botan-button"
                        onClick={() => copyToClipboard(firstGift.accountNumber || firstGift.address, "first")}
                      >
                        <div className="icon">
                          <img src={getCopyIcon("first")} alt="copy" />
                        </div>
                        <div className="label">
                          <p>{copied === "first" ? "Tersalin" : (firstGift.accountNumber ? "Salin Nomor" : "Salin Alamat")}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {restGifts.length > 0 && (
                  <div className="gifts">
                    {restGifts.map((gift_item, index) => (
                      <div key={index} className="gift-item">
                        {gift_item.accountNumber ? (
                          <>
                            <div className="header">
                              <div className="gift-bank">
                                <img src={fetchGiftImage(gift_item.providerName)} alt="gift-icon" />
                              </div>
                            </div>
                            <div className="body">
                              <div className="body-left">
                                <div className="gift-receipt">
                                  <p>{gift_item.accountName}</p>
                                </div>
                                <div className="gift-id">
                                  <p>{gift_item.accountNumber}</p>
                                </div>
                              </div>
                              <div className="body-right">
                                <div className="copy-button">
                                  <button
                                    name="botan-button"
                                    className="botan-button"
                                    onClick={() => copyToClipboard(gift_item.accountNumber, index)}
                                  >
                                    <div className="icon">
                                      <img src={getCopyIcon(index)} alt="copy" />
                                    </div>
                                    <div className="label">
                                      <p>{copied === index ? "Tersalin" : "Salin Nomor"}</p>
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
                                <p>Alamat Pengiriman</p>
                              </div>
                              <div className="gift-address">
                                <p>{gift_item.address}</p>
                              </div>
                            </div>
                            <div className="body-right">
                              <div className="copy-button">
                                <button
                                  name="botan-button"
                                  className="botan-button"
                                  onClick={() => copyToClipboard(gift_item.address, index)}
                                >
                                  <div className="icon">
                                    <img src={getCopyIcon(index)} alt="copy" />
                                  </div>
                                  <div className="label">
                                    <p>{copied === index ? "Tersalin" : "Salin Alamat"}</p>
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
        )}
      </div>
    </div>
  );
}
