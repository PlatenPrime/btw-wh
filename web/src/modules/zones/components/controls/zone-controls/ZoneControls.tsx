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
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import { useZonesParams } from "@/modules/zones/hooks/useZonesParams";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ZoneControlsProps {
  onCreateClick?: () => void;
  onImportClick?: () => void;
  onExportClick?: () => void;
}

export function ZoneControls({
  onCreateClick,
  onImportClick,
  onExportClick,
}: ZoneControlsProps) {
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
    <div className="flex flex-col gap-4 border-b p-4">
      {/* Поиск и действия */}
      <div className="flex items-center justify-between gap-4">
        <div className="max-w-md flex-1">
          <SearchPanel
            search={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию зоны..."
          />
        </div>
        <div className="flex items-center gap-2">
          <RoleGuard allowedRoles={[RoleType.ADMIN]}>
            <Button variant="outline" onClick={onImportClick}>
              Импорт Excel
            </Button>
          </RoleGuard>
          <Button variant="outline" onClick={onExportClick}>
            Экспорт Excel
          </Button>
          <RoleGuard allowedRoles={[RoleType.ADMIN]}>
            <Button onClick={onCreateClick}>Создать зону</Button>
          </RoleGuard>
        </div>
      </div>

      {/* Фильтры и сортировка */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Сортировка:</span>
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
              <SelectItem value="title">Название</SelectItem>
              <SelectItem value="bar">Штрихкод</SelectItem>
              <SelectItem value="sector">Сектор</SelectItem>
              <SelectItem value="createdAt">Дата создания</SelectItem>
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
          <span className="text-muted-foreground text-sm">На странице:</span>
          <SelectLimit
            limit={limit}
            setLimit={setLimit}
            limitOptions={[10, 25, 50, 100]}
          />
        </div>
      </div>
    </div>
  );
}
