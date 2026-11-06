import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";

interface InputQuantProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  label?: string;
  placeholder?: string;
  error?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  value?: string | number;
  // Поддержка react-hook-form
  name?: string;
  // Для работы с Controller
  field?: ControllerRenderProps<Record<string, unknown>, string>;
}

/** Фильтр на keystroke: только цифры и минус в начале, без снятия leading zeros. */
export function filterQuantInput(inputValue: string): string {
  const cleanValue = inputValue.replace(/[^0-9-]/g, "");
  const hasMinus = cleanValue.includes("-");
  const numericPart = cleanValue.replace(/-/g, "");

  if (hasMinus && !cleanValue.startsWith("-")) {
    return numericPart;
  }

  if (cleanValue === "" || cleanValue === "-") {
    return cleanValue;
  }

  return hasMinus ? `-${numericPart}` : numericPart;
}

/** Нормализация на blur: снять leading zeros, "-" → "". */
export function normalizeQuantInput(value: string): string {
  if (value === "" || value === "-") {
    return "";
  }

  const hasMinus = value.startsWith("-");
  const numericPart = value.replace(/-/g, "");

  if (numericPart === "") {
    return "";
  }

  const stripped = numericPart.replace(/^0+/, "") || "0";
  return hasMinus ? `-${stripped}` : stripped;
}

function toDisplayValue(value: unknown): string {
  if (value === undefined || value === null || value === "") {
    return "";
  }
  return String(value);
}

export const InputQuant = forwardRef<HTMLInputElement, InputQuantProps>(
  (
    {
      label,
      placeholder = "Введіть кількість",
      error,
      onValueChange,
      className,
      labelClassName,
      errorClassName,
      value,
      field,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const [draft, setDraft] = useState<string | null>(null);

    const emit = (next: string) => {
      if (field) field.onChange(next);
      onValueChange?.(next);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setDraft(toDisplayValue(field?.value ?? value));
      onFocus?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = filterQuantInput(e.target.value);
      setDraft(next);
      emit(next);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const raw = draft ?? toDisplayValue(field?.value ?? value);
      const normalized = normalizeQuantInput(raw);
      setDraft(null);
      emit(normalized);
      onBlur?.(e);
      field?.onBlur();
    };

    const displayValue =
      draft !== null ? draft : toDisplayValue(field?.value ?? value);

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Label
            htmlFor={props.id}
            className={cn("text-sm font-medium", labelClassName)}
          >
            {label}
          </Label>
        )}
        <Input
          {...props}
          ref={ref}
          type="text"
          inputMode="numeric"
          pattern="[0-9\-]*"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn("w-full", className)}
        />
        {error && (
          <p className={cn("text-destructive text-sm", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputQuant.displayName = "InputQuant";
