import { apiClient } from "@/lib/apiClient";
import type {
  ExcelUploadResult,
  UploadingZone,
} from "@/modules/zones/components/containers/zones-excel-container/types";
import { ZonesExcelUploaderView } from "@/modules/zones/components/containers/zones-excel-container/ZonesExcelUploaderView";
import type { AxiosResponse } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { read, utils } from "xlsx";

const ZonesExcelUploader = () => {
  const [parsedData, setParsedData] = useState<UploadingZone[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<UploadingZone[]>([]);

  const handleFileRead = (file: File): Promise<UploadingZone[]> => {
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

          const requiredFields = ["title", "bar"];
          // sector - опциональное поле

          const missingFields = requiredFields.filter(
            (field) => !Object.keys(json[0] || {}).includes(field),
          );

          if (missingFields.length) {
            return reject(
              new Error(
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

          resolve(formatted);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error("Ошибка чтения файла"));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileReadFromDrop = async (file: File) => {
    try {
      const data = await handleFileRead(file);
      setParsedData(data);
      setPreview(data.slice(0, 20));
      toast("Файл успешно прочитан ✅", {
        description: `Найдено записей: ${data.length}`,
      });
    } catch (error: unknown) {
      const errorUpload = error as Error;
      toast("Ошибка обработки файла ❌", {
        description: errorUpload.message || "Ошибка при чтении файла",
      });
      console.error(errorUpload);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await handleFileRead(file);
      setParsedData(data);
      setPreview(data.slice(0, 20));
      toast("Файл успешно прочитан ✅", {
        description: `Найдено записей: ${data.length}`,
      });
    } catch (error: unknown) {
      const errorUpload = error as Error;
      toast("Ошибка обработки файла ❌", {
        description: errorUpload.message || "Ошибка при чтении файла",
      });
      console.error(errorUpload);
    }
  };

  const handleSendToServer = async () => {
    if (!parsedData) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response: AxiosResponse<ExcelUploadResult> = await apiClient.post(
        "/zones/bulk",
        { zones: parsedData },
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress(progress);
            }
          },
        },
      );

      const { results } = response.data;

      toast("Успешно загружено ✅", {
        description: `Создано: ${results.created}, Пропущено: ${results.skipped}`,
      });

      setParsedData(null);
      setPreview([]);
      setUploadProgress(0);
    } catch (error: unknown) {
      const errorUpload = error as Error;
      toast("Ошибка загрузки ❌", {
        description: errorUpload.message || "Ошибка при загрузке на сервер",
      });
      console.error(errorUpload);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ZonesExcelUploaderView
      handleFileUpload={handleFileUpload}
      handleFileReadFromDrop={handleFileReadFromDrop}
      handleSendToServer={handleSendToServer}
      preview={preview}
      parsedData={parsedData}
      uploadProgress={uploadProgress}
      isUploading={isUploading}
    />
  );
};

export { ZonesExcelUploader };
export default ZonesExcelUploader;
