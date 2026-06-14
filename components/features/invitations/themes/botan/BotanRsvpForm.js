"use client";

import { useEffect, useState, useRef } from "react";
import {
  createInvitationRsvp,
  getInvitationGuestRsvp,
} from "@/lib/api/invitations";

export default function BotanRsvpForm({ invitation, guest }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
  const [rsvpChanging, setRsvpChanging] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: guest?.name || "",
    attendance: true,
    attendeeCount: guest?.maxAttendees || 1,
    notAttendReason: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadExistingRsvp() {
      if (!guest?.slug) return;

      const result = await getInvitationGuestRsvp(invitation.slug, guest.slug);
      if (!ignore && result.ok && result.data) {
        setForm({
          name: result.data.name || guest?.name || "",
          attendance: Boolean(result.data.attendance),
          attendeeCount: result.data.attendeeCount || guest?.maxAttendees || 1,
          notAttendReason: result.data.notAttendReason || "",
        });
      }
    }

    loadExistingRsvp();

    return () => {
      ignore = true;
    };
  }, [invitation.slug, guest?.slug, guest?.name, guest?.maxAttendees]);

  if (!guest) return null;

  const isGroup = Boolean(guest?.isGroup);
  const rsvpCaptionType = invitation?.settings?.rsvpCaptionType || 1;
  const eventTitle = invitation?.eventType === "wedding" ? "pernikahan" : "acara";
  const withoutNotAttendReason = invitation?.settings?.withoutNotAttendReason || false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await createInvitationRsvp(invitation.slug, {
        guestSlug: guest.slug,
        name: form.name,
        attendance: form.attendance,
        attendeeCount: form.attendance ? Number(form.attendeeCount || 1) : null,
        notAttendReason: form.attendance ? null : form.notAttendReason,
      });

      if (!result.ok) {
        setError(result.error || "RSVP gagal disimpan. Periksa input lalu coba lagi.");
        return;
      }

      setSubmitted(true);
      setRsvpChanging(false);
    } catch {
      setError("RSVP gagal disimpan. Periksa koneksi lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div name="rsvp-section" ref={sectionRef}>
      <div className="content">
        <div className="view-content">
          <div className={`title ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "250ms" }}>
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
                  name="botan-button"
                  className="botan-button botan-button--primary"
                  onClick={() => setRsvpChanging(true)}
                >
                  <div className="label"><p>Ubah</p></div>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`desc ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "350ms" }}>
                {rsvpCaptionType == 1 ? (
                  <p>
                    Bpk/ Ibu/ Sdr. {isGroup ? "member dari " : ""}
                    <span className="bold">{guest.name}</span>, merupakan suatu kehormatan apabila Bpk/ Ibu/ Sdr dapat hadir dalam acara engagement kami. Mohon bantuannya agar kami dapat mempersiapkan segala sesuatunya secara maksimal dengan mengisi form berikut :
                  </p>
                ) : (
                  <p>
                    Hallo! {isGroup ? "member dari " : ""}
                    <span className="bold">{guest.name}</span>, merupakan suatu kehormatan apabila kamu dapat hadir dalam acara {eventTitle} kami. Mohon bantuannya agar kami dapat mempersiapkan segala sesuatunya secara maksimal dengan mengisi form berikut :
                  </p>
                )}
              </div>

              <div className={`rsvp-input-wrapper ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ width: '100%', animationDelay: "450ms" }}>
                <div className="rsvp-input-container">
                  {isGroup && (
                    <div className="group-member-input">
                      <div className="label">
                        <p>Nama</p>
                      </div>
                      <div name="input">
                        <input
                          className="botan-input"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Masukkan Nama Kamu..."
                          data-testid="botan-rsvp-name"
                        />
                      </div>
                    </div>
                  )}

                  <div className="group-member-input">
                    <div className="label">
                      <p>Konfirmasi Kehadiran</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="radio"
                          name="attendance"
                          checked={form.attendance === true}
                          onChange={() => setForm({ ...form, attendance: true })}
                        />
                        <span style={{ fontFamily: 'poppinsR', fontSize: '1.25rem', color: '#66646F' }}>Hadir</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="radio"
                          name="attendance"
                          checked={form.attendance === false}
                          onChange={() => setForm({ ...form, attendance: false })}
                        />
                        <span style={{ fontFamily: 'poppinsR', fontSize: '1.25rem', color: '#66646F' }}>Tidak Hadir</span>
                      </label>
                    </div>
                  </div>

                  {form.attendance && isGroup && (
                    <div className="group-member-input">
                      <div className="label">
                        <p>Jumlah Hadir</p>
                      </div>
                      <div name="input">
                        <input
                          className="botan-input"
                          type="number"
                          min="1"
                          max={guest.maxAttendees || 10}
                          value={form.attendeeCount}
                          onChange={(e) => setForm({ ...form, attendeeCount: e.target.value })}
                          data-testid="botan-rsvp-attendee-count"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {!form.attendance && !withoutNotAttendReason && (
                  <div className="reason-input" style={{ position: 'relative' }}>
                    <div className="label">
                      <p>Mengapa tidak dapat hadir?</p>
                    </div>
                    <textarea
                      className="botan-input"
                      rows={5}
                      value={form.notAttendReason}
                      onChange={(e) => setForm({ ...form, notAttendReason: e.target.value })}
                      placeholder="Tulis pesanmu..."
                      maxLength={400}
                      data-testid="botan-rsvp-reason"
                    />
                    <div className="message-counter">
                      <p>{form.notAttendReason.length} / 400</p>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div style={{ marginTop: '1.5rem', color: 'red', fontFamily: 'poppinsR' }}>
                  {error}
                </div>
              )}

              <div className={`confirm-button ${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "550ms" }}>
                <button
                  type="submit"
                  name="botan-button"
                  className="botan-button botan-button--primary"
                  disabled={loading}
                  data-testid="botan-rsvp-submit"
                >
                  <div className="label"><p>{loading ? "Menyimpan..." : "Konfirmasi"}</p></div>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="decorations">
        <div className={`hidden md:block bottom-left ${isVisible ? "animate-fade-right" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
          <img src="/themes/botan/rsvp/decor-bottom-left.png" alt="decor-bottom-left" />
        </div>
        <div className={`hidden md:block bottom-right ${isVisible ? "animate-fade-left" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
          <img src="/themes/botan/rsvp/decor-bottom-right.png" alt="decor-bottom-right" />
        </div>
        <div className={`md:hidden top-right ${isVisible ? "animate-zoom-slide-from-right" : "opacity-0"}`} style={{ animationDelay: "1000ms" }}>
          <img src="/themes/botan/rsvp/mobile-decor-top-right.png" alt="decor-top-right" />
        </div>
      </div>
    </div>
  );
}

