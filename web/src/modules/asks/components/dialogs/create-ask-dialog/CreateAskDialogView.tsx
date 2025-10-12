import AskTrigger from "@/components/shared/triggers/ask-trigger/AskTrigger";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateAskForm } from "@/modules/asks/components/forms/create-ask-form/CreateAskForm";

interface CreateAskDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  onCancel: () => void;
  preFilledArtikul?: string; // Предзаполненный артикул для страницы артикула
  trigger?: React.ReactNode; // Кастомный триггер для открытия диалога
}

export function CreateAskDialogView({
  open,
  setOpen,
  onSuccess,
  onCancel,
  preFilledArtikul,
  trigger,
}: CreateAskDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== undefined && (
        <DialogTrigger asChild>{trigger || <AskTrigger />}</DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Створити новий запит
          </DialogTitle>
        </DialogHeader>
        <CreateAskForm
          onSuccess={onSuccess}
          onCancel={onCancel}
          preFilledArtikul={preFilledArtikul}
        />
      </DialogContent>
    </Dialog>
  );
}
