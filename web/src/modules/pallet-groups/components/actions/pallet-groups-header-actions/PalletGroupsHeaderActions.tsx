import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useRecalculatePalletsSectorsMutation } from "@/modules/pallet-groups/api/hooks/mutations/useRecalculatePalletsSectorsMutation";
import { useResetPalletsSectorsMutation } from "@/modules/pallet-groups/api/hooks/mutations/useResetPalletsSectorsMutation";
import { PalletGroupsHeaderActionsView } from "@/modules/pallet-groups/components/actions/pallet-groups-header-actions/PalletGroupsHeaderActionsView";
import { Plus, RefreshCw, RotateCcw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function PalletGroupsHeaderActions() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const recalculateMutation = useRecalculatePalletsSectorsMutation();
  const resetMutation = useResetPalletsSectorsMutation();

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const handleRecalculate = useCallback(() => {
    recalculateMutation.mutate();
  }, [recalculateMutation]);

  const openResetConfirm = useCallback(() => {
    setIsResetConfirmOpen(true);
  }, []);

  const closeResetConfirm = useCallback(() => {
    if (!resetMutation.isPending) {
      setIsResetConfirmOpen(false);
    }
  }, [resetMutation.isPending]);

  const handleResetConfirm = useCallback(() => {
    resetMutation.mutate(undefined, {
      onSettled: () => {
        setIsResetConfirmOpen(false);
      },
    });
  }, [resetMutation]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "create-pallet-group",
        label: "Створити групу",
        icon: Plus,
        iconColor: "emerald",
        variant: "default",
        onClick: openCreateDialog,
      },
      {
        id: "recalculate-sectors",
        label: "Перерахувати сектора",
        icon: RefreshCw,
        iconColor: "blue",
        variant: "default",
        onClick: handleRecalculate,
      },
      {
        id: "reset-sectors",
        label: "Скинути сектора",
        icon: RotateCcw,
        iconColor: "orange",
        variant: "default",
        onClick: openResetConfirm,
      },
    ],
    [openCreateDialog, handleRecalculate, openResetConfirm],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <PalletGroupsHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
      isResetConfirmOpen={isResetConfirmOpen}
      onResetConfirmOpenChange={setIsResetConfirmOpen}
      onResetConfirm={handleResetConfirm}
      onResetCancel={closeResetConfirm}
      isResetPending={resetMutation.isPending}
    />
  );
}
