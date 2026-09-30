import type {
  ApiTaskKind,
  ApiTaskPhase,
  ApiTaskStatus,
} from "@/modules/apitasks/api/types";

const KIND_LABELS: Record<ApiTaskKind, string> = {
  "sku-slices.skugr-run-today": "Зрізи групи на сьогодні",
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

export function getApiTaskKindLabel(kind: ApiTaskKind): string {
  return KIND_LABELS[kind] ?? kind;
}

export function getApiTaskStatusLabel(input: {
  status: ApiTaskStatus;
  phase: ApiTaskPhase;
  progress: number;
  queuePosition: number | null;
}): string {
  const { status, phase, progress, queuePosition } = input;

  if (status === "failed") return "Помилка";
  if (status === "cancelled") return "Скасовано";
  if (status === "expired") return "Прострочено";
  if (status === "completed") return "Завершено";

  if (status === "queued" || phase === "queued") {
    if (queuePosition != null && queuePosition > 0) {
      return `В черзі · позиція ${queuePosition}`;
    }
    return "В черзі";
  }

  if (phase === "preparing") return "Підготовка";
  if (phase === "running") return `Виконання · ${Math.round(progress)}%`;
  if (phase === "finalizing") return "Завершення";

  return "Обробка…";
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
