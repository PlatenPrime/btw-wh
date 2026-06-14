import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useUpdateBtradeStockMutation } from "@/modules/arts/api/hooks/mutations/useUpdateBtradeStockMutation";
import { ArtHeaderActionsView } from "@/modules/arts/components/actions/art-header-actions/ArtHeaderActionsView";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useRole } from "@/modules/auth/hooks/useRole";
import { FileDown, MessageSquarePlus, RefreshCw, SquarePen, TrendingUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface ArtHeaderActionsProps {
  artData: ArtDto;
}

export function ArtHeaderActions({ artData }: ArtHeaderActionsProps) {
  const { hasRole } = useAuth();
  const { isAdmin } = useRole();
  const canEditArt = isAdmin();
  const canExportExcel = hasRole(RoleType.ADMIN);

  const [updateArtDialogOpen, setUpdateArtDialogOpen] = useState(false);
  const [createAskDialogOpen, setCreateAskDialogOpen] = useState(false);
  const [stockExcelDialogOpen, setStockExcelDialogOpen] = useState(false);
  const [salesExcelDialogOpen, setSalesExcelDialogOpen] = useState(false);

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

  const openStockExcelDialog = useCallback(() => {
    setStockExcelDialogOpen(true);
  }, []);

  const openSalesExcelDialog = useCallback(() => {
    setSalesExcelDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canEditArt) {
      actions.push({
        id: "update-art",
        label: "Редагувати артикул",
        icon: SquarePen,
        variant: "default",
        onClick: openUpdateArtDialog,
      });
    };

    actions.push({
      id: "create-ask",
      label: "Створити запит",
      icon: MessageSquarePlus,
      iconColor: "purple",
      variant: "default",
      onClick: openCreateAskDialog,
    });

    if (canExportExcel) {
      actions.push({
        id: "art-stock-excel",
        label: "Скачати Excel залишків",
        icon: FileDown,
        iconColor: "green",
        variant: "default",
        onClick: openStockExcelDialog,
      });
      actions.push({
        id: "art-sales-excel",
        label: "Скачати Excel продажів",
        icon: TrendingUp,
        iconColor: "green",
        variant: "default",
        onClick: openSalesExcelDialog,
      });
      actions.push(   {
        id: "update-btrade-stock",
        label: "Оновити Btrade Stock",
        icon: RefreshCw,
        iconColor: "blue",
        variant: "default",
        onClick: handleUpdateBtradeStock,
      },);
    }



    return actions;
  }, [
    canEditArt,
    canExportExcel,
    handleUpdateBtradeStock,
    openCreateAskDialog,
    openSalesExcelDialog,
    openStockExcelDialog,
    openUpdateArtDialog,
  ]);

  useRegisterHeaderActions(headerActions);

  return (
    <ArtHeaderActionsView
      artData={artData}
      canEditArt={canEditArt}
      canExportExcel={canExportExcel}
      updateArtDialogOpen={updateArtDialogOpen}
      onUpdateArtDialogOpenChange={setUpdateArtDialogOpen}
      createAskDialogOpen={createAskDialogOpen}
      onCreateAskDialogOpenChange={setCreateAskDialogOpen}
      stockExcelDialogOpen={stockExcelDialogOpen}
      onStockExcelDialogOpenChange={setStockExcelDialogOpen}
      salesExcelDialogOpen={salesExcelDialogOpen}
      onSalesExcelDialogOpenChange={setSalesExcelDialogOpen}
    />
  );
}
