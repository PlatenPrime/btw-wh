import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtLimitDialog } from "@/modules/arts/components/dialogs/update-art-limit-dialog/UpdateArtLimitDialog";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";

interface ArtHeaderActionsViewProps {
  artData: ArtDto;
  updateLimitDialogOpen: boolean;
  onUpdateLimitDialogOpenChange: (open: boolean) => void;
  createAskDialogOpen: boolean;
  onCreateAskDialogOpenChange: (open: boolean) => void;
}

export function ArtHeaderActionsView({
  artData,
  updateLimitDialogOpen,
  onUpdateLimitDialogOpenChange,
  createAskDialogOpen,
  onCreateAskDialogOpenChange,
}: ArtHeaderActionsViewProps) {
  return (
    <>
      <UpdateArtLimitDialog
        artData={artData}
        open={updateLimitDialogOpen}
        onOpenChange={onUpdateLimitDialogOpenChange}
      />
      <CreateAskDialog
        preFilledArtikul={artData.artikul}
        open={createAskDialogOpen}
        onOpenChange={onCreateAskDialogOpenChange}
        onSuccess={() => onCreateAskDialogOpenChange(false)}
      />
    </>
  );
}

