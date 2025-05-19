import { ArtListCard } from "./artListCard";
import { ArtListItem } from "./artListItem";
import type { Art } from "./types/types";

interface ArtListResponsiveItemProps {
  art: Art;
  isMobile: boolean;
}

export const ArtListResponsiveItem = ({
  art,
  isMobile,
}: ArtListResponsiveItemProps) => {
  return isMobile ? <ArtListItem art={art} /> : <ArtListCard art={art} />;
};
