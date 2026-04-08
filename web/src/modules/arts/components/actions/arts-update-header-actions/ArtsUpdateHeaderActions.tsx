import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { handleExportArtsKeys } from "@/modules/arts/utils/handle-export-arts-keys/handleExportArtsKeys";
import { FileSpreadsheet } from "lucide-react";
import { useCallback, useMemo } from "react";

export function ArtsUpdateHeaderActions() {
  const handleExportKeys = useCallback(() => {
    handleExportArtsKeys();
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "export-arts-keys",
        label: "Експорт артикулів (ключі)",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: handleExportKeys,
      },
    ],
    [handleExportKeys],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
