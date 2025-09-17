import type { IPos } from "@/modules/poses/api/types";
import { PosesByPalletContainerView } from "@/modules/poses/components/containers/poses-by-pallet-container/PosesByPalletContainerView.tsx";

interface PosesByPalletContainerProps {
  poses: IPos[];
}

export function PosesByPalletContainer({ poses }: PosesByPalletContainerProps) {
  return <PosesByPalletContainerView poses={poses} />;
}
