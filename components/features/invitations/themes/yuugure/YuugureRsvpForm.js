"use client";

import { useEffect, useState, useRef } from "react";
import {
  createInvitationRsvp,
  getInvitationGuestRsvp,
} from "@/lib/api/invitations";

export default function YuugureRsvpForm({ invitation, guest }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rsvpChanging, setRsvpChanging] = useState(false);
  const [error, setError] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  const [form, setForm] = useState({
    name: guest?.name || "",
    attendance: null,
    how: 1, // 1 = Sendiri, 2 = Berdua
    notAttendReason: "",
  });

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
    let ignore = false;

    async function loadExistingRsvp() {
      if (!guest?.slug) return;

      const result = await getInvitationGuestRsvp(invitation.slug, guest.slug);
      if (!ignore && result.ok && result.data) {
        setForm({
          name: result.data.name || guest?.name || "",
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
  }, [invitation.slug, guest?.slug, guest?.name]);

  if (!guest) return null;

  const isGroup = Boolean(guest?.isGroup);
  const withoutNotAttendReason = invitation?.settings?.withoutNotAttendReason || false;

  const showHowAttendance = form.attendance === true;
  const showReasonInput = form.attendance === false;

  const formValidated = form.attendance !== null && (form.attendance === false || form.how !== 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValidated) return;

    setLoading(true);
    setError("");

    try {
      const result = await createInvitationRsvp(invitation.slug, {
        guestSlug: guest.slug,
        name: form.name,
        attendance: form.attendance,
        attendeeCount: form.attendance ? Number(form.how) : null,
        notAttendReason: form.attendance ? null : form.notAttendReason,
      });

      if (!result.ok) {
        setError(result.error || "RSVP gagal disimpan. Coba lagi.");
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
    <div name="rsvp-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div
            className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
            style={{ animationDelay: "250ms" }}
          >
            <p>R S V P</p>
          </div>

          {submitted && !rsvpChanging ? (
            <>
              <div className="desc rsvp-sent">
                <p>
                  Terimakasih {isGroup ? "member dari " : ""}
                  <span className="bold">{guest.name}</span>, telah mengisi kehadiran pada form ini. Apabila kamu ingin mengubah info kehadiranmu, silahkan klik tombol ‘ubah’ di bawah ini ya. Terimakasih
                </p>
              </div>
              <div className="change-button">
                <button
                  type="button"
                  name="yuugure-button"
                  className="yuugure-button"
                  onClick={() => setRsvpChanging(true)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="label">
                    <p>Ubah</p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div
                className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ animationDelay: "350ms" }}
              >
                <p>
                  Hallo! {isGroup ? "member dari " : ""}
                  <span className="bold">{guest.name}</span>, merupakan suatu kehormatan apabila kamu dapat hadir dalam acara pernikahan kami. Mohon bantuannya agar kami dapat mempersiapkan segala sesuatunya secara maksimal dengan mengisi form berikut :
                </p>
              </div>

              <div
                className={`rsvp-input-wrapper ${isVisible ? "animate-zoom-in" : "opacity-0"}`}
                style={{ width: "100%", animationDelay: "450ms" }}
              >
                <div className="rsvp-input-container">
                  <div className="group-member-input">
                    <div className="label">
                      <p>Nama</p>
                    </div>
                    <div name="input">
                      <div className="input-content">
                        <input
                          className="yuugure-input"
                          value={form.name}
                          onChange={isGroup ? (e) => setForm({ ...form, name: e.target.value }) : undefined}
                          placeholder="Masukkan Nama Kamu..."
                          data-testid="yuugure-rsvp-name"
                          readOnly={!isGroup}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group-member-input">
                    <div className="label">
                      <p>Konfirmasi Kehadiran</p>
                    </div>
                    <div name="radio" className="radio-group" style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="attendance"
                          checked={form.attendance === true}
                          onChange={() => setForm({ ...form, attendance: true })}
                        />
                        <span style={{ fontFamily: "poppinsR", fontSize: "1.25rem", color: "#64564C" }}>Hadir</span>
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="attendance"
                          checked={form.attendance === false}
                          onChange={() => setForm({ ...form, attendance: false })}
                        />
                        <span style={{ fontFamily: "poppinsR", fontSize: "1.25rem", color: "#64564C" }}>Tidak Hadir</span>
                      </label>
                    </div>
                  </div>

                  {showHowAttendance && (
                    <div className="group-member-input attendance-radio">
                      <div className="label">
                        <p>Apakah datang sendiri atau berdua?</p>
                      </div>
                      <div name="radio" className="radio-group" style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="how"
                            checked={form.how === 1}
                            onChange={() => setForm({ ...form, how: 1 })}
                          />
                          <span style={{ fontFamily: "poppinsR", fontSize: "1.25rem", color: "#64564C" }}>Sendiri</span>
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="how"
                            checked={form.how === 2}
                            onChange={() => setForm({ ...form, how: 2 })}
                          />
                          <span style={{ fontFamily: "poppinsR", fontSize: "1.25rem", color: "#64564C" }}>Berdua</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {showReasonInput && !withoutNotAttendReason && (
                  <div className="reason-input">
                    <div className="label">
                      <p>Mengapa tidak dapat hadir?</p>
                    </div>
                    <div name="input" className="textarea">
                      <div className="input-content">
                        <textarea
                          className="yuugure-input"
                          rows={isDesktop ? 5 : 8}
                          value={form.notAttendReason}
                          onChange={(e) => setForm({ ...form, notAttendReason: e.target.value })}
                          placeholder="Tulis pesanmu..."
                          maxLength={400}
                        />
                      </div>
                    </div>
                    <div className="message-counter">
                      <p>{form.notAttendReason.length} / 400</p>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div style={{ color: "red", marginTop: "1rem", fontFamily: "poppinsR" }}>{error}</div>
              )}

              {formValidated && (
                <div className="confirm-button" style={{ marginTop: "2rem" }}>
                  <button
                    type="submit"
                    name="yuugure-button"
                    className="yuugure-button"
                    disabled={loading}
                    style={{ cursor: "pointer" }}
                    data-testid="yuugure-rsvp-submit"
                  >
                    <div className="label">
                      <p>{loading ? "Menyimpan..." : "Konfirmasi"}</p>
                    </div>
                  </button>
                </div>
              )}
            </form>
          )}

          <div className="decor-container-back"></div>
        </div>
      </div>

      <div className="decorations">
        <div className="top-right">
          {isDesktop ? (
            <img
              className={isVisible ? "animate-fade-left" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yuugure/rsvp/decor-top-right.png"
              alt="decor-top-right"
            />
          ) : (
            <img
              className={isVisible ? "animate-fade-down" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yuugure/rsvp/mobile-decor-top-center.png"
              alt="mobile-decor-top-center"
            />
          )}
        </div>

        {isDesktop && (
          <div className="top-left">
            <img
              className={isVisible ? "animate-fade-right" : "opacity-0"}
              style={{ animationDelay: "1000ms" }}
              src="/themes/yuugure/rsvp/decor-top-left.png"
              alt="decor-top-left"
            />
          </div>
        )}
      </div>
    </div>
  );
}
