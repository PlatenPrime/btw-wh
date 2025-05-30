import { SelectLimit } from "@/components/select-limit";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { FetchStatus } from "@tanstack/react-query";
import { Search } from "lucide-react";

export function Toolbar({
  total,
  search,
  onSearchChange,
  limit,
  onLimitChange,
  fetchStatus,
  isPending,
}: {
  total: number;
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  fetchStatus: FetchStatus;
  isPending: boolean;
}) {
  if (isPending) {
    return <Skeleton className="h-12" />;
  }

  return (
    <section className="flex flex-col md:flex-row items-center md:justify-between gap-4 items-center">
      <div className="flex items-center gap-2 w-full md:w-auto relative">
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50" />
        <Input
          placeholder="Пошук артикулів"
          value={search}
          onChange={onSearchChange}
          className="w-full pl-8"
        />
      </div>

      <div className="flex justify-between items-center gap-4 w-full md:w-auto">
        <p className="flex items-center gap-1 text-muted-foreground">
          {fetchStatus === "fetching" ? (
            <span className="animate-spin">🔄</span>
          ) : (
            <span>📊</span>
          )}
          {total}
        </p>

        <SelectLimit
          limitOptions={[5, 10, 20, 50, 100]}
          limit={limit}
          setLimit={onLimitChange}
        />
      </div>
    </section>
  );
}
