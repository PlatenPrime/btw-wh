import { FieldErrorDisplay } from '@/components/shared/error-components/form-error-display';
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { IPallet } from "@/modules/pallets/api/types";
import type { UseFormReturn } from "react-hook-form";
import type { MovePalletPosesFormData } from "./MovePalletPosesForm";

export interface MovePalletPosesFormViewProps {
  form: UseFormReturn<MovePalletPosesFormData>;
  pallets: IPallet[];
  isLoading: boolean;
}

export function MovePalletPosesFormView({
  form,
  pallets,
  isLoading,
}: MovePalletPosesFormViewProps) {
  const selectedId = form.watch("toPalletId");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label htmlFor="toPalletId">Цільова паллета</Label>
        <FieldErrorDisplay error={form.formState.errors.toPalletId?.message} />
      </div>

      <div className="flex max-h-64 flex-col gap-2 overflow-auto rounded-md border p-2">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : pallets.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            Нічого не знайдено
          </div>
        ) : (
          pallets.map((p) => {
            const isEmpty = Array.isArray(p.poses)
              ? p.poses.length === 0
              : true;
            const disabled = !isEmpty;
            return (
              <label
                key={p._id}
                className="hover:bg-muted/50 flex items-center justify-between gap-3 rounded-md px-2 py-1.5"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="toPalletId"
                    value={p._id}
                    checked={selectedId === p._id}
                    onChange={(e) =>
                      form.setValue("toPalletId", e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    disabled={disabled}
                    className="h-4 w-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{p.title}</span>
                    <span className="text-muted-foreground text-xs">
                      Ряд: {p.rowData?.title}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isEmpty ? (
                    <Badge variant="secondary">Порожня</Badge>
                  ) : (
                    <Badge variant="destructive">Зайнята</Badge>
                  )}
                </div>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}
