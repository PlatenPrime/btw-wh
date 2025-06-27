import type { ArtDto } from "@/modules/arts/types/dto";
import { GridSkeleton } from "./skeleton";
import { View } from "./view";

interface GridProps {
  arts: ArtDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
}

export function Grid({ arts, isPending, isFetching }: GridProps) {
  if (isPending) {
    return <GridSkeleton />;
  }

  return <View arts={arts} isFetching={isFetching} />;
}
