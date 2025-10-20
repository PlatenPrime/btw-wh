import type { Def, DeficitItem } from "@/modules/defs/api/types/dto";
import {
  DefsStatsView,
  type DeficitFilter,
} from "@/modules/defs/components/elements/defs-stats/DefsStatsView";
import { useMemo, useState } from "react";

interface DefsStatsProps {
  defsData: Def;
  onFilterChange: (filter: DeficitFilter) => void;
}

export function DefsStats({ defsData, onFilterChange }: DefsStatsProps) {
  const [activeFilter, setActiveFilter] = useState<DeficitFilter>("all");
  const stats = useMemo(() => {
    // Подсчитываем статистику на основе поля status для дополнительной надежности
    const result = Object.values(defsData.result);

    // Fallback функция для определения статуса
    const getDeficitStatus = (item: DeficitItem): "limited" | "critical" => {
      if (item.status) {
        return item.status;
      }
      if (item.sharikQuant <= item.quant) {
        return "critical";
      } else if (item.sharikQuant <= item.defLimit) {
        return "limited";
      }
      return "limited";
    };

    const criticalFromStatus = result.filter(
      (item) => getDeficitStatus(item) === "critical",
    ).length;
    const limitedFromStatus = result.filter(
      (item) => getDeficitStatus(item) === "limited",
    ).length;

    return {
      deficits: defsData.total,
      critical: defsData.totalCriticalDefs || criticalFromStatus,
      nearLimit: defsData.totalLimitDefs || limitedFromStatus,
    };
  }, [defsData]);

  const handleFilterChange = (filter: DeficitFilter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <DefsStatsView
      stats={stats}
      activeFilter={activeFilter}
      onFilterChange={handleFilterChange}
    />
  );
}
