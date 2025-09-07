import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtContainerView } from "./ArtContainerView";

interface ArtContainerProps {
  artData: ArtDto;
}

export function ArtContainer({ artData }: ArtContainerProps) {
  return <ArtContainerView artData={artData} />;
}
