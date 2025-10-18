import type { Def } from "@/modules/defs/api/types";
import type { DeficitFilter } from "@/modules/defs/components/elements/defs-stats/DefsStatsView";
import { DefsGridView } from "@/modules/defs/components/lists/defs-grid/DefsGridView";

interface DefsGridProps {
  defsData: Def;
  filter: DeficitFilter;
}

export function DefsGrid({ defsData, filter }: DefsGridProps) {
  return <DefsGridView defsData={defsData} filter={filter} />;
}
