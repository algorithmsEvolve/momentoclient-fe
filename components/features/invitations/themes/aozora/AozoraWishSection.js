"use client";

import { useEffect, useState, useRef } from "react";
import {
  createInvitationWish,
  getInvitationWishes,
} from "@/lib/api/invitations";

function WishDecoration({ isDesktop }) {
  const [isVisible, setIsVisible] = useState(false);
  const decorationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (decorationRef.current) {
      observer.observe(decorationRef.current);
    }

    return () => {
      if (decorationRef.current) {
        observer.unobserve(decorationRef.current);
      }
    };
  }, []);

  return (
    <div className="decorations" ref={decorationRef}>
      <div className="bottom">
        <img
          className={isVisible ? "animate-zoom-in" : "opacity-0"}
          style={{ animationDelay: "500ms" }}
          src={isDesktop ? "/themes/aozora/wish/decor-bottom.png" : "/themes/aozora/wish/mobile-decor-bottom.png"}
          alt="decor-bottom"
        />
      </div>
    </div>
  );
}

export default function AozoraWishSection({ invitation, guest, withoutGift }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
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

  const [message, setMessage] = useState("");
  const [name, setName] = useState(guest?.name || "");
  const [wishes, setWishes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadWishes() {
      setLoading(true);
      const result = await getInvitationWishes(invitation.slug);
      if (!ignore) {
        setWishes(Array.isArray(result.data) ? result.data : []);
        setLoading(false);
      }
    }

    if (invitation?.slug) {
      loadWishes();
    }

    return () => {
      ignore = true;
    };
  }, [invitation?.slug]);

  const [prevGuestName, setPrevGuestName] = useState(guest?.name || "");
  if (guest?.name && guest.name !== prevGuestName) {
    setPrevGuestName(guest.name);
    setName(guest.name);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !message || message.length > 400) return;
    
    setSubmitLoading(true);
    setError("");

    try {
      const result = await createInvitationWish(invitation.slug, {
        guestSlug: guest?.slug || null,
        name: name || guest?.name || "Tamu",
        message,
      });

      if (!result.ok) {
        setError(result.error || "Ucapan gagal dikirim. Coba lagi.");
        return;
      }

      setMessage("");
      const wishesResult = await getInvitationWishes(invitation.slug);
      setWishes(Array.isArray(wishesResult.data) ? wishesResult.data : []);
    } catch {
      setError("Ucapan gagal dikirim. Coba lagi.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const formValidated = name.length > 0 && message.length > 0 && message.length <= 400;
  const sendButtonText = isDesktop ? "Kirim Ucapan" : "Kirim";

  return (
    <div id="wish" name="wish-section" ref={sectionRef} className={withoutGift ? "without-gift" : ""}>
      <div className="wrapper-decoration"></div>

      {!isDesktop && (
        <div
          className={`mobile-icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
          style={{ animationDelay: "150ms" }}
        >
          <img src="/themes/aozora/wish/mobile-wish-icon.png" alt="wish-icon" />
        </div>
      )}

      <div className="content">
        <div className="view-content">
          {isDesktop && (
            <div
              className={`icon ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "150ms" }}
            >
              <img src="/themes/aozora/wish/wish-icon.png" alt="wish-icon" />
            </div>
          )}

          <div
            className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <p>Ucapan</p>
          </div>

          <div className="wish-wrapper">
            <div
              className={`left ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "350ms" }}
            >
              <div className="wishes" style={{ maxHeight: isDesktop ? "32rem" : "24rem", overflowY: "auto" }}>
                {loading ? (
                  <div className="no-data">
                    <p>Memuat ucapan...</p>
                  </div>
                ) : wishes.length ? (
                  wishes.map((wish) => (
                    <div key={wish.id} className="wish">
                      <div className="top">
                        <div className="name">
                          <p>{wish.name}</p>
                        </div>
                        <div className="date">
                          <p>
                            {wish.createdAt
                              ? new Date(wish.createdAt).toLocaleDateString("id-ID", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "-"}
                          </p>
                        </div>
                      </div>
                      <div className="bottom">
                        <div className="message">
                          <p>{wish.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data">
                    <p>Belum ada ucapan.</p>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`right ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
              style={{ animationDelay: "350ms" }}
            >
              <div className="form-wish">
                <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                  <div className="name-input">
                    <div className="label">
                      <p>Nama</p>
                    </div>
                    <div name="input" className="text">
                      <div className="input-content">
                        <input
                          type="text"
                          placeholder="Tulis Namamu..."
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          data-testid="aozora-wish-name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="message-input">
                    <div className="label">
                      <p>Pesan</p>
                    </div>
                    <div name="input" className="textarea">
                      <div className="input-content">
                        <textarea
                          placeholder="Tulis Pesanmu..."
                          rows={10}
                          maxLength={400}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          data-testid="aozora-wish-message"
                          required
                        />
                      </div>
                    </div>
                    <div className="message-counter">
                      <p>{message.length} / 400</p>
                    </div>
                  </div>

                  {error && (
                    <div style={{ color: "red", marginBottom: "1rem", fontFamily: "poppinsR" }}>{error}</div>
                  )}

                  <div className="send-button">
                    <button
                      type="submit"
                      name="aozora-button"
                      className="aozora-button"
                      disabled={submitLoading || !formValidated}
                      style={{ cursor: "pointer", border: "none" }}
                      data-testid="aozora-wish-submit"
                    >
                      <div className="label">
                        <p>{submitLoading ? "Mengirim..." : sendButtonText}</p>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WishDecoration isDesktop={isDesktop} />
    </div>
  );
}
