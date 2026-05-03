import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

export interface DeleteOrphanSkusDialogViewProps {
  hasPageFilters: boolean;
  applyPageFilters: boolean;
  onApplyPageFiltersChange: (checked: boolean) => void;
  filterSummaryLines: string[];
  isDeleting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export function DeleteOrphanSkusDialogView({
  hasPageFilters,
  applyPageFilters,
  onApplyPageFiltersChange,
  filterSummaryLines,
  isDeleting,
  onSubmit,
  onCancel,
}: DeleteOrphanSkusDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Видалити SKU без групи</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Небезпечна дія</AlertTitle>
          <AlertDescription>
            Будуть остаточно видалені усі SKU, що не входять до жодної товарної
            групи. Дію не можна скасувати; історія залишків, продажів і цін за
            цими товарами стане недоступною.
          </AlertDescription>
        </Alert>

        {hasPageFilters ? (
          <div className="grid gap-3">
            <div className="flex gap-3">
              <Checkbox
                id="delete-orphans-apply-filters"
                checked={applyPageFilters}
                onCheckedChange={(v) =>
                  onApplyPageFiltersChange(v === true)
                }
                disabled={isDeleting}
              />
              <div className="grid gap-1">
                <Label htmlFor="delete-orphans-apply-filters" className="font-medium">
                  Застосувати поточні фільтри сторінки
                </Label>
                <ul className="text-muted-foreground list-inside list-disc text-sm">
                  {filterSummaryLines.map((line, index) => (
                    <li key={`${index}-${line}`}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
            {!applyPageFilters ? (
              <p className="text-muted-foreground text-sm">
                Будуть видалені <strong>усі</strong> SKU без групи в системі,
                незалежно від фільтрів вище.
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            На сторінці немає додаткових фільтрів — будуть видалені{" "}
            <strong>усі</strong> SKU без групи в системі.
          </p>
        )}

        <DialogActions
          onCancel={onCancel}
          onSubmit={onSubmit}
          isSubmitting={isDeleting}
          submitText="Видалити сиріт"
          submitLoadingText="Видалення..."
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
