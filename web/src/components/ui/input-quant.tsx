import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputQuantProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  placeholder?: string;
  error?: string;
  onValueChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
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
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Разрешаем только цифры и знак минус в начале
      const cleanValue = value.replace(/[^0-9-]/g, "");

      // Проверяем, что минус только в начале
      const hasMinus = cleanValue.includes("-");
      const numericPart = cleanValue.replace(/-/g, "");

      if (hasMinus && !cleanValue.startsWith("-")) {
        // Если минус не в начале, убираем его
        onValueChange(numericPart);
        return;
      }

      if (cleanValue === "" || cleanValue === "-") {
        onValueChange("");
        return;
      }

      if (numericPart === "0") {
        onValueChange(hasMinus ? "-0" : "0");
        return;
      }

      // Убираем ведущие нули, но сохраняем знак
      const finalValue = hasMinus
        ? `-${numericPart.replace(/^0+/, "") || "0"}`
        : numericPart.replace(/^0+/, "") || "0";

      onValueChange(finalValue);
    };

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
          ref={ref}
          type="number"
          placeholder={placeholder}
          onChange={handleChange}
          className={cn("w-full", className)}
          {...props}
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
