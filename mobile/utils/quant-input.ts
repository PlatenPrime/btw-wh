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

/** Только цифры mid-edit (без leading-zero strip). */
export function filterDigitsInput(inputValue: string): string {
  return inputValue.replace(/\D/g, "");
}

export function normalizeDigitsInput(value: string): string {
  if (value === "") return "";
  return value.replace(/^0+/, "") || "0";
}
