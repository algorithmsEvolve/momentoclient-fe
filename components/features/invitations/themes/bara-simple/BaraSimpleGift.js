"use client";

import { useState, useEffect, useRef } from "react";

export default function BaraSimpleGift({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState("");
  const [giftModalState, setGiftModalState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const gifts = Array.isArray(invitation?.gifts) ? invitation.gifts : [];

  const language = invitation?.settings?.custom?.language || "ID";
  const isEN = language === "EN";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
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

  const getCopyIcon = (key) => (copied === key ? "/themes/bara-simple/component/copied.svg" : "/themes/bara-simple/component/copy.svg");

  const fetchGiftImage = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("mandiri")) return "/themes/bara-simple/component/gift-mandiri.png";
    if (t.includes("bri")) return "/themes/bara-simple/component/gift-bri.png";
    if (t.includes("bca")) return "/themes/bara-simple/component/gift-bca.png";
    if (t.includes("jago")) return "/themes/bara-simple/component/gift-jago.webp";
    if (t.includes("dki")) return "/themes/bara-simple/component/gift-dki.png";
    return "/themes/bara-simple/component/gift-default.svg";
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

  return (
    <div id="gift" name="gift-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className={`gift-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            <img src="/themes/bara-simple/gift/mobile-gift-icon.svg" alt="gift-icon" />
          </div>
          <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
            <p>{isEN ? "Send Gift" : "Kirim Hadiah"}</p>
          </div>
          <div className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
            <p>{isEN ? "For family and friends who want to send gifts. We will happily receive them." : "Bagi keluarga dan sahabat yang ingin mengirimkan hadiah. Kami akan dengan senang hati menerimanya."}</p>
          </div>
          <div className={`open-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "450ms" }}>
            <button
              name="bara-simple-button"
              onClick={() => setGiftModalState(true)}
            >
              <div className="label"><p>{isEN ? "Send Gift" : "Kirim Hadiah"}</p></div>
            </button>
          </div>
        </div>
      </div>

      {giftModalState && (
        <div className="gift-modal-overlay" onClick={closeGiftModal}>
          <div className="gift-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEN ? "Send Gift" : "Kirim Hadiah"}</h3>
              <button className="close-btn" onClick={closeGiftModal}>
                <img src="/themes/bara-simple/component/close-modal.svg" alt="close" />
              </button>
            </div>

            {gifts.map((gift, index) => (
              <div key={index} className="gift-item">
                <img className="bank-logo" src={fetchGiftImage(gift.providerName)} alt="bank-logo" />
                <div className="gift-info">
                  <div className="account-name">
                    <p>{gift.accountName}</p>
                  </div>
                  {gift.accountNumber ? (
                    <div className="account-number">
                      <p>{gift.accountNumber}</p>
                      <button className="copy-btn" onClick={() => copyToClipboard(gift.accountNumber, index)}>
                        <img src={getCopyIcon(index)} alt="copy" />
                      </button>
                    </div>
                  ) : (
                    <div className="account-name">
                      <p>{gift.address}</p>
                    </div>
                  )}
                  {copied === index && <div className="copied-toast"><p>Tersalin!</p></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
