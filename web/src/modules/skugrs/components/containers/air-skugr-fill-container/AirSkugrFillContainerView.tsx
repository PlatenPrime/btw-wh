import { SurfaceSection } from "@/components/shared/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { FillSkugrSkusStats } from "@/modules/skugrs/api/types";
import { AirSkugrFillPageLog } from "@/modules/skugrs/components/lists/air-skugr-fill-page-log";
import type { AirSkugrSingleFillState } from "@/modules/skugrs/hooks/useAirSkugrSingleFill";
import {
  ChevronDown,
  PlayCircle,
  Plug,
  RefreshCw,
  StopCircle,
} from "lucide-react";
import { useState } from "react";

interface AirSkugrFillContainerViewProps {
  skugrUrl: string;
  state: AirSkugrSingleFillState;
  isRunning: boolean;
  extensionAvailable: boolean | null;
  onRun: () => void;
  onStop: () => void;
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

function statusLabel(state: AirSkugrSingleFillState, isRunning: boolean): string {
  if (state.status === "capturing") {
    return `Зчитування сторінки ${state.pageIndex}…`;
  }
  if (state.status === "saving") {
    return `Збереження сторінки ${state.pageIndex}…`;
  }
  if (state.status === "done") {
    return `Готово: сторінок ${state.pageIndex}`;
  }
  if (state.status === "error") {
    return `${state.code ? `${state.code}: ` : ""}${state.message ?? "Помилка"}`;
  }
  if (state.status === "pending" && state.pageIndex > 0) {
    return `Зупинено після ${state.pageIndex} стор.`;
  }
  if (isRunning) {
    return "Запуск…";
  }
  return "Очікує запуску";
}

function secondaryStats(stats: FillSkugrSkusStats): Array<{
  key: string;
  label: string;
  value: number;
}> {
  return [
    { key: "promoted", label: "промоут з newsku", value: stats.promotedFromNewsku },
    { key: "deduped", label: "дублікати URL", value: stats.dedupedByUrl },
    { key: "noPid", label: "без productId", value: stats.skippedNoProductId },
    {
      key: "conflict",
      label: "конфлікт productId",
      value: stats.skippedProductIdConflict,
    },
    {
      key: "nonNewsku",
      label: "інший виробник",
      value: stats.skippedNonNewskuManufacturer,
    },
  ].filter((item) => item.value > 0);
}

export function AirSkugrFillContainerView({
  skugrUrl,
  state,
  isRunning,
  extensionAvailable,
  onRun,
  onStop,
  onRecheckExtension,
}: AirSkugrFillContainerViewProps) {
  const [logOpen, setLogOpen] = useState(false);
  const extras = secondaryStats(state.stats);
  const canRun = !isRunning && extensionAvailable === true && Boolean(skugrUrl);
  const droppedNext =
    Boolean(state.clientNextPageUrl) &&
    !state.serverNextPageUrl &&
    (state.status === "done" || state.status === "error");

  return (
    <SurfaceSection className="grid gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <h3 className={typography.sectionTitle}>Заповнення товарної групи</h3>
          <p className={typography.caption}>
            Серверний парсинг Air вимкнений. Сторінки знімає BTW Air Capture.
          </p>
        </div>
        <ExtensionStatus
          extensionAvailable={extensionAvailable}
          onRecheck={onRecheckExtension}
        />
      </div>

      {extensionAvailable === false ? (
        <p className={cn(typography.caption, "text-destructive")}>
          Встановіть розширення «BTW Air Capture» (Load unpacked із теки
          extensions/air-capture) і оновіть сторінку.
        </p>
      ) : null}

      {!skugrUrl ? (
        <p className={cn(typography.caption, "text-destructive")}>
          У групи немає URL лістингу.
        </p>
      ) : (
        <p className={cn(typography.caption, "break-all")}>{skugrUrl}</p>
      )}

      <p
        className={cn(
          typography.body,
          state.status === "error" && "text-destructive",
        )}
      >
        {statusLabel(state, isRunning)}
        {typeof state.productsOnPage === "number"
          ? ` · на сторінці ${state.productsOnPage}`
          : ""}
      </p>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="outline">сторінок {state.pages.length}</Badge>
        <Badge variant="secondary">знайдено {state.stats.fetched}</Badge>
        <Badge variant="success">новинки {state.stats.created}</Badge>
        <Badge variant="secondary">
          додано існуючих {state.stats.linkedExisting}
        </Badge>
        <Badge variant="outline">
          вже в групі {state.stats.skippedAlreadyInGroup}
        </Badge>
        {extras.map((item) => (
          <Badge key={item.key} variant="outline">
            {item.label} {item.value}
          </Badge>
        ))}
      </div>

      {droppedNext && state.clientNextPageUrl ? (
        <p className={cn(typography.caption, "text-destructive", "break-all")}>
          Сервер відхилив next URL (інша категорія?): {state.clientNextPageUrl}
        </p>
      ) : null}

      {state.pageUrl ? (
        <p className={cn(typography.caption, "break-all")}>
          поточна: {state.pageUrl}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {isRunning ? (
          <Button variant="destructive" onClick={onStop}>
            <StopCircle className={iconSize.ui} />
            Зупинити
          </Button>
        ) : (
          <Button variant="default" disabled={!canRun} onClick={onRun}>
            <PlayCircle className={iconSize.ui} />
            Заповнити групу
          </Button>
        )}
      </div>

      <Collapsible open={logOpen} onOpenChange={setLogOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-fit">
            <ChevronDown
              className={cn(
                iconSize.ui,
                "transition-transform",
                logOpen && "rotate-180",
              )}
            />
            {logOpen
              ? "Сховати сторінки"
              : `Показати сторінки (${state.pages.length})`}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <AirSkugrFillPageLog pages={state.pages} />
        </CollapsibleContent>
      </Collapsible>
    </SurfaceSection>
  );
}
