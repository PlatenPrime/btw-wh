import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { uk } from "date-fns/locale";

export const formatDisplayDate = (date: Date) => {
  return format(date, "EEEE, d MMMM yyyy", { locale: uk });
};

export const getDateLabel = (date: Date) => {
  if (isToday(date)) return "Сьогодні";
  if (isYesterday(date)) return "Вчора";
  if (isTomorrow(date)) return "Завтра";
  return formatDisplayDate(date);
};
