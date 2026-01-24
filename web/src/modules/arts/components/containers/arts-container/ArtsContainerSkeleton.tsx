import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { SearchPanelSkeleton } from '@/components/shared/search-components/search-panel/SearchPanelSkeleton';
import { ArtsGridSkeleton } from "@/modules/arts/components/lists/arts-grid/ArtsGridSkeleton.tsx";

export function ArtsContainerSkeleton() {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2">
      <Wrapper className="flex flex-col items-center gap-2 xl:flex-row">
        <SearchPanelSkeleton />
      </Wrapper>
      <Wrapper>
        <ArtsGridSkeleton />
      </Wrapper>

      <div className="h-8" />
    </main>
  );
}
