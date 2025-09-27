import type { Defcalc } from "@/modules/defs/api/types/dto";
import { DefsGridView } from "@/modules/defs/components/lists/defs-grid/DefsGridView";

interface DefsGridProps {
  defsData: Defcalc;
}

export function DefsGrid({ defsData }: DefsGridProps) {
  return <DefsGridView defsData={defsData} />;
}
