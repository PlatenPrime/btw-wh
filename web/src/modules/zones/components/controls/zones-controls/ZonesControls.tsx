import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
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
    <Wrapper className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {/* Пошук і дії */}
      <div className="flex items-center justify-between gap-2">
        <div className="max-w-md flex-1">
          <SearchPanel
            search={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за назвою..."
          />
        </div>
      </div>

      {/* Фільтри і сортування */}
      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
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
    </Wrapper>
  );
}
