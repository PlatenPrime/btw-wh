import type { UseFormSetValue } from "react-hook-form";
import type { AskPosEditFormData } from "../schema";

interface HandleRemovedBoxesChangeProps {
  name: keyof AskPosEditFormData;
  value: string;
  setValue: UseFormSetValue<AskPosEditFormData>;
}

/** Pass-through: фильтрация/нормализация делается в InputQuant. */
export const handleRemovedBoxesChangeUtil = ({
  name,
  value,
  setValue,
}: HandleRemovedBoxesChangeProps) => {
  setValue(name, value, { shouldValidate: true });
};
