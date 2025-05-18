import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectLimitProps {
  limitOptions: number[];
  limit: number;
  setLimit: (limit: number) => void;
}

export function SelectLimit({
  limitOptions,
  limit,
  setLimit,
}: SelectLimitProps) {
  return (
    <Select
      value={String(limit)}
      onValueChange={(val) => setLimit(Number(val))}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Показать" />
      </SelectTrigger>
      <SelectContent>
        {limitOptions.map((opt) => (
          <SelectItem key={opt} value={String(opt)}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
