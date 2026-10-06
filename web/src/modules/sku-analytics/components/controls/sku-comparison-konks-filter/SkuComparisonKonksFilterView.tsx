import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users } from "lucide-react";

export interface SkuComparisonKonkOption {
  name: string;
  title: string;
}

export interface SkuComparisonKonksFilterViewProps {
  options: SkuComparisonKonkOption[];
  excludeKonks: string[];
  onToggle: (konkName: string, checked: boolean) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function SkuComparisonKonksFilterView({
  options,
  excludeKonks,
  onToggle,
  disabled = false,
  isLoading = false,
}: SkuComparisonKonksFilterViewProps) {
  const excludedCount = excludeKonks.length;
  const includedCount = options.length - excludedCount;

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="min-w-[160px] justify-start gap-2 sm:min-w-[180px]"
            disabled={disabled || isLoading || options.length === 0}
          >
            <Users className="size-4 shrink-0" />
            Конкуренти
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="min-w-[220px]">
          <DropdownMenuLabel>Показати конкурентів</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {options.map((option) => {
            const isChecked = !excludeKonks.includes(option.name);
            const isLastIncluded = isChecked && includedCount <= 1;

            return (
              <DropdownMenuCheckboxItem
                key={option.name}
                checked={isChecked}
                disabled={isLastIncluded}
                onCheckedChange={(checked) =>
                  onToggle(option.name, checked === true)
                }
                onSelect={(event) => event.preventDefault()}
              >
                {option.title || option.name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {excludedCount > 0 ? (
        <Badge variant="secondary" className="py-1">
          Приховано: {excludedCount}
        </Badge>
      ) : null}
    </div>
  );
}
