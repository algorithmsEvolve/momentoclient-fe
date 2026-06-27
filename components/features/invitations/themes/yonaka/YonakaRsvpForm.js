"use client";

import { useEffect, useRef, useState } from "react";
import { createInvitationRsvp } from "@/lib/api/invitations";

export default function YonakaRsvpForm({ invitation, guest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState(null);
  const [reason, setReason] = useState("");
  const [attendeeCount, setAttendeeCount] = useState("1");

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

  const handleSubmit = async () => {
    if (!attendance) return;
    setLoading(true);
    try {
      await createInvitationRsvp(invitation.slug, {
        guestId: guest?.id,
        attending: attendance === "hadir",
        reason: attendance === "tidak-hadir" ? reason : undefined,
        attendeeCount: attendance === "hadir" ? parseInt(attendeeCount, 10) : undefined,
      });
      setSubmitted(true);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div ref={ref} name="rsvp-section">
        <div className="content">
          <div className="view-content" style={{ textAlign: "center", padding: "5rem 0" }}>
            <p style={{ color: "#fff", fontFamily: "andinademo", fontSize: "2rem" }}>Terima kasih atas konfirmasinya!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} id="rsvp" name="rsvp-section">
      <div className="content">
        <div className="view-content">
          <div className={`title ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
            <p>Konfirmasi Kehadiran</p>
          </div>
          <div className={`desc ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.35s" }}>
            <p>Mohon isi konfirmasi kehadiran di bawah ini</p>
          </div>

          <div className="rsvp-form">
            <div className={`name-input ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.45s" }}>
              <div className="label"><p>Nama</p></div>
              <div name="input">
                <input type="text" value={guest?.name || ""} disabled />
              </div>
            </div>

            <div className={`radio-group ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.55s" }}>
              <div name="yonaka-radio">
                <div className="radios">
                  <div
                    className={`radio ${attendance === "hadir" ? "active" : ""}`}
                    onClick={() => setAttendance("hadir")}
                  >
                    <div className="radio-circle">
                      {attendance === "hadir" && <div className="radio-circle-inside" />}
                    </div>
                    <div className="radio-text"><p>Hadir</p></div>
                  </div>
                  <div
                    className={`radio ${attendance === "tidak-hadir" ? "active" : ""}`}
                    onClick={() => setAttendance("tidak-hadir")}
                  >
                    <div className="radio-circle">
                      {attendance === "tidak-hadir" && <div className="radio-circle-inside" />}
                    </div>
                    <div className="radio-text"><p>Maaf, tidak hadir</p></div>
                  </div>
                </div>
              </div>
            </div>

            {attendance === "hadir" && (
              <div className={`attendance-count ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.65s" }}>
                <div className="label"><p>Jumlah yang hadir</p></div>
                <div name="input">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={attendeeCount}
                    onChange={(e) => setAttendeeCount(e.target.value)}
                  />
                </div>
              </div>
            )}

            {attendance === "tidak-hadir" && (
              <div className={`reason-input ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.65s" }}>
                <div className="label"><p>Alasan</p></div>
                <div name="input" className="textarea">
                  <textarea
                    rows={4}
                    placeholder="Tulis alasan..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className={`submit-button ${visible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.75s" }}>
              <button
                type="button"
                name="yonaka-button"
                onClick={handleSubmit}
                disabled={!attendance || loading}
                className={!attendance || loading ? "disabled" : ""}
              >
                <div className="label">
                  <p>{loading ? "Mengirim..." : "Konfirmasi"}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isDesktop && (
        <div className="decorations">
          <div className="top-left"><img src="/themes/yonaka/rsvp/decor-top-left.png" alt="decor" /></div>
          <div className="top-right"><img src="/themes/yonaka/rsvp/decor-top-right.png" alt="decor" /></div>
          <div className="bottom-left"><img src="/themes/yonaka/rsvp/decor-bottom-left.png" alt="decor" /></div>
          <div className="bottom-right"><img src="/themes/yonaka/rsvp/decor-bottom-right.png" alt="decor" /></div>
        </div>
      )}
    </div>
  );
}
