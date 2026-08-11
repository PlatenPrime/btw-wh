import { SERVER_URL } from "@/constants/server";

export type SharikImageSize = "prev" | "big";

function buildSharikMediaUrl(
  artikul: string | undefined,
  size: SharikImageSize,
): string {
  const trimmed = artikul?.trim();
  if (!trimmed) {
    return "";
  }

  return `${SERVER_URL}media/sharik/${encodeURIComponent(trimmed)}?size=${size}`;
}

export function getBigImageUrl(artikul: string | undefined): string {
  return buildSharikMediaUrl(artikul, "big");
}

export function getSmallImageUrl(artikul: string | undefined): string {
  return buildSharikMediaUrl(artikul, "prev");
}
