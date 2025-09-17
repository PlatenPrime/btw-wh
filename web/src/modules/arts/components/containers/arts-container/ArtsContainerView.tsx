import { SearchPanel } from '@/components/shared/search-components/search-panel/SearchPanel';
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "@/modules/arts/components/lists/arts-grid/ArtsGrid.tsx";

interface ArtsContainerViewProps {
  data: ArtDto[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  isEmptyData: boolean;
}

export function ArtsContainerView({
  data,
  isFetchingNextPage,
  hasNextPage,
  search,
  onSearchChange,
  bottomRef,
  isEmptyData,
}: ArtsContainerViewProps) {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2 md:gap-4 md:p-4">
      <div className="flex flex-col items-center gap-4 xl:flex-row">
        <SearchPanel
          search={search}
          onSearchChange={(e) => onSearchChange(e.target.value)}
          placeholder="Пошук артикулів"
        />
      </div>
      <ArtsGrid arts={data}  />
      <div ref={bottomRef} className="h-8" />

      {isFetchingNextPage && (
        <div className="text-muted-foreground text-center">Завантаження...</div>
      )}
      {!hasNextPage && !isFetchingNextPage && !isEmptyData && (
        <div className="text-muted-foreground text-center">
          Кінець списку, більше немає даних
        </div>
      )}
    </main>
  );
}
