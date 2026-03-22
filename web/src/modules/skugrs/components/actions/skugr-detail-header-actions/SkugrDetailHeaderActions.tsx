import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { SkugrDetailHeaderActionsView } from "@/modules/skugrs/components/actions/skugr-detail-header-actions/SkugrDetailHeaderActionsView";
import { Pencil, RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface SkugrDetailHeaderActionsProps {
  skugr: SkugrPageDto;
}

export function SkugrDetailHeaderActions({ skugr }: SkugrDetailHeaderActionsProps) {
  const { hasRole } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [fillDialogOpen, setFillDialogOpen] = useState(false);
  const canAdmin = hasRole(RoleType.ADMIN);

  const openEditDialog = useCallback(() => {
    setEditDialogOpen(true);
  }, []);

  const openFillDialog = useCallback(() => {
    setFillDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    if (!canAdmin) return [];
    return [
      {
        id: "edit-skugr",
        label: "Редагувати",
        icon: Pencil,
        iconColor: "sky",
        variant: "default",
        onClick: openEditDialog,
      },
      {
        id: "fill-skugr-skus",
        label: "Заповнити товарами",
        icon: RefreshCw,
        iconColor: "emerald",
        variant: "default",
        onClick: openFillDialog,
      },
    ];
  }, [canAdmin, openEditDialog, openFillDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <SkugrDetailHeaderActionsView
      skugr={skugr}
      editDialogOpen={editDialogOpen}
      onEditDialogOpenChange={setEditDialogOpen}
      fillDialogOpen={fillDialogOpen}
      onFillDialogOpenChange={setFillDialogOpen}
    />
  );
}
