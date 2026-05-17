export function formatInvitationDate(dateString) {
  if (!dateString) return "-";

  return new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
    new Date(dateString)
  );
}

export function formatInvitationCoverDate(dateString) {
  if (!dateString) return "-";

  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return "-";

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear()).slice(-2);

  return `${day} . ${month} . ${year}`;
}

export function formatInvitationDay(dateString) {
  if (!dateString) return "-";

  return new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    new Date(dateString)
  );
}

export function formatInvitationTime(timeString) {
  if (!timeString) return "-";

  return timeString.slice(0, 5);
}

export function getCountdownParts(targetDate) {
  if (!targetDate) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}
