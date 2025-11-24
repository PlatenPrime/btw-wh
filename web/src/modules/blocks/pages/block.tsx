import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { useState, useRef } from "react";
import { useParams } from "react-router";
import { SegmentsFetcher } from "@/modules/blocks/components/fetchers/segments-fetcher";
import {
  SegmentsContainer,
  SegmentsContainerSkeleton,
} from "@/modules/blocks/components/containers/segments-container";
import { CreateSegmentDialog } from "@/modules/blocks/components/dialogs/create-segment-dialog";
import { DeleteSegmentDialog } from "@/modules/blocks/components/dialogs/delete-segment-dialog";
import { SegmentControlPanel } from "@/modules/blocks/components/controls/segment-control-panel";
import { useBlockQuery } from "@/modules/blocks/api/hooks/queries/useBlockQuery";
import type { SegmentDto } from "@/modules/blocks/api/types";

export function BlockPage() {
  const { id } = useParams<{ id: string }>();
  const [createSegmentDialogOpen, setCreateSegmentDialogOpen] = useState(false);
  const [deleteSegmentDialogOpen, setDeleteSegmentDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<SegmentDto | null>(null);
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

  const handleDelete = (segment: SegmentDto) => {
    setSelectedSegment(segment);
    setDeleteSegmentDialogOpen(true);
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
            <SegmentControlPanel
              isEditMode={isEditMode}
              onCreate={() => setCreateSegmentDialogOpen(true)}
              onEdit={() => setIsEditMode(true)}
              onCancel={handleCancel}
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}

          <SegmentsFetcher
            blockId={id}
            ContainerComponent={({ data }) => (
              <SegmentsContainer
                data={data}
                blockId={id}
                isEditMode={isEditMode}
                onEditModeChange={setIsEditMode}
                onSaveReady={handleSaveReady}
                onDelete={handleDelete}
              />
            )}
            SkeletonComponent={SegmentsContainerSkeleton}
          />

          {blockData?.data && (
            <CreateSegmentDialog
              open={createSegmentDialogOpen}
              onOpenChange={setCreateSegmentDialogOpen}
              block={blockData.data}
            />
          )}

          {selectedSegment && (
            <DeleteSegmentDialog
              segment={selectedSegment}
              open={deleteSegmentDialogOpen}
              onOpenChange={setDeleteSegmentDialogOpen}
              onSuccess={() => setSelectedSegment(null)}
            />
          )}
        </div>
      </main>
    </SidebarInsetLayout>
  );
}

