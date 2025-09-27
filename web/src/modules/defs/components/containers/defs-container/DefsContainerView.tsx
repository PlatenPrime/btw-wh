import type { Defcalc } from "@/modules/defs/api/types/dto";
import { DefsStats } from "@/modules/defs/components/elements/defs-stats/DefsStats";
import { DefsGrid } from "@/modules/defs/components/lists/defs-grid/DefsGrid";

interface DefsContainerViewProps {
  defsData: Defcalc;
}

export function DefsContainerView({ defsData }: DefsContainerViewProps) {
  return (
    <div className="space-y-6">
      {/* Statistics */}
      <DefsStats defsData={defsData} />

      {/* Defs grid */}
      <DefsGrid defsData={defsData} />
    </div>
  );
}
