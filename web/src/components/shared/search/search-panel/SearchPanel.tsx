import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [inputValue, setInputValue] = useState(search);
  const isInternalChange = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isInternalChange.current = true;
    setInputValue(e.target.value);
    onSearchChange(e);
  };

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    setInputValue(search);
  }, [search]);

  return (
    <div className="relative flex w-full items-center gap-2">
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="w-full bg-card pl-10"
      />
    </div>
  );
}
