import type { ProdDto } from "@/modules/prods/api/types";
import { DeleteProdDialog } from "@/modules/prods/components/dialogs/delete-prod-dialog/DeleteProdDialog";
import { UpdateProdDialog } from "@/modules/prods/components/dialogs/update-prod-dialog/UpdateProdDialog";

interface ProdDetailHeaderActionsViewProps {
  prod: ProdDto;
  updateDialogOpen: boolean;
  onUpdateDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function ProdDetailHeaderActionsView({
  prod,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: ProdDetailHeaderActionsViewProps) {
  return (
    <>
      <UpdateProdDialog
        prod={prod}
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
      />

      <DeleteProdDialog
        prod={prod}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
