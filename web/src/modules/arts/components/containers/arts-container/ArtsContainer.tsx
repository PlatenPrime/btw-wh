import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsContainerView } from "./ArtsContainerView";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface ArtsContainerProps {
  data: ArtDto[];
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
}

export function ArtsContainer({
  data,
  isFetching,
  hasNextPage,
  fetchNextPage,
  search,
  onSearchChange,
}: ArtsContainerProps) {

    const bottomRef = useInfiniteScroll({
        hasNextPage,
        isFetching,
        fetchNextPage,
      });
    
      const isEmptyData = data.length === 0 || !data;

  return (
 
      <ArtsContainerView
        data={data}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        search={search}
        onSearchChange={onSearchChange}
        bottomRef={bottomRef}
        isEmptyData={isEmptyData}
      />

  );
}
