import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortZonesSelectProps {
  sortBy: "title" | "bar" | "sector" | "createdAt";
  setSortBy: (sortBy: "title" | "bar" | "sector" | "createdAt") => void;
}

export function SortZonesSelect({ sortBy, setSortBy }: SortZonesSelectProps) {
  return    <Select
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
</Select>;
}