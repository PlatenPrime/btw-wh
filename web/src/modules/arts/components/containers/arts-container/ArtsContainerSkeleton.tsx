import { SearchPanelSkeleton } from "@/components/search-components/search-panel/SearchPanelSkeleton";
import { ArtsGridSkeleton } from "../../lists/arts-grid/ArtsGridSkeleton";

export function ArtsContainerSkeleton() {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2 md:gap-4 md:p-4">
      <SearchPanelSkeleton />
      <ArtsGridSkeleton />
      <div className="h-8" />
    </main>
  );
}
