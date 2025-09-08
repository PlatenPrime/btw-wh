import type { IPos } from "@/modules/poses/api/types";
import { PosesByPalletContainerView } from "./PosesByPalletContainerView";

interface PosesByPalletContainerProps {
  poses: IPos[];
}

export function PosesByPalletContainer({ poses }: PosesByPalletContainerProps) {
  return <PosesByPalletContainerView poses={poses} />;
}
