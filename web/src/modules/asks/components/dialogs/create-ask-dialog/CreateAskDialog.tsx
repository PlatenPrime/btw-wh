import { CreateAskDialogView } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialogView.tsx";
import { useState } from "react";

interface CreateAskDialogProps {
  onSuccess?: () => void;
  preFilledArtikul?: string; // Предзаполненный артикул для страницы артикула
  trigger?: React.ReactNode; // Кастомный триггер для открытия диалога
}

export function CreateAskDialog({
  onSuccess,
  preFilledArtikul,
  trigger,
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
      onSuccess={handleSuccess}
      onCancel={handleCancel}
      preFilledArtikul={preFilledArtikul}
      trigger={trigger}
    />
  );
}
