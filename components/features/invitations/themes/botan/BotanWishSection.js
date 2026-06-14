"use client";

import { useEffect, useState, useRef } from "react";
import {
  createInvitationWish,
  getInvitationWishes,
} from "@/lib/api/invitations";

export default function BotanWishSection({ invitation, guest }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

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
  const [message, setMessage] = useState("");
  const [name, setName] = useState(guest?.name || "");
  const [wishes, setWishes] = useState([]);
  const [error, setError] = useState("");

  const withoutGift = !Array.isArray(invitation?.gifts) || invitation.gifts.length === 0;

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

  return (
    <div id="wish" name="wish-section" ref={sectionRef} className={withoutGift ? "without-gift" : ""}>
      <div className="decorations">
        <div className="hidden md:block decor-top-left">
          <img className={`${isVisible ? "animate-zoom-in" : "opacity-0"}`} src="/themes/botan/wish/decor-top-left.png" alt="decor-top-left" style={{ animationDelay: "250ms" }} />
        </div>
        <div className="hidden md:block decor-bottom">
          <img className={`${isVisible ? "animate-zoom-in" : "opacity-0"}`} src="/themes/botan/wish/decor-bottom.png" alt="decor-bottom" style={{ animationDelay: "250ms" }} />
        </div>
        <div className="md:hidden decor-mobile-top">
          <img className={`${isVisible ? "animate-zoom-in" : "opacity-0"}`} src="/themes/botan/wish/mobile-decor-top.png" alt="decor-top" style={{ animationDelay: "250ms" }} />
        </div>
        <div className="md:hidden decor-mobile-bottom-right">
          <img className={`${isVisible ? "animate-zoom-in" : "opacity-0"}`} src="/themes/botan/wish/mobile-decor-bottom.png" alt="decor-bottom" style={{ animationDelay: "250ms" }} />
        </div>
      </div>

      <div className="content">
        <div className="view-content">
          <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
            <p>Ucapan dan Doa</p>
          </div>

          <div className="md:hidden bottom-border"></div>

          <div className="wish-wrapper">
            <div className={`left ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
              <div className="wishes">
                {loading ? (
                  <div className="no-data"><p>Memuat ucapan...</p></div>
                ) : wishes.length ? (
                  wishes.map((wish) => (
                    <div key={wish.id} className="wish">
                      <div className="top">
                        <div className="name">
                          <p>{wish.name}</p>
                        </div>
                        <div className="date">
                          <p>{new Date(wish.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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

            <div className={`right ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "450ms" }}>
              <div className="form-wish">
                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="name-input">
                    <div className="label">
                      <p>Nama</p>
                    </div>
                    <div name="input">
                      <input
                        type="text"
                        placeholder="Tulis Namamu..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="botan-input"
                        data-testid="botan-wish-name"
                      />
                    </div>
                  </div>

                  <div className="message-input">
                    <div className="label">
                      <p>Pesan</p>
                    </div>
                    <div name="input" className="textarea">
                      <textarea
                        placeholder="Tulis Pesanmu..."
                        rows="10"
                        maxLength="400"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="botan-input"
                        data-testid="botan-wish-message"
                      />
                    </div>
                    <div className="message-counter">
                      <p>{message.length} / 400</p>
                    </div>
                  </div>

                  {error && (
                    <div style={{ marginBottom: '1.5rem', color: 'red', fontFamily: 'poppinsR' }}>
                      {error}
                    </div>
                  )}

                  <div className="send-button">
                    <button
                      type="submit"
                      name="botan-button"
                      className="botan-button botan-button--primary"
                      disabled={submitLoading || !formValidated}
                      data-testid="botan-wish-submit"
                    >
                      <div className="label"><p>{submitLoading ? "Mengirim..." : "Kirim Ucapan"}</p></div>
                    </button>
                  </div>
                </form>
              </div>

              <div className="md:hidden bottom-border"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
