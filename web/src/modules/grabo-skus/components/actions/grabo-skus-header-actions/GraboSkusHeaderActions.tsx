import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useStartExcelJob } from "@/modules/excel-jobs";
import { FileSpreadsheet } from "lucide-react";
import { useMemo } from "react";

export function GraboSkusHeaderActions() {
  const { startJob, isStarting } = useStartExcelJob();

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "grabo-skus-excel",
        label: "Excel каталог",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: () => {
          if (isStarting) return;
          void startJob({ kind: "grabo-skus", title: "Grabo каталог" });
        },
      },
    ],
    [startJob, isStarting],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
