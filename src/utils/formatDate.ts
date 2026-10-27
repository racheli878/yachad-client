
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
  // return `${fullDate} · ${time}`;
};

export const toDateTimeLocal = (iso: string | null): string => {
    if (!iso) return "";

    const date = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const formatMonthYear = (dateString: string): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("he-IL", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jerusalem",
  }).format(date).replace(" ", ", ");
};

export const formatDayDate = (dateString: string): string => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("he-IL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "Asia/Jerusalem"
    }).format(date);
};
export const formatDay = (dateString: string | null): string => {
    if (!dateString) return "";

    return new Intl.DateTimeFormat("he-IL", {
        day: "numeric",
        timeZone: "Asia/Jerusalem"
    }).format(new Date(dateString));
};

export const formatMonth = (dateString: string | null): string => {
    if (!dateString) return "";

    return new Intl.DateTimeFormat("he-IL", {
        month: "short",
        timeZone: "Asia/Jerusalem"
    }).format(new Date(dateString));
};