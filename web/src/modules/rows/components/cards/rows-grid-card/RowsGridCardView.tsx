import { Card, CardHeader } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowLink } from "@/modules/rows/components/elements/row-link/RowLink";
import { RowCardActions } from "./row-card-arctions/RowCardActions";

interface RowsGridCardViewProps {
  row: RowDto;
}

export function RowsGridCardView({ row }: RowsGridCardViewProps) {
  return (
    <Card className="group/row h-full w-full border-border/60 bg-card/70 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-border hover:shadow-md  bg-orange-500/15 dark:bg-orange-200/5 border-orange-500/20 dark:border-orange-500/40">
      <CardHeader className="flex items-center justify-between gap-3 px-3 py-2">
        <RowLink row={row} />
        <RowCardActions row={row} />
      </CardHeader>
    </Card>
  );
}
