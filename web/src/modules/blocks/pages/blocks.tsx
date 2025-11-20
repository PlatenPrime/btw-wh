import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { BlocksFetcher } from "@/modules/blocks/components/fetchers";
import {
  BlocksBoardContainer,
  BlocksBoardSkeleton,
} from "@/modules/blocks/components/containers/blocks-board";
import { CreateBlockDialog } from "@/modules/blocks/components/dialogs/create-block-dialog";
import type { BlockDto } from "@/modules/blocks/api/types";

export function BlocksPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const submitHandlerRef = useRef<(() => void) | null>(null);

  const handleRegisterSubmitHandler = useCallback((handler: () => void) => {
    submitHandlerRef.current = handler;
  }, []);

  const handleStartEdit = () => {
    setHasPendingChanges(false);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setHasPendingChanges(false);
  };

  const handleConfirmEdit = () => {
    submitHandlerRef.current?.();
  };

  const handleSubmitSuccess = () => {
    setIsEditMode(false);
    setHasPendingChanges(false);
  };

  const renderBoard = useCallback(
    ({ blocks }: { blocks: BlockDto[] }) => (
      <BlocksBoardContainer
        blocks={blocks}
        isEditMode={isEditMode}
        onRegisterSubmitHandler={handleRegisterSubmitHandler}
        onChangesStateChange={setHasPendingChanges}
        onSubmitSuccess={handleSubmitSuccess}
      />
    ),
    [handleRegisterSubmitHandler, handleSubmitSuccess, isEditMode],
  );

  return (
    <SidebarInsetLayout headerText="Блоки складу">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          {!isEditMode ? (
            <>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Новий блок
              </Button>
              <Button variant="secondary" onClick={handleStartEdit}>
                Редагувати порядок
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={handleConfirmEdit}
                disabled={!hasPendingChanges}
              >
                Підтвердити порядок
              </Button>
              <Button variant="outline" onClick={handleCancelEdit}>
                Скасувати редагування
              </Button>
            </>
          )}
        </div>

        {isEditMode && (
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-amber-400/50 bg-amber-50/70 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
            <span className="font-semibold">Увага</span>
            <span>
              Зміни набувають чинності після підтвердження. Кнопка нижче зберігає
              порядок.
            </span>
          </div>
        )}

        <BlocksFetcher
          ContainerComponent={renderBoard}
          SkeletonComponent={BlocksBoardSkeleton}
        />
      </div>

      <CreateBlockDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </SidebarInsetLayout>
  );
}

