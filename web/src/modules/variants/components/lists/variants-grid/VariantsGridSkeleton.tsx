import { SurfaceSection } from "@/components/shared/layout";
import { VariantGridCardSkeleton } from "@/modules/variants/components/cards/variant-grid-card/VariantGridCardSkeleton";

interface VariantsGridSkeletonProps {
  count?: number;
}

export function VariantsGridSkeleton({
  count = 10,
}: VariantsGridSkeletonProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <VariantGridCardSkeleton key={index} />
      ))}
    </SurfaceSection>
  );
}

