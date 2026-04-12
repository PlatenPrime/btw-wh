import type { ArtDto } from "@/modules/arts/api/types/dto";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { CreateKaskArtPreviewCard } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-preview-card/CreateKaskArtPreviewCard";
import { CreateKaskZoneRow } from "@/modules/kasks/components/forms/create-kask-form/create-kask-zone-row/CreateKaskZoneRow";

interface CreateKaskArtColumnProps {
  artikul: string;
  isArtLoading: boolean;
  artData?: ArtDto;
  zoneValue: string;
}

export function CreateKaskArtColumn({
  artikul,
  isArtLoading,
  artData,
  zoneValue,
}: CreateKaskArtColumnProps) {
  return (
    <aside className="mx-auto flex w-full max-w-[15.5rem] flex-col items-stretch gap-4 md:mx-0">
      <CreateKaskArtPreviewCard
        artikul={artikul}
        isArtLoading={isArtLoading}
        artData={artData}
      />
      <CreateKaskZoneRow
        artikul={artikul}
        isArtLoading={isArtLoading}
        artData={artData}
        zoneValue={zoneValue}
      />
      {artikul.length === 9 && (
        <div className="bg-muted/40 border-border w-full rounded-lg border p-3">
          <BtradeArtDataFetcher
            artikul={artikul}
            ContainerComponent={BtradeArtDataContainer}
            SkeletonComponent={BtradeArtDataSkeleton}
          />
        </div>
      )}
    </aside>
  );
}
