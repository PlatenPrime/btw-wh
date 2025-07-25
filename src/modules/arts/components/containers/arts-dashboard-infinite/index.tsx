// components/dashboard/container-infinite.tsx
import { Status } from "@/components/status";
import { useArtsInfiniteQuery } from "@/modules/arts/api/hooks/useArtsInfiniteQuery";
import { useState } from "react";
import { InfiniteView } from "./view";

export function DashboardInfiniteContainer() {
  const [search, setSearch] = useState("");
  const limit = 20;

  const {
    data,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useArtsInfiniteQuery({
    limit,
    search,
  });

  if (isError) return <Status message="Помилка завантаження даних" isError />;

  return (
    <InfiniteView
      data={data?.pages.flatMap((page) => page.data) ?? []}
      isPending={isPending}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      search={search}
      onSearchChange={setSearch}
    />
  );
}
