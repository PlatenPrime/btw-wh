import { ArtPosesByArtikulContainerView } from "@/modules/arts/components/containers/poses-by-artikul-container/ArtPosesByArtikulContainerView";

interface ArtPosesByArtikulContainerProps {
  artikul: string;
}

export function ArtPosesByArtikulContainer({
  artikul,
}: ArtPosesByArtikulContainerProps) {
  return <ArtPosesByArtikulContainerView artikul={artikul} />;
}
