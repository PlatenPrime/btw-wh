import { Dialog } from "@/components/ui/dialog";
import { useDeleteInvalidSkusMutation } from "@/modules/skus/api/hooks/mutations/useDeleteInvalidSkusMutation";
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
  const mutation = useDeleteInvalidSkusMutation();

  useEffect(() => {
    if (open) {
      setSelectedKonkOrAll(defaultKonkSelection(filterKonkName));
    }
  }, [open, filterKonkName]);

  const handleDelete = useCallback(async () => {
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
      <DeleteInvalidSkusDialogView
        konks={konks}
        selectedKonkOrAll={selectedKonkOrAll}
        onSelectedKonkOrAllChange={setSelectedKonkOrAll}
        isDeleting={mutation.isPending}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
