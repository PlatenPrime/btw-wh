import { PaginationControls } from "@/components/shared/pagination-controls";
import { SearchFiltersLayout } from "@/components/shared/search-components/search-filters-layout";
import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ArtDto, ArtsDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "@/modules/arts/components/lists/arts-grid/ArtsGrid.tsx";

interface ArtsContainerViewProps {
  data: ArtsDto;
  arts: ArtDto[];
  isPending: boolean;
  page: number;
  limit: number;
  search: string;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearchChange: (search: string) => void;
}

export function ArtsContainerView({
  data,
  arts,
  isPending,
  page,
  limit,
  search,
  onPageChange,
  onLimitChange,
  onSearchChange,
}: ArtsContainerViewProps) {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2">
      <Wrapper className="grid gap-2">
        <SearchFiltersLayout
          searchSlot={
            <div className="max-w-md">
              <SearchPanel
                search={search}
                onSearchChange={(e) => onSearchChange(e.target.value)}
                placeholder="Пошук: артикул, prodName (ключ виробника), назви..."
              />
            </div>
          }
          filtersSlot={
            <div className="flex flex-wrap items-center gap-2">
              <SelectLimit
                limit={limit}
                setLimit={onLimitChange}
                limitOptions={[10, 20, 50, 100]}
              />
            </div>
          }
        />
      </Wrapper>
      <Wrapper>
        <div className="grid gap-2">
          <PaginationControls
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={onPageChange}
            isPending={isPending}
          />
          <ArtsGrid arts={arts} />
        </div>
      </Wrapper>
    </main>
  );
}
