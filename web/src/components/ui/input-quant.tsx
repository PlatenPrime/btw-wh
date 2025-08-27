import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Input } from "./input";
import { Label } from "./label";

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

      // Убираем все нецифровые символы
      const numericValue = value.replace(/\D/g, "");

      // Если поле пустое, передаем пустую строку
      if (numericValue === "") {
        onValueChange("");
        return;
      }

      // Если введен только 0, передаем как есть
      if (numericValue === "0") {
        onValueChange("0");
        return;
      }

      // Убираем лидирующие нули для ненулевых значений
      const cleanValue = numericValue.replace(/^0+/, "");
      onValueChange(cleanValue);
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
          type="text"
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
