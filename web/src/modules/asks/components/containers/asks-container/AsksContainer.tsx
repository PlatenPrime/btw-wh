import { type GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { addDays, subDays } from "date-fns";
import { AsksContainerView } from "@/modules/asks/components/containers/asks-container/AsksContainerView.tsx";

interface AsksContainerProps {
  data: GetAsksByDateResponse;
  isFetching: boolean;
  selectedDate: Date;
  setDate: (date: Date) => void;
}

export function AsksContainer({
  data,
  isFetching,
  selectedDate,
  setDate,
}: AsksContainerProps) {
  const handlePreviousDay = () => {
    setDate(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    setDate(addDays(selectedDate, 1));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
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
