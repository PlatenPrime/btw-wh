import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useStartApiTask } from "@/modules/apitasks";
import { BlocksHeaderActionsView } from "@/modules/blocks/components/actions/blocks-header-actions/BlocksHeaderActionsView";
import { RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function BlocksHeaderActions() {
  const [recalculateDialogOpen, setRecalculateDialogOpen] = useState(false);
  const { startTask, isStarting } = useStartApiTask();

  const openRecalculateDialog = useCallback(() => {
    setRecalculateDialogOpen(true);
  }, []);

  const handleRecalculateConfirm = useCallback(() => {
    void startTask({
      kind: "blocks.recalculate-zones-sectors",
      params: {},
      title: "Перерахунок секторів зон",
    }).then((task) => {
      if (task) setRecalculateDialogOpen(false);
    });
  }, [startTask]);

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
    [openRecalculateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <BlocksHeaderActionsView
      recalculateDialogOpen={recalculateDialogOpen}
      onRecalculateDialogOpenChange={setRecalculateDialogOpen}
      onRecalculateConfirm={handleRecalculateConfirm}
      onRecalculateCancel={handleRecalculateCancel}
      isRecalculatePending={isStarting}
    />
  );
}
