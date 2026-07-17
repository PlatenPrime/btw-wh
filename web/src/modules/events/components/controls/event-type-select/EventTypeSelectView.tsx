import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EventType } from "@/modules/events/api/types";
import { EVENT_TYPES } from "@/modules/events/constants";

const ALL_TYPES_VALUE = "all";

interface EventTypeSelectViewProps {
  type: EventType | "";
  onTypeChange: (type: EventType | "") => void;
  disabled?: boolean;
}

export function EventTypeSelectView({
  type,
  onTypeChange,
  disabled = false,
}: EventTypeSelectViewProps) {
  const value = type || ALL_TYPES_VALUE;

  return (
    <Select
      value={value}
      onValueChange={(next) =>
        onTypeChange(next === ALL_TYPES_VALUE ? "" : (next as EventType))
      }
      disabled={disabled}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Тип" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_TYPES_VALUE}>Всі типи</SelectItem>
        {EVENT_TYPES.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
