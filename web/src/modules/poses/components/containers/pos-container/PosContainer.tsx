import type { IPos } from "@/modules/poses/api/types";
import { PosContainerView } from "@/modules/poses/components/containers/pos-container/PosContainerView.tsx";

interface PosContainerProps {
  pos: IPos;
}

export function PosContainer({ pos }: PosContainerProps) {
  return <PosContainerView pos={pos} />;
}
