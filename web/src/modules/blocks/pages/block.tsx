import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { useState, useRef } from "react";
import { useParams } from "react-router";
import { BlockFetcher } from "@/modules/blocks/components/fetchers/block-fetcher";
import {
  BlockContainer,
  BlockContainerSkeleton,
} from "@/modules/blocks/components/containers/block-container";
import { AddZonesToBlockDialog } from "@/modules/blocks/components/dialogs/add-zones-to-block-dialog";
import { BlockControlPanel } from "@/modules/blocks/components/controls/block-control-panel";
import { useBlockQuery } from "@/modules/blocks/api/hooks/queries/useBlockQuery";

export function BlockPage() {
  const { id } = useParams<{ id: string }>();
  const [addZonesDialogOpen, setAddZonesDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveHandlerRef = useRef<(() => Promise<void>) | null>(null);
  const cancelHandlerRef = useRef<(() => void) | null>(null);
  const { data: blockData } = useBlockQuery({ id: id ?? "", enabled: !!id });

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

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Блок не знайдено">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            ID блоку не вказано
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout
      headerText={blockData?.data ? `Блок ${blockData.data.title}` : "Блок"}
    >
      <main className="p-2">
        <div className="grid gap-2">
          {blockData?.data && (
            <BlockControlPanel
              isEditMode={isEditMode}
              onAddZones={() => setAddZonesDialogOpen(true)}
              onEdit={() => setIsEditMode(true)}
              onCancel={handleCancel}
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}

          <BlockFetcher
            blockId={id}
            ContainerComponent={({ block }) => (
              <BlockContainer
                block={block}
                isEditMode={isEditMode}
                onEditModeChange={setIsEditMode}
                onSaveReady={handleSaveReady}
              />
            )}
            SkeletonComponent={BlockContainerSkeleton}
          />

          {blockData?.data && (
            <AddZonesToBlockDialog
              open={addZonesDialogOpen}
              onOpenChange={setAddZonesDialogOpen}
              block={blockData.data}
            />
          )}
        </div>
      </main>
    </SidebarInsetLayout>
  );
}

