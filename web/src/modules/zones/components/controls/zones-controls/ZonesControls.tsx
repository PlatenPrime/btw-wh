import { SearchFiltersLayout } from "@/components/shared/search/search-filters-layout";
import { SearchPanel } from "@/components/shared/search/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import { useZonesParams } from "@/modules/zones/hooks/useZonesParams";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SortZonesSelect } from "./components/sort-zones-select/SortZonesSelect";

export function ZonesControls() {
  const {
    search,
    setSearch,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useZonesParams();

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <SurfaceSection className="grid gap-2">
      <SearchFiltersLayout
        searchSlot={
          <div className="max-w-md">
            <SearchPanel
              search={search}
              onSearchChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук за назвою..."
            />
          </div>
        }
        filtersSlot={
          <div className="flex flex-wrap items-center gap-2">
            <SelectLimit
              limit={limit}
              setLimit={setLimit}
              limitOptions={[10, 20, 50, 100]}
            />

            <div className="flex items-center gap-2">
              <SortZonesSelect sortBy={sortBy} setSortBy={setSortBy} />

              <Button
                variant="outline"
                size="sm"
                onClick={handleSortToggle}
                className="px-2"
              >
                {sortOrder === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        }
      />
    </SurfaceSection>
  );
}
