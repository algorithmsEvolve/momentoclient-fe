import Image from "next/image";
import { formatInvitationDate, formatInvitationDay, formatInvitationTime } from "@/lib/invitations/date";

export default function BotanDateSection({ invitation }) {
  const akad = invitation?.opening?.akad;
  const reception = invitation?.opening?.reception;

  // Extract day, date, month, year from full date string for custom formatting
  const getParts = (dateString) => {
    if (!dateString) return null;
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return null;

    const day = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(dateObj);
    const date = new Intl.DateTimeFormat("id-ID", { day: "2-digit" }).format(dateObj);
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(dateObj);
    const year = new Intl.DateTimeFormat("id-ID", { year: "numeric" }).format(dateObj);

    return { day, date, month, year };
  };

  const akadDate = getParts(akad?.date);
  const receptionDate = getParts(reception?.date);

  return (
    <div id="time" name="date-section">
      <div className="content">
        <div className="view-content">
          {akadDate && (
            <div className="akad">
              <div className="date-icon">
                <img src="/themes/botan/date/date-icon.svg" alt="date-icon" />
              </div>
              <div className="title">
                <p>{akad?.title || "Akad Nikah"}</p>
              </div>
              <div className="date">
                <div className="day">
                  <p>{akadDate.day}</p>
                </div>
                <div className="month">
                  <div className="month-number">
                    <p>{akadDate.date}</p>
                  </div>
                  <div className="month-name">
                    <p>{akadDate.month}</p>
                  </div>
                </div>
                <div className="year">
                  <p>{akadDate.year}</p>
                </div>
              </div>
              {akad?.startTime && (
                <div className="time">
                  <p>
                    {formatInvitationTime(akad.startTime)}
                    {akad.endTime && ` - ${formatInvitationTime(akad.endTime)}`}
                  </p>
                </div>
              )}
            </div>
          )}

          {receptionDate && (
            <div className="reception">
              <div className="title">
                <p>{reception?.title || "Resepsi"}</p>
              </div>
              <div className="date">
                <div className="day">
                  <p>{receptionDate.day}</p>
                </div>
                <div className="month">
                  <div className="month-number">
                    <p>{receptionDate.date}</p>
                  </div>
                  <div className="month-name">
                    <p>{receptionDate.month}</p>
                  </div>
                </div>
                <div className="year">
                  <p>{receptionDate.year}</p>
                </div>
              </div>
              {reception?.startTime && (
                <div className="time">
                  <p>
                    {formatInvitationTime(reception.startTime)}
                    {reception.endTime && ` - ${formatInvitationTime(reception.endTime)}`}
                  </p>
                </div>
              )}
              <div className="hidden md:block decorations">
                <div className="decor-top-left">
                  <img src="/themes/botan/date/decor-side.png" alt="decor-top-left" />
                </div>
                <div className="decor-top-right">
                  <img src="/themes/botan/date/decor-side.png" alt="decor-top-right" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden decorations">
        <div className="top-right">
          <img src="/themes/botan/date/mobile-decor-right.png" alt="decor-top-right" />
        </div>
      </div>
    </div>
  );
}

