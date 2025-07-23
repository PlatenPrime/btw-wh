import type { RowDto } from "@/modules/rows/api/types/dto";
import { View } from "./view";

interface GridCardProps {
  row: RowDto;
  onRowUpdated?: () => void;
}

export function GridCard({ row, onRowUpdated }: GridCardProps) {
  return <View row={row} onRowUpdated={onRowUpdated} />;
}
