import { SearchPanelSkeleton } from '@/components/shared/search-components/search-panel/SearchPanelSkeleton';
import { ArtsGridSkeleton } from "@/modules/arts/components/lists/arts-grid/ArtsGridSkeleton.tsx";

export function ArtsContainerSkeleton() {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2 md:gap-4 md:p-4">
      <SearchPanelSkeleton />
      <ArtsGridSkeleton />
      <div className="h-8" />
    </main>
  );
}
