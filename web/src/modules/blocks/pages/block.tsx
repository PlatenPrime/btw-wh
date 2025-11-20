import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  BlocksBoardContainer,
  BlocksBoardSkeleton,
} from "@/modules/blocks/components/containers/blocks-board";
import { useParams } from "react-router";
import { useBlockQuery } from "@/modules/blocks/api/hooks/queries/useBlockQuery";
import { useCallback, useRef, useState } from "react";
import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { Button } from "@/components/ui/button";

export function BlockPage() {
  const { id } = useParams();
  const blockId = id ?? "";
  const { data, isLoading, error } = useBlockQuery({ id: blockId });
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const submitHandlerRef = useRef<(() => void) | null>(null);

  const handleStartEdit = () => {
    setIsEditMode(true);
    setHasPendingChanges(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setHasPendingChanges(false);
  };

  const handleConfirmEdit = () => {
    submitHandlerRef.current?.();
  };

  const handleRegisterSubmitHandler = useCallback((handler: () => void) => {
    submitHandlerRef.current = handler;
  }, []);

  const handleSubmitSuccess = useCallback(() => {
    setIsEditMode(false);
    setHasPendingChanges(false);
  }, []);

  const pageTitle = data ? `Блок ${data.title}` : "Блок";

  return (
    <SidebarInsetLayout headerText={pageTitle}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          {!isEditMode ? (
            <Button variant="secondary" onClick={handleStartEdit} disabled={!data}>
              Редагувати порядок зон
            </Button>
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={handleConfirmEdit}
                disabled={!hasPendingChanges}
              >
                Підтвердити порядок зон
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
              Зміни по зонам вступають в силу після натискання кнопки підтвердження.
            </span>
          </div>
        )}

        {isLoading && <BlocksBoardSkeleton />}
        {error && (
          <ErrorDisplay
            error={error}
            title="Не вдалося завантажити блок"
            description="Спробуйте перезапустити сторінку"
          />
        )}
        {!isLoading && !error && data && (
          <BlocksBoardContainer
            blocks={[data]}
            isEditMode={isEditMode}
            allowBlockReorder={false}
            onRegisterSubmitHandler={handleRegisterSubmitHandler}
            onChangesStateChange={setHasPendingChanges}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}
        {!isLoading && !error && !data && (
          <LoadingNoData description="Блок не знайдено" />
        )}
      </div>
    </SidebarInsetLayout>
  );
}

