import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import type { ProdDto } from "@/modules/prods/api/types";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-analytics/constants";

export interface ProdEntitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  prods: ProdDto[];
  showAllProducersOption?: boolean;
  className?: string;
  imageSize?: "xs" | "sm" | "md";
}

export function ProdEntitySelect({
  value,
  onValueChange,
  prods,
  showAllProducersOption = false,
  className,
  imageSize = "xs",
}: ProdEntitySelectProps) {
  const isAllProducers = value === SKU_KONK_PROD_QUERY_ALL;

  return (
    <Select
      value={value || "placeholder"}
      onValueChange={(v) => {
        if (v === "placeholder") onValueChange("");
        else onValueChange(v);
      }}
    >
      <SelectTrigger
        aria-label="Виробник"
        className={cn(
          "min-w-[160px] sm:min-w-[180px]",
          isAllProducers && "text-destructive",
          className,
        )}
      >
        <SelectValue placeholder="Оберіть виробника" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="placeholder" disabled>
          Оберіть виробника
        </SelectItem>
        {showAllProducersOption ? (
          <SelectItem
            value={SKU_KONK_PROD_QUERY_ALL}
            className="text-destructive focus:bg-accent focus:text-destructive data-[highlighted]:text-destructive"
          >
            Всі виробники
          </SelectItem>
        ) : null}
        {prods.map((p) => (
          <SelectItem key={p._id} value={p.name}>
            <EntityLabel
              imageUrl={p.imageUrl}
              title={p.title}
              fallbackLabel={p.name}
              imageSize={imageSize}
            />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
