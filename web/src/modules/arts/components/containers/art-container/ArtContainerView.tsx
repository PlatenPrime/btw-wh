import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { PosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container";
import {
  AsksByArtikulContainer,
  AsksByArtikulContainerSkeleton,
} from "@/modules/asks/components/containers/asks-by-artikul-container";
import { AsksByArtikulFetcher } from "@/modules/asks/components/fetchers/asks-by-artikul-fetcher";
import {
  AnalogsByArtikulContainer,
  AnalogsByArtikulContainerSkeleton,
} from "@/modules/analogs/components/containers/analogs-by-artikul-container";
import { AnalogsByArtikulFetcher } from "@/modules/analogs/components/fetchers/analogs-by-artikul-fetcher";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { memo } from "react";

interface ArtContainerViewProps {
  artData: ArtDto;
}

export const ArtContainerView = memo(function ArtContainerView({
  artData,
}: ArtContainerViewProps) {
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

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

      <Wrapper className="grid gap-2">
        <h2 className="text-lg font-semibold">Аналоги з таким артикулом</h2>
        <AnalogsByArtikulFetcher
          artikul={artData.artikul}
          ContainerComponent={({ data }) => (
            <AnalogsByArtikulContainer
              data={data}
              konks={konks}
              prods={prods}
            />
          )}
          SkeletonComponent={AnalogsByArtikulContainerSkeleton}
        />
      </Wrapper>
    </section>
  );
});
