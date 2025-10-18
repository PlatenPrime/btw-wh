import type { RowDto } from "@/modules/rows/api/types";
import { RowContainerView } from "@/modules/rows/components/containers/row-container/RowContainerView";

interface RowContainerProps {
  row: RowDto;
}

export function RowContainer({ row }: RowContainerProps) {
  return <RowContainerView row={row} />;
}
