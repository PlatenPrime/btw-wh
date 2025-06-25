// components/dashboard/view-infinite.tsx
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { ArtDto } from "../../types/dto";
import { Grid } from "../dashboard-grid";
import { SearchPanel } from "../dashboard-search";

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

  return (
    <main className="max-w-screen grid grid-cols-1 gap-2 md:gap-4 p-2 md:p-4">
      <div className="flex flex-col xl:flex-row items-center gap-4">
        <SearchPanel
          search={search}
          onSearchChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Grid arts={data} isPending={isPending} isFetching={isFetchingNextPage} />

      <div ref={bottomRef} className="h-16" />
    </main>
  );
}
