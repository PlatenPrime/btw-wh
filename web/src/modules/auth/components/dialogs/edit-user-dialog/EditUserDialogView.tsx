import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User } from "@/modules/auth/api/types";
import { EditUserForm } from "@/modules/auth/components/forms/edit-user-form";

interface EditUserDialogViewProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EditUserDialogView({
  user,
  onSuccess,
  onCancel,
}: EditUserDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Редагувати користувача</DialogTitle>
      </DialogHeader>
      <EditUserForm user={user} onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
