import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { UpdateSkugrForm } from "@/modules/skugrs/components/forms/update-skugr-form/UpdateSkugrForm";

interface UpdateSkugrDialogViewProps {
  skugr: SkugrPageDto;
  open: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateSkugrDialogView({
  skugr,
  open,
  onSuccess,
  onCancel,
}: UpdateSkugrDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Редагувати товарну групу</DialogTitle>
      </DialogHeader>
      <UpdateSkugrForm
        skugr={skugr}
        open={open}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}
