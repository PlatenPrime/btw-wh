import { CreateAskDialogView } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialogView.tsx";
import { useState } from "react";

interface CreateAskDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  preFilledArtikul?: string; // Предзаполненный артикул для страницы артикула
}

export function CreateAskDialog({
  trigger,
  onSuccess,
  preFilledArtikul,
}: CreateAskDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <CreateAskDialogView
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
      preFilledArtikul={preFilledArtikul}
    />
  );
}
