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

  return (
    <div className="flex min-h-[2.75rem] flex-col items-center justify-center gap-1">
      <div className="flex min-h-[2.25rem] items-center justify-center">
        {isArtLoading && isFullArtikul && (
          <Skeleton className="h-9 w-36 rounded-full" />
        )}
        {!isArtLoading && artData && zoneValue && (
          <span className="border-primary/25 bg-primary/8 text-primary rounded-full border px-3.5 py-1.5 text-center text-base leading-none font-semibold tracking-tight">
            {zoneValue}
          </span>
        )}
      </div>
    </div>
  );
}
