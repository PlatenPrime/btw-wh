import type { IconWellTone } from "@/components/shared/elements";
import type {
  ApiTaskKind,
  ApiTaskPhase,
  ApiTaskStatus,
} from "@/modules/apitasks/api/types";

const KIND_LABELS: Record<ApiTaskKind, string> = {
  "sku-slices.skugr-run-today": "Зрізи групи на сьогодні",
  "sku-slices.post-corrections.run": "Коригування залишків",
  "slice-compensation.run": "Компенсуючий зріз",
  "skugrs.fill-skus": "Заповнення групи SKU",
  "grabo-skus.sync": "Синхронізація Grabo",
  "arts.btrade-stock-update-all": "Оновлення залишків Btrade",
  "dels.artikuls-update-all": "Оновлення артикулів поставки",
  "pallet-groups.recalculate-pallets-sectors": "Перерахунок секторів палет",
  "blocks.recalculate-zones-sectors": "Перерахунок секторів зон",
  "poses.populate-missing-data": "Заповнення відсутніх даних позицій",
  "skus.fix-incorrect-sku-data": "Виправлення некоректних SKU",
  "skus.delete-konk-invalid": "Видалення невалідних SKU",
  "skus.delete-not-in-any-skugr": "Видалення SKU без групи",
  "arts.delete-without-latest-marker": "Видалення артикулів без маркера",
};

const STATUS_BADGE_LABELS: Record<ApiTaskStatus, string> = {
  queued: "В черзі",
  running: "Виконується",
  completed: "Завершено",
  failed: "Помилка",
  cancelled: "Скасовано",
  expired: "Прострочено",
};

const PHASE_LABELS: Record<ApiTaskPhase, string> = {
  queued: "В черзі",
  preparing: "Підготовка",
  running: "Виконання",
  finalizing: "Завершення",
};

const STATUS_TONES: Record<ApiTaskStatus, IconWellTone> = {
  queued: "info",
  running: "warning",
  completed: "success",
  failed: "destructive",
  cancelled: "muted",
  expired: "muted",
};

export function getApiTaskKindLabel(kind: ApiTaskKind): string {
  return KIND_LABELS[kind] ?? kind;
}

export function getApiTaskStatusBadgeLabel(status: ApiTaskStatus): string {
  return STATUS_BADGE_LABELS[status];
}

export function getApiTaskPhaseLabel(phase: ApiTaskPhase): string {
  return PHASE_LABELS[phase];
}

export function getApiTaskStatusTone(status: ApiTaskStatus): IconWellTone {
  return STATUS_TONES[status];
}

export function getApiTaskStatusLabel(input: {
  status: ApiTaskStatus;
  phase: ApiTaskPhase;
  progress: number;
  queuePosition: number | null;
}): string {
  const { status, phase, progress, queuePosition } = input;

  if (status === "failed") return STATUS_BADGE_LABELS.failed;
  if (status === "cancelled") return STATUS_BADGE_LABELS.cancelled;
  if (status === "expired") return STATUS_BADGE_LABELS.expired;
  if (status === "completed") return STATUS_BADGE_LABELS.completed;

  if (status === "queued" || phase === "queued") {
    if (queuePosition != null && queuePosition > 0) {
      return `В черзі · позиція ${queuePosition}`;
    }
    return STATUS_BADGE_LABELS.queued;
  }

  if (phase === "preparing") return PHASE_LABELS.preparing;
  if (phase === "running") return `Виконання · ${Math.round(progress)}%`;
  if (phase === "finalizing") return PHASE_LABELS.finalizing;

  return "Обробка…";
}

/** Flat primitive entries from a completed-task result for KPI chips. */
export function getApiTaskResultMetricEntries(
  result: unknown,
): { key: string; value: string }[] {
  if (result == null || typeof result !== "object" || Array.isArray(result)) {
    return [];
  }

  const entries: { key: string; value: string }[] = [];
  for (const [key, value] of Object.entries(result as Record<string, unknown>)) {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      entries.push({ key, value: String(value) });
    }
  }
  return entries;
}

export function formatApiTaskResultPreview(result: unknown): string | null {
  if (result == null) return null;
  if (typeof result === "string") return result;
  if (typeof result !== "object") return String(result);

  try {
    const json = JSON.stringify(result);
    if (json.length <= 160) return json;
    return `${json.slice(0, 157)}…`;
  } catch {
    return null;
  }
}

export function formatApiTaskJson(value: unknown): string {
  if (value == null) return "—";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
