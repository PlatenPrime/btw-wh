// components/dashboard/view-infinite.tsx
import { SearchPanel } from "@/components/search-panel";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "../arts-grid";

interface InfiniteViewProps {
  data: ArtDto[];
  isPending: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  search: string;
  onSearchChange: (search: string) => void;
}

export function InfiniteView({
  data,
  isPending,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  search,
  onSearchChange,
}: InfiniteViewProps) {
  const bottomRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    fetchNextPage,
  });

  const emptyData = data.length === 0 || !data;

  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2 md:gap-4 md:p-4">
      <div className="flex flex-col items-center gap-4 xl:flex-row">
        <SearchPanel
          search={search}
          onSearchChange={(e) => onSearchChange(e.target.value)}
          placeholder="Пошук артикулів"
        />
      </div>

      <ArtsGrid
        arts={data}
        isPending={isPending}
        isFetching={isFetchingNextPage}
      />
      {isFetchingNextPage && (
        <div className="text-muted-foreground text-center">Завантаження...</div>
      )}
      {!hasNextPage && !isFetchingNextPage && !emptyData && (
        <div className="text-muted-foreground text-center">
          Кінець списку, більше немає даних
        </div>
      )}

      {/* This div is used to trigger the infinite scroll */}

      <div ref={bottomRef} className="h-8" />
    </main>
  );
}
