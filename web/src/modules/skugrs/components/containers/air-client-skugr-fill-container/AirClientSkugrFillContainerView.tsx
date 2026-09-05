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
import type { AirClientSkugrPendingItemDto } from "@/modules/skugrs/api/types";
import { AirClientSkugrPendingList } from "@/modules/skugrs/components/lists/air-client-skugr-pending-list";
import type {
  AirClientSkugrFillSummary,
  AirClientSkugrRowState,
} from "@/modules/skugrs/types/air-client-skugr-fill";
import {
  ChevronDown,
  CloudDownload,
  PlayCircle,
  Plug,
  RefreshCw,
  StopCircle,
} from "lucide-react";
import { useState } from "react";

interface AirClientSkugrFillContainerViewProps {
  items: AirClientSkugrPendingItemDto[];
  rowStates: Record<string, AirClientSkugrRowState>;
  summary: AirClientSkugrFillSummary;
  isRunning: boolean;
  extensionAvailable: boolean | null;
  onRun: () => void;
  onStop: () => void;
  onRetry: (skugrId: string) => void;
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

export function AirClientSkugrFillContainerView({
  items,
  rowStates,
  summary,
  isRunning,
  extensionAvailable,
  onRun,
  onStop,
  onRetry,
  onRefresh,
  onRecheckExtension,
}: AirClientSkugrFillContainerViewProps) {
  const [listOpen, setListOpen] = useState(false);

  const progress = summary.total > 0 ? summary.done : 0;
  const hasItems = summary.total > 0;
  const canRun = hasItems && !isRunning && extensionAvailable === true;

  return (
    <SurfaceSection className="grid gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <h3 className={typography.sectionTitle}>
            Оновлення товарних груп Air
          </h3>
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
          зняти HTML лістингу Air через WAF.
        </p>
      ) : null}

      <div className="grid gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium">
            {summary.done}/{summary.total}
          </span>
          <Badge variant="success">створено {summary.created}</Badge>
          <Badge variant="secondary">додано {summary.linkedExisting}</Badge>
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
            Оновити групи Air
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
          <AirClientSkugrPendingList
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
