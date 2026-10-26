import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateKaskFormData } from "@/modules/kasks/components/forms/create-kask-form/schema";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { Hash, MessageCircle, ScanBarcode, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface CreateKaskFormFieldsProps {
  register: UseFormRegister<CreateKaskFormData>;
  errors: FieldErrors<CreateKaskFormData>;
  onArtikulChange: (value: string) => void;
  isSubmitting: boolean;
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

function FieldError({ message }: { message?: string }) {
  return (
    <p className={cn(typography.formError, "min-h-5")} aria-live="polite">
      {message || "\u00a0"}
    </p>
  );
}

export function CreateKaskFormFields({
  register,
  errors,
  onArtikulChange,
  isSubmitting,
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
        <FieldError message={errors.artikul?.message} />
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
        <FieldError message={errors.quant?.message} />
      </div>

      <div className="grid gap-2 sm:col-span-2">
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
            "min-h-[4.5rem] resize-y text-sm",
            errors.com && "border-destructive",
          )}
          disabled={isSubmitting}
        />
        <FieldError message={errors.com?.message} />
      </div>
    </div>
  );
}
