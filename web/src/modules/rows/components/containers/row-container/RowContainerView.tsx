import { useRegisterHeaderAction } from "@/components/layout/header-actions";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";
import { PalletsList } from "@/modules/pallets/components/lists/pallets-list/PalletsList";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { Grid3x3, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface RowContainerViewProps {
  row: RowDto;
}

export function RowContainerView({ row }: RowContainerViewProps) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleRowDeleted = () => {
    navigate("/wh/rows");
  };

  // Регистрируем действие удаления в header меню
  useRegisterHeaderAction({
    id: "delete-row",
    label: "Видалити ряд",
    icon: Trash2Icon,
    variant: "super-destructive",
    onClick: () => setDeleteDialogOpen(true),
  });

  return (
    <div className="grid gap-2">
      {/* Header */}
      <Wrapper className="flex items-start justify-between">
        <p className="flex h-full items-center gap-2">
          <Grid3x3 className="h-4 w-4" /> {row.pallets.length}
        </p>
        <CreatePalletDialog row={row} />
      </Wrapper>

      <PalletsList pallets={row.pallets} rowId={row._id} />

      {/* Dialog вне dropdown для избежания конфликта фокуса */}
      <DeleteRowDialog
        row={row}
        onSuccess={handleRowDeleted}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
}
