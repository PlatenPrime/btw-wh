import { SurfaceSection } from "@/components/shared/layout";
import { RoleType } from "@/constants/roles";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";
import { ArtChartsSectionSkeleton } from "@/modules/arts/components/charts/art-charts-section";
import { AsksByArtikulContainerSkeleton } from "@/modules/asks/components/containers/asks-by-artikul-container";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container";

export function ArtContainerSkeleton() {
  const { hasRole } = useAuth();
  const showAdminExtras = hasRole(RoleType.ADMIN);

  return (
    <section className="grid gap-4">
      <SurfaceSection>
        <ArtDetailCardSkeleton />
      </SurfaceSection>

      <SurfaceSection>
        <PosesByArtikulContainerSkeleton />
      </SurfaceSection>

      {showAdminExtras ? (
        <SurfaceSection>
          <ArtChartsSectionSkeleton />
        </SurfaceSection>
      ) : null}

      <SurfaceSection>
        <AsksByArtikulContainerSkeleton />
      </SurfaceSection>
    </section>
  );
}
