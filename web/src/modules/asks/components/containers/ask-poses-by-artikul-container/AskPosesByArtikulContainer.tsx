import type { PosResponse } from "@/modules/poses/api/types";
import { PosesByArtikulContainer as CommonPosesByArtikulContainer } from "@/modules/poses/components/containers/poses-by-artikul-container";
import { AskPosEditTrigger } from "./components/ask-pos-link/AskPosLink";

interface AskPosesByArtikulContainerProps {
  artikul: string;
  askId: string;
}

export function AskPosesByArtikulContainer({
  artikul,
  askId,
}: AskPosesByArtikulContainerProps) {
  return (
    <CommonPosesByArtikulContainer
      artikul={artikul}
      renderPos={(pos: PosResponse) => (
        <AskPosEditTrigger pos={pos} askId={askId} />
      )}
    />
  );
}
