import { CreateAskDialogView } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialogView.tsx";
import { useState } from "react";

interface CreateAskDialogProps {
  onSuccess?: () => void;
  preFilledArtikul?: string; // Предзаполненный артикул для страницы артикула
  trigger?: React.ReactNode; // Кастомный триггер для открытия диалога
  showTrigger?: boolean; // Показывать ли триггер (по умолчанию true)
  // Для внешнего управления состоянием (опционально)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateAskDialog({
  onSuccess,
  preFilledArtikul,
  trigger,
  showTrigger = true,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: CreateAskDialogProps) {
  // Внутреннее состояние для обратной совместимости
  const [internalOpen, setInternalOpen] = useState(false);

  // Используем внешнее состояние если передано, иначе внутреннее
  const isControlled =
    externalOpen !== undefined && externalOnOpenChange !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? externalOnOpenChange : setInternalOpen;

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
      showTrigger={showTrigger}
    />
  );
}
