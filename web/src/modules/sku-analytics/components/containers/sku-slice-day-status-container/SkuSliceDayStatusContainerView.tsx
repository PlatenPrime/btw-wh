import { SurfaceSection } from "@/components/shared/layout";
import { Badge } from "@/components/ui/badge";
import { typography } from "@/lib/typography";
import type { SkuSliceDayStatusDto } from "@/modules/sku-analytics/api/types";
import { format, isValid, parseISO } from "date-fns";
import { uk } from "date-fns/locale";

interface SkuSliceDayStatusContainerViewProps {
  data: SkuSliceDayStatusDto;
}

const numberFormat = new Intl.NumberFormat("uk-UA");

function formatIsoDateTime(value?: string): string | null {
  if (!value) return null;
  const parsed = parseISO(value);
  if (!isValid(parsed)) return null;
  return format(parsed, "d MMM yyyy, HH:mm", { locale: uk });
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`${typography.value} tabular-nums`}>{value}</span>
    </div>
  );
}

export function SkuSliceDayStatusContainerView({
  data,
}: SkuSliceDayStatusContainerViewProps) {
  const stats = data.stats;
  const rotation = data.rotationMeta;
  const updatedAt = formatIsoDateTime(data.updatedAt ?? data.createdAt);

  return (
    <SurfaceSection className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className={typography.sectionTitle}>Статус денного прогону</h2>
        {stats?.abortReason ? (
          <Badge variant="destructive">{stats.abortReason}</Badge>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <StatItem
          label="Точок усього"
          value={numberFormat.format(data.pointsTotal)}
        />
        <StatItem
          label="Точок invalid"
          value={numberFormat.format(data.pointsInvalid)}
        />
        <StatItem
          label="Filled"
          value={stats ? numberFormat.format(stats.filled) : "—"}
        />
        <StatItem
          label="Invalid (scrape)"
          value={stats ? numberFormat.format(stats.invalid) : "—"}
        />
        <StatItem
          label="Errors"
          value={stats ? numberFormat.format(stats.errorCount) : "—"}
        />
        <StatItem
          label="Due total"
          value={
            stats?.dueTotal != null
              ? numberFormat.format(stats.dueTotal)
              : "—"
          }
        />
      </div>

      {rotation ? (
        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span>
            Rotation: day {rotation.dayIndex + 1}/{rotation.cycleDays}
          </span>
          <span>Due: {numberFormat.format(rotation.dueCount)}</span>
        </div>
      ) : null}

      {updatedAt ? (
        <p className="text-muted-foreground text-xs">Оновлено: {updatedAt}</p>
      ) : (
        <p className="text-muted-foreground text-xs">
          Meta прогону ще немає — можливо scrape ще не виконувався.
        </p>
      )}
    </SurfaceSection>
  );
}
