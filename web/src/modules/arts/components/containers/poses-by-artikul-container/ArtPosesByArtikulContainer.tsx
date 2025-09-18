import type { PosResponse } from "@/modules/poses/api/types";
import { PosesByArtikulContainer as CommonPosesByArtikulContainer } from "@/modules/poses/components/containers/poses-by-artikul-container";
import { PalletLink } from "./components/pallet-link/PalletLink";

interface ArtPosesByArtikulContainerProps {
  artikul: string;
}

export function ArtPosesByArtikulContainer({
  artikul,
}: ArtPosesByArtikulContainerProps) {
  return (
    <CommonPosesByArtikulContainer
      artikul={artikul}
      renderPos={(pos: PosResponse) => <PalletLink pos={pos} />}
    />
  );
}
