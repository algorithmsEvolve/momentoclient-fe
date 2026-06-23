"use client";

import { useEffect, useState, useRef } from "react";
import {
  createInvitationRsvp,
  getInvitationGuestRsvp,
} from "@/lib/api/invitations";

export default function AozoraRsvpForm({ invitation, guest }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rsvpChanging, setRsvpChanging] = useState(false);
  const [error, setError] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  const [form, setForm] = useState({
    attendance: null,
    how: 1, // 1 = Sendiri, 2 = Berdua
    notAttendReason: "",
  });

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

  useEffect(() => {
    let ignore = false;

    async function loadExistingRsvp() {
      if (!guest?.slug) return;

      const result = await getInvitationGuestRsvp(invitation.slug, guest.slug);
      if (!ignore && result.ok && result.data) {
        setForm({
          attendance: result.data.attendance !== undefined ? Boolean(result.data.attendance) : null,
          how: result.data.attendeeCount === 2 ? 2 : 1,
          notAttendReason: result.data.notAttendReason || "",
        });
        setSubmitted(true);
      }
    }

    loadExistingRsvp();

    return () => {
      ignore = true;
    };
  }, [invitation.slug, guest?.slug]);

  if (!guest) return null;

  const showHowAttendance = form.attendance === true;
  const showReasonInput = form.attendance === false;
  const formValidated = form.attendance !== null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidated) return;

    setLoading(true);
    setError("");

    try {
      const result = await createInvitationRsvp(invitation.slug, {
        guestSlug: guest.slug,
        name: guest.name,
        attendance: form.attendance,
        attendeeCount: form.attendance ? Number(form.how) : null,
        notAttendReason: form.attendance ? null : form.notAttendReason,
      });

      if (!result.ok) {
        setError(result.error || "Gagal menyimpan konfirmasi kehadiran.");
        return;
      }

      setSubmitted(true);
      setRsvpChanging(false);
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      name="rsvp-section"
      ref={sectionRef}
    >
      <div className="content">
        <div className="view-content">
          <div className="title">
            <p>R S V P</p>
          </div>

          {submitted && !rsvpChanging ? (
            <>
              <div className="desc rsvp-sent">
                <p>
                  Terimakasih <span className="bold">{guest.name}</span>, telah mengisi kehadiran pada form ini. Apabila kamu ingin mengubah info kehadiranmu, silahkan klik tombol ‘ubah’ dibawah ini ya. Terimakasih
                </p>
              </div>

              <div className="change-button">
                <div
                  name="aozora-button"
                  onClick={() => setRsvpChanging(true)}
                  style={{ cursor: "pointer" }}
                  role="button"
                >
                  <div className="label">
                    <p>Ubah</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <div className="desc">
                <p>
                  Hallo! <span className="bold">{guest.name}</span>, merupakan suatu kehormatan apabila kamu dapat hadir dalam acara pernikahan kami. Mohon bantuannya agar kami dapat mempersiapkan segala sesuatunya secara maksimal dengan mengisi form berikut :
                </p>
              </div>

              <div className="rsvp-input-wrapper">
                <div className="rsvp-input-container">
                  {/* Attendance Radio */}
                  <div name="aozora-radio">
                    <div className="label">
                      <p>Kamu akan hadir ga nih?</p>
                    </div>
                    <div className="radios">
                      {[
                        { label: "Hadir", value: true },
                        { label: "Maaf, belum bisa hadir", value: false },
                      ].map((option) => (
                        <div
                          key={option.label}
                          className={`radio ${form.attendance === option.value ? "active" : ""}`}
                          onClick={() => setForm({ ...form, attendance: option.value })}
                        >
                          <div className="radio-circle">
                            <div className="radio-circle-inside"></div>
                          </div>
                          <div className="radio-text">
                            <p>{option.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How many attendees Radio */}
                  {showHowAttendance && (
                    <div name="aozora-radio" className="attendance-radio">
                      <div className="label">
                        <p>Sama siapa nih?</p>
                      </div>
                      <div className="radios">
                        {[
                          { label: "Sendiri", value: 1 },
                          { label: "Berdua", value: 2 },
                        ].map((option) => (
                          <div
                            key={option.label}
                            className={`radio ${form.how === option.value ? "active" : ""}`}
                            onClick={() => setForm({ ...form, how: option.value })}
                          >
                            <div className="radio-circle">
                              <div className="radio-circle-inside"></div>
                            </div>
                            <div className="radio-text">
                              <p>{option.label}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Not Attend Reason Textarea */}
                {showReasonInput && (
                  <div className="reason-input">
                    <div className="label">
                      <p>Mengapa tidak dapat hadir?</p>
                    </div>

                    <div name="input" className="textarea">
                      <div className="input-content">
                        <textarea
                          rows={isDesktop ? 5 : 8}
                          placeholder="Tulis pesanmu..."
                          value={form.notAttendReason}
                          onChange={(e) => setForm({ ...form, notAttendReason: e.target.value })}
                          maxLength={300}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div style={{ color: "red", marginTop: "1rem", textAlign: "center", fontFamily: "poppinsR" }}>
                  {error}
                </div>
              )}

              {formValidated && (
                <div className="confirm-button">
                  <button
                    type="submit"
                    style={{ border: "none", background: "none", padding: 0, cursor: "pointer", width: "auto" }}
                    disabled={loading}
                    data-testid="aozora-rsvp-submit"
                  >
                    <div name="aozora-button" className={loading ? "loading" : ""}>
                      <div className="label">
                        <p>{loading ? "Memproses..." : "Konfirmasi"}</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className="top">
          {isDesktop ? (
            <img src="/themes/aozora/rsvp/decor-top.png" alt="decor-top" />
          ) : (
            <img src="/themes/aozora/rsvp/mobile-decor-top.png" alt="mobile-decor-top" />
          )}
        </div>
      </div>
    </div>
  );
}
