import { Separator } from "@/components/ui/separator";
import { PalletList } from "@/modules/pallets/components/containers/pallet-list/PalletList";
import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowRefetch } from "@/modules/rows/api/types/types";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog";
import { useNavigate } from "react-router";

import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog";

interface ViewProps {
  row: RowDto;
  refetch: RowRefetch;
}

export function RowDetailView({ row, refetch }: ViewProps) {
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

      <PalletList pallets={row.pallets} refetch={refetch} rowId={row._id} />
    </div>
  );
}
