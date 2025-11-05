import type { Def } from "@/modules/defs/api/types/dto";
import { DefsStats } from "@/modules/defs/components/elements/defs-stats/DefsStats";
import type { DeficitFilter } from "@/modules/defs/components/elements/defs-stats/DefsStatsView";
import { DefsGrid } from "@/modules/defs/components/lists/defs-grid/DefsGrid";
import { useState } from "react";

interface DefsContainerViewProps {
  defsData: Def;
}

export function DefsContainerView({ defsData }: DefsContainerViewProps) {
  const [activeFilter, setActiveFilter] = useState<DeficitFilter>("all");

  return (
    <div className="grid gap-2">
      <DefsStats defsData={defsData} onFilterChange={setActiveFilter} />
      <DefsGrid defsData={defsData} filter={activeFilter} />
    </div>
  );
}
