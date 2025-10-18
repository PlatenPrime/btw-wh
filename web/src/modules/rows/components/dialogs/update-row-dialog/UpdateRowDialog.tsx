import type { RowDto } from "@/modules/rows/api/types";
import { useState } from "react";
import { UpdateRowDialogView } from "@/modules/rows/components/dialogs/update-row-dialog/UpdateRowDialogView.tsx";

interface UpdateRowDialogProps {
  row: RowDto;
  trigger?: React.ReactNode;
}

export function UpdateRowDialog({ row, trigger }: UpdateRowDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
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
