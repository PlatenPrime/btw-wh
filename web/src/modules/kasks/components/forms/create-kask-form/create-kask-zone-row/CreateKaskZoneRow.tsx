import { Skeleton } from "@/components/ui/skeleton";
import type { ArtDto } from "@/modules/arts/api/types/dto";

interface CreateKaskZoneRowProps {
  artikul: string;
  isArtLoading: boolean;
  artData?: ArtDto;
  zoneValue: string;
}

export function CreateKaskZoneRow({
  artikul,
  isArtLoading,
  artData,
  zoneValue,
}: CreateKaskZoneRowProps) {
  const isFullArtikul = artikul.length === 9;
  const showLoading = isArtLoading && isFullArtikul;
  const showZone = !isArtLoading && Boolean(artData) && Boolean(zoneValue);

  if (!showLoading && !showZone) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      {showLoading ? <Skeleton className="h-9 w-36 rounded-full" /> : null}
      {showZone ? (
        <span
          className="rounded-full border px-3.5 py-1.5 text-center text-base leading-none font-semibold tracking-tight"
          style={{
            borderColor:
              "color-mix(in oklch, var(--chart-6) 35%, var(--border))",
            background:
              "color-mix(in oklch, var(--chart-6) 14%, transparent)",
            color: "var(--chart-6)",
          }}
        >
          {zoneValue}
        </span>
      ) : null}
    </div>
  );
}
