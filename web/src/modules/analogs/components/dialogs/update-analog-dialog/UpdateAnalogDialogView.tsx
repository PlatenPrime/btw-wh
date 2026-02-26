import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { UpdateAnalogForm } from "@/modules/analogs/components/forms/update-analog-form/UpdateAnalogForm";

interface UpdateAnalogDialogViewProps {
  analog: AnalogDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateAnalogDialogView({
  analog,
  onSuccess,
  onCancel,
}: UpdateAnalogDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Редагувати аналог</DialogTitle>
      </DialogHeader>
      <UpdateAnalogForm
        analog={analog}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}
