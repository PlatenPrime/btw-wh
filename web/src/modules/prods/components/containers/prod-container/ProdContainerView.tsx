import { SearchFiltersLayout } from "@/components/shared/search-components/search-filters-layout";
import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { ProdDetailsCard } from "@/modules/prods/components/cards/prod-details-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProdContainerViewProps {
  prod: ProdDto;
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  konkName: string;
  onKonkNameChange: (value: string) => void;
  konks: KonkDto[];
  isKonksLoading: boolean;
  limit: number;
  setLimit: (limit: number) => void;
  children: React.ReactNode;
}

export function ProdContainerView({
  prod,
  search,
  onSearchChange,
  konkName,
  onKonkNameChange,
  konks,
  isKonksLoading,
  limit,
  setLimit,
  children,
}: ProdContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ProdDetailsCard prod={prod} />

      <Wrapper className="grid gap-2">
        <h2 className="text-lg font-semibold text-center">Товари виробника</h2>
        <SearchFiltersLayout
          searchSlot={
            <div className="grid gap-1">
              <SearchPanel
                search={search}
                onSearchChange={onSearchChange}
                placeholder="Пошук за назвою..."
              />
            </div>
          }
          filtersSlot={
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={konkName || "all"}
                onValueChange={(value) =>
                  onKonkNameChange(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="min-w-[160px]" aria-label="Конкурент">
                  <SelectValue
                    placeholder={
                      isKonksLoading ? "Завантаження..." : "Усі конкуренти"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Усі конкуренти</SelectItem>
                  {konks.map((konk) => (
                    <SelectItem key={konk._id} value={konk.name}>
                      <EntityLabel
                        imageUrl={konk.imageUrl}
                        title={konk.title}
                        fallbackLabel={konk.name}
                        imageSize="xs"
                      />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <SelectLimit
                limitOptions={[10, 20, 50, 100]}
                limit={limit}
                setLimit={setLimit}
              />
            </div>
          }
        />
        {children}
      </Wrapper>
    </div>
  );
}
