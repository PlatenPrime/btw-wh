import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { KonkDto } from "@/modules/konks/api/types";
import { UpdateKonkForm } from "@/modules/konks/components/forms/update-konk-form";

interface UpdateKonkDialogViewProps {
  konk: KonkDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateKonkDialogView({
  konk,
  onSuccess,
  onCancel,
}: UpdateKonkDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Редагувати конкурента</DialogTitle>
      </DialogHeader>
      <UpdateKonkForm konk={konk} onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
