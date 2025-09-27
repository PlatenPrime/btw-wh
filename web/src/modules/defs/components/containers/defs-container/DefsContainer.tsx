import type { Defcalc } from "@/modules/defs/api/types/dto";
import { DefsContainerView } from "@/modules/defs/components/containers/defs-container/DefsContainerView";

interface DefsContainerProps {
  defsData: Defcalc;
}

export function DefsContainer({ defsData }: DefsContainerProps) {
  return <DefsContainerView defsData={defsData} />;
}
