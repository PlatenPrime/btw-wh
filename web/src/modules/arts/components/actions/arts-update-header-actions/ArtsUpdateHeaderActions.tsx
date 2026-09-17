import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useStartExcelJob } from "@/modules/excel-jobs";
import { FileSpreadsheet } from "lucide-react";
import { useCallback, useMemo } from "react";

export function ArtsUpdateHeaderActions() {
  const { startJob, isStarting } = useStartExcelJob();

  const handleExportKeys = useCallback(() => {
    if (isStarting) return;
    void startJob({
      kind: "arts-export-keys",
      title: "Ключі артикулів",
    });
  }, [isStarting, startJob]);

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
