import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { AsksList } from "../../lists/asks-list/AsksList";
import { DateNavigation } from "./components/date-navigation/DateNavigation";

interface AsksContainerViewProps {
  selectedDate: Date;
  data: GetAsksByDateResponse;
  isFetching: boolean;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect: (date: Date | undefined) => void;
}

export function AsksContainerView({
  selectedDate,
  data,
  isFetching,
  onPreviousDay,
  onNextDay,
  onDateSelect,
}: AsksContainerViewProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <DateNavigation
          selectedDate={selectedDate}
          onPreviousDay={onPreviousDay}
          onNextDay={onNextDay}
          onDateSelect={onDateSelect}
        />
        <p className="text-foreground text-center">
          Всього:{" "}{data.count}
        </p>
      </div>
      <div className={isFetching ? "opacity-50" : ""}>
        <AsksList data={data} selectedDate={selectedDate} />
      </div>
    </div>
  );
}
