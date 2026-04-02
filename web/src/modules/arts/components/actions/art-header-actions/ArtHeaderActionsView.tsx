import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtDialog } from "@/modules/arts/components/dialogs/update-art-dialog/UpdateArtDialog";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";

interface ArtHeaderActionsViewProps {
  artData: ArtDto;
  canEditArt: boolean;
  updateArtDialogOpen: boolean;
  onUpdateArtDialogOpenChange: (open: boolean) => void;
  createAskDialogOpen: boolean;
  onCreateAskDialogOpenChange: (open: boolean) => void;
}

export function ArtHeaderActionsView({
  artData,
  canEditArt,
  updateArtDialogOpen,
  onUpdateArtDialogOpenChange,
  createAskDialogOpen,
  onCreateAskDialogOpenChange,
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
      <CreateAskDialog
        preFilledArtikul={artData.artikul}
        open={createAskDialogOpen}
        onOpenChange={onCreateAskDialogOpenChange}
        showTrigger={false}
      />
    </>
  );
}

