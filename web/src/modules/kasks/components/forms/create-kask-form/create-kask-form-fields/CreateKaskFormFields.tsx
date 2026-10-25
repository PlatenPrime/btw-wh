import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateKaskFormData } from "@/modules/kasks/components/forms/create-kask-form/schema";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import {
  Hash,
  MessageCircle,
  ScanBarcode,
  Send,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

interface CreateKaskFormFieldsProps {
  register: UseFormRegister<CreateKaskFormData>;
  errors: FieldErrors<CreateKaskFormData>;
  onArtikulChange: (value: string) => void;
  isSubmitting: boolean;
  canSubmit: boolean;
}

function FieldLabel({
  htmlFor,
  icon: Icon,
  children,
}: {
  htmlFor: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className={cn(
        "text-foreground flex items-center gap-1.5",
        typography.formLabel,
      )}
    >
      <Icon
        className="size-3.5 shrink-0"
        style={{ color: "var(--chart-6)" }}
        aria-hidden
      />
      {children}
    </Label>
  );
}

export function CreateKaskFormFields({
  register,
  errors,
  onArtikulChange,
  isSubmitting,
  canSubmit,
}: CreateKaskFormFieldsProps) {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <FieldLabel htmlFor="kask-artikul" icon={ScanBarcode}>
          Артикул <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="kask-artikul"
          {...register("artikul")}
          onChange={(e) => onArtikulChange(e.target.value)}
          placeholder="ХХХХ-ХХХХ"
          maxLength={9}
          autoComplete="off"
          spellCheck={false}
          inputMode="text"
          className={cn(
            "font-mono text-sm tracking-wide",
            errors.artikul && "border-destructive",
          )}
          disabled={isSubmitting}
        />
        {errors.artikul ? (
          <p className={typography.formError}>{errors.artikul.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <FieldLabel htmlFor="kask-quant" icon={Hash}>
            Кількість
          </FieldLabel>
          <span className={cn("leading-none", typography.formHint)}>
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
          className={cn(
            "text-sm tabular-nums",
            errors.quant && "border-destructive",
          )}
          disabled={isSubmitting}
        />
        {errors.quant ? (
          <p className={typography.formError}>{errors.quant.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <FieldLabel htmlFor="kask-com" icon={MessageCircle}>
            Коментар
          </FieldLabel>
          <span className={cn("leading-none", typography.formHint)}>
            необов&apos;язково
          </span>
        </div>
        <Textarea
          id="kask-com"
          placeholder="Додаткові побажання до запиту…"
          rows={3}
          {...register("com")}
          className={cn(
            "min-h-[4.5rem] h-full resize-y text-sm",
            errors.com && "border-destructive",
          )}
          disabled={isSubmitting}
        />
        {errors.com ? (
          <p className={typography.formError}>{errors.com.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col justify-end gap-2">
        <span className={cn("invisible leading-none", typography.formLabel)}>
          Дія
        </span>
        <Button
          type="submit"
          disabled={isSubmitting || !canSubmit}
          size="lg"
          className={cn(
            "min-h-[4.5rem] w-full gap-2 text-primary-foreground",
            "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary)_92%,var(--chart-6)),color-mix(in_oklch,var(--chart-6)_55%,var(--primary)))]",
            "hover:brightness-[1.06] hover:shadow-md",
            "disabled:hover:brightness-100",
          )}
        >
          <Send className="size-4" aria-hidden />
          {isSubmitting ? "Відправка…" : "Створити запит"}
        </Button>
      </div>
    </div>
  );
}
