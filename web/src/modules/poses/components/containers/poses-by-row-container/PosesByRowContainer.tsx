import type { IPos } from "@/modules/poses/api/types";
import { PosesByRowContainerView } from "@/modules/poses/components/containers/poses-by-row-container/PosesByRowContainerView.tsx";

interface PosesByRowContainerProps {
  poses: IPos[];
}

export function PosesByRowContainer({ poses }: PosesByRowContainerProps) {
  return <PosesByRowContainerView poses={poses} />;
}
