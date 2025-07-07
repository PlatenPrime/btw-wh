import type { RowDto } from "@/modules/rows/types/dto";
import { GridSkeleton } from "./skeleton";
import { View } from "./view";

interface GridProps {
  rows: RowDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
  onRowUpdated?: () => void;
}

export function Grid({ rows, isPending, isFetching, onRowUpdated }: GridProps) {
  if (isPending) {
    return <GridSkeleton />;
  }

  return (
    <>

      <View rows={rows} isFetching={isFetching} onRowUpdated={onRowUpdated} />
    </>
  );
}
