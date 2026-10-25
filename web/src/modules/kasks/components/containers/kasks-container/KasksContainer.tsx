import type { GetKasksByDateResponse } from "@/modules/kasks/api/types/dto";
import { KasksContainerView } from "@/modules/kasks/components/containers/kasks-container/KasksContainerView";
import { addDays, subDays } from "date-fns";

interface KasksContainerProps {
  data: GetKasksByDateResponse;
  isFetching: boolean;
  selectedDate: Date;
  setDate: (date: Date) => void;
}

export function KasksContainer({
  data,
  isFetching,
  selectedDate,
  setDate,
}: KasksContainerProps) {
  return (
    <KasksContainerView
      selectedDate={selectedDate}
      data={data}
      isFetching={isFetching}
      onPreviousDay={() => setDate(subDays(selectedDate, 1))}
      onNextDay={() => setDate(addDays(selectedDate, 1))}
      onDateSelect={(date) => {
        if (date) setDate(date);
      }}
    />
  );
}
