import { DialogActions } from "@/components/shared/dialogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { AirSkugrSingleFillState } from "@/modules/skugrs/hooks/useAirSkugrSingleFill";
import { Plug, RefreshCw, StopCircle } from "lucide-react";

interface FillAirSkugrSkusDialogViewProps {
  skugrUrl: string;
  extensionAvailable: boolean | null;
  isRunning: boolean;
  state: AirSkugrSingleFillState;
  onRecheckExtension: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onStop: () => void;
}

function ExtensionBadge({
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

export function FillAirSkugrSkusDialogView({
  skugrUrl,
  extensionAvailable,
  isRunning,
  state,
  onRecheckExtension,
  onCancel,
  onSubmit,
  onStop,
}: FillAirSkugrSkusDialogViewProps) {
  const canRun = !isRunning && extensionAvailable === true && Boolean(skugrUrl);

  return (
    <DialogContent className="sm:max-w-md">
      <div className="grid gap-4">
        <DialogHeader>
          <DialogTitle>Заповнити групу товарами</DialogTitle>
          <DialogDescription>
            Серверний scrape Air вимкнений. Сторінки лістингу знімає розширення
            BTW Air Capture, склад групи оновлюється посторінково.
          </DialogDescription>
        </DialogHeader>

        <ExtensionBadge
          extensionAvailable={extensionAvailable}
          onRecheck={onRecheckExtension}
        />

        {extensionAvailable === false ? (
          <p className={cn(typography.caption, "text-destructive")}>
            Встановіть «BTW Air Capture» (Load unpacked із extensions/air-capture)
            і оновіть сторінку.
          </p>
        ) : null}

        {!skugrUrl ? (
          <p className={cn(typography.caption, "text-destructive")}>
            У групи немає URL лістингу.
          </p>
        ) : (
          <p className={cn(typography.caption, "break-all")}>{skugrUrl}</p>
        )}

        {isRunning || state.status === "done" || state.status === "error" ? (
          <div className="grid gap-1">
            <p className={typography.body}>
              {state.status === "capturing"
                ? `Зчитування сторінки ${state.pageIndex}…`
                : null}
              {state.status === "saving"
                ? `Збереження сторінки ${state.pageIndex}…`
                : null}
              {state.status === "done"
                ? `Готово: сторінок ${state.pageIndex}`
                : null}
              {state.status === "error"
                ? `${state.code ? `${state.code}: ` : ""}${state.message}`
                : null}
              {state.status === "pending" && state.pageIndex > 0
                ? `Зупинено після ${state.pageIndex} стор.`
                : null}
            </p>
            {state.stats.created > 0 || state.stats.linkedExisting > 0 ? (
              <p className={typography.caption}>
                Створено {state.stats.created}, додано існуючих{" "}
                {state.stats.linkedExisting}
              </p>
            ) : null}
          </div>
        ) : null}

        {isRunning ? (
          <Button variant="destructive" onClick={onStop} className="w-full">
            <StopCircle className={iconSize.ui} />
            Зупинити
          </Button>
        ) : (
          <DialogActions
            onCancel={onCancel}
            onSubmit={onSubmit}
            cancelText="Скасувати"
            submitText="Запустити з клієнта"
            submitLoadingText="Завантаження..."
            isSubmitting={false}
            isDisabled={!canRun}
            className="w-full"
          />
        )}
      </div>
    </DialogContent>
  );
}
