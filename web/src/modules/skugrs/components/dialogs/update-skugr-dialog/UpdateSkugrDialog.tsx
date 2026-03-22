import { Dialog } from "@/components/ui/dialog";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { useState } from "react";
import { UpdateSkugrDialogView } from "./UpdateSkugrDialogView";
import { useUpdateSkugrDialog } from "./useUpdateSkugrDialog";

interface UpdateSkugrDialogProps {
  skugr: SkugrPageDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateSkugrDialog({
  skugr,
  open: controlledOpen,
  onOpenChange,
}: UpdateSkugrDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useUpdateSkugrDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateSkugrDialogView
        skugr={skugr}
        open={open}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
