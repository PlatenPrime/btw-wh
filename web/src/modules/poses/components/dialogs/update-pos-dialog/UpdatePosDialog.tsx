import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosDialogView } from "@/modules/poses/components/dialogs/update-pos-dialog/UpdatePosDialogView.tsx";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useRef, useState } from "react";

interface UpdatePosDialogProps {
  pos: IPos;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  // Controlled component props
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdatePosDialog({
  pos,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: UpdatePosDialogProps) {
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

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <UpdatePosDialogView
      open={open}
      setOpen={setOpen}
      pos={pos}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
