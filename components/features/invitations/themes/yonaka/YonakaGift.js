"use client";

import { useEffect, useRef, useState } from "react";

const giftImages = {
  bca: "/themes/yonaka/component/gift-bca.png",
  mandiri: "/themes/yonaka/component/gift-mandiri.png",
  bri: "/themes/yonaka/component/gift-bri.png",
  bjb: "/themes/yonaka/component/gift-bjb.png",
};

export default function YonakaGift({ invitation }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const gifts = invitation?.gifts || [];
  const giftCaption = "Kirim hadiah sebagai tanda kasih untuk kedua mempelai";

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // silent
    }
  };

  return (
    <div ref={ref} name="gift-section">
      <div className="content">
        <div className="view-content">
          {!isDesktop && (
            <div className={`gift-icon ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
              <img src="/themes/yonaka/gift/mobile-gift-icon.svg" alt="gift-icon" />
            </div>
          )}
          <div className={`title ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.35s" }}>
            <p>Kirim Hadiah</p>
          </div>
          <div className={`desc ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.45s" }}>
            <p>{giftCaption}</p>
          </div>
          <div className={`open-button ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.55s" }}>
            <button type="button" name="yonaka-button" onClick={() => setModalOpen(true)}>
              <div className="label"><p>Kirim Hadiah</p></div>
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="gift-modal-overlay" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#FFEDAB", borderRadius: "1.25rem", padding: isDesktop ? "2rem" : "1.56rem 1.62rem", maxWidth: "32rem", width: "90%" }}>
            <div className="header">
              <div className="gift-bank">
                <img src={giftImages[gifts[0]?.providerName] || giftImages.bca} alt="bank" />
              </div>
              <div className="close-modal-button" onClick={() => setModalOpen(false)}>
                <img src="/themes/yonaka/component/close-modal.svg" alt="close" />
              </div>
            </div>

            {gifts.map((gift, idx) => (
              <div key={idx} style={{ marginTop: idx > 0 ? "2.25rem" : "1.12rem" }}>
                <div className="body">
                  <div className="body-left">
                    <div className="gift-receipt"><p>{gift.accountName}</p></div>
                    <div className="gift-id"><p>{gift.accountNumber}</p></div>
                  </div>
                  <div className="body-right">
                    <button type="button" name="yonaka-button" onClick={() => copyToClipboard(gift.accountNumber)}>
                      <div className="icon">
                        <img src={copied === gift.accountNumber ? "/themes/yonaka/component/copied.svg" : "/themes/yonaka/component/copy.svg"} alt="copy" />
                      </div>
                      <div className="label"><p>Salin Nomor</p></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="body-bottom">
              <div className="info"><p>Terimakasih banyak atas hadiah yang dikirimkan kepada kami</p></div>
            </div>
          </div>
        </div>
      )}

      {copied && (
        <div className="copied-toast"><p>Tersalin!</p></div>
      )}

      <div className="decorations">
        {isDesktop ? (
          <>
            <div className="top-left"><img src="/themes/yonaka/gift/decor-top-left.png" alt="decor" /></div>
            <div className="top-right"><img src="/themes/yonaka/gift/decor-top-right.png" alt="decor" /></div>
          </>
        ) : (
          <div className="top"><img src="/themes/yonaka/gift/mobile-decor-top.png" alt="decor" /></div>
        )}
      </div>
    </div>
  );
}
