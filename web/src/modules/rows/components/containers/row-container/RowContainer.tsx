import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowHeaderActions } from "@/modules/rows/components/actions/row-header-actions";
import { RowContainerView } from "@/modules/rows/components/containers/row-container/RowContainerView";

interface RowContainerProps {
  row: RowDto;
}

export function RowContainer({ row }: RowContainerProps) {
  return (
    <>
      <RowHeaderActions row={row} />
      <RowContainerView row={row} />
    </>
  );
}
