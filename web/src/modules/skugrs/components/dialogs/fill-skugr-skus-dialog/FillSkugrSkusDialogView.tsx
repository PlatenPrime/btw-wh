import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { typography } from "@/lib/typography";

const FILL_MAX_PAGES = 200;

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
  const isSvbum = konkName.trim().toLowerCase() === "svbum";

  return (
    <DialogContent className="sm:max-w-md">
      <div className="grid gap-4">
        <DialogHeader>
          <DialogTitle>Заповнити групу товарами</DialogTitle>
          <DialogDescription>
            Запит до парсера браузера для конкурента{" "}
            <span className="font-medium">{konkName}.</span> URL групи має вказувати на першу сторінку
            категорії, зі збереженими query-фільтрами.
          </DialogDescription>
        </DialogHeader>

        {isSvbum ? (
          <p className={typography.formHint}>
            Для СвятоБум залиште в URL параметр ocf. Без нього fill обійде весь
            розділ, а не вибрану підбірку.
          </p>
        ) : null}

        <div className="grid gap-2">
          <Label htmlFor="fill-max-pages">Макс. сторінок (необов&apos;язково)</Label>
          <Input
            id="fill-max-pages"
            type="number"
            min={1}
            max={FILL_MAX_PAGES}
            inputMode="numeric"
            placeholder="1–200, порожньо = за замовчуванням"
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
