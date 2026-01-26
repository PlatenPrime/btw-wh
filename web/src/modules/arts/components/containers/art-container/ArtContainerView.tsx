import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { PosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container";
import {
  AsksByArtikulContainer,
  AsksByArtikulContainerSkeleton,
} from "@/modules/asks/components/containers/asks-by-artikul-container";
import { AsksByArtikulFetcher } from "@/modules/asks/components/fetchers/asks-by-artikul-fetcher";
import { memo } from "react";

interface ArtContainerViewProps {
  artData: ArtDto;
}

export const ArtContainerView = memo(function ArtContainerView({
  artData,
}: ArtContainerViewProps) {
  return (
    <section className="grid gap-2">
      <Wrapper>
        <ArtDetailCard artData={artData} />
      </Wrapper>

      <Wrapper>
        <PosesByArtikulContainer artikul={artData.artikul} />
      </Wrapper>

      <Wrapper>
        <AsksByArtikulFetcher
          artikul={artData.artikul}
          ContainerComponent={AsksByArtikulContainer}
          SkeletonComponent={AsksByArtikulContainerSkeleton}
        />
      </Wrapper>
    </section>
  );
});
