import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtContainerView } from "@/modules/arts/components/containers/art-container/ArtContainerView.tsx";

interface ArtContainerProps {
  artData: ArtDto;
}

export function ArtContainer({ artData }: ArtContainerProps) {
  return <ArtContainerView artData={artData} />;
}
