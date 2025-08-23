import type { RowDto } from "@/modules/rows/api/types/dto";
import { View } from "./GridView";
import { GridSkeleton } from "./skeleton";

interface GridProps {
  rows: RowDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
}

export function Grid({ rows, isPending, isFetching }: GridProps) {
  if (isPending) {
    return <GridSkeleton />;
  }

  return (
    <>
      <View rows={rows} isFetching={isFetching} />
    </>
  );
}
