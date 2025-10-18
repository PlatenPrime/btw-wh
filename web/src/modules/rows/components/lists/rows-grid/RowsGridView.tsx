import { cn } from "@/lib/utils";
import type { RowDto } from "@/modules/rows/api/types";
import { RowsGridCard } from "@/modules/rows/components/cards/rows-grid-card/RowsGridCard";

interface ViewProps {
  rows: RowDto[];
}

export function RowsGridView({ rows }: ViewProps) {
  return (
    <ul
      className={cn(
        "grid auto-rows-[1fr] gap-2",
        "grid-cols-1",
        "md:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] md:gap-4",
      )}
    >
      {rows.map((row) => (
        <li key={row._id} className="flex">
          <RowsGridCard row={row} />
        </li>
      ))}
    </ul>
  );
}
