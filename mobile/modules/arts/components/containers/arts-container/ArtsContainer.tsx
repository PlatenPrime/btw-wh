import { useState } from "react";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsContainerView } from "./ArtsContainerView";

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
  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <ArtsContainerView
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      search={search}
      onSearchChange={onSearchChange}
      onEndReached={handleEndReached}
    />
  );
}
