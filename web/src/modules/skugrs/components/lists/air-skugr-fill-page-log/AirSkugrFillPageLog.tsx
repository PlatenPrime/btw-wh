import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { AirSkugrFillPageLogEntry } from "@/modules/skugrs/hooks/useAirSkugrSingleFill";

interface AirSkugrFillPageLogProps {
  pages: AirSkugrFillPageLogEntry[];
}

export function AirSkugrFillPageLog({ pages }: AirSkugrFillPageLogProps) {
  if (pages.length === 0) {
    return (
      <p className={cn(typography.caption)}>Ще немає оброблених сторінок.</p>
    );
  }

  return (
    <ul className="grid gap-2">
      {pages.map((page) => (
        <li
          key={page.pageIndex}
          className="border-border/60 bg-card/40 grid gap-0.5 rounded-lg border px-3 py-2"
        >
          <p className={typography.body}>
            Стор. {page.pageIndex}
            {" · "}
            {page.productsOnPage} товарів
          </p>
          <p className={cn(typography.caption, "break-all")}>{page.pageUrl}</p>
          {page.serverNextPageUrl ? (
            <p className={cn(typography.caption, "break-all")}>
              далі: {page.serverNextPageUrl}
            </p>
          ) : page.clientNextPageUrl ? (
            <p className={cn(typography.caption, "text-destructive", "break-all")}>
              next відхилено: {page.clientNextPageUrl}
            </p>
          ) : (
            <p className={typography.caption}>кінець пагінації</p>
          )}
        </li>
      ))}
    </ul>
  );
}
