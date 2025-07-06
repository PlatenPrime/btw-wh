import { cn } from "@/lib/utils";
import { GridCard } from "@/modules/rows/components/grid-card";
import type { RowDto } from "@/modules/rows/types/dto";

interface ViewProps {
  rows: RowDto[] | undefined;
  isFetching?: boolean;
  onRowUpdated?: () => void;
}

export function View({ rows, onRowUpdated }: ViewProps) {
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
          <GridCard row={row} onRowUpdated={onRowUpdated} />
        </li>
      ))}
    </ul>
  );
}
