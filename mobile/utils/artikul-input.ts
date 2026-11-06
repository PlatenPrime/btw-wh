/** Mid-edit: только цифры, без авто-дефиса (чтобы не прыгал caret). */
export function filterArtikulInput(text: string): string {
  return text.replace(/\D/g, "").slice(0, 8);
}

/** Blur/submit: ЦЦЦЦ-ЦЦЦЦ из цифр. */
export function formatArtikulInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 4) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return digits;
}

export function artikulDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isCompleteArtikul(value: string): boolean {
  return artikulDigits(value).length === 8;
}
