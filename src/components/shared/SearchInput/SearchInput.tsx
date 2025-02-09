import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface Props {
  delay?: number;
  onSearch: (value: string) => void;
}

export function SearchInput({ delay = 500, onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler); // Очистка таймера, если компонент размонтирован или searchTerm изменяется
    };
  }, [searchTerm, delay, onSearch]);

  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Пошук..."
    />
  );
}
