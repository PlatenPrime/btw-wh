import type { Art } from "../../types/types";
import { GridItem } from "./GridItem";
import { GridCard } from "./GridCard";

interface ArtListResponsiveItemProps {
  art: Art;
  isMobile: boolean;
  isPending?: boolean;
}

export const GridResponsiveItem = ({
  art,
  isMobile,
  isPending = false,
}: ArtListResponsiveItemProps) =>
  isMobile ? <GridItem art={art} isPending={isPending} /> : <GridCard art={art} isPending={isPending} />;
