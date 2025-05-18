import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ArtListCard } from "./artListCard";
import { ArtListItem } from "./artListItem";
import type { Art } from "./types/types";

export const ArtListResponsiveItem = ({ art }: { art: Art }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile ? <ArtListItem art={art} /> : <ArtListCard art={art} />;
};