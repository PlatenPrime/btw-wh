import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateUserForm } from "@/modules/auth/components/forms/create-user-form";

interface CreateUserDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateUserDialogView({
  onSuccess,
  onCancel,
}: CreateUserDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Додати користувача</DialogTitle>
      </DialogHeader>
      <CreateUserForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
