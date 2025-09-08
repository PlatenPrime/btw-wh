import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletContainerView } from "./PalletContainerView";

interface PalletContainerProps {
  pallet: PalletResponse;
  onPosCreated?: () => void;
}

export function PalletContainer({
  pallet,
  onPosCreated,
}: PalletContainerProps) {
  return <PalletContainerView pallet={pallet} onPosCreated={onPosCreated} />;
}
