import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { Plus } from "lucide-react";
import { useCallback, useMemo } from "react";

interface AnalogsHeaderActionsProps {
  onCreateDialogOpenChange?: (open: boolean) => void;
}

export function AnalogsHeaderActions({
  onCreateDialogOpenChange,
}: AnalogsHeaderActionsProps) {
  const openCreateDialog = useCallback(() => {
    onCreateDialogOpenChange?.(true);
  }, [onCreateDialogOpenChange]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "create-analog",
        label: "Створити аналог",
        icon: Plus,
        iconColor: "emerald",
        variant: "default",
        onClick: openCreateDialog,
      },
    ],
    [openCreateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
