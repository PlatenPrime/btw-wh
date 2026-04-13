import { Dialog } from "@/components/ui/dialog";
import { useDownloadInvalidSkusExcelMutation } from "@/modules/skus/api/hooks/mutations/useDownloadInvalidSkusExcelMutation";
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
  const mutation = useDownloadInvalidSkusExcelMutation();

  useEffect(() => {
    if (open) {
      setSelectedKonkOrAll(defaultKonkSelection(filterKonkName));
    }
  }, [open, filterKonkName]);

  const handleDownload = useCallback(async () => {
    if (!selectedKonkOrAll) return;
    try {
      await mutation.mutateAsync({ konkName: selectedKonkOrAll });
      onOpenChange(false);
    } catch {
      // toast у мутації
    }
  }, [selectedKonkOrAll, mutation, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SkusInvalidExcelDialogView
        konks={konks}
        selectedKonkOrAll={selectedKonkOrAll}
        onSelectedKonkOrAllChange={setSelectedKonkOrAll}
        isDownloading={mutation.isPending}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
