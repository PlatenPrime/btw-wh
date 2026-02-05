import { PalletsList } from "@/modules/pallets/components/lists/pallets-list/PalletsList";
import type { RowDto } from "@/modules/rows/api/types/dto";

interface RowContainerViewProps {
  row: RowDto;
}

export function RowContainerView({ row }: RowContainerViewProps) {
  return (
    <div className="grid gap-2">
      <PalletsList pallets={row.pallets} rowId={row._id} />
    </div>
  );
}
