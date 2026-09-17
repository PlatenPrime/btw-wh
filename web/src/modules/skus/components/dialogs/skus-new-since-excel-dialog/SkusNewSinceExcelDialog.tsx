import { Dialog } from "@/components/ui/dialog";
import { useStartExcelJob } from "@/modules/excel-jobs";
import type { KonkDto } from "@/modules/konks/api/types";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { SKUS_EXCEL_ALL_KONKS_VALUE } from "@/modules/skus/components/dialogs/skus-excel-konk-scope";
import { SkusNewSinceExcelDialogView } from "./SkusNewSinceExcelDialogView";

function defaultSinceDate(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function defaultKonkSelection(filterKonkName: string): string {
  const t = filterKonkName.trim();
  return t || SKUS_EXCEL_ALL_KONKS_VALUE;
}

interface SkusNewSinceExcelDialogProps {
  konks: KonkDto[];
  filterKonkName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkusNewSinceExcelDialog({
  konks,
  filterKonkName,
  open,
  onOpenChange,
}: SkusNewSinceExcelDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultSinceDate,
  );
  const [selectedKonkOrAll, setSelectedKonkOrAll] = useState(
    () => defaultKonkSelection(filterKonkName),
  );
  const { startJob, isStarting } = useStartExcelJob();

  useEffect(() => {
    if (open) {
      setSelectedDate(defaultSinceDate());
      setSelectedKonkOrAll(defaultKonkSelection(filterKonkName));
    }
  }, [open, filterKonkName]);

  const handleDownload = useCallback(async () => {
    if (!selectedDate || !selectedKonkOrAll) return;
    const since = format(selectedDate, "yyyy-MM-dd");
    try {
      const job = await startJob({
        kind: "sku-catalog-new-since",
        params: { konk: selectedKonkOrAll, since },
        title: "SKU: нові з дати",
      });
      if (job) onOpenChange(false);
    } catch {
      // toast in provider
    }
  }, [selectedDate, selectedKonkOrAll, startJob, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SkusNewSinceExcelDialogView
        konks={konks}
        selectedKonkOrAll={selectedKonkOrAll}
        onSelectedKonkOrAllChange={setSelectedKonkOrAll}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        isDownloading={isStarting}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
