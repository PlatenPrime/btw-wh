import { useAsksByDateQuery } from "@/modules/asks/api";
import { addDays, format, subDays } from "date-fns";
import { useState } from "react";
import { AskListView } from "./AskListView";

export function AskList() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Форматируем дату для API (YYYY-MM-DD)
  const dateString = format(selectedDate, "yyyy-MM-dd");

  const { data, isLoading, isFetching, error } = useAsksByDateQuery({
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

  return (
    <AskListView
      selectedDate={selectedDate}
      data={data}
      isLoading={isLoading}
      isFetching={isFetching}
      error={error}
      onPreviousDay={handlePreviousDay}
      onNextDay={handleNextDay}
      onDateSelect={handleDateSelect}
    />
  );
}
