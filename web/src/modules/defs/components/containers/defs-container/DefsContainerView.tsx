import type { Defcalc, DeficitItem } from "@/modules/defs/api/types/dto";
import { DefsStats } from "@/modules/defs/components/elements/defs-stats/DefsStats";
import type { DeficitFilter } from "@/modules/defs/components/elements/defs-stats/DefsStatsView";
import { DefsGrid } from "@/modules/defs/components/lists/defs-grid/DefsGrid";
import { useMemo, useState } from "react";

interface DefsContainerViewProps {
  defsData: Defcalc;
}

// Fallback функция для определения статуса дефицита
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

export function DefsContainerView({ defsData }: DefsContainerViewProps) {
  const [activeFilter, setActiveFilter] = useState<DeficitFilter>("all");

  const filteredCount = useMemo(() => {
    if (activeFilter === "all") return defsData.total;

    const result = Object.values(defsData.result);
    return result.filter((item) => getDeficitStatus(item) === activeFilter)
      .length;
  }, [defsData, activeFilter]);

  return (
    <div className="grid gap-2">
      <DefsStats defsData={defsData} onFilterChange={setActiveFilter} />
      {filteredCount > 0 && (
        <div className="text-muted-foreground px-2 text-sm">
          Показано {filteredCount} из {defsData.total} дефіцитів
        </div>
      )}
      <DefsGrid defsData={defsData} filter={activeFilter} />
    </div>
  );
}
