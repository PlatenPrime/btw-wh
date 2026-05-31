import { SurfaceSection } from "@/components/shared/layout";
import { KonkCardSkeleton } from "@/modules/konks/components/cards/konk-card";

const SKELETON_ITEMS_COUNT = 8;

export function KonksGridSkeleton() {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2">
      {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
        <KonkCardSkeleton key={index} />
      ))}
    </SurfaceSection>
  );
}
