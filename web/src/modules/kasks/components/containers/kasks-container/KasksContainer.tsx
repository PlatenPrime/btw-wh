import type { GetKasksByDateResponse } from "@/modules/kasks/api/types/dto";
import { KasksContainerView } from "@/modules/kasks/components/containers/kasks-container/KasksContainerView";
import { addDays, subDays } from "date-fns";

interface KasksContainerProps {
  data: GetKasksByDateResponse;
  isFetching: boolean;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function KasksContainer({
  data,
  isFetching,
  selectedDate,
  setSelectedDate,
}: KasksContainerProps) {
  return (
    <KasksContainerView
      selectedDate={selectedDate}
      data={data}
      isFetching={isFetching}
      onPreviousDay={() => setSelectedDate((d) => subDays(d, 1))}
      onNextDay={() => setSelectedDate((d) => addDays(d, 1))}
      onDateSelect={(date) => date && setSelectedDate(date)}
    />
  );
}
