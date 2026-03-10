import { DateNavigation } from "@/components/shared/date-navigation/DateNavigation";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { GetKasksByDateResponse } from "@/modules/kasks/api/types/dto";
import { KasksList } from "@/modules/kasks/components/lists/kasks-list/KasksList";

interface KasksContainerViewProps {
  selectedDate: Date;
  data: GetKasksByDateResponse;
  isFetching: boolean;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect: (date: Date | undefined) => void;
}

export function KasksContainerView({
  selectedDate,
  data,
  isFetching,
  onPreviousDay,
  onNextDay,
  onDateSelect,
}: KasksContainerViewProps) {
  return (
    <div className="grid gap-2">
      <Wrapper className="flex flex-wrap items-center justify-between gap-2">
        <DateNavigation
          selectedDate={selectedDate}
          onPreviousDay={onPreviousDay}
          onNextDay={onNextDay}
          onDateSelect={onDateSelect}
        />
        <p className="text-muted-foreground text-sm">Всього: {data.count}</p>
      </Wrapper>

      <Wrapper className={isFetching ? "opacity-50" : ""}>
        <KasksList kasks={data.data} />
      </Wrapper>
    </div>
  );
}
