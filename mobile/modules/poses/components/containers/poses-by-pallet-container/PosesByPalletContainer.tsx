import type { IPos } from "@/modules/poses/api/types";
import { PosesByPalletContainerView } from "./PosesByPalletContainerView";

interface PosesByPalletContainerProps {
  poses: IPos[] | undefined;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function PosesByPalletContainer({
  poses,
  isLoading,
  refreshing,
  onRefresh,
}: PosesByPalletContainerProps) {
  return (
    <PosesByPalletContainerView
      poses={poses}
      isLoading={isLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

