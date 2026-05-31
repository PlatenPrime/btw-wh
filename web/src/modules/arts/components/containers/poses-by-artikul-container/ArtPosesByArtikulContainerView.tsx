import type { PosResponse } from "@/modules/poses/api/types";
import { PosesByArtikulContainer as CommonPosesByArtikulContainer } from "@/modules/poses/components/containers/poses-by-artikul-container";
import { PalletLink } from "@/modules/arts/components/containers/poses-by-artikul-container/components/pallet-link/PalletLink";

interface ArtPosesByArtikulContainerViewProps {
  artikul: string;
}

export function ArtPosesByArtikulContainerView({
  artikul,
}: ArtPosesByArtikulContainerViewProps) {
  return (
    <CommonPosesByArtikulContainer
      artikul={artikul}
      renderPos={(pos: PosResponse) => <PalletLink pos={pos} />}
    />
  );
}
