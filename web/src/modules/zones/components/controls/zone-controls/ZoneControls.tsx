import { Container } from "@/components/shared/containers/Container";
import { SearchPanel } from "@/components/shared/search-components/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/select-limit";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useZonesParams } from "@/modules/zones/hooks/useZonesParams";
import { ArrowDown, ArrowUp } from "lucide-react";

export function ZoneControls() {
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
    <Container className="flex gap-2">
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
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Select
            value={sortBy}
            onValueChange={(value) =>
              setSortBy(value as "title" | "bar" | "sector" | "createdAt")
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Назва</SelectItem>
              <SelectItem value="bar">Штрих-код</SelectItem>
              <SelectItem value="sector">Сектор</SelectItem>
              <SelectItem value="createdAt">Дата створення</SelectItem>
            </SelectContent>
          </Select>
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

        <div className="flex items-center gap-2">
          <span className=" text-sm">На сторінці:</span>
          <SelectLimit
            limit={limit}
            setLimit={setLimit}
            limitOptions={[10, 20, 50, 100]}
          />
        </div>
      </div>
    </Container>
  );
}
