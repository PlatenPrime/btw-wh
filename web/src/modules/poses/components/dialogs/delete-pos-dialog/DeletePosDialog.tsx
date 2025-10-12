import { useDeletePosMutation } from "@/modules/poses/api/hooks/mutations/useDeletePosMutation";
import type { IPos } from "@/modules/poses/api/types";
import { DeletePosDialogView } from "@/modules/poses/components/dialogs/delete-pos-dialog/DeletePosDialogView.tsx";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useRef, useState } from "react";

interface DeletePosDialogProps {
  pos: IPos;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  // Controlled component props
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePosDialog({
  pos,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeletePosDialogProps) {
  // Внутреннее состояние для неконтролируемого режима
  const [internalOpen, setInternalOpen] = useState(false);

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

  const deletePosMutation = useDeletePosMutation(pos);

  const handleDelete = async () => {
    try {
      await deletePosMutation.mutateAsync(pos._id);
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error deleting pos:", error);
    }
  };

  return (
    <DeletePosDialogView
      pos={pos}
      handleDelete={handleDelete}
      deleteMutation={deletePosMutation}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    />
  );
}
