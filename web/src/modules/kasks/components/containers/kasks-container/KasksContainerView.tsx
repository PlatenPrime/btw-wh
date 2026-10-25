import { DateNavigation } from "@/components/shared/date/date-navigation/DateNavigation";
import { SurfaceSection } from "@/components/shared/layout";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { GetKasksByDateResponse } from "@/modules/kasks/api/types/dto";
import { KasksList } from "@/modules/kasks/components/lists/kasks-list/KasksList";
import { ListChecks } from "lucide-react";

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
    <div className="grid gap-3">
      <SurfaceSection className="flex flex-wrap items-center justify-between gap-2">
        <DateNavigation
          selectedDate={selectedDate}
          onPreviousDay={onPreviousDay}
          onNextDay={onNextDay}
          onDateSelect={onDateSelect}
        />
        <p
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-2.5 py-1",
            typography.caption,
          )}
          style={{
            borderColor:
              "color-mix(in oklch, var(--chart-6) 30%, var(--border))",
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--chart-6) 16%, transparent), color-mix(in oklch, var(--primary) 12%, transparent))",
            color: "var(--chart-6)",
          }}
        >
          <ListChecks className="size-3.5 shrink-0" aria-hidden />
          <span>Всього: {data.count}</span>
        </p>
      </SurfaceSection>

      <SurfaceSection className={isFetching ? "opacity-50" : undefined}>
        <KasksList kasks={data.data} />
      </SurfaceSection>
    </div>
  );
}
