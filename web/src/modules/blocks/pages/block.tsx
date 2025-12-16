import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { useBlockQuery } from "@/modules/blocks/api/hooks/queries/useBlockQuery";
import { BlockHeaderActions } from "@/modules/blocks/components/actions/BlockHeaderActions";
import {
  SegmentsContainer,
  SegmentsContainerSkeleton,
} from "@/modules/blocks/components/containers/segments-container";
import { SegmentControlPanel } from "@/modules/blocks/components/controls/segment-control-panel";
import { CreateSegmentDialog } from "@/modules/blocks/components/dialogs/create-segment-dialog";
import { DeleteSegmentDialog } from "@/modules/blocks/components/dialogs/delete-segment-dialog";
import { SegmentsFetcher } from "@/modules/blocks/components/fetchers/segments-fetcher";
import { useBlockPage } from "@/modules/blocks/hooks/useBlockPage";
import { useParams } from "react-router";

export function BlockPage() {
  const { id } = useParams<{ id: string }>();
  const blockQuery = useBlockQuery({ id: id ?? "", enabled: !!id });
  const blockData = blockQuery.data;
  const {
    isEditMode,
    isSaving,
    createSegmentDialogOpen,
    deleteSegmentDialogOpen,
    selectedSegment,
    setIsEditMode,
    setCreateSegmentDialogOpen,
    setDeleteSegmentDialogOpen,
    setSelectedSegment,
    handleSave,
    handleCancel,
    handleSaveReady,
    handleDelete,
  } = useBlockPage();

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
      {blockData?.data && (
        <BlockHeaderActions
          blockId={blockData.data._id}
          blockTitle={blockData.data.title}
        />
      )}
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
