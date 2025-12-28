import type { Def } from "@/modules/defs/api/types/dto";
import type { DeficitFilter } from "@/modules/defs/components/elements/defs-stats/DefsStatsView";
import { DefsGridView } from "./DefsGridView";

interface DefsGridProps {
  defsData: Def;
  filter: DeficitFilter;
}

export function DefsGrid({ defsData, filter }: DefsGridProps) {
  return <DefsGridView defsData={defsData} filter={filter} />;
}
