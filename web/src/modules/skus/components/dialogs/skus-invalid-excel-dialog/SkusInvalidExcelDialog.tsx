import { Dialog } from "@/components/ui/dialog";
import { useStartExcelJob } from "@/modules/excel-jobs";
import type { KonkDto } from "@/modules/konks/api/types";
import { SKUS_EXCEL_ALL_KONKS_VALUE } from "@/modules/skus/components/dialogs/skus-excel-konk-scope";
import { useCallback, useEffect, useState } from "react";
import { SkusInvalidExcelDialogView } from "./SkusInvalidExcelDialogView";

function defaultKonkSelection(filterKonkName: string): string {
  const t = filterKonkName.trim();
  return t || SKUS_EXCEL_ALL_KONKS_VALUE;
}

interface SkusInvalidExcelDialogProps {
  konks: KonkDto[];
  filterKonkName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkusInvalidExcelDialog({
  konks,
  filterKonkName,
  open,
  onOpenChange,
}: SkusInvalidExcelDialogProps) {
  const [selectedKonkOrAll, setSelectedKonkOrAll] = useState(
    () => defaultKonkSelection(filterKonkName),
  );
  const { startJob, isStarting } = useStartExcelJob();

  useEffect(() => {
    if (open) {
      setSelectedKonkOrAll(defaultKonkSelection(filterKonkName));
    }
  }, [open, filterKonkName]);

  const handleDownload = useCallback(async () => {
    if (!selectedKonkOrAll) return;
    try {
      const job = await startJob({
        kind: "sku-catalog-invalid",
        params: { konk: selectedKonkOrAll },
        title: "SKU: невалідні",
      });
      if (job) onOpenChange(false);
    } catch {
      // toast in provider
    }
  }, [selectedKonkOrAll, startJob, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SkusInvalidExcelDialogView
        konks={konks}
        selectedKonkOrAll={selectedKonkOrAll}
        onSelectedKonkOrAllChange={setSelectedKonkOrAll}
        isDownloading={isStarting}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
