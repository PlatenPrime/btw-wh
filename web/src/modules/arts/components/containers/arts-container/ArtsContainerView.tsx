import { SearchPanel } from "@/components/search-panel";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "../../lists/arts-grid/ArtsGrid";

interface ArtsContainerViewProps {
  data: ArtDto[];
  isFetching: boolean;
  hasNextPage: boolean;
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  isEmptyData: boolean;
}

export function ArtsContainerView({
  data,
  isFetching,
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
      <ArtsGrid arts={data} isFetching={isFetching} />
      <div ref={bottomRef} className="h-8" />

      {isFetching && (
        <div className="text-muted-foreground text-center">Завантаження...</div>
      )}
      {!hasNextPage && !isFetching && !isEmptyData && (
        <div className="text-muted-foreground text-center">
          Кінець списку, більше немає даних
        </div>
      )}
    </main>
  );
}
