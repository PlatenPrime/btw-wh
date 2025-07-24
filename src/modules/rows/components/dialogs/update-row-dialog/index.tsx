import type { RowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { UpdateRowDialogView } from "./view";

interface UpdateRowDialogProps {
  row: RowDto;
  trigger?: React.ReactNode;
  onSuccess: () => void;
}

export function UpdateRowDialog({
  row,
  trigger,
  onSuccess,
}: UpdateRowDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <UpdateRowDialogView
      open={open}
      setOpen={setOpen}
      row={row}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
