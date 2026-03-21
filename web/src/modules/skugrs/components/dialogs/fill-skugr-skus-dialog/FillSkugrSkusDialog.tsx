import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFillSkugrSkusMutation } from "@/modules/skugrs/api/hooks/mutations/useFillSkugrSkusMutation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface FillSkugrSkusDialogProps {
  skugrId: string;
  konkName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FillSkugrSkusDialog({
  skugrId,
  konkName,
  open,
  onOpenChange,
}: FillSkugrSkusDialogProps) {
  const [maxPagesInput, setMaxPagesInput] = useState("");
  const fillMutation = useFillSkugrSkusMutation();

  const handleOpenChange = (next: boolean) => {
    if (!next) setMaxPagesInput("");
    onOpenChange(next);
  };

  const submitFill = useCallback(() => {
    const trimmed = maxPagesInput.trim();
    let body: { maxPages?: number } | undefined;
    if (trimmed !== "") {
      const n = Number(trimmed);
      if (!Number.isInteger(n) || n < 1 || n > 200) {
        toast.error("Некоректний ліміт сторінок", {
          description: "Вкажіть ціле число від 1 до 200 або залиште поле порожнім",
        });
        return;
      }
      body = { maxPages: n };
    }

    fillMutation.mutate(
      { id: skugrId, body },
      {
        onSuccess: () => {
          setMaxPagesInput("");
          onOpenChange(false);
        },
      },
    );
  }, [fillMutation, maxPagesInput, onOpenChange, skugrId]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Заповнити групу товарами</DialogTitle>
            <DialogDescription>
              Запит до парсера браузера для конкурента{" "}
              <span className="font-medium">{konkName}</span>. Підтримка залежить від
              бекенда (наприклад Yumi). URL групи має вказувати на першу сторінку
              категорії.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="fill-max-pages">Макс. сторінок (необов&apos;язково)</Label>
            <Input
              id="fill-max-pages"
              type="number"
              min={1}
              max={200}
              inputMode="numeric"
              placeholder="1–200, порожньо = за замовчуванням"
              value={maxPagesInput}
              onChange={(e) => setMaxPagesInput(e.target.value)}
              disabled={fillMutation.isPending}
            />
          </div>

          <DialogActions
            onCancel={() => handleOpenChange(false)}
            onSubmit={submitFill}
            cancelText="Скасувати"
            submitText="Запустити"
            submitLoadingText="Завантаження..."
            isSubmitting={fillMutation.isPending}
            className="w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
