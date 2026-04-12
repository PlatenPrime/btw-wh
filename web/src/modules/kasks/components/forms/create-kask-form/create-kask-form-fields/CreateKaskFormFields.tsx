import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateKaskFormData } from "@/modules/kasks/components/forms/create-kask-form/schema";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface CreateKaskFormFieldsProps {
  register: UseFormRegister<CreateKaskFormData>;
  errors: FieldErrors<CreateKaskFormData>;
  onArtikulChange: (value: string) => void;
  isSubmitting: boolean;
}

export function CreateKaskFormFields({
  register,
  errors,
  onArtikulChange,
  isSubmitting,
}: CreateKaskFormFieldsProps) {
  return (
    <div className="grid w-full max-w-md gap-5">
      <div className="grid gap-2">
        <Label htmlFor="kask-artikul" className="text-foreground text-sm">
          Артикул <span className="text-destructive">*</span>
        </Label>
        <Input
          id="kask-artikul"
          {...register("artikul")}
          onChange={(e) => onArtikulChange(e.target.value)}
          placeholder="ХХХХ-ХХХХ"
          maxLength={9}
          autoComplete="off"
          spellCheck={false}
          inputMode="text"
          className={`text-sm font-mono tracking-wide ${errors.artikul ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.artikul && (
          <p className="text-destructive text-xs leading-snug">
            {errors.artikul.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Label htmlFor="kask-quant" className="text-foreground text-sm">
            Кількість
          </Label>
          <span className="text-muted-foreground text-xs leading-none">
            необов&apos;язково
          </span>
        </div>
        <Input
          id="kask-quant"
          type="number"
          min={1}
          step={1}
          inputMode="numeric"
          placeholder="—"
          {...register("quant")}
          className={`text-sm tabular-nums ${errors.quant ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.quant && (
          <p className="text-destructive text-xs leading-snug">
            {errors.quant.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Label htmlFor="kask-com" className="text-foreground text-sm">
            Коментар
          </Label>
          <span className="text-muted-foreground text-xs leading-none">
            необов&apos;язково
          </span>
        </div>
        <Textarea
          id="kask-com"
          placeholder="Додаткові побажання до запиту…"
          rows={3}
          {...register("com")}
          className={`min-h-[4.5rem] resize-y text-sm ${errors.com ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.com && (
          <p className="text-destructive text-xs leading-snug">
            {errors.com.message}
          </p>
        )}
      </div>
    </div>
  );
}
