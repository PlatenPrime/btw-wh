import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
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
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Разрешаем только цифры и знак минус в начале
      const cleanValue = inputValue.replace(/[^0-9-]/g, "");

      // Проверяем, что минус только в начале
      const hasMinus = cleanValue.includes("-");
      const numericPart = cleanValue.replace(/-/g, "");

      if (hasMinus && !cleanValue.startsWith("-")) {
        // Если минус не в начале, убираем его
        const finalValue = numericPart;
        if (field) field.onChange(finalValue);
        if (onValueChange) onValueChange(finalValue);
        return;
      }

      if (cleanValue === "" || cleanValue === "-") {
        const finalValue = "";
        if (field) field.onChange(finalValue);
        if (onValueChange) onValueChange(finalValue);
        return;
      }

      // Убираем ведущие нули
      const finalValue = hasMinus
        ? `-${numericPart.replace(/^0+/, "") || "0"}`
        : numericPart.replace(/^0+/, "") || "0";

      if (field) field.onChange(finalValue);
      if (onValueChange) onValueChange(finalValue);
    };

    // Форматируем значение для отображения - пустое поле показываем как пустое
    const currentValue = field?.value ?? value;
    const displayValue =
      currentValue === undefined || currentValue === null || currentValue === ""
        ? ""
        : String(currentValue);

    return (
      <div className="space-y-2">
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
