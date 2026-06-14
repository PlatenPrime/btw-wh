import { SurfaceSection } from "@/components/shared/layout";
import { RoleType } from "@/constants/roles";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";
import { ArtChartsSectionSkeleton } from "@/modules/arts/components/charts/art-charts-section";
import { AnalogsByArtikulContainerSkeleton } from "@/modules/analogs/components/containers/analogs-by-artikul-container";
import { AsksByArtikulContainerSkeleton } from "@/modules/asks/components/containers/asks-by-artikul-container";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtContainerSkeleton() {
  const { hasRole } = useAuth();
  const showAdminExtras = hasRole(RoleType.ADMIN);

  return (
    <section className="grid gap-2">
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

      {showAdminExtras ? (
        <SurfaceSection className="grid gap-2">
          <Skeleton className="h-7 w-72" />
          <AnalogsByArtikulContainerSkeleton />
        </SurfaceSection>
      ) : null}

      <SurfaceSection>
        <AsksByArtikulContainerSkeleton />
      </SurfaceSection>
    </section>
  );
}
