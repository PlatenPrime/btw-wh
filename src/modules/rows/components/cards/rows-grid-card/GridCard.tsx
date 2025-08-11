import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowsRefetch } from "@/modules/rows/api/types/types";
import { View } from "./GridView";

interface GridCardProps {
  row: RowDto;
  refetch: RowsRefetch;
}

export function GridCard({ row, refetch }: GridCardProps) {
  return <View row={row} refetch={refetch} />;
}
