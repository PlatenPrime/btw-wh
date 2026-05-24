import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AskDetailsCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <CardContent className="grid gap-0 p-0">

        {/* Товар + статус */}
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            {/* size-14 = 56px, rounded-lg */}
            <Skeleton className="size-14 shrink-0 rounded-lg" />
            <div className="grid min-w-0 flex-1 gap-1">
              {/* артикул: text-sm font-semibold */}
              <Skeleton className="h-4 w-24" />
              {/* назва: text-sm, 2 lines */}
              <Skeleton className="h-4 w-full max-w-[260px]" />
              <Skeleton className="h-4 w-3/4 max-w-[180px]" />
            </div>
          </div>
          {/* статус бейдж: text-xs rounded-md px-2 py-0.5 ≈ h-5 */}
          <Skeleton className="h-5 w-20 shrink-0 rounded-md" />
        </div>

        {/* Локація: чипи (text-xs py-1 px-2.5 rounded-full ≈ h-[22px]) */}
        <div className="border-border/40 flex items-center gap-2 border-t px-4 py-2.5">
          <Skeleton className="h-[22px] w-20 rounded-full" />
          <Skeleton className="h-[22px] w-16 rounded-full" />
        </div>

        {/* Автор + дата */}
        <div className="border-border/40 flex items-center justify-between gap-4 border-t px-4 py-2.5">
          {/* UserAvatarName: size-4 avatar + text-sm name */}
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          {/* CalendarDate: h-4 w-4 icon + text-sm date */}
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Панелі: Заявка + Sharik.ua */}
        <div className="grid gap-3 border-t border-border/40 p-4 sm:grid-cols-2">

          {/* Заявка */}
          <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
            {/* секційний лейбл text-[11px] ≈ h-3 */}
            <Skeleton className="h-3 w-12" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {/* field: label h-3 + value h-4 */}
              <div className="grid gap-0.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          </div>

          {/* Sharik.ua */}
          <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
            <Skeleton className="h-3 w-16" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <div className="grid gap-0.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="grid gap-0.5">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>

        </div>

      </CardContent>
    </DetailPanelCard>
  );
}
