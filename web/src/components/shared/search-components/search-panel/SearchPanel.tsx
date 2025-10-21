import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Container } from "../../containers/Container";

interface SearchPanelProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchPanel({ search, onSearchChange, placeholder }: SearchPanelProps) {
  return (
    <Container className="relative flex w-full items-center gap-2">
      <Search color="gray" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 " />
      <Input
        placeholder={placeholder}
        value={search}
        onChange={onSearchChange}
        className="w-full pl-8 bg-card"
      />
    </Container>
  );
}