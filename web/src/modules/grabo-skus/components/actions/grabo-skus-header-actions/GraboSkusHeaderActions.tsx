import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useDownloadGraboSkusExcelMutation } from "@/modules/grabo-skus/api/hooks/mutations/useDownloadGraboSkusExcelMutation";
import { FileSpreadsheet } from "lucide-react";
import { useMemo } from "react";

export function GraboSkusHeaderActions() {
  const { mutate, isPending } = useDownloadGraboSkusExcelMutation();

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "grabo-skus-excel",
        label: "Excel каталог",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: () => {
          if (isPending) return;
          mutate();
        },
      },
    ],
    [mutate, isPending],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
