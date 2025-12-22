import type { PosResponse } from "@/modules/poses/api/types";
import { PosesByArtikulContainer } from "@/modules/poses/components/containers/poses-by-artikul-container/PosesByArtikulContainer";
import { PalletLink } from "./components/pallet-link/PalletLink";

interface ArtPosesByArtikulContainerProps {
  artikul: string;
}

export function ArtPosesByArtikulContainer({
  artikul,
}: ArtPosesByArtikulContainerProps) {
  return (
    <PosesByArtikulContainer
      artikul={artikul}
      renderPos={(pos: PosResponse) => <PalletLink pos={pos} />}
    />
  );
}

