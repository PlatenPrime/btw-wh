import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useRecalculateZonesSectorsMutation } from "@/modules/blocks/api/hooks/mutations/useRecalculateZonesSectorsMutation";
import { BlocksHeaderActionsView } from "@/modules/blocks/components/actions/blocks-header-actions/BlocksHeaderActionsView";
import { RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function BlocksHeaderActions() {
  const [recalculateDialogOpen, setRecalculateDialogOpen] = useState(false);
  const recalculateMutation = useRecalculateZonesSectorsMutation();

  const openRecalculateDialog = useCallback(() => {
    setRecalculateDialogOpen(true);
  }, []);

  const handleRecalculateConfirm = useCallback(() => {
    recalculateMutation.mutate(undefined, {
      onSuccess: () => {
        setRecalculateDialogOpen(false);
      },
    });
  }, [recalculateMutation]);

  const handleRecalculateCancel = useCallback(() => {
    setRecalculateDialogOpen(false);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "recalculate-sectors",
        label: "Перерахувати сектора",
        icon: RefreshCw,
        iconColor: "blue",
        variant: "default",
        onClick: openRecalculateDialog,
      },
    ],
    [openRecalculateDialog]
  );

  useRegisterHeaderActions(headerActions);

  return (
    <BlocksHeaderActionsView
      recalculateDialogOpen={recalculateDialogOpen}
      onRecalculateDialogOpenChange={setRecalculateDialogOpen}
      onRecalculateConfirm={handleRecalculateConfirm}
      onRecalculateCancel={handleRecalculateCancel}
      isRecalculatePending={recalculateMutation.isPending}
    />
  );
}
