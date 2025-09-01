import { useAsksByDateQuery } from "@/modules/asks/api";
import { addDays, format, subDays } from "date-fns";
import { uk } from "date-fns/locale";
import { useState } from "react";
import { AskListView } from "./AskListView";

export function AskList() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Форматируем дату для API (YYYY-MM-DD)
  const dateString = format(selectedDate, "yyyy-MM-dd");

  const { data, isLoading, error } = useAsksByDateQuery({
    date: dateString,
  });

  const handlePreviousDay = () => {
    setSelectedDate((prev) => subDays(prev, 1));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => addDays(prev, 1));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatDisplayDate = (date: Date) => {
    return format(date, "EEEE, d MMMM yyyy", { locale: uk });
  };

  const isToday = (date: Date) => {
    return format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
  };

  const isYesterday = (date: Date) => {
    return (
      format(date, "yyyy-MM-dd") ===
      format(subDays(new Date(), 1), "yyyy-MM-dd")
    );
  };

  const isTomorrow = (date: Date) => {
    return (
      format(date, "yyyy-MM-dd") ===
      format(addDays(new Date(), 1), "yyyy-MM-dd")
    );
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Сьогодні";
    if (isYesterday(date)) return "Вчора";
    if (isTomorrow(date)) return "Завтра";
    return formatDisplayDate(date);
  };

  return (
    <AskListView
      selectedDate={selectedDate}
      data={data}
      isLoading={isLoading}
      error={error}
      onPreviousDay={handlePreviousDay}
      onNextDay={handleNextDay}
      onDateSelect={handleDateSelect}
      formatDisplayDate={formatDisplayDate}
      getDateLabel={getDateLabel}
      isToday={isToday}
    />
  );
}
