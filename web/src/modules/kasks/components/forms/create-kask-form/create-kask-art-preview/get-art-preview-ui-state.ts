import type { ArtDto } from "@/modules/arts/api/types/dto";

export type ArtPreviewUiState =
  | { kind: "loading" }
  | { kind: "ready"; artikul: string; artData: ArtDto }
  | { kind: "hint"; hintKind: "empty" | "wrongLength" }
  | { kind: "idle" };

export function getArtPreviewUiState(
  artikul: string,
  isArtLoading: boolean,
  artData?: ArtDto,
): ArtPreviewUiState {
  if (isArtLoading && artikul.length === 9) {
    return { kind: "loading" };
  }
  if (!isArtLoading && artData && artikul.length === 9) {
    return { kind: "ready", artikul, artData };
  }
  if (!isArtLoading && (!artData || artikul.length !== 9)) {
    const hintKind =
      artikul.length > 0 && artikul.length !== 9 ? "wrongLength" : "empty";
    return { kind: "hint", hintKind };
  }
  return { kind: "idle" };
}
