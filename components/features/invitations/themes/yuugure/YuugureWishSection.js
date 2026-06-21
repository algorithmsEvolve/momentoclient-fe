"use client";

import { useEffect, useState, useRef } from "react";
import {
  createInvitationWish,
  getInvitationWishes,
} from "@/lib/api/invitations";

export default function YuugureWishSection({ invitation, guest, withoutGift }) {
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
    const timerId = setTimeout(handleResize, 0);

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
      clearTimeout(timerId);
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

  return (
    <div id="wish" name="wish-section" ref={sectionRef} className={withoutGift ? "without-gift" : ""}>
      <div className="content">
        <div className="view-content">
          <div
            className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <p>Ucapan dan Doa</p>
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
              <div id="form-wish" className="form-wish">
                <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                  <div className="name-input">
                    <div className="label">
                      <p>Nama</p>
                    </div>
                    <div name="input">
                      <div className="input-content">
                        <input
                          type="text"
                          placeholder="Tulis Namamu..."
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="yuugure-input"
                          data-testid="yuugure-wish-name"
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
                          rows={isDesktop ? 8 : 10}
                          maxLength={400}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="yuugure-input"
                          data-testid="yuugure-wish-message"
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
                      name="yuugure-button"
                      className="yuugure-button"
                      disabled={submitLoading || !formValidated}
                      style={{ cursor: "pointer" }}
                      data-testid="yuugure-wish-submit"
                    >
                      <div className="label">
                        <p>{submitLoading ? "Mengirim..." : "Kirim Ucapan"}</p>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="decorations">
        {isDesktop ? (
          <>
            <div className="top-left">
              <img
                className={isVisible ? "animate-zoom-in" : "opacity-0"}
                style={{ animationDelay: "500ms" }}
                src="/themes/yuugure/wish/decor-top-left.png"
                alt="decor-top-left"
              />
            </div>
            <div className="bottom-right">
              <img
                className={isVisible ? "animate-zoom-in" : "opacity-0"}
                style={{ animationDelay: "500ms" }}
                src="/themes/yuugure/wish/decor-bottom-right.png"
                alt="decor-bottom-right"
              />
            </div>
          </>
        ) : (
          <div className="bottom-left">
            <img
              className={isVisible ? "animate-zoom-in" : "opacity-0"}
              style={{ animationDelay: "500ms" }}
              src="/themes/yuugure/wish/mobile-decor-bottom-left.png"
              alt="decor-bottom-left"
            />
          </div>
        )}
      </div>
    </div>
  );
}
