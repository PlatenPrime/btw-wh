import { CardTitle } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { Link } from "react-router";

export function RowLink({ row }: { row: RowDto }) {
  return (
    <Link
      to={`/wh/rows/${row.title}`}
      className=" flex-1 rounded-lg p-2 transition-all duration-300 ease-out hover:bg-orange-200 dark:hover:bg-orange-500"
    >
      <CardTitle className="text-foreground  text-center text-lg font-semibold">
        {row.title}
      </CardTitle>
    </Link>
  );
}
