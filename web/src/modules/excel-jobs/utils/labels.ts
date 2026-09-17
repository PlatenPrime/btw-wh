import type {
  ExcelJobKind,
  ExcelJobPhase,
  ExcelJobStatus,
} from "@/modules/excel-jobs/api/types";

const KIND_LABELS: Record<ExcelJobKind, string> = {
  "sku-catalog-new-since": "SKU: нові з дати",
  "sku-catalog-invalid": "SKU: невалідні",
  "sku-konk-stock": "Konk: залишки",
  "sku-konk-sales": "Konk: продажі",
  "sku-skugr-stock": "Skugr: залишки",
  "sku-skugr-sales": "Skugr: продажі",
  "sku-one-stock": "SKU: залишки",
  "sku-one-sales": "SKU: продажі",
  "art-stock": "Артикул: залишки",
  "art-sales": "Артикул: продажі",
  "analog-comparison": "Аналог: порівняння",
  "analog-sales-comparison": "Аналог: продажі",
  "konk-btrade-comparison": "Konk vs Btrade",
  "konk-btrade-sales-comparison": "Konk vs Btrade: продажі",
  "arts-export": "Експорт артикулів",
  "arts-export-with-stocks": "Артикули з залишками",
  "arts-export-keys": "Ключі артикулів",
  "poses-export-stocks": "Залишки позицій",
  "zones-export": "Експорт зон",
  "grabo-skus": "Grabo каталог",
};

export function getExcelJobKindLabel(kind: ExcelJobKind): string {
  return KIND_LABELS[kind] ?? kind;
}

export function getExcelJobStatusLabel(input: {
  status: ExcelJobStatus;
  phase: ExcelJobPhase;
  progress: number;
  queuePosition: number | null;
}): string {
  const { status, phase, progress, queuePosition } = input;

  if (status === "failed") return "Помилка";
  if (status === "cancelled") return "Скасовано";
  if (status === "expired") return "Файл прострочено";
  if (status === "ready") return "Готово до завантаження";

  if (status === "queued" || phase === "queued") {
    if (queuePosition != null && queuePosition > 0) {
      return `В черзі · позиція ${queuePosition}`;
    }
    return "В черзі";
  }

  if (phase === "loading") return "Завантаження даних";
  if (phase === "building") return `Формування Excel · ${Math.round(progress)}%`;
  if (phase === "finalizing") return "Збереження файлу";

  return "Обробка…";
}

export function formatExcelFileSize(sizeBytes: number | undefined): string {
  if (sizeBytes == null || sizeBytes < 0) return "";
  if (sizeBytes < 1024) return `${sizeBytes} B`;
  if (sizeBytes < 1024 * 1024) {
    return `${(sizeBytes / 1024).toFixed(1)} KB`;
  }
  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}
