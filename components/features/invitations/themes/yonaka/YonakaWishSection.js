"use client";

import { useEffect, useRef, useState } from "react";
import { getInvitationWishes, createInvitationWish } from "@/lib/api/invitations";

export default function YonakaWishSection({ invitation, guest }) {
  const ref = useRef(null);
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState(guest?.name || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [wishesMaxHeight, setWishesMaxHeight] = useState("none");

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

  useEffect(() => {
    if (isDesktop && formRef.current) {
      setWishesMaxHeight(formRef.current.offsetHeight + "px");
    }
  }, [isDesktop, wishes, visible]);

  useEffect(() => {
    if (invitation?.slug) {
      getInvitationWishes(invitation.slug).then((result) => {
        setWishes(Array.isArray(result.data) ? result.data : []);
      }).catch(() => {});
    }
  }, [invitation?.slug]);

  const getDateTimeStamp = (ts) => {
    if (!ts) return "";
    try {
      const d = new Date(typeof ts === "number" ? ts : ts);
      return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return "";
    }
  };

  const handleSend = async () => {
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    try {
      const newWish = await createInvitationWish(invitation.slug, {
        guestId: guest?.id,
        name: name.trim(),
        message: message.trim(),
      });
      setWishes((prev) => [newWish, ...prev]);
      setMessage("");
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref} id="wish" name="wish-section">
      <div className="content">
        <div className="view-content">
          <div className={`title ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
            <p>Pesan Hangat{!isDesktop && <br />} Untuk Kami</p>
          </div>

          <div className="wish-wrapper">
            <div className="left">
              <div
                className={`wishes ${visible ? "animate-zoom-in" : "opacity-0"}`}
                style={{
                  animationDelay: "0.35s",
                  ...(isDesktop ? { maxHeight: wishesMaxHeight } : {}),
                }}
              >
                {wishes.length > 0 ? (
                  wishes.map((wish, idx) => (
                    <div key={wish.id || idx} className="wish">
                      <div className="top">
                        <div className="name"><p>{wish.name}</p></div>
                        <div className="date"><p>{getDateTimeStamp(wish.createdAt)}</p></div>
                      </div>
                      <div className="bottom">
                        <div className="message"><p>{wish.message}</p></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data"><p>Belum ada ucapan.</p></div>
                )}
              </div>
            </div>

            <div className="right">
              <div ref={formRef} id="form-wish" className={`form-wish ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.35s" }}>
                <div className="name-input">
                  <div className="label"><p>Nama</p></div>
                  <div name="input">
                    <input
                      type="text"
                      placeholder="Tulis Namamu..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="message-input">
                  <div className="label"><p>Pesan</p></div>
                  <div name="input" className="textarea">
                    <textarea
                      rows={10}
                      maxLength={400}
                      placeholder="Tulis Pesanmu..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="message-counter"><p>{message.length} / 400</p></div>
                </div>

                <div className="send-button">
                  <button
                    type="button"
                    name="yonaka-button"
                    onClick={handleSend}
                    disabled={!name.trim() || !message.trim() || loading}
                    className={!name.trim() || !message.trim() || loading ? "disabled" : ""}
                  >
                    <div className="label">
                      <p>{loading ? "Mengirim..." : "Kirim"}</p>
                    </div>
                  </button>
                </div>

                {!isDesktop && (
                  <div className="bottom-separator">
                    <img src="/themes/yonaka/wish/mobile-bottom-separator.png" alt="separator" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDesktop && (
        <div className="decorations">
          <div className="top-left">
            <img className={`${visible ? "animate-zoom-in-right" : "opacity-0"}`} src="/themes/yonaka/wish/decor-top-left.png" alt="decor" style={{ animationDelay: "0.5s" }} />
          </div>
          <div className="top-right">
            <img className={`${visible ? "animate-zoom-in-left" : "opacity-0"}`} src="/themes/yonaka/wish/decor-top-right.png" alt="decor" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      )}
      {!isDesktop && (
        <div className="decorations">
          <div className="top">
            <img className={`${visible ? "animate-fade-down" : "opacity-0"}`} src="/themes/yonaka/wish/mobile-decor-top.png" alt="decor" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      )}
    </div>
  );
}
