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
    setValue(name, numericPart, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    return;
  }

  if (cleanValue === "" || cleanValue === "-") {
    setValue(name, "", { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    return;
  }

  if (numericPart === "0") {
    setValue(name, hasMinus ? "-0" : "0", { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    return;
  }

  // Убираем ведущие нули, но сохраняем знак
  const finalValue = hasMinus
    ? `-${numericPart.replace(/^0+/, "") || "0"}`
    : numericPart.replace(/^0+/, "") || "0";

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'handleRemovedQuantChangeUtil.ts:43',message:'setValue called',data:{name,finalValue},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  setValue(name, finalValue, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
};

