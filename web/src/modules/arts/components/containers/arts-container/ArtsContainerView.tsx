import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "@/modules/arts/components/lists/arts-grid/ArtsGrid.tsx";

interface ArtsContainerViewProps {
  data: ArtDto[];
  isFetchingNextPage: boolean;
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export function ArtsContainerView({
  data,
  isFetchingNextPage,
  search,
  onSearchChange,
  bottomRef,
}: ArtsContainerViewProps) {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2">
      <div className="flex flex-col items-center gap-2 xl:flex-row">
        <SearchPanel
          search={search}
          onSearchChange={(e) => onSearchChange(e.target.value)}
          placeholder="Пошук артикулів..."
        />
      </div>
      <Wrapper>
        <ArtsGrid arts={data} />
      </Wrapper>

      <div ref={bottomRef} className="h-8" />

      {isFetchingNextPage && (
        <div className="text-muted-foreground text-center">Завантаження...</div>
      )}
    </main>
  );
}
