import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { RoleType } from "@/constants/roles";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { ArtAnalogsByArtikulSection } from "@/modules/arts/components/containers/art-container/ArtAnalogsByArtikulSection";
import { PosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container";
import {
  AsksByArtikulContainer,
  AsksByArtikulContainerSkeleton,
} from "@/modules/asks/components/containers/asks-by-artikul-container";
import { AsksByArtikulFetcher } from "@/modules/asks/components/fetchers/asks-by-artikul-fetcher";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { memo } from "react";

interface ArtContainerViewProps {
  artData: ArtDto;
}

export const ArtContainerView = memo(function ArtContainerView({
  artData,
}: ArtContainerViewProps) {
  const { hasRole } = useAuth();
  const canViewAnalogsBlock = hasRole(RoleType.ADMIN);

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

      {canViewAnalogsBlock ? (
        <ArtAnalogsByArtikulSection artikul={artData.artikul} />
      ) : null}
    </section>
  );
});
