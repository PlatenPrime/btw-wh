import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useRole } from "@/modules/auth/hooks/useRole";
import { useDownloadInvalidSkusExcelMutation } from "@/modules/skus/api/hooks/mutations/useDownloadInvalidSkusExcelMutation";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

interface CompetitorSkusHeaderActionsProps {
  konkName: string;
  onOpenNewSinceExcel: () => void;
  onOpenDeleteInvalid: () => void;
}

export function CompetitorSkusHeaderActions({
  konkName,
  onOpenNewSinceExcel,
  onOpenDeleteInvalid,
}: CompetitorSkusHeaderActionsProps) {
  const { hasRole } = useRole();
  const canPrime = hasRole(RoleType.PRIME);
  const downloadInvalid = useDownloadInvalidSkusExcelMutation();

  const requireKonk = useCallback((): boolean => {
    if (!konkName.trim()) {
      toast.error("Оберіть конкурента", {
        description:
          "Для цієї дії потрібен обраний конкурент у панелі фільтрів.",
      });
      return false;
    }
    return true;
  }, [konkName]);

  const handleDownloadInvalidExcel = useCallback(() => {
    if (!requireKonk()) return;
    downloadInvalid.mutate({ konkName: konkName.trim() });
  }, [requireKonk, konkName, downloadInvalid]);

  const handleOpenNewSince = useCallback(() => {
    if (!requireKonk()) return;
    onOpenNewSinceExcel();
  }, [requireKonk, onOpenNewSinceExcel]);

  const handleOpenDelete = useCallback(() => {
    if (!requireKonk()) return;
    onOpenDeleteInvalid();
  }, [requireKonk, onOpenDeleteInvalid]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [
      {
        id: "comp-skus-invalid-excel",
        label: "Excel невалідні",
        icon: FileSpreadsheet,
        iconColor: "rose",
        variant: "default",
        onClick: handleDownloadInvalidExcel,
      },
      {
        id: "comp-skus-new-since-excel",
        label: "Excel новинки",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: handleOpenNewSince,
      },
    ];
    if (canPrime) {
      actions.push({
        id: "comp-skus-delete-invalid",
        label: "Видалити невалідні",
        icon: Trash2,
        iconColor: "red",
        variant: "super-destructive",
        onClick: handleOpenDelete,
      });
    }
    return actions;
  }, [
    canPrime,
    handleDownloadInvalidExcel,
    handleOpenNewSince,
    handleOpenDelete,
  ]);

  useRegisterHeaderActions(headerActions);

  return null;
}
