import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import {
  AnalogsByArtikulContainer,
  AnalogsByArtikulContainerSkeleton,
} from "@/modules/analogs/components/containers/analogs-by-artikul-container";
import { AnalogsByArtikulFetcher } from "@/modules/analogs/components/fetchers/analogs-by-artikul-fetcher";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";

interface ArtAnalogsByArtikulSectionProps {
  artikul: string;
}

/**
 * Блок аналогів за артикулом (API ≥ ADMIN). Монтується лише коли батько має право.
 */
export function ArtAnalogsByArtikulSection({
  artikul,
}: ArtAnalogsByArtikulSectionProps) {
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

  return (
    <SurfaceSection className="grid gap-2">
      <h2 className="text-lg font-semibold">Аналоги з таким артикулом</h2>
      <AnalogsByArtikulFetcher
        artikul={artikul}
        ContainerComponent={({ data }) => (
          <AnalogsByArtikulContainer data={data} konks={konks} prods={prods} />
        )}
        SkeletonComponent={AnalogsByArtikulContainerSkeleton}
      />
    </SurfaceSection>
  );
}
