import type { UseFormSetValue } from "react-hook-form";
import type { AskPosEditFormData } from "../schema";

interface HandleRemovedQuantChangeProps {
  name: keyof AskPosEditFormData;
  value: string;
  setValue: UseFormSetValue<AskPosEditFormData>;
}

export const handleRemovedQuantChangeUtil = ({
  name,
  value,
  setValue,
}: HandleRemovedQuantChangeProps) => {
  // Разрешаем только цифры и знак минус в начале
  const cleanValue = value.replace(/[^0-9-]/g, "");

  // Проверяем, что минус только в начале
  const hasMinus = cleanValue.includes("-");
  const numericPart = cleanValue.replace(/-/g, "");

  if (hasMinus && !cleanValue.startsWith("-")) {
    // Если минус не в начале, убираем его
    setValue(name, numericPart, { shouldValidate: true });
    return;
  }

  if (cleanValue === "" || cleanValue === "-") {
    setValue(name, "", { shouldValidate: true });
    return;
  }

  if (numericPart === "0") {
    setValue(name, hasMinus ? "-0" : "0", { shouldValidate: true });
    return;
  }

  // Убираем ведущие нули, но сохраняем знак
  const finalValue = hasMinus
    ? `-${numericPart.replace(/^0+/, "") || "0"}`
    : numericPart.replace(/^0+/, "") || "0";

  setValue(name, finalValue, { shouldValidate: true });
};

