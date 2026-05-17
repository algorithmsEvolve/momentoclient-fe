"use client";

import { useState, useEffect } from "react";

export default function BotanGift({ invitation }) {
  const [copied, setCopied] = useState("");
  const [giftModalState, setGiftModalState] = useState(false);
  const gifts = Array.isArray(invitation?.gifts) ? invitation.gifts : [];

  const copyToClipboard = async (value, key) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 1400);
    } catch {
      setCopied("");
    }
  };

  const getCopyIcon = (key) => copied === key ? "/themes/botan/component/copied.svg" : "/themes/botan/component/copy.svg";

  const fetchGiftImage = (type) => {
    if (type?.toLowerCase().includes("mandiri")) return "/themes/botan/component/gift-mandiri.png";
    if (type?.toLowerCase().includes("bri")) return "/themes/botan/component/gift-bri.png";
    return "/themes/botan/gift/mobile-gift-icon.svg";
  };

  useEffect(() => {
    if (giftModalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [giftModalState]);

  if (gifts.length === 0) return null;

  const firstGift = gifts[0];
  const restGifts = gifts.slice(1);

  return (
    <div id="gift" name="gift-section">
      <div className="content">
        <div className="view-content">
          <div className="md:hidden gift-icon">
            <img src="/themes/botan/gift/mobile-gift-icon.svg" alt="gift-icon" />
          </div>
          <div className="title">
            <p>Kirim Hadiah</p>
          </div>
          <div className="desc">
            <p>Bagi keluarga dan sahabat yang ingin mengirimkan hadiah. Kami akan dengan senang hati menerimanya.</p>
          </div>
          <div className="open-button">
            <button
              name="botan-button"
              className="botan-button botan-button--primary"
              onClick={() => setGiftModalState(true)}
            >
              <div className="label"><p>Kirim Hadiah</p></div>
            </button>
          </div>
        </div>
      </div>

      <div className="modals">
        {giftModalState && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
            <div className="gift-modal bg-[#efeae4] rounded-3xl w-full max-w-[42.3125rem] max-h-[90vh] overflow-y-auto" style={{ padding: '1.56rem 1.62rem' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="gift-bank">
                      <img src={fetchGiftImage(firstGift.providerName)} alt="gift-icon" style={{ height: '2.5rem', objectFit: 'contain' }} />
                    </div>
                    <div className="close-modal-button" onClick={() => setGiftModalState(false)} style={{ cursor: 'pointer' }}>
                      <img src="/themes/botan/component/close-modal.svg" alt="close-modal-icon" style={{ width: '2rem', height: '2rem' }} />
                    </div>
                  </div>
                </div>

                <div className="body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.12rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div className="body-left">
                    {firstGift.accountNumber ? (
                      <>
                        <div className="gift-receipt">
                          <p style={{ fontFamily: 'poppinsR', color: '#66646F' }}>{firstGift.accountName}</p>
                        </div>
                        <div className="gift-id">
                          <p style={{ fontFamily: 'poppinsSB', color: '#66646F' }}>{firstGift.accountNumber}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="gift-label">
                          <p style={{ fontFamily: 'poppinsSB', color: '#66646F' }}>Alamat Pengiriman</p>
                        </div>
                        <div className="gift-address">
                          <p style={{ fontFamily: 'poppinsR', color: '#66646F' }}>{firstGift.address}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="body-right">
                    <div className="copy-button">
                      <button
                        name="botan-button"
                        className="botan-button botan-button--primary"
                        onClick={() => copyToClipboard(firstGift.accountNumber || firstGift.address, "first")}
                        style={{ padding: '0.75rem 1.88rem', display: 'flex', gap: '0.5rem', alignItems: 'center', borderRadius: '999px', background: '#cb877e', border: 'none', color: '#fff' }}
                      >
                        <div className="icon">
                          <img src={getCopyIcon("first")} alt="copy" style={{ width: '1.25rem', height: '1.25rem' }} />
                        </div>
                        <div className="label">
                          <p style={{ fontFamily: 'poppinsM' }}>{copied === "first" ? "Tersalin" : (firstGift.accountNumber ? "Salin Nomor" : "Salin Alamat")}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {restGifts.length > 0 && (
                  <div className="gifts" style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem 0', marginTop: '2.25rem' }}>
                    {restGifts.map((gift_item, index) => (
                      <div key={index} className="gift-item">
                        {gift_item.accountNumber ? (
                          <>
                            <div className="header" style={{ marginBottom: '1rem' }}>
                              <div className="gift-bank">
                                <img src={fetchGiftImage(gift_item.providerName)} alt="gift-icon" style={{ height: '2.5rem', objectFit: 'contain' }} />
                              </div>
                            </div>
                            <div className="body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                              <div className="body-left">
                                <div className="gift-receipt">
                                  <p style={{ fontFamily: 'poppinsR', color: '#66646F' }}>{gift_item.accountName}</p>
                                </div>
                                <div className="gift-id">
                                  <p style={{ fontFamily: 'poppinsSB', color: '#66646F' }}>{gift_item.accountNumber}</p>
                                </div>
                              </div>
                              <div className="body-right">
                                <div className="copy-button">
                                  <button
                                    name="botan-button"
                                    className="botan-button botan-button--primary"
                                    onClick={() => copyToClipboard(gift_item.accountNumber, index)}
                                    style={{ padding: '0.75rem 1.88rem', display: 'flex', gap: '0.5rem', alignItems: 'center', borderRadius: '999px', background: '#cb877e', border: 'none', color: '#fff' }}
                                  >
                                    <div className="icon">
                                      <img src={getCopyIcon(index)} alt="copy" style={{ width: '1.25rem', height: '1.25rem' }} />
                                    </div>
                                    <div className="label">
                                      <p style={{ fontFamily: 'poppinsM' }}>{copied === index ? "Tersalin" : "Salin Nomor"}</p>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                            <div className="body-left">
                              <div className="gift-label">
                                <p style={{ fontFamily: 'poppinsSB', color: '#66646F' }}>Alamat Pengiriman</p>
                              </div>
                              <div className="gift-address">
                                <p style={{ fontFamily: 'poppinsR', color: '#66646F' }}>{gift_item.address}</p>
                              </div>
                            </div>
                            <div className="body-right">
                              <div className="copy-button">
                                <button
                                  name="botan-button"
                                  className="botan-button botan-button--primary"
                                  onClick={() => copyToClipboard(gift_item.address, index)}
                                  style={{ padding: '0.75rem 1.88rem', display: 'flex', gap: '0.5rem', alignItems: 'center', borderRadius: '999px', background: '#cb877e', border: 'none', color: '#fff' }}
                                >
                                  <div className="icon">
                                    <img src={getCopyIcon(index)} alt="copy" style={{ width: '1.25rem', height: '1.25rem' }} />
                                  </div>
                                  <div className="label">
                                    <p style={{ fontFamily: 'poppinsM' }}>{copied === index ? "Tersalin" : "Salin Alamat"}</p>
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

                <div className="body-bottom" style={{ marginTop: '1.94rem' }}>
                  <div className="info">
                    <p style={{ color: '#66646F', fontFamily: 'poppinsR', fontSize: '0.875rem', textAlign: 'center' }}>
                      Terimakasih banyak atas hadiah yang dikirimkan kepada kami
                    </p>
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

