import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { PurgePromotedFromNewskuDialog } from "@/modules/skugrs/components/dialogs/purge-promoted-from-newsku-dialog";
import { Eraser, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface SkugrsHeaderActionsProps {
  onCreateDialogOpenChange?: (open: boolean) => void;
}

export function SkugrsHeaderActions({
  onCreateDialogOpenChange,
}: SkugrsHeaderActionsProps) {
  const { hasRole } = useAuth();
  const canAdmin = hasRole(RoleType.ADMIN);
  const [purgeDialogOpen, setPurgeDialogOpen] = useState(false);

  const openCreateDialog = useCallback(() => {
    onCreateDialogOpenChange?.(true);
  }, [onCreateDialogOpenChange]);

  const openPurgeDialog = useCallback(() => {
    setPurgeDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    if (!canAdmin) return [];
    return [
      {
        id: "create-skugr",
        label: "Створити товарну групу",
        icon: Plus,
        iconColor: "emerald",
        variant: "default",
        onClick: openCreateDialog,
      },
      {
        id: "purge-promoted-from-newsku",
        label: "Очистити Новинки від дублікатів",
        icon: Eraser,
        iconColor: "rose",
        variant: "destructive",
        onClick: openPurgeDialog,
      },
    ];
  }, [canAdmin, openCreateDialog, openPurgeDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <PurgePromotedFromNewskuDialog
      open={purgeDialogOpen}
      onOpenChange={setPurgeDialogOpen}
    />
  );
}
