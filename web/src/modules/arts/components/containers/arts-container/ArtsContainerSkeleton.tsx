import { SurfaceSection } from "@/components/shared/layout";
import { SearchPanelSkeleton } from '@/components/shared/search/search-panel/SearchPanelSkeleton';
import { ArtsGridSkeleton } from "@/modules/arts/components/lists/arts-grid/ArtsGridSkeleton.tsx";

export function ArtsContainerSkeleton() {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2">
      <SurfaceSection className="flex flex-col items-center gap-2 xl:flex-row">
        <SearchPanelSkeleton />
      </SurfaceSection>
      <SurfaceSection>
        <ArtsGridSkeleton />
      </SurfaceSection>

      <div className="h-8" />
    </main>
  );
}
