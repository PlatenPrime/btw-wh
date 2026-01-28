import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { PalletGroupsHeaderActionsView } from "@/modules/pallet-groups/components/actions/pallet-groups-header-actions/PalletGroupsHeaderActionsView";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function PalletGroupsHeaderActions() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

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
    ],
    [openCreateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <PalletGroupsHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
    />
  );
}
