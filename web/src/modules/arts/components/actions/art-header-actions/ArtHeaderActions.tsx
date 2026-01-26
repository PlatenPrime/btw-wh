import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useUpdateBtradeStockMutation } from "@/modules/arts/api/hooks/mutations/useUpdateBtradeStockMutation";
import { ArtHeaderActionsView } from "@/modules/arts/components/actions/art-header-actions/ArtHeaderActionsView";
import { Edit, MessageSquarePlus, RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface ArtHeaderActionsProps {
  artData: ArtDto;
}

export function ArtHeaderActions({ artData }: ArtHeaderActionsProps) {
  const [updateLimitDialogOpen, setUpdateLimitDialogOpen] = useState(false);
  const [createAskDialogOpen, setCreateAskDialogOpen] = useState(false);

  const updateBtradeStockMutation = useUpdateBtradeStockMutation({
    artikul: artData.artikul as unknown as Pick<ArtDto, "artikul">,
  });

  const handleUpdateBtradeStock = useCallback(async () => {
    try {
      await updateBtradeStockMutation.mutateAsync(artData.artikul);
    } catch (error) {
      console.error("Ошибка обновления BtradeStock:", error);
    }
  }, [artData.artikul, updateBtradeStockMutation]);

  const openUpdateLimitDialog = useCallback(() => {
    setUpdateLimitDialogOpen(true);
  }, []);

  const openCreateAskDialog = useCallback(() => {
    setCreateAskDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "update-btrade-stock",
        label: "Оновити Btrade Stock",
        icon: RefreshCw,
        iconColor: "blue",
        variant: "default",
        onClick: handleUpdateBtradeStock,
      },
      {
        id: "update-art-limit",
        label: "Змінити ліміт",
        icon: Edit,
        variant: "default",
        onClick: openUpdateLimitDialog,
      },
      {
        id: "create-ask",
        label: "Створити запит",
        icon: MessageSquarePlus,
        iconColor: "emerald",
        variant: "default",
        onClick: openCreateAskDialog,
      },
    ],
    [handleUpdateBtradeStock, openCreateAskDialog, openUpdateLimitDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <ArtHeaderActionsView
      artData={artData}
      updateLimitDialogOpen={updateLimitDialogOpen}
      onUpdateLimitDialogOpenChange={setUpdateLimitDialogOpen}
      createAskDialogOpen={createAskDialogOpen}
      onCreateAskDialogOpenChange={setCreateAskDialogOpen}
    />
  );
}

