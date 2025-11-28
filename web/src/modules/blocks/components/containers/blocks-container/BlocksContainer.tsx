import type { BlockDto } from "@/modules/blocks/api/types";
import { BlocksContainerView } from "@/modules/blocks/components/containers/blocks-container/BlocksContainerView";
import { useBlocksContainer } from "@/modules/blocks/components/containers/blocks-container/useBlocksContainer";
import { CreateBlockDialog } from "@/modules/blocks/components/dialogs/create-block-dialog/CreateBlockDialog";
import { DeleteBlockDialog } from "@/modules/blocks/components/dialogs/delete-block-dialog/DeleteBlockDialog";

interface BlocksContainerProps {
  data: BlockDto[];
}

export function BlocksContainer({ data }: BlocksContainerProps) {
  const {
    blocks,
    isEditMode,
    isSaving,
    isCreateDialogOpen,
    deleteDialogBlock,
    handleEnterEditMode,
    handleCancel,
    handleSave,
    handleDragEnd,
    handleDeleteRequest,
    setIsCreateDialogOpen,
    setDeleteDialogBlock,
  } = useBlocksContainer({ initialData: data });

  return (
    <>
      <BlocksContainerView
        blocks={blocks}
        isEditMode={isEditMode}
        isSaving={isSaving}
        onDragEnd={handleDragEnd}
        onDelete={handleDeleteRequest}
        onCreate={() => setIsCreateDialogOpen(true)}
        onEdit={handleEnterEditMode}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <CreateBlockDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      {deleteDialogBlock && (
        <DeleteBlockDialog
          block={deleteDialogBlock}
          open={Boolean(deleteDialogBlock)}
          onOpenChange={(open) => {
            if (!open) {
              setDeleteDialogBlock(null);
            }
          }}
        />
      )}
    </>
  );
}
