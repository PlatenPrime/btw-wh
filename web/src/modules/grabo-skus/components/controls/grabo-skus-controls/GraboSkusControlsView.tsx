import { SearchFiltersLayout } from "@/components/shared/search/search-filters-layout";
import { SearchPanel } from "@/components/shared/search/search-panel/SearchPanel";
import { SelectLimit } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GraboSkuFilterOptionsDto } from "@/modules/grabo-skus/api/types";
import type { GraboTriStateFilter } from "@/modules/grabo-skus/hooks/useGraboSkusParams";

interface GraboFilterSelectProps {
  id: string;
  ariaLabel: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  allLabel: string;
}

function GraboFilterSelect({
  id,
  ariaLabel,
  value,
  onValueChange,
  options,
  allLabel,
}: GraboFilterSelectProps) {
  return (
    <Select
      value={value || "all"}
      onValueChange={(next) => onValueChange(next === "all" ? "" : next)}
    >
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        className="min-w-[120px] sm:min-w-[140px]"
      >
        <SelectValue placeholder={allLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface GraboTriStateSelectProps {
  id: string;
  ariaLabel: string;
  value: GraboTriStateFilter;
  onValueChange: (value: GraboTriStateFilter) => void;
  allLabel: string;
}

function GraboTriStateSelect({
  id,
  ariaLabel,
  value,
  onValueChange,
  allLabel,
}: GraboTriStateSelectProps) {
  return (
    <Select
      value={value || "all"}
      onValueChange={(next) =>
        onValueChange(next === "all" ? "" : (next as GraboTriStateFilter))
      }
    >
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        className="min-w-[120px] sm:min-w-[140px]"
      >
        <SelectValue placeholder={allLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        <SelectItem value="true">Так</SelectItem>
        <SelectItem value="false">Ні</SelectItem>
      </SelectContent>
    </Select>
  );
}

export interface GraboSkusControlsViewProps {
  limit: number;
  setLimit: (n: number) => void;
  search: string;
  setSearch: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  size: string;
  setSize: (v: string) => void;
  material: string;
  setMaterial: (v: string) => void;
  gas: string;
  setGas: (v: string) => void;
  language: string;
  setLanguage: (v: string) => void;
  isOnSite: GraboTriStateFilter;
  setIsOnSite: (v: GraboTriStateFilter) => void;
  isNewProduct: GraboTriStateFilter;
  setIsNewProduct: (v: GraboTriStateFilter) => void;
  filterOptions: GraboSkuFilterOptionsDto;
}

export function GraboSkusControlsView({
  limit,
  setLimit,
  search,
  setSearch,
  color,
  setColor,
  size,
  setSize,
  material,
  setMaterial,
  gas,
  setGas,
  language,
  setLanguage,
  isOnSite,
  setIsOnSite,
  isNewProduct,
  setIsNewProduct,
  filterOptions,
}: GraboSkusControlsViewProps) {
  return (
    <SurfaceSection className="grid gap-3">
      <SearchFiltersLayout
        className="gap-3 lg:grid-cols-1"
        searchSlot={
          <div className="flex min-w-0 items-center gap-3">
            <div className="min-w-0 flex-1">
              <SearchPanel
                search={search}
                onSearchChange={(e) => setSearch(e.target.value)}
                placeholder="Пошук за назвою або артикулом..."
              />
            </div>
            <SelectLimit
              limitOptions={[10, 20, 50, 100]}
              limit={limit}
              setLimit={setLimit}
            />
          </div>
        }
        filtersSlot={
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <GraboFilterSelect
              id="grabo-skus-color"
              ariaLabel="Колір"
              value={color}
              onValueChange={setColor}
              options={filterOptions.color}
              allLabel="Усі кольори"
            />
            <GraboFilterSelect
              id="grabo-skus-size"
              ariaLabel="Розмір"
              value={size}
              onValueChange={setSize}
              options={filterOptions.size}
              allLabel="Усі розміри"
            />
            <GraboFilterSelect
              id="grabo-skus-material"
              ariaLabel="Матеріал"
              value={material}
              onValueChange={setMaterial}
              options={filterOptions.material}
              allLabel="Усі матеріали"
            />
            <GraboFilterSelect
              id="grabo-skus-gas"
              ariaLabel="Газ"
              value={gas}
              onValueChange={setGas}
              options={filterOptions.gas}
              allLabel="Усі гази"
            />
            <GraboFilterSelect
              id="grabo-skus-language"
              ariaLabel="Мова"
              value={language}
              onValueChange={setLanguage}
              options={filterOptions.language}
              allLabel="Усі мови"
            />
            <GraboTriStateSelect
              id="grabo-skus-on-site"
              ariaLabel="На сайті"
              value={isOnSite}
              onValueChange={setIsOnSite}
              allLabel="На сайті: усі"
            />
            <GraboTriStateSelect
              id="grabo-skus-new"
              ariaLabel="Новинка"
              value={isNewProduct}
              onValueChange={setIsNewProduct}
              allLabel="Новинка: усі"
            />
          </div>
        }
      />
    </SurfaceSection>
  );
}
