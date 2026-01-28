import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { PalletGroupsContainerView } from "@/modules/pallet-groups/components/containers/pallet-groups-container/PalletGroupsContainerView";
import { usePalletGroupsContainer } from "@/modules/pallet-groups/components/containers/pallet-groups-container/usePalletGroupsContainer";
import { CreatePalletGroupDialog } from "@/modules/pallet-groups/components/dialogs/create-pallet-group-dialog/CreatePalletGroupDialog";
import { DeletePalletGroupDialog } from "@/modules/pallet-groups/components/dialogs/delete-pallet-group-dialog/DeletePalletGroupDialog";
import { useState } from "react";

interface PalletGroupsContainerProps {
  data: PalletGroupDto[];
}

export function PalletGroupsContainer({ data }: PalletGroupsContainerProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<PalletGroupDto | null>(
    null,
  );

  const {
    groups,
    isEditMode,
    isSaving,
    handleEnterEditMode,
    handleCancel,
    handleSave,
    handleDragEnd,
  } = usePalletGroupsContainer({ initialData: data });

  return (
    <>
      <PalletGroupsContainerView
        groups={groups}
        isEditMode={isEditMode}
        isSaving={isSaving}
        onDragEnd={handleDragEnd}
        onCreate={() => setIsCreateDialogOpen(true)}
        onEdit={handleEnterEditMode}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <CreatePalletGroupDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      {groupToDelete && (
        <DeletePalletGroupDialog
          group={groupToDelete}
          open={Boolean(groupToDelete)}
          onOpenChange={(open) => {
            if (!open) {
              setGroupToDelete(null);
            }
          }}
        />
      )}
    </>
  );
}
