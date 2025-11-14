import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchPanelProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchPanel({
  search,
  onSearchChange,
  placeholder,
}: SearchPanelProps) {
  return (
    <div className="relative flex w-full items-center gap-2 ">
      <Search
        color="gray"
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
      />
      <Input
        placeholder={placeholder}
        value={search}
        onChange={onSearchChange}
        className="bg-card w-full pl-8 "
      />
    </div>
  );
}
