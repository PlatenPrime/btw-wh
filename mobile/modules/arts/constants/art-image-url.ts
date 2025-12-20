export function getBigImageUrl(artikul: string | undefined): string {
  return `https://sharik.ua/images/elements_big/${artikul}_m1.jpg`;
}

export function getSmallImageUrl(artikul: string | undefined): string {
  return `https://sharik.ua/images/elements_big_prev/prev_${artikul}_m1.jpg`;
}
