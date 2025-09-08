import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowContainerView } from "./RowContainerView";

interface RowContainerProps {
  row: RowDto;
}

export function RowContainer({ row }: RowContainerProps) {
  return <RowContainerView row={row} />;
}
