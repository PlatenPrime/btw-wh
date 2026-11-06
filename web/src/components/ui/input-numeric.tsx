import { Input } from "@/components/ui/input.tsx";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

export function filterIntegerInput(value: string): string {
  return value.replace(/\D/g, "");
}

/** Цифры и одна точка (для stock/price). Без strip leading zeros mid-edit. */
export function filterDecimalInput(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const dot = cleaned.indexOf(".");
  if (dot === -1) return cleaned;
  return (
    cleaned.slice(0, dot + 1) + cleaned.slice(dot + 1).replace(/\./g, "")
  );
}

function toDisplayValue(value: unknown): string {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value === "number" && !Number.isFinite(value)) return "";
  return String(value);
}

function parseNumericString(
  value: string,
  allowDecimal: boolean,
): number | undefined {
  if (value === "" || value === ".") return undefined;
  const parsed = allowDecimal ? Number(value) : Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export interface InputNumericProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "type"
  > {
  value?: string | number | null;
  /** Сырая строка как набрано (для caret). */
  onValueChange?: (value: string) => void;
  /** Число для RHF number-полей; undefined если пусто/невалидно. */
  onNumberChange?: (value: number | undefined) => void;
  allowDecimal?: boolean;
  emptyAsNaN?: boolean;
}

/**
 * Controlled numeric input без прыжка caret:
 * draft на фокусе, type=text, filter без укорачивания leading zeros.
 */
export const InputNumeric = forwardRef<HTMLInputElement, InputNumericProps>(
  (
    {
      value,
      onValueChange,
      onNumberChange,
      allowDecimal = false,
      emptyAsNaN = false,
      onFocus,
      onBlur,
      className,
      inputMode,
      ...props
    },
    ref,
  ) => {
    const [draft, setDraft] = useState<string | null>(null);
    const filter = allowDecimal ? filterDecimalInput : filterIntegerInput;
    const displayValue =
      draft !== null ? draft : toDisplayValue(value);

    const emit = (next: string) => {
      onValueChange?.(next);
      if (onNumberChange) {
        const parsed = parseNumericString(next, allowDecimal);
        if (parsed === undefined && emptyAsNaN) {
          onNumberChange(Number.NaN);
          return;
        }
        onNumberChange(parsed);
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode={inputMode ?? (allowDecimal ? "decimal" : "numeric")}
        pattern={allowDecimal ? "[0-9.]*" : "[0-9]*"}
        value={displayValue}
        className={cn(className)}
        onFocus={(event) => {
          setDraft(toDisplayValue(value));
          onFocus?.(event);
        }}
        onChange={(event) => {
          const next = filter(event.target.value);
          setDraft(next);
          emit(next);
        }}
        onBlur={(event) => {
          const raw = draft ?? toDisplayValue(value);
          const next = filter(raw);
          setDraft(null);
          emit(next);
          onBlur?.(event);
        }}
      />
    );
  },
);

InputNumeric.displayName = "InputNumeric";
