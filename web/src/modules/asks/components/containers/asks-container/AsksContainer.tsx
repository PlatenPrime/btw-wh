import { type GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { addDays, subDays } from "date-fns";
import { AsksContainerView } from "./AsksContainerView";

interface AsksContainerProps {
  data: GetAsksByDateResponse;
  isFetching: boolean;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
}

export function AsksContainer({
  data,
  isFetching,
  selectedDate,
  setSelectedDate,
}: AsksContainerProps) {
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
    <AsksContainerView
      selectedDate={selectedDate}
      data={data}
      isFetching={isFetching}
      onPreviousDay={handlePreviousDay}
      onNextDay={handleNextDay}
      onDateSelect={handleDateSelect}
    />
  );
}
