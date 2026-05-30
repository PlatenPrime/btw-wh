import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EntityLabel } from "@/modules/analogs/components/entity-label/EntityLabel";
import type { KonkDto } from "@/modules/konks/api/types";

export interface KonkEntitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  konks: KonkDto[];
  className?: string;
  imageSize?: "xs" | "sm" | "md";
}

export function KonkEntitySelect({
  value,
  onValueChange,
  konks,
  className,
  imageSize = "xs",
}: KonkEntitySelectProps) {
  return (
    <Select
      value={value || "placeholder"}
      onValueChange={(v) => onValueChange(v === "placeholder" ? "" : v)}
    >
      <SelectTrigger
        aria-label="Конкурент"
        className={cn("min-w-[160px] sm:min-w-[180px]", className)}
      >
        <SelectValue placeholder="Оберіть конкурента" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="placeholder" disabled>
          Оберіть конкурента
        </SelectItem>
        {konks.map((k) => (
          <SelectItem key={k._id} value={k.name}>
            <EntityLabel
              imageUrl={k.imageUrl}
              title={k.title}
              fallbackLabel={k.name}
              imageSize={imageSize}
            />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
