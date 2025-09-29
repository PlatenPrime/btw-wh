import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";

interface DefsStatsViewProps {
  stats: {
    deficits: number;
    critical: number;
    nearLimit: number;
  };
}

export function DefsStatsView({ stats }: DefsStatsViewProps) {
  return (
    <Container className="flex gap-2">
      {/* Last calculation date */}{" "}
      <Card className="flex flex-row gap-2 p-2 text-sm">
        Дефіцитів:{" "}
        <span className="font-bold text-orange-600 dark:text-orange-400">
          {stats.deficits}
        </span>
      </Card>
      <Card className="flex flex-row gap-2 p-2 text-sm">
        Критичних:{" "}
        <span className="font-bold text-red-600 dark:text-red-400">
          {stats.critical}
        </span>
      </Card>
      <Card className="flex flex-row gap-2 p-2 text-sm">
        В ліміті:{" "}
        <span className="font-bold text-yellow-600 dark:text-yellow-400">
          {stats.nearLimit}
        </span>
      </Card>
    </Container>
  );
}
