import { cn } from "@/lib/utils";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGridCard } from "@/modules/rows/components/cards/rows-grid-card/RowsGridCard";

interface ViewProps {
  rows: RowDto[];
}

export function RowsGridView({ rows }: ViewProps) {
  return (
    <ul
      className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}
    >
      {rows.map((row) => (
        <li key={row._id} className="flex">
          <RowsGridCard row={row} />
        </li>
      ))}
    </ul>
  );
}
