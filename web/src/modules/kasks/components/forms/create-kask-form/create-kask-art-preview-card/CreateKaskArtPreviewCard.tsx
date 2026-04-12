import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImage } from "@/modules/arts/components/elements/art-image/ArtImage";
import { ArtProdPreview } from "@/modules/arts/components/elements/art-prod-preview";
import { CreateKaskArtCardSkeleton } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-card-skeleton/CreateKaskArtCardSkeleton";
import {
  getArtPreviewUiState,
  type ArtPreviewUiState,
} from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-preview/get-art-preview-ui-state";
import type { ReactNode } from "react";

interface CreateKaskArtPreviewCardProps {
  artikul: string;
  isArtLoading: boolean;
  artData?: ArtDto;
}

function renderArtPreviewContent(state: ArtPreviewUiState): ReactNode {
  switch (state.kind) {
    case "loading":
      return <CreateKaskArtCardSkeleton />;
    case "ready":
      return (
        <div className="flex w-full flex-col items-center gap-3">
          <div className="w-full grid place-items-center overflow-hidden rounded-lg">
            <ArtImage artikul={state.artikul} />
          </div>
          {state.artData.nameukr && (
            <p className="text-foreground text-center text-sm leading-snug font-semibold">
              {state.artData.nameukr}
            </p>
          )}
          <div className="border-border w-full border-t pt-2">
            <ArtProdPreview
              art={state.artData}
              imageSize="xs"
              className="text-muted-foreground max-w-full justify-center text-center text-sm leading-snug"
              fallbackKeyClassName="text-muted-foreground text-sm leading-snug"
            />
          </div>
        </div>
      );
    case "hint": {
      const message =
        state.hintKind === "wrongLength" ? "9 символів" : "Введіть артикул";
      return (
        <div className="text-muted-foreground flex min-h-[6.5rem] w-full max-w-[7rem] flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-background/50 px-2 text-center text-xs leading-snug">
          <span className="font-medium">{message}</span>
        </div>
      );
    }
    case "idle":
      return null;
  }
}

export function CreateKaskArtPreviewCard({
  artikul,
  isArtLoading,
  artData,
}: CreateKaskArtPreviewCardProps) {
  const state = getArtPreviewUiState(artikul, isArtLoading, artData);

  return (
    <div className="bg-muted/40 border-border flex min-h-[11rem] w-full flex-col items-center justify-center rounded-xl border p-4 shadow-xs">
      {renderArtPreviewContent(state)}
    </div>
  );
}
