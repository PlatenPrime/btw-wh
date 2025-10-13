import { Container } from "@/components/shared/containers/Container";
import { DateNavigation } from "@/components/shared/date-navigation/DateNavigation";
import { Button } from "@/components/ui/button";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { AsksList } from "@/modules/asks/components/lists/asks-list/AsksList";

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
    <main className="grid gap-2">
      <Container className="grid lg:grid-cols-2 gap-2">
        <DateNavigation
          selectedDate={selectedDate}
          onPreviousDay={onPreviousDay}
          onNextDay={onNextDay}
          onDateSelect={onDateSelect}
        />

        <div className="flex w-full items-center justify-between gap-2 ">
          <p className="text-foreground font-medium">{data.completedCount + data.rejectedCount}/{data.count}</p>
          <CreateAskDialog
            trigger={<Button variant="outline">+ Створити запит</Button>}
          />
        </div>
      </Container>

      <Container className={isFetching ? "opacity-50" : ""}>
        <AsksList data={data} selectedDate={selectedDate} />
      </Container>
    </main>
  );
}
