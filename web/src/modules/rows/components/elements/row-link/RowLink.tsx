import type { RowDto } from "@/modules/rows/api/types/dto";
import { Link } from "react-router";

export function RowLink({ row }: { row: RowDto }) {
  return (
    <Link
      to={`/wh/rows/${row.title}`}
      className="hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background flex-1 rounded-md px-1 py-1 text-left transition-colors duration-200 ease-out outline-none hover:underline focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <span className="text-foreground truncate text-left text-base font-semibold">
        {row.title}
      </span>
    </Link>
  );
}
