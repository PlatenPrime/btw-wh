import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { usePermission } from "@/modules/auth/hooks/usePermission";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { AsksHeaderActionsView } from "./AsksHeaderActionsView";

export function AsksHeaderActions() {
  const { can } = usePermission();
  const canCreateAsk = can("create:asks");
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleCreateSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["asks"] });
  }, [queryClient]);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    if (!canCreateAsk) return [];
    return [
      {
        id: "create-ask",
        label: "Створити запит",
        icon: Plus,
        iconColor: "default",
        variant: "default",
        onClick: openCreateDialog,
      },
    ];
  }, [canCreateAsk, openCreateDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <AsksHeaderActionsView
      showCreateDialog={canCreateAsk}
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
      onSuccess={handleCreateSuccess}
    />
  );
}
