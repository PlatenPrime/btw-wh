import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { useState, useRef } from "react";
import { BlocksFetcher } from "@/modules/blocks/components/fetchers/blocks-fetcher";
import {
  BlocksContainer,
  BlocksContainerSkeleton,
} from "@/modules/blocks/components/containers/blocks-container";
import { CreateBlockDialog } from "@/modules/blocks/components/dialogs/create-block-dialog";
import { DeleteBlockDialog } from "@/modules/blocks/components/dialogs/delete-block-dialog";
import { BlocksControlPanel } from "@/modules/blocks/components/controls/blocks-control-panel";
import { useBlocksQuery } from "@/modules/blocks/api/hooks/queries/useBlocksQuery";
import type { BlockDto } from "@/modules/blocks/api/types";

export function BlocksPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<BlockDto | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveHandlerRef = useRef<(() => Promise<void>) | null>(null);
  const cancelHandlerRef = useRef<(() => void) | null>(null);
  const { data: blocksData } = useBlocksQuery();

  const handleDelete = (block: BlockDto) => {
    setSelectedBlock(block);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    if (saveHandlerRef.current) {
      setIsSaving(true);
      try {
        await saveHandlerRef.current();
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCancel = () => {
    if (cancelHandlerRef.current) {
      cancelHandlerRef.current();
    }
  };

  const handleSaveReady = (
    onSave: () => Promise<void>,
    onCancel: () => void
  ) => {
    saveHandlerRef.current = onSave;
    cancelHandlerRef.current = onCancel;
  };

  return (
    <SidebarInsetLayout headerText="Блоки">
      <div className="grid gap-2 p-2">
        {blocksData && (
          <BlocksControlPanel
            isEditMode={isEditMode}
            onCreate={() => setCreateDialogOpen(true)}
            onEdit={() => setIsEditMode(true)}
            onCancel={handleCancel}
            onSave={handleSave}
            isSaving={isSaving}
          />
        )}

        <BlocksFetcher
          ContainerComponent={({ data }) => (
            <BlocksContainer
              data={data}
              isEditMode={isEditMode}
              onEditModeChange={setIsEditMode}
              onSaveReady={handleSaveReady}
              onDelete={handleDelete}
            />
          )}
          SkeletonComponent={BlocksContainerSkeleton}
        />

        <CreateBlockDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />

        {selectedBlock && (
          <DeleteBlockDialog
            block={selectedBlock}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        )}
      </div>
    </SidebarInsetLayout>
  );
}

