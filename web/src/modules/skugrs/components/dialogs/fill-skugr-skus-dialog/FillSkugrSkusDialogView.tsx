import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FillSkugrSkusDialogViewProps {
  konkName: string;
  maxPagesInput: string;
  isSubmitting: boolean;
  onMaxPagesChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export function FillSkugrSkusDialogView({
  konkName,
  maxPagesInput,
  isSubmitting,
  onMaxPagesChange,
  onCancel,
  onSubmit,
}: FillSkugrSkusDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <div className="grid gap-4">
        <DialogHeader>
          <DialogTitle>Заповнити групу товарами</DialogTitle>
          <DialogDescription>
            Запит до парсера браузера для конкурента{" "}
            <span className="font-medium">{konkName}.</span> URL групи має вказувати на першу сторінку
            категорії.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="fill-max-pages">Макс. сторінок (необов&apos;язково)</Label>
          <Input
            id="fill-max-pages"
            type="number"
            min={1}
            max={20}
            inputMode="numeric"
            placeholder="1–20, порожньо = за замовчуванням"
            value={maxPagesInput}
            onChange={(e) => onMaxPagesChange(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <DialogActions
          onCancel={onCancel}
          onSubmit={onSubmit}
          cancelText="Скасувати"
          submitText="Запустити"
          submitLoadingText="Завантаження..."
          isSubmitting={isSubmitting}
          className="w-full"
        />
      </div>
    </DialogContent>
  );
}
