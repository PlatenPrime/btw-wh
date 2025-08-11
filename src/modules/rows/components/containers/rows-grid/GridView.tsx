import { cn } from "@/lib/utils";
import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowsRefetch } from "@/modules/rows/api/types/types";
import { GridCard } from "@/modules/rows/components/cards/rows-grid-card/GridCard";

interface ViewProps {
  rows: RowDto[] | undefined;
  isFetching?: boolean;
  refetch: RowsRefetch;
}

export function View({ rows, refetch }: ViewProps) {
  if (!rows || rows.length === 0) {
    return (
      <div className="text-muted-foreground text-center">
        Немає рядів для відображення
      </div>
    );
  }

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
          <GridCard row={row} refetch={refetch} />
        </li>
      ))}
    </ul>
  );
}
