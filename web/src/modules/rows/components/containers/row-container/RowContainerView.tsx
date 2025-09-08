import { Separator } from "@/components/ui/separator";
import { PalletsByRowFetcher } from "@/modules/pallets/components/fetchers";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { useNavigate } from "react-router";

import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";

interface RowContainerViewProps {
  row: RowDto;
}

export function RowContainerView({ row }: RowContainerViewProps) {
  const navigate = useNavigate();

  const handleRowDeleted = () => {
    navigate("/wh/rows");
  };

  return (
    <div className="grid gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <CreatePalletDialog row={row} />
          <DeleteRowDialog row={row} onSuccess={handleRowDeleted} />
        </div>
      </div>

      <Separator />

      <PalletsByRowFetcher rowId={row._id} />
    </div>
  );
}
