import type { IPos } from "@/modules/poses/api/types";
import { PosContainerView } from "./PosContainerView";

interface PosContainerProps {
  pos: IPos;
}

export function PosContainer({ pos }: PosContainerProps) {
  return <PosContainerView pos={pos} />;
}
