import { AskPosesByArtikulContainerView } from "@/modules/asks/components/containers/ask-poses-by-artikul-container/AskPosesByArtikulContainerView";

interface AskPosesByArtikulContainerProps {
  artikul: string;
  askId: string;
}

export function AskPosesByArtikulContainer({
  artikul,
  askId,
}: AskPosesByArtikulContainerProps) {
  return <AskPosesByArtikulContainerView artikul={artikul} askId={askId} />;
}
