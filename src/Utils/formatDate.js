import { format, parseISO } from "date-fns";

export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = parseISO(dateString);

  // dd/MM -> اليوم والشهر أرقام
  // hh:mm -> الساعات (12 ساعة) والدقائق
  // a -> لعرض am أو pm
  return format(date, "dd/MM, hh:mm a");
};

export const formatTime = (duration) => {
  if (duration === 0) return "";

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h:${minutes}m:00`;
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};
