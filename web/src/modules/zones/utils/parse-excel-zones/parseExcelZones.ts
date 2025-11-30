import type { UploadingZone } from "@/modules/zones/components/containers/zones-excel-container/types";
import { read, utils } from "xlsx";

export class ParseExcelZonesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseExcelZonesError";
  }
}

export const parseExcelZones = (file: File): Promise<UploadingZone[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = utils.sheet_to_json(sheet, {
          defval: "",
        }) as UploadingZone[];

        if (!json.length) {
          return reject(
            new ParseExcelZonesError("Файл не содержит данных"),
          );
        }

        const requiredFields = ["title", "bar"];
        const missingFields = requiredFields.filter(
          (field) => !Object.keys(json[0] || {}).includes(field),
        );

        if (missingFields.length) {
          return reject(
            new ParseExcelZonesError(
              `В документе отсутствуют поля: ${missingFields.join(", ")}`,
            ),
          );
        }

        const formatted = json
          .map((row) => {
            const baseData: UploadingZone = {
              title: row.title?.toString().trim(),
              bar: Number(row.bar),
            };

            // Добавляем sector только если он не пустой
            const sectorValue = row.sector?.toString().trim();
            if (sectorValue && !isNaN(Number(sectorValue))) {
              baseData.sector = Number(sectorValue);
            }

            return baseData;
          })
          .filter((row) => row.title && row.bar);

        if (!formatted.length) {
          return reject(
            new ParseExcelZonesError(
              "Не найдено валидных записей. Проверьте, что поля title и bar заполнены.",
            ),
          );
        }

        resolve(formatted);
      } catch (err) {
        reject(
          new ParseExcelZonesError(
            err instanceof Error ? err.message : "Ошибка при парсинге файла",
          ),
        );
      }
    };

    reader.onerror = () =>
      reject(new ParseExcelZonesError("Ошибка чтения файла"));
    reader.readAsArrayBuffer(file);
  });
};

