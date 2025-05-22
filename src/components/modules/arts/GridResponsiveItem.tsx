import { ArtListCard } from "./GridCard";
import { ArtListItem } from "./GridItem";
import type { Art } from "./types/types";

interface ArtListResponsiveItemProps {
  art: Art;
  isMobile: boolean;
}

export const ArtListResponsiveItem = ({
  art,
  isMobile,
}: ArtListResponsiveItemProps) =>
  isMobile ? <ArtListItem art={art} /> : <ArtListCard art={art} />;
