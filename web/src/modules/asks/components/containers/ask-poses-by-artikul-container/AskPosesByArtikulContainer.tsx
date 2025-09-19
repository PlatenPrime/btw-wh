import type { PosResponse } from "@/modules/poses/api/types";
import { PosesByArtikulContainer as CommonPosesByArtikulContainer } from "@/modules/poses/components/containers/poses-by-artikul-container";
import { AskPos } from "./components/ask-pos/AskPos";

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
      renderPos={(pos: PosResponse) => <AskPos pos={pos} askId={askId} />}
    />
  );
}
