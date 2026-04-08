import { format, parseISO } from "date-fns";

export const formatExamDate = (dateString) => {
  if (!dateString) return "";

  const date = parseISO(dateString);

  // dd/MM -> اليوم والشهر أرقام
  // hh:mm -> الساعات (12 ساعة) والدقائق
  // a -> لعرض am أو pm
  return format(date, "dd/MM, hh:mm a");
};

// مثال: "2026-04-08T22:46" هتظهر -> 08/04, 10:46 PM
