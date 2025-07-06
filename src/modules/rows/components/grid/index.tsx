import type { RowDto } from "@/modules/rows/types/dto";
import { GridSkeleton } from "./skeleton";
import { View } from "./view";

interface GridProps {
  rows: RowDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
}

export function Grid({ rows, isPending, isFetching }: GridProps) {
  if (isPending) {
    return <GridSkeleton />;
  }

  return <View rows={rows} isFetching={isFetching} />;
}
