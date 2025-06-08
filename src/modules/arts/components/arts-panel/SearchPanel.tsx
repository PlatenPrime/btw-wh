import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchPanelProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchPanel({ search, onSearchChange }: SearchPanelProps) {
  return (
    <div className="flex items-center gap-2 w-full  relative">
      <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50" />
      <Input
        placeholder="Пошук артикулів"
        value={search}
        onChange={onSearchChange}
        className="w-full pl-8"
      />
    </div>
  );
}
