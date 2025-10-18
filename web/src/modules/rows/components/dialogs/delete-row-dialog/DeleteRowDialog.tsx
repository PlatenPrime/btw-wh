import { useDeleteRowMutation } from "@/modules/rows/api/hooks/mutations/useDeleteRowMutation";
import type { RowDto } from "@/modules/rows/api/types";
import DeleteRowDialogView from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialogView.tsx";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useRef, useState } from "react";

interface DeleteRowDialogProps {
  row: RowDto;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  // Поддержка контролируемого режима
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteRowDialog({
  row,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeleteRowDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const deleteMutation = useDeleteRowMutation();

  // Используем контролируемое состояние если передано, иначе внутреннее
  const open = controlledOpen ?? internalOpen;
  const openRef = useRef(open);
  openRef.current = open;

  // Создаем обертку для onOpenChange, которая принимает SetStateAction
  const setOpen: Dispatch<SetStateAction<boolean>> = useMemo(
    () => (value) => {
      const newValue =
        typeof value === "function" ? value(openRef.current) : value;
      if (onOpenChange) {
        onOpenChange(newValue);
      } else {
        setInternalOpen(newValue);
      }
    },
    [onOpenChange],
  );

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(row._id);
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <DeleteRowDialogView
      row={row}
      handleDelete={handleDelete}
      deleteMutation={deleteMutation}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    />
  );
}
