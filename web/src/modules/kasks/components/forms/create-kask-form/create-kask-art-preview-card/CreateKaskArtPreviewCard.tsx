import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImage } from "@/modules/arts/components/elements/art-image/ArtImage";
import { ArtProdPreview } from "@/modules/arts/components/elements/art-prod-preview";
import { CreateKaskArtCardSkeleton } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-card-skeleton/CreateKaskArtCardSkeleton";
import {
  getArtPreviewUiState,
  type ArtPreviewUiState,
} from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-preview/get-art-preview-ui-state";
import { ScanBarcode, Sparkles } from "lucide-react";
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
          <div className="grid w-full place-items-center overflow-hidden rounded-lg">
            <ArtImage artikul={state.artikul} />
          </div>
          {state.artData.nameukr ? (
            <p
              className={cn(
                "text-center font-semibold leading-snug",
                typography.formLabel,
              )}
            >
              {state.artData.nameukr}
            </p>
          ) : null}
          <div className="border-border w-full border-t pt-2">
            <ArtProdPreview
              art={state.artData}
              imageSize="xs"
              className={cn(
                "max-w-full justify-center text-center leading-snug",
                typography.pageDescription,
              )}
              fallbackKeyClassName={cn(
                "leading-snug",
                typography.pageDescription,
              )}
            />
          </div>
        </div>
      );
    case "hint": {
      const isWrongLength = state.hintKind === "wrongLength";
      const Icon = isWrongLength ? ScanBarcode : Sparkles;
      const message = isWrongLength ? "9 символів" : "Введіть артикул";
      const hint = isWrongLength
        ? "Перевірте формат ХХХХ-ХХХХ"
        : "Зображення з’явиться після введення";

      return (
        <div
          className={cn(
            "relative flex min-h-[10rem] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-dashed px-4 py-6 text-center",
            typography.formHint,
          )}
          style={{
            borderColor:
              "color-mix(in oklch, var(--chart-6) 35%, var(--border))",
            background:
              "color-mix(in oklch, var(--chart-6) 8%, var(--background))",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 20%, color-mix(in oklch, var(--chart-6) 28%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 80% 90%, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 55%)",
            }}
          />
          <div
            className="relative flex size-11 items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(145deg, color-mix(in oklch, var(--chart-6) 26%, transparent), color-mix(in oklch, var(--primary) 16%, transparent))",
              color: "var(--chart-6)",
            }}
          >
            <Icon className="size-5" aria-hidden />
          </div>
          <div className="relative grid gap-1">
            <span className={cn("text-foreground", typography.formLabel)}>
              {message}
            </span>
            <span>{hint}</span>
          </div>
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
    <div
      className="relative flex min-h-[11rem] w-full flex-col items-center justify-center overflow-hidden rounded-xl border p-3"
      style={{
        background:
          "linear-gradient(160deg, color-mix(in oklch, var(--chart-6) 10%, var(--muted)), color-mix(in oklch, var(--primary) 6%, var(--muted)))",
        borderColor:
          "color-mix(in oklch, var(--chart-6) 22%, var(--border))",
      }}
    >
      {renderArtPreviewContent(state)}
    </div>
  );
}
