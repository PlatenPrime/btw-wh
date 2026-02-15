import { read, utils } from "xlsx";
import { ParseExcelArtsError } from "./ParseExcelArtsError";

const ARTS_COLUMN = "arts";

/**
 * Парсить Excel-файл: перший лист, колонка "arts" — артикули.
 * Повертає Record<артикул, 0> для передачі в API при створенні поставки.
 */
export const parseExcelArts = (file: File): Promise<Record<string, number>> => {
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

        const artikuls: Record<string, number> = {};
        for (let i = 1; i < json.length; i++) {
          const row = json[i] as unknown[];
          const value = row[artsIndex];
          const art = value?.toString().trim();
          if (art) {
            artikuls[art] = 0;
          }
        }

        const keys = Object.keys(artikuls);
        if (keys.length === 0) {
          return reject(
            new ParseExcelArtsError(
              "Не знайдено жодного артикула. Перевірте колонку arts.",
            ),
          );
        }

        resolve(artikuls);
      } catch (err) {
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
