import type { CreateDelArtikulInput } from "@/modules/dels/api/types";
import { read, utils } from "xlsx";
import { ParseExcelArtsError } from "./ParseExcelArtsError";

const ARTS_COLUMN = "arts";
const QUANTITY_COLUMN = "quantity";

function parseQuantityCell(value: unknown): number {
  if (value === null || value === undefined || value === "") {
    return 0;
  }
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

/**
 * Парсить Excel-файл: перший лист, колонка "arts" — артикули;
 * опціонально колонка "quantity" — кількість у поставці (інакше 0).
 * Повертає масив для POST /api/dels.
 */
export const parseExcelArts = (
  file: File,
): Promise<CreateDelArtikulInput[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = utils.sheet_to_json(sheet, {
          defval: "",
          header: 1,
        }) as unknown[][];

        if (!json.length) {
          return reject(
            new ParseExcelArtsError("Файл не містить даних"),
          );
        }

        const headerRow = json[0] as unknown[];
        const artsIndex = headerRow.findIndex(
          (cell) =>
            String(cell).trim().toLowerCase() === ARTS_COLUMN.toLowerCase(),
        );

        if (artsIndex === -1) {
          return reject(
            new ParseExcelArtsError(
              `У документі відсутня колонка "${ARTS_COLUMN}"`,
            ),
          );
        }

        const quantityIndex = headerRow.findIndex(
          (cell) =>
            String(cell).trim().toLowerCase() ===
            QUANTITY_COLUMN.toLowerCase(),
        );

        const seen = new Set<string>();
        const artikuls: CreateDelArtikulInput[] = [];

        for (let i = 1; i < json.length; i++) {
          const row = json[i] as unknown[];
          const value = row[artsIndex];
          const art = value?.toString().trim();
          if (!art) {
            continue;
          }

          if (seen.has(art)) {
            return reject(
              new ParseExcelArtsError(
                `Дублікат артикула "${art}" у файлі (рядок ${i + 1})`,
              ),
            );
          }
          seen.add(art);

          const quantity =
            quantityIndex === -1
              ? 0
              : parseQuantityCell(row[quantityIndex]);

          artikuls.push({ artikul: art, quantity });
        }

        if (artikuls.length === 0) {
          return reject(
            new ParseExcelArtsError(
              "Не знайдено жодного артикула. Перевірте колонку arts.",
            ),
          );
        }

        resolve(artikuls);
      } catch (err) {
        if (err instanceof ParseExcelArtsError) {
          return reject(err);
        }
        reject(
          new ParseExcelArtsError(
            err instanceof Error ? err.message : "Помилка читання файлу",
          ),
        );
      }
    };

    reader.onerror = () =>
      reject(new ParseExcelArtsError("Помилка читання файлу"));
    reader.readAsArrayBuffer(file);
  });
};
