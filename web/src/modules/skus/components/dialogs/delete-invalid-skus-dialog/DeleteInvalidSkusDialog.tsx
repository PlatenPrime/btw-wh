import { Dialog } from "@/components/ui/dialog";
import { useStartApiTask } from "@/modules/apitasks";
import type { KonkDto } from "@/modules/konks/api/types";
import { SKUS_EXCEL_ALL_KONKS_VALUE } from "@/modules/skus/components/dialogs/skus-excel-konk-scope";
import { useCallback, useEffect, useState } from "react";
import { DeleteInvalidSkusDialogView } from "./DeleteInvalidSkusDialogView";

function defaultKonkSelection(filterKonkName: string): string {
  const t = filterKonkName.trim();
  return t || SKUS_EXCEL_ALL_KONKS_VALUE;
}

interface DeleteInvalidSkusDialogProps {
  konks: KonkDto[];
  filterKonkName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteInvalidSkusDialog({
  konks,
  filterKonkName,
  open,
  onOpenChange,
}: DeleteInvalidSkusDialogProps) {
  const [selectedKonkOrAll, setSelectedKonkOrAll] = useState(
    () => defaultKonkSelection(filterKonkName),
  );
  const { startTask, isStarting } = useStartApiTask();

  useEffect(() => {
    if (open) {
      setSelectedKonkOrAll(defaultKonkSelection(filterKonkName));
    }
  }, [open, filterKonkName]);

  const handleDelete = useCallback(async () => {
    if (!selectedKonkOrAll) return;
    try {
      const task = await startTask({
        kind: "skus.delete-konk-invalid",
        params: { konkName: selectedKonkOrAll },
        title:
          selectedKonkOrAll === SKUS_EXCEL_ALL_KONKS_VALUE
            ? "Видалення невалідних SKU · всі"
            : `Видалення невалідних SKU · ${selectedKonkOrAll}`,
      });
      if (task) onOpenChange(false);
    } catch {
      // toast у provider
    }
  }, [selectedKonkOrAll, startTask, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteInvalidSkusDialogView
        konks={konks}
        selectedKonkOrAll={selectedKonkOrAll}
        onSelectedKonkOrAllChange={setSelectedKonkOrAll}
        isDeleting={isStarting}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
