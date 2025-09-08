import type { IPos } from "@/modules/poses/api/types";
import { PosesByRowContainerView } from "./PosesByRowContainerView";

interface PosesByRowContainerProps {
  poses: IPos[];
}

export function PosesByRowContainer({ poses }: PosesByRowContainerProps) {
  return <PosesByRowContainerView poses={poses} />;
}
