import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProdDto } from "@/modules/prods/api/types";
import { UpdateProdForm } from "@/modules/prods/components/forms/update-prod-form";

interface UpdateProdDialogViewProps {
  prod: ProdDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateProdDialogView({
  prod,
  onSuccess,
  onCancel,
}: UpdateProdDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Редагувати виробника</DialogTitle>
      </DialogHeader>
      <UpdateProdForm prod={prod} onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
