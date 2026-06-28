"use client";

import { useEffect, useState, useRef } from "react";
import {
  createInvitationWish,
  getInvitationWishes,
} from "@/lib/api/invitations";

export default function BaraSimpleWishSection({ invitation, guest, withoutGift }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(guest?.name || "");
  const [wishes, setWishes] = useState([]);
  const [error, setError] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  const language = invitation?.settings?.custom?.language || "ID";
  const isEN = language === "EN";

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        setError(result.error || "Ucapan gagal dikirim. Coba lagi beberapa saat.");
        return;
      }

      setMessage("");
      const wishesResult = await getInvitationWishes(invitation.slug);
      setWishes(Array.isArray(wishesResult.data) ? wishesResult.data : []);
    } catch {
      setError("Ucapan gagal dikirim. Periksa koneksi lalu coba lagi.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const formValidated = name.length > 0 && message.length > 0 && message.length <= 400;

  const getDateTimeStamp = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div id="wish" name="wish-section" ref={sectionRef} className={withoutGift ? "without-gift" : ""}>
      <div className="content">
        <div className="view-content">
          <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
            <p>{isEN ? "Wishes & Prayers" : "Ucapan dan Doa"}</p>
          </div>

          <div className="wish-wrapper">
            <div className="left">
              <div className={`wishes ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
                {loading ? (
                  <div className="no-data"><p>{isEN ? "Loading wishes..." : "Memuat ucapan..."}</p></div>
                ) : wishes.length > 0 ? (
                  wishes.map((wish) => (
                    <div key={wish.id} className="wish">
                      <div className="top">
                        <div className="name">
                          <p>{wish.name}</p>
                        </div>
                        <div className="date">
                          <p>{getDateTimeStamp(wish.createdAt)}</p>
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

            <div className="right">
              <div className={`form-wish ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
                <div className="name-input">
                  <div className="label">
                    <p>Nama</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Tulis Namamu..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-testid="bara-wish-name"
                  />
                </div>

                <div className="message-input">
                  <div className="label">
                    <p>Pesan</p>
                  </div>
                  <textarea
                    placeholder="Tulis Pesanmu..."
                    rows={10}
                    maxLength={400}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    data-testid="bara-wish-message"
                  />
                  <div className="message-counter">
                    <p>{message.length} / 400</p>
                  </div>
                </div>

                {error && (
                  <div style={{ marginBottom: "1rem", color: "red", fontFamily: "poppinsR" }}>
                    {error}
                  </div>
                )}

                <div className="send-button">
                  <button
                    type="submit"
                    name="bara-simple-button"
                    disabled={submitLoading || !formValidated}
                    onClick={handleSubmit}
                    data-testid="bara-wish-submit"
                  >
                    <div className="label">
                      <p>{submitLoading ? (isEN ? "Sending..." : "Mengirim...") : (isDesktop ? (isEN ? "Send Wish" : "Kirim Ucapan") : (isEN ? "Send" : "Kirim"))}</p>
                    </div>
                  </button>
                </div>
              </div>

              {!isDesktop && <div className="bottom-border"></div>}
            </div>
          </div>
        </div>
      </div>

      <div className="decorations">
        {isDesktop && (
          <div className={`bottom ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
            <img src="/themes/bara-simple/wish/decor-bottom.png" alt="decor-bottom" />
          </div>
        )}
      </div>
    </div>
  );
}
