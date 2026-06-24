"use client";

import { useEffect, useRef, useState } from "react";
import { getInvitationWishes, createInvitationWish } from "@/lib/api/invitations";

function getDateTimeStamp(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const day = date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  return day;
}

export default function YamatoWishSection({ invitation, guest, withoutGift }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const wishesRef = useRef(null);
  const formRef = useRef(null);
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: guest?.name || "", message: "" });
  const [isDesktop, setIsDesktop] = useState(false);
  const [wishesMaxHeight, setWishesMaxHeight] = useState("unset");

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
    fetchWishes();
  }, []);

  useEffect(() => {
    if (guest?.name) {
      setForm((prev) => ({ ...prev, name: guest.name }));
    }
  }, [guest?.name]);

  useEffect(() => {
    if (isDesktop && formRef.current) {
      const updateHeight = () => {
        if (formRef.current) {
          setWishesMaxHeight(formRef.current.offsetHeight + "px");
        }
      };
      updateHeight();
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(formRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [isDesktop, wishes.length]);

  const fetchWishes = async () => {
    try {
      setLoading(true);
      const result = await getInvitationWishes(invitation.slug);
      if (result.ok && Array.isArray(result.data)) {
        setWishes(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch wishes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.message) return;

    try {
      setLoading(true);
      const result = await createInvitationWish(invitation.slug, {
        name: form.name,
        message: form.message,
        guestSlug: guest?.slug,
      });

      if (result.ok) {
        setForm({ name: guest?.name || "", message: "" });
        fetchWishes();
      }
    } catch (err) {
      console.error("Failed to submit wish:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wish" name="wish-section" ref={sectionRef} className={withoutGift ? "without-gift" : ""}>
      <div className="content">
        <div className="view-content">
          <div
            className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <p>Messages {isDesktop ? "from" : <><br />from</>} <br />the Heart</p>
          </div>

          <div className="wish-wrapper">
            <div className="left">
              <div
                ref={wishesRef}
                className={`wishes ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms", maxHeight: isDesktop ? wishesMaxHeight : undefined }}
              >
                {wishes.length > 0 ? (
                  wishes.map((wish, index) => (
                    <div key={wish.id || index} className="wish">
                      <div className="top">
                        <div className="name">
                          <p>{wish.name}</p>
                        </div>
                        <div className="date">
                          <p>{getDateTimeStamp(wish.createdAt || wish.created_at)}</p>
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
              <div
                ref={formRef}
                id="form-wish"
                className={`form-wish ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms" }}
              >
                <div className="name-input">
                  <div className="label">
                    <p>Nama</p>
                  </div>
                  <div name="input">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tulis Namamu..."
                      readOnly={Boolean(guest?.name)}
                    />
                  </div>
                </div>

                <div className="message-input">
                  <div className="label">
                    <p>Pesan</p>
                  </div>
                  <div name="input" className="textarea">
                    <textarea
                      rows={isDesktop ? 10 : 8}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tulis Pesanmu..."
                      maxLength={400}
                    />
                  </div>
                  <div className="message-counter">
                    <p>{form.message.length} / 400</p>
                  </div>
                </div>

                <div className="send-button">
                  <button
                    type="button"
                    name="yamato-button"
                    className="yamato-button"
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.message}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="label">
                      <p>{isDesktop ? "Kirim Ucapan" : "Kirim"}</p>
                    </div>
                  </button>
                </div>

                {!isDesktop && (
                  <div className="bottom-separator">
                    <img src="/themes/yamato/wish/mobile-bottom-separator.png" alt="bottom-separator" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className="top">
          {isDesktop ? (
            <img
              className={isVisible ? "animate-fade-down" : "opacity-0"}
              style={{ animationDelay: "500ms" }}
              src="/themes/yamato/wish/decor-top.png"
              alt="decor-top"
            />
          ) : (
            <img
              className={isVisible ? "animate-fade-down" : "opacity-0"}
              style={{ animationDelay: "500ms" }}
              src="/themes/yamato/wish/mobile-decor-top.png"
              alt="mobile-decor-top"
            />
          )}
        </div>
      </div>
    </div>
  );
}
