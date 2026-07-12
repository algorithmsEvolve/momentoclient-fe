"use client";

import { useEffect, useState, useRef } from "react";
import {
  createInvitationWish,
  getInvitationWishes,
} from "@/lib/api/invitations";

export default function RenWishSection({ invitation, guest, withoutGift }) {
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

  useEffect(() => {
    if (!isDesktop) return undefined;

    const flowerItems = Array.from(
      sectionRef.current?.querySelectorAll('[name="horizontal-flowers"] img') || []
    );

    if (!flowerItems.length) return undefined;

    const flowerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            flowerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    flowerItems.forEach((item) => flowerObserver.observe(item));

    return () => {
      flowerItems.forEach((item) => flowerObserver.unobserve(item));
      flowerObserver.disconnect();
    };
  }, [isDesktop]);

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
              <div className="wishes" style={{ maxHeight: isDesktop ? "28rem" : "31rem", overflowY: "auto" }}>
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
                          className="ren-input"
                          data-testid="ren-wish-name"
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
                          className="ren-input"
                          data-testid="ren-wish-message"
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
                      name="ren-button"
                      className="ren-button"
                      disabled={submitLoading || !formValidated}
                      style={{ cursor: "pointer" }}
                      data-testid="ren-wish-submit"
                    >
                      <div className="label">
                        <p>{submitLoading ? "Mengirim..." : isDesktop ? "Kirim Ucapan" : "Kirim"}</p>
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
        {isDesktop && (
          <div className="bottom">
            <div name="horizontal-flowers">
              <div className="middle">
                <img src="/themes/ren/global/animated/horizontal-flowers/middle.png" alt="horizontal-flowers" />
              </div>
              <div className="first-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/first-left.png" alt="horizontal-flowers" />
              </div>
              <div className="minus-leaf-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/minus-leaf-left.png" alt="horizontal-flowers" />
              </div>
              <div className="first-leaf-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/first-leaf-left.png" alt="horizontal-flowers" />
              </div>
              <div className="two-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/two-left.png" alt="horizontal-flowers" />
              </div>
              <div className="two-leaf-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/two-leaf-left.png" alt="horizontal-flowers" />
              </div>
              <div className="three-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/three-left.png" alt="horizontal-flowers" />
              </div>
              <div className="four-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/four-left.png" alt="horizontal-flowers" />
              </div>
              <div className="three-leaf-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/three-leaf-left.png" alt="horizontal-flowers" />
              </div>
              <div className="four-leaf-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/four-leaf-left.png" alt="horizontal-flowers" />
              </div>
              <div className="five-left">
                <img src="/themes/ren/global/animated/horizontal-flowers/five-left.png" alt="horizontal-flowers" />
              </div>
              <div className="first-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/first-right.png" alt="horizontal-flowers" />
              </div>
              <div className="minus-leaf-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/minus-leaf-right.png" alt="horizontal-flowers" />
              </div>
              <div className="first-leaf-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/first-leaf-right.png" alt="horizontal-flowers" />
              </div>
              <div className="two-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/two-right.png" alt="horizontal-flowers" />
              </div>
              <div className="two-leaf-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/two-leaf-right.png" alt="horizontal-flowers" />
              </div>
              <div className="three-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/three-right.png" alt="horizontal-flowers" />
              </div>
              <div className="four-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/four-right.png" alt="horizontal-flowers" />
              </div>
              <div className="three-leaf-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/three-leaf-right.png" alt="horizontal-flowers" />
              </div>
              <div className="four-leaf-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/four-leaf-right.png" alt="horizontal-flowers" />
              </div>
              <div className="five-right">
                <img src="/themes/ren/global/animated/horizontal-flowers/five-right.png" alt="horizontal-flowers" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
