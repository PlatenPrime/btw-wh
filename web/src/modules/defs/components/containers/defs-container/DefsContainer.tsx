import type { Def } from "@/modules/defs/api/types";
import { DefsContainerView } from "@/modules/defs/components/containers/defs-container/DefsContainerView";

interface DefsContainerProps {
  defsData: Def;
}

export function DefsContainer({ defsData }: DefsContainerProps) {
  return <DefsContainerView defsData={defsData} />;
}
