import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { ArtDto } from "../../types/dto";
import { GridSkeleton } from "./skeleton";
import { View } from "./view";

interface GridProps {
  arts: ArtDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
}

export function Grid({ arts, isPending, isFetching}: GridProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isPending) {
    return <GridSkeleton />;
  }

  return <View isMobile={isMobile} arts={arts} isFetching={isFetching} />;
}
