import { Container } from "@/components/shared/container";
import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";
import { PalletsList } from "@/modules/pallets/components/lists/pallets-list/PalletsList";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { useNavigate } from "react-router";

interface RowContainerViewProps {
  row: RowDto;
}

export function RowContainerView({ row }: RowContainerViewProps) {
  const navigate = useNavigate();

  const handleRowDeleted = () => {
    navigate("/wh/rows");
  };

  return (
    <div className="grid gap-2">
      {/* Header */}
      <Container className="flex items-start justify-between">
        <CreatePalletDialog row={row} />
        <DeleteRowDialog row={row} onSuccess={handleRowDeleted} />
      </Container>

      <PalletsList pallets={row.pallets} rowId={row._id} />
    </div>
  );
}
