import { CardTitle } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { Link } from "react-router";

export function LinkRow({ row }: { row: RowDto }) {
  return (
    <Link
      to={`/wh/rows/${row.title}`}
      className="bg-background hover:bg-orange-100 dark:hover:bg-orange-100 flex-1 rounded-lg p-2 transition-all duration-300 ease-out"
    >
      <CardTitle className="text-foreground dark:hover:text-secondary text-center text-lg font-semibold">
        {row.title}
      </CardTitle>
    </Link>
  );
}
