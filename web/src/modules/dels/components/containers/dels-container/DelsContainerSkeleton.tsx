import { SurfaceSection } from "@/components/shared/layout";
import { DelCardSkeleton } from "@/modules/dels/components/cards/del-card";

export function DelsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <SurfaceSection className="grid grid-cols-1 gap-2 p-2 ">
        {Array.from({ length: 8 }).map((_, index) => (
          <DelCardSkeleton key={index} />
        ))}
      </SurfaceSection>
    </div>
  );
}
