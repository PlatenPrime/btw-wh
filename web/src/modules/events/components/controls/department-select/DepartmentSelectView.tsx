import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_DEPARTMENTS } from "@/modules/events/constants";

const ALL_DEPARTMENTS_VALUE = "all";

interface DepartmentSelectViewProps {
  department: string;
  onDepartmentChange: (department: string) => void;
  disabled?: boolean;
}

export function DepartmentSelectView({
  department,
  onDepartmentChange,
  disabled = false,
}: DepartmentSelectViewProps) {
  const value = department || ALL_DEPARTMENTS_VALUE;

  return (
    <Select
      value={value}
      onValueChange={(next) =>
        onDepartmentChange(next === ALL_DEPARTMENTS_VALUE ? "" : next)
      }
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Відділ" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_DEPARTMENTS_VALUE}>Всі відділи</SelectItem>
        {EVENT_DEPARTMENTS.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
