"use client";

import { useEffect, useState, useRef } from "react";
import { createInvitationRsvp } from "@/lib/api/invitations";

export default function BaraSimpleRsvpForm({ invitation }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [rsvpChanging, setRsvpChanging] = useState(false);
  const [error, setError] = useState("");

  const getInitialForm = () => {
    const cached = localStorage.getItem(`bara-simple-rsvp-${invitation.slug}`);
    if (cached) {
      try {
        const data = JSON.parse(cached);
        return {
          name: data.name || "",
          attendance: Boolean(data.attendance),
          how: data.attendeeCount > 1 ? "berdua" : "sendiri",
          notAttendReason: data.notAttendReason || "",
        };
      } catch { /* ignore */ }
    }
    return { name: "", attendance: true, how: "sendiri", notAttendReason: "" };
  };

  const [form, setForm] = useState(getInitialForm);
  const [submitted, setSubmitted] = useState(() => {
    return localStorage.getItem(`bara-simple-rsvp-${invitation.slug}`) !== null;
  });

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

  const withoutNotAttendReason = invitation?.settings?.withoutNotAttendReason || false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await createInvitationRsvp(invitation.slug, {
        name: form.name,
        attendance: form.attendance,
        attendeeCount: form.attendance ? (form.how === "berdua" ? 2 : 1) : null,
        notAttendReason: form.attendance ? null : form.notAttendReason,
      });

      if (!result.ok) {
        setError(result.error || (isEN ? "RSVP failed to save. Check your input and try again." : "RSVP gagal disimpan. Periksa input lalu coba lagi."));
        return;
      }

      localStorage.setItem(`bara-simple-rsvp-${invitation.slug}`, JSON.stringify(result.data));

      setSubmitted(true);
      setRsvpChanging(false);
    } catch {
      setError(isEN ? "RSVP failed to save. Check your connection and try again." : "RSVP gagal disimpan. Periksa koneksi lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div name="rsvp-section" ref={sectionRef}>
      <div className="rsvp-wrapper">
        <div className="content">
          <div className="view-content">
            <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
              <p>R S V P</p>
            </div>

            {submitted && !rsvpChanging ? (
              <>
                <div className="desc rsvp-sent">
                  <p>
                    {isEN ? "Thank you " : "Terimakasih "}
                    <span className="bold">{form.name}</span>
                    {isEN
                      ? ", has filled in your attendance on this form. If you want to change your attendance info, please click the 'change' button below. Thank you"
                      : ", telah mengisi kehadiran pada form ini. Apabila kamu ingin mengubah info kehadiranmu, silahkan klik tombol 'ubah' di bawah ini ya. Terimakasih"}
                  </p>
                </div>
                <div className="change-button">
                  <button
                    type="button"
                    name="bara-simple-button"
                    onClick={() => setRsvpChanging(true)}
                  >
                    <div className="label"><p>{isEN ? "Change" : "Ubah"}</p></div>
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
                  <p>
                    {isEN
                      ? "Kindly confirm your presence through the RSVP form provided below :"
                      : "Mohon bantuannya agar kami dapat mempersiapkan segala sesuatunya secara maksimal dengan mengisi form berikut :"}
                  </p>
                </div>

                <div className={`rsvp-input-wrapper ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ width: "100%", animationDelay: "450ms" }}>
                  <div className="rsvp-input-container">
                    <div className="name-input">
                      <div className="label">
                        <p>{isEN ? "Your Name" : "Nama Anda"}</p>
                      </div>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={isEN ? "Enter your name..." : "Masukkan nama Anda..."}
                        maxLength={160}
                        required
                      />
                    </div>

                    <div className="group-member-input">
                      <div className="label">
                        <p>{isEN ? "Confirm Attendance" : "Konfirmasi Kehadiran"}</p>
                      </div>
                      <div className="radio-options">
                        <label>
                          <input
                            type="radio"
                            name="attendance"
                            checked={form.attendance === true}
                            onChange={() => setForm({ ...form, attendance: true })}
                          />
                          <span>{isEN ? "Attending" : "Hadir"}</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="attendance"
                            checked={form.attendance === false}
                            onChange={() => setForm({ ...form, attendance: false })}
                          />
                          <span>{isEN ? "Not Attending" : "Maaf, belum bisa hadir"}</span>
                        </label>
                      </div>
                    </div>

                    {form.attendance && (
                      <div className="group-member-input">
                        <div className="label">
                          <p>{isEN ? "Attending with?" : "Apakah datang sendiri atau berdua?"}</p>
                        </div>
                        <div className="radio-options">
                          <label>
                            <input
                              type="radio"
                              name="how"
                              checked={form.how === "sendiri"}
                              onChange={() => setForm({ ...form, how: "sendiri" })}
                            />
                            <span>{isEN ? "Alone" : "Sendiri"}</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="how"
                              checked={form.how === "berdua"}
                              onChange={() => setForm({ ...form, how: "berdua" })}
                            />
                            <span>{isEN ? "With Partner" : "Berdua"}</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {!form.attendance && !withoutNotAttendReason && (
                    <div className="reason-input">
                      <div className="label">
                        <p>{isEN ? "Why can't you attend?" : "Mengapa tidak dapat hadir?"}</p>
                      </div>
                      <textarea
                        rows={5}
                        value={form.notAttendReason}
                        onChange={(e) => setForm({ ...form, notAttendReason: e.target.value })}
                        placeholder={isEN ? "Write your message..." : "Tulis pesanmu..."}
                        maxLength={400}
                        data-testid="bara-rsvp-reason"
                      />
                    </div>
                  )}
                </div>

                {error && (
                  <div style={{ marginTop: "1.5rem", color: "red", fontFamily: "poppinsR" }}>
                    {error}
                  </div>
                )}

                <div className={`confirm-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "550ms" }}>
                  <button
                    type="submit"
                    name="bara-simple-button"
                    disabled={loading || !form.name.trim()}
                    data-testid="bara-rsvp-submit"
                  >
                    <div className="label"><p>{loading ? (isEN ? "Saving..." : "Menyimpan...") : (isEN ? "Confirm" : "Konfirmasi")}</p></div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="decorations">
        <div className={`top-left ${isVisible ? "animate-fade-in-right" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
          <img src="/themes/bara-simple/rsvp/decor-top-left.png" alt="decor-top-left" />
        </div>
        <div className={`top-right ${isVisible ? "animate-fade-in-left" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
          <img src="/themes/bara-simple/rsvp/decor-top-right.png" alt="decor-top-right" />
        </div>
      </div>
    </div>
  );
}
