import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ProdDto } from "@/modules/prods/api/types";
import { ProdDetailsCard } from "@/modules/prods/components/cards/prod-details-card";

interface ProdContainerViewProps {
  prod: ProdDto;
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  limit: number;
  setLimit: (limit: number) => void;
  children: React.ReactNode;
}

export function ProdContainerView({
  prod,
  search,
  onSearchChange,
  limit,
  setLimit,
  children,
}: ProdContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ProdDetailsCard prod={prod} />

      <Wrapper className="grid gap-2">
        <h2 className="text-lg font-semibold">Аналоги виробника</h2>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="grid min-w-0 flex-1 gap-1">
            <SearchPanel
              search={search}
              onSearchChange={onSearchChange}
              placeholder="Пошук за назвою..."
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <SelectLimit
              limitOptions={[10, 20, 50, 100]}
              limit={limit}
              setLimit={setLimit}
            />
          </div>
        </div>
        {children}
      </Wrapper>
    </div>
  );
}
