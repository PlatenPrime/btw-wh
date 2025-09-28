import { Container } from "@/components/shared/container";
import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { Card } from "@/components/ui/card";
import type { Defcalc } from "@/modules/defs/api/types/dto";

interface DefsStatsViewProps {
  defsData: Defcalc;
  stats: {
    deficits: number;
    critical: number;
    nearLimit: number;
  };
}

export function DefsStatsView({ defsData, stats }: DefsStatsViewProps) {
  return (
    <Container className="flex">
      {/* Last calculation date */}
      <Card className="justify-start gap-2 p-2 text-sm">
        {" "}
        <CalendarDate date={defsData.createdAt} />
        <p className="">
          Дефіцитів:{" "}
          <span className="font-bold text-orange-600 dark:text-orange-400">
            {stats.deficits}
          </span>
        </p>
        <p className="">
          Критичних:{" "}
          <span className="font-bold text-red-600 dark:text-red-400">
            {stats.critical}
          </span>
        </p>
        <p className="">
          В ліміті:{" "}
          <span className="font-bold text-yellow-600 dark:text-yellow-400">
            {stats.nearLimit}
          </span>
        </p>
      </Card>
    </Container>
  );
}
