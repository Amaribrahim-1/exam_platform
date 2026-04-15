import { format, parseISO } from "date-fns";

export const formatExamDate = (dateString) => {
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

// مثال: "2026-04-08T22:46" هتظهر -> 08/04, 10:46 PM

// const formatDateTime = (dateStr) => {
//   if (!dateStr) return "";

//   // 1. لو التاريخ جاي فيه مسافة (زي اللي طالع من الداتا بيز عندك)
//   // هنبدل المسافة بحرف T عشان المتصفح يفهمه
//   let formattedDate = dateStr.replace(" ", "T");

//   // 2. لو فيه +00 أو أي منطقة زمنية في الآخر، هنشيلها
//   // لأن datetime-local مش بيقبل timezone offsets
//   formattedDate = formattedDate.split("+")[0];

//   // 3. نأخد أول 16 حرف بس (YYYY-MM-DDTHH:mm)
//   return formattedDate.slice(0, 16);
// };
