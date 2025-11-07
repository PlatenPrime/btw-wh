import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { ArrowDown, ArrowUp } from "lucide-react";

interface PalletSortControlsProps {
  sortParams: GetPosesByPalletIdParams;
  onSortParamsChange: (params: GetPosesByPalletIdParams) => void;
}

export function PalletSortControls({
  sortParams,
  onSortParamsChange,
}: PalletSortControlsProps) {
  const handleSortByChange = (value: "artikul" | "updatedAt") => {
    onSortParamsChange({
      ...sortParams,
      sortBy: value,
    });
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    onSortParamsChange({
      ...sortParams,
      sortOrder: value,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
      <Select
        value={sortParams.sortBy || "updatedAt"}
        onValueChange={handleSortByChange}
      >
        <SelectTrigger className=":w-fit">
          <SelectValue placeholder="Сортувати по" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="artikul">Артикул</SelectItem>
          <SelectItem value="updatedAt">Дата</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={sortParams.sortOrder || "desc"}
        onValueChange={handleSortOrderChange}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Порядок" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">
            <ArrowUp className="h-4 w-4" />
          </SelectItem>
          <SelectItem value="desc">
            <ArrowDown className="h-4 w-4" />
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
