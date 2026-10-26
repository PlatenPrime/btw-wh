import type { ArtDto } from "@/modules/arts/api/types/dto";
import { CreateKaskArtPreviewCard } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-preview-card/CreateKaskArtPreviewCard";

interface CreateKaskArtColumnProps {
  artikul: string;
  isArtLoading: boolean;
  artData?: ArtDto;
}

export function CreateKaskArtColumn({
  artikul,
  isArtLoading,
  artData,
}: CreateKaskArtColumnProps) {
  return (
    <aside className="mx-auto flex w-full max-w-[14rem] flex-col items-stretch md:mx-0 lg:max-w-none">
      <CreateKaskArtPreviewCard
        artikul={artikul}
        isArtLoading={isArtLoading}
        artData={artData}
      />
    </aside>
  );
}
