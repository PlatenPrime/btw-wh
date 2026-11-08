import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { SkuStockBandsHeaderActionsView } from "@/modules/sku-stock-bands/components/actions/sku-stock-bands-header-actions/SkuStockBandsHeaderActionsView";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function SkuStockBandsHeaderActions() {
  const { hasRole } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const canCreate = hasRole(RoleType.ADMIN);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () =>
      canCreate
        ? [
            {
              id: "create-sku-stock-band",
              label: "Створити діапазон",
              icon: Plus,
              iconColor: "emerald",
              variant: "default",
              onClick: openCreateDialog,
            },
          ]
        : [],
    [canCreate, openCreateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <SkuStockBandsHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
    />
  );
}
