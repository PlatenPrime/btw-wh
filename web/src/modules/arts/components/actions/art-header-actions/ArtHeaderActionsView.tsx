import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtSalesExcelDialog } from "@/modules/arts/components/dialogs/art-sales-excel-dialog";
import { ArtStockExcelDialog } from "@/modules/arts/components/dialogs/art-stock-excel-dialog";
import { UpdateArtDialog } from "@/modules/arts/components/dialogs/update-art-dialog/UpdateArtDialog";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";

interface ArtHeaderActionsViewProps {
  artData: ArtDto;
  canEditArt: boolean;
  canExportExcel: boolean;
  updateArtDialogOpen: boolean;
  onUpdateArtDialogOpenChange: (open: boolean) => void;
  createAskDialogOpen: boolean;
  onCreateAskDialogOpenChange: (open: boolean) => void;
  stockExcelDialogOpen: boolean;
  onStockExcelDialogOpenChange: (open: boolean) => void;
  salesExcelDialogOpen: boolean;
  onSalesExcelDialogOpenChange: (open: boolean) => void;
}

export function ArtHeaderActionsView({
  artData,
  canEditArt,
  canExportExcel,
  updateArtDialogOpen,
  onUpdateArtDialogOpenChange,
  createAskDialogOpen,
  onCreateAskDialogOpenChange,
  stockExcelDialogOpen,
  onStockExcelDialogOpenChange,
  salesExcelDialogOpen,
  onSalesExcelDialogOpenChange,
}: ArtHeaderActionsViewProps) {
  return (
    <>
      {canEditArt && (
        <UpdateArtDialog
          artData={artData}
          open={updateArtDialogOpen}
          onOpenChange={onUpdateArtDialogOpenChange}
        />
      )}
      {canExportExcel ? (
        <>
          <ArtStockExcelDialog
            artikul={artData.artikul}
            open={stockExcelDialogOpen}
            onOpenChange={onStockExcelDialogOpenChange}
          />
          <ArtSalesExcelDialog
            artikul={artData.artikul}
            open={salesExcelDialogOpen}
            onOpenChange={onSalesExcelDialogOpenChange}
          />
        </>
      ) : null}
      <CreateAskDialog
        preFilledArtikul={artData.artikul}
        open={createAskDialogOpen}
        onOpenChange={onCreateAskDialogOpenChange}
        showTrigger={false}
      />
    </>
  );
}
