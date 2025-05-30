import type { Art } from "../types/types";
import { ArtListCard } from "./GridCard";
import { ArtListItem } from "./GridItem";

interface ArtListResponsiveItemProps {
  art: Art;
  isMobile: boolean;
}

export const ArtListResponsiveItem = ({
  art,
  isMobile,
}: ArtListResponsiveItemProps) =>
  isMobile ? <ArtListItem art={art} /> : <ArtListCard art={art} />;
