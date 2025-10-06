import { Container } from "@/components/shared/containers/Container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DeficitFilter = "all" | "critical" | "limited";

interface DefsStatsViewProps {
  stats: {
    deficits: number;
    critical: number;
    nearLimit: number;
  };
  activeFilter: DeficitFilter;
  onFilterChange: (filter: DeficitFilter) => void;
}

export function DefsStatsView({
  stats,
  activeFilter,
  onFilterChange,
}: DefsStatsViewProps) {
  return (
    <Container className="flex flex-col gap-2 sm:flex-row">
      <Card
        className={cn(
          "flex cursor-pointer flex-row justify-between gap-2 p-2 py-1 text-sm transition-all duration-200 hover:shadow-md",
          activeFilter === "all" &&
            "bg-orange-50 ring-2 ring-orange-300 dark:bg-orange-950/20 dark:ring-orange-700",
        )}
        onClick={() => onFilterChange("all")}
      >
        Дефіцитів:{" "}
        <span className="font-bold text-orange-600 dark:text-orange-400">
          {stats.deficits}
        </span>
      </Card>
      <Card
        className={cn(
          "flex cursor-pointer flex-row justify-between gap-2 p-2 py-1 text-sm transition-all duration-200 hover:shadow-md",
          activeFilter === "critical" &&
            "bg-red-50 ring-2 ring-red-300 dark:bg-red-950/20 dark:ring-red-700",
        )}
        onClick={() => onFilterChange("critical")}
      >
        Критичних:{" "}
        <span className="font-bold text-red-600 dark:text-red-400">
          {stats.critical}
        </span>
      </Card>
      <Card
        className={cn(
          "flex cursor-pointer flex-row justify-between gap-2 p-2 py-1 text-sm transition-all duration-200 hover:shadow-md",
          activeFilter === "limited" &&
            "bg-yellow-50 ring-2 ring-yellow-300 dark:bg-yellow-950/20 dark:ring-yellow-700",
        )}
        onClick={() => onFilterChange("limited")}
      >
        В ліміті:{" "}
        <span className="font-bold text-yellow-600 dark:text-yellow-400">
          {stats.nearLimit}
        </span>
      </Card>
    </Container>
  );
}
