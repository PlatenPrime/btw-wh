import type { RowDto } from "@/modules/rows/api/types/dto";
import { GridSkeleton } from "./skeleton";
import { View } from "./GridView";
import type { RowsRefetch } from "@/modules/rows/api/types/types";

interface GridProps {
  rows: RowDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
  refetch: RowsRefetch;
}

export function Grid({ rows, isPending, isFetching, refetch }: GridProps) {
  if (isPending) {
    return <GridSkeleton />;
  }

  return (
    <>
      <View rows={rows} isFetching={isFetching} refetch={refetch} />
    </>
  );
}
