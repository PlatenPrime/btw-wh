import { Separator } from "@/components/ui/separator";
import { PalletList } from "@/modules/pallets/components/containers/pallet-list/PalletList";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog";
import { useNavigate } from "react-router";

import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";

interface ViewProps {
  row: RowDto;
}

export function RowDetailView({ row }: ViewProps) {
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

      <PalletList pallets={row.pallets} rowId={row._id} />
    </div>
  );
}
