import type { PosResponse } from "@/modules/poses/api/types";
import { PosesByArtikulContainer as CommonPosesByArtikulContainer } from "@/modules/poses/components/containers/poses-by-artikul-container";
import { AskPos } from "@/modules/asks/components/containers/ask-poses-by-artikul-container/components/ask-pos/AskPos";

interface AskPosesByArtikulContainerViewProps {
  artikul: string;
  askId: string;
}

export function AskPosesByArtikulContainerView({
  artikul,
  askId,
}: AskPosesByArtikulContainerViewProps) {
  return (
    <CommonPosesByArtikulContainer
      artikul={artikul}
      renderPos={(pos: PosResponse) => <AskPos pos={pos} askId={askId} />}
    />
  );
}
