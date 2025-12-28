import type { Def } from "@/modules/defs/api/types/dto";
import { DefsContainerView } from "./DefsContainerView";

interface DefsContainerProps {
  defsData: Def;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function DefsContainer({
  defsData,
  refreshing,
  onRefresh,
}: DefsContainerProps) {
  return (
    <DefsContainerView
      defsData={defsData}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}
