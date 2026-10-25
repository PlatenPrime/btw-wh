import { SurfaceSection } from "@/components/shared/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { AirClientPendingItemDto } from "@/modules/sku-analytics/api/types";
import { AirClientPendingList } from "@/modules/sku-analytics/components/lists/air-client-pending-list";
import type { AirClientSlicesSummary } from "@/modules/sku-analytics/hooks/useAirClientSlices";
import type { AirClientRowState } from "@/modules/sku-analytics/types";
import { format, isValid, parse } from "date-fns";
import { uk } from "date-fns/locale";
import {
  ChevronDown,
  CloudDownload,
  PlayCircle,
  Plug,
  RefreshCw,
  StopCircle,
} from "lucide-react";
import { useState } from "react";

const SLICE_DAY_FORMAT = "yyyy-MM-dd";

function formatSliceDayLabel(value?: string): string | null {
  if (!value) return null;
  const parsed = parse(value.slice(0, 10), SLICE_DAY_FORMAT, new Date());
  if (!isValid(parsed)) return null;
  return format(parsed, "d MMM yyyy", { locale: uk });
}

interface AirClientSlicesContainerViewProps {
  items: AirClientPendingItemDto[];
  rowStates: Record<string, AirClientRowState>;
  summary: AirClientSlicesSummary;
  sliceDate?: string;
  isRunning: boolean;
  extensionAvailable: boolean | null;
  onRun: () => void;
  onStop: () => void;
  onRetry: (skuId: string) => void;
  onRefresh: () => void;
  onRecheckExtension: () => void;
}

function ExtensionStatus({
  extensionAvailable,
  onRecheck,
}: {
  extensionAvailable: boolean | null;
  onRecheck: () => void;
}) {
  if (extensionAvailable === null) {
    return (
      <Badge variant="outline" className="gap-1">
        <Plug className={iconSize.ui} />
        Перевірка розширення…
      </Badge>
    );
  }
  if (extensionAvailable) {
    return (
      <Badge variant="success" className="gap-1">
        <Plug className={iconSize.ui} />
        Розширення активне
      </Badge>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="destructive" className="gap-1">
        <Plug className={iconSize.ui} />
        Розширення не підключено
      </Badge>
      <Button variant="outline" size="sm" onClick={onRecheck}>
        <RefreshCw className={iconSize.ui} />
        Перевірити
      </Button>
    </div>
  );
}

export function AirClientSlicesContainerView({
  items,
  rowStates,
  summary,
  sliceDate,
  isRunning,
  extensionAvailable,
  onRun,
  onStop,
  onRetry,
  onRefresh,
  onRecheckExtension,
}: AirClientSlicesContainerViewProps) {
  const [listOpen, setListOpen] = useState(false);
  const sliceDateLabel = formatSliceDayLabel(sliceDate);

  const progress = summary.total > 0 ? summary.done : 0;
  const hasItems = summary.total > 0;
  const canRun = hasItems && !isRunning && extensionAvailable === true;

  return (
    <SurfaceSection className="grid gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <h3 className={typography.sectionTitle}>Дозаповнення Air</h3>
          {sliceDateLabel ? (
            <p className={typography.detailSubtitle}>{sliceDateLabel}</p>
          ) : null}
        </div>
        <ExtensionStatus
          extensionAvailable={extensionAvailable}
          onRecheck={onRecheckExtension}
        />
      </div>

      {extensionAvailable === false ? (
        <p className={cn(typography.caption, "text-destructive")}>
          Встановіть розширення «BTW Air Capture» (Load unpacked із теки
          extensions/air-capture) і оновіть сторінку. Без нього браузер не зможе
          зняти HTML сторінки Air через WAF.
        </p>
      ) : null}

      <div className="grid gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium">
            {summary.done}/{summary.total}
          </span>
          <Badge variant="success">записано {summary.saved}</Badge>
          <Badge variant="secondary">пропущено {summary.skipped}</Badge>
          {summary.error > 0 ? (
            <Badge variant="destructive">помилок {summary.error}</Badge>
          ) : null}
        </div>
        <Progress
          value={progress}
          max={Math.max(summary.total, 1)}
          className="h-2"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {isRunning ? (
          <Button variant="destructive" onClick={onStop}>
            <StopCircle className={iconSize.ui} />
            Зупинити
          </Button>
        ) : (
          <Button variant="default" disabled={!canRun} onClick={onRun}>
            <PlayCircle className={iconSize.ui} />
            Дозаповнити Air
          </Button>
        )}
        <Button variant="outline" disabled={isRunning} onClick={onRefresh}>
          <CloudDownload className={iconSize.ui} />
          Оновити чергу
        </Button>
      </div>

      <Collapsible open={listOpen} onOpenChange={setListOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-fit">
            <ChevronDown
              className={cn(
                iconSize.ui,
                "transition-transform",
                listOpen && "rotate-180",
              )}
            />
            {listOpen ? "Сховати список" : `Показати список (${summary.total})`}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <AirClientPendingList
            items={items}
            rowStates={rowStates}
            isRunning={isRunning}
            onRetry={onRetry}
          />
        </CollapsibleContent>
      </Collapsible>
    </SurfaceSection>
  );
}
