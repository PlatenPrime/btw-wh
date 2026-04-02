import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useUpdateBtradeStockMutation } from "@/modules/arts/api/hooks/mutations/useUpdateBtradeStockMutation";
import { ArtHeaderActionsView } from "@/modules/arts/components/actions/art-header-actions/ArtHeaderActionsView";
import { useRole } from "@/modules/auth/hooks/useRole";
import { MessageSquarePlus, RefreshCw, SquarePen } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface ArtHeaderActionsProps {
  artData: ArtDto;
}

export function ArtHeaderActions({ artData }: ArtHeaderActionsProps) {
  const { isAdmin } = useRole();
  const canEditArt = isAdmin();
  const [updateArtDialogOpen, setUpdateArtDialogOpen] = useState(false);
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

  const openUpdateArtDialog = useCallback(() => {
    setUpdateArtDialogOpen(true);
  }, []);

  const openCreateAskDialog = useCallback(() => {
    setCreateAskDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [
      {
        id: "update-btrade-stock",
        label: "Оновити Btrade Stock",
        icon: RefreshCw,
        iconColor: "blue",
        variant: "default",
        onClick: handleUpdateBtradeStock,
      },
    ];

    if (canEditArt) {
      actions.push({
        id: "update-art",
        label: "Редагувати артикул",
        icon: SquarePen,
        variant: "default",
        onClick: openUpdateArtDialog,
      });
    }

    actions.push({
      id: "create-ask",
      label: "Створити запит",
      icon: MessageSquarePlus,
      iconColor: "emerald",
      variant: "default",
      onClick: openCreateAskDialog,
    });

    return actions;
  }, [
    canEditArt,
    handleUpdateBtradeStock,
    openCreateAskDialog,
    openUpdateArtDialog,
  ]);

  useRegisterHeaderActions(headerActions);

  return (
    <ArtHeaderActionsView
      artData={artData}
      canEditArt={canEditArt}
      updateArtDialogOpen={updateArtDialogOpen}
      onUpdateArtDialogOpenChange={setUpdateArtDialogOpen}
      createAskDialogOpen={createAskDialogOpen}
      onCreateAskDialogOpenChange={setCreateAskDialogOpen}
    />
  );
}

