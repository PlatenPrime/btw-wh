import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { AsksHeaderActions } from "@/modules/asks/components/actions/asks-header-actions";
import { addDays, subDays } from "@/modules/asks/utils/format-date";
import { AsksContainerView } from "./AsksContainerView";

interface AsksContainerProps {
  data: GetAsksByDateResponse;
  isFetching: boolean;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function AsksContainer({
  data,
  isFetching,
  selectedDate,
  setSelectedDate,
  refreshing,
  onRefresh,
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
    <>
      <AsksHeaderActions />
      <AsksContainerView
        selectedDate={selectedDate}
        data={data}
        isFetching={isFetching}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onDateSelect={handleDateSelect}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
}
