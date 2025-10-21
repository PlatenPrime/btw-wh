import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsContainerView } from "@/modules/arts/components/containers/arts-container/ArtsContainerView.tsx";

interface ArtsContainerProps {
  data: ArtDto[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
}

export function ArtsContainer({
  data,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  search,
  onSearchChange,
}: ArtsContainerProps) {
  const bottomRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });


  return (
    <ArtsContainerView
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      search={search}
      onSearchChange={onSearchChange}
      bottomRef={bottomRef}
    />
  );
}
