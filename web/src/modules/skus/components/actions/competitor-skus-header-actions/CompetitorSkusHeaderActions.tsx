import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useRole } from "@/modules/auth/hooks/useRole";
import { Eraser, FileSpreadsheet, Trash2 } from "lucide-react";
import { useMemo } from "react";

interface CompetitorSkusHeaderActionsProps {
  onOpenNewSinceExcel: () => void;
  onOpenInvalidExcel: () => void;
  onOpenDeleteInvalid: () => void;
  onOpenDeleteOrphans: () => void;
}

export function CompetitorSkusHeaderActions({
  onOpenNewSinceExcel,
  onOpenInvalidExcel,
  onOpenDeleteInvalid,
  onOpenDeleteOrphans,
}: CompetitorSkusHeaderActionsProps) {
  const { hasRole } = useRole();
  const canPrime = hasRole(RoleType.PRIME);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [
      {
        id: "comp-skus-invalid-excel",
        label: "Excel невалідні",
        icon: FileSpreadsheet,
        iconColor: "rose",
        variant: "default",
        onClick: onOpenInvalidExcel,
      },
      {
        id: "comp-skus-new-since-excel",
        label: "Excel новинки",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: onOpenNewSinceExcel,
      },
    ];
    if (canPrime) {
      actions.push(
        {
          id: "comp-skus-delete-orphans",
          label: "Видалити без товарної групи",
          icon: Eraser,
          iconColor: "rose",
          variant: "super-destructive",
          onClick: onOpenDeleteOrphans,
        },
        {
          id: "comp-skus-delete-invalid",
          label: "Видалити невалідні",
          icon: Trash2,
          iconColor: "red",
          variant: "super-destructive",
          onClick: onOpenDeleteInvalid,
        },
      );
    }
    return actions;
  }, [
    canPrime,
    onOpenInvalidExcel,
    onOpenNewSinceExcel,
    onOpenDeleteInvalid,
    onOpenDeleteOrphans,
  ]);

  useRegisterHeaderActions(headerActions);

  return null;
}
