import type { UseFormSetValue } from "react-hook-form";
import type { AskPosEditFormData } from "../schema";

interface HandleRemovedQuantChangeProps {
  name: keyof AskPosEditFormData;
  value: string;
  setValue: UseFormSetValue<AskPosEditFormData>;
}

/** Pass-through: фильтрация/нормализация в NumericDraftField. */
export const handleRemovedQuantChangeUtil = ({
  name,
  value,
  setValue,
}: HandleRemovedQuantChangeProps) => {
  setValue(name, value, {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  });
};
