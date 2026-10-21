
export const formatDateSimple = (dateString: string): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Jerusalem",
  }).format(date);
};


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const israelDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jerusalem",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const today = israelDate.format(now);

  const tomorrowDate = new Date(now);
  tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);
  const tomorrow = israelDate.format(tomorrowDate);

  const eventDay = israelDate.format(date);

  const time = new Intl.DateTimeFormat("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Jerusalem",
  }).format(date);

  if (eventDay === today) return `היום · ${time}`;
  if (eventDay === tomorrow) return `מחר · ${time}`;

  const fullDate = new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Asia/Jerusalem",
  }).format(date);

  return `${fullDate} · ${time}`;
};