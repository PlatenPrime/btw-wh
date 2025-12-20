import type { IPos } from "@/modules/poses/api/types";
import { PosesByPalletContainerView } from "./PosesByPalletContainerView";

interface PosesByPalletContainerProps {
  poses: IPos[] | undefined;
  isLoading: boolean;
}

export function PosesByPalletContainer({
  poses,
  isLoading,
}: PosesByPalletContainerProps) {
  return (
    <PosesByPalletContainerView poses={poses} isLoading={isLoading} />
  );
}

