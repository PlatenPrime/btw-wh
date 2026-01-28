import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreatePalletGroupForm } from "@/modules/pallet-groups/components/forms/create-pallet-group-form/CreatePalletGroupForm";

interface CreatePalletGroupDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreatePalletGroupDialogView({
  onSuccess,
  onCancel,
}: CreatePalletGroupDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Створити групу палет</DialogTitle>
      </DialogHeader>
      <CreatePalletGroupForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
