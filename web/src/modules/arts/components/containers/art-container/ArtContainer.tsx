import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtHeaderActions } from "@/modules/arts/components/actions/art-header-actions";
import { ArtContainerView } from "@/modules/arts/components/containers/art-container/ArtContainerView";

interface ArtContainerProps {
  artData: ArtDto;
}

export function ArtContainer({ artData }: ArtContainerProps) {
  return (
    <>
      <ArtHeaderActions artData={artData} />
      <ArtContainerView artData={artData} />
    </>
  );
}
