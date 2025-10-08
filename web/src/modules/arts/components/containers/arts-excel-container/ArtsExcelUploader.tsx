import { apiClient } from "@/lib/apiClient"; // путь подкорректируй если нужно
import type { UploadingArt } from "@/modules/arts/api/types/arts";
import { ArtsExcelUploaderView } from "@/modules/arts/components/containers/arts-excel-container/ArtsExcelUploaderView";
import type { AxiosResponse } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { read, utils } from "xlsx";

type UpsertResponse = {
  message: string;
  result: {
    insertedCount: number;
    matchedCount: number;
    modifiedCount: number;
    deletedCount: number;
    upsertedCount: number;
    upsertedIds: Record<string, string>;
    insertedIds: Record<string, string>;
  };
};

const ArtsExcelUploader = () => {
  const [parsedData, setParsedData] = useState<UploadingArt[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<UploadingArt[]>([]);

  const handleFileRead = (file: File): Promise<UploadingArt[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = read(data, { type: "array" });

          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = utils.sheet_to_json(sheet, {
            defval: "",
          }) as UploadingArt[];

          const requiredFields = ["artikul", "zone", "namerus", "nameukr"];
          // limit и marker - опциональные поля

          const missingFields = requiredFields.filter(
            (field) => !Object.keys(json[0] || {}).includes(field),
          );

          if (missingFields.length) {
            return reject(
              new Error(
                `В документі відсутні поля: ${missingFields.join(", ")}`,
              ),
            );
          }

          const formatted = json
            .map((row) => {
              const baseData: UploadingArt = {
                artikul: row.artikul?.toString().trim(),
                zone: row.zone?.toString().trim(),
                namerus: row.namerus?.toString().trim(),
                nameukr: row.nameukr?.toString().trim(),
              };

              // Добавляем limit только если он не пустой
              const limitValue = row.limit?.toString().trim();
              if (limitValue && !isNaN(Number(limitValue))) {
                baseData.limit = Number(limitValue);
              }

              // Добавляем marker только если он не пустой
              const markerValue = row.marker?.toString().trim();
              if (markerValue) {
                baseData.marker = markerValue;
              }

              return baseData;
            })
            .filter((row) => row.artikul);

          resolve(formatted);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error("Помилка читання файла"));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileReadFromDrop = async (file: File) => {
    try {
      const data = await handleFileRead(file);
      setParsedData(data);
      setPreview(data.slice(0, 20));
      toast("Файл успішно прочитано ✅", {
        description: `Знайдено записів: ${data.length}`,
      });
    } catch (error: unknown) {
      const errorUpload = error as Error;
      toast("Помилка обробки файлу ❌", {
        description: errorUpload.message || "Помилка при читанні файлу",
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
      toast("Файл успішно прочитано ✅", {
        description: `Знайдено записів: ${data.length}`,
      });
    } catch (error: unknown) {
      const errorUpload = error as Error;
      toast("Помилка обробки файлу ❌", {
        description: errorUpload.message || "Помилка при читанні файлу",
      });
      console.error(errorUpload);
    }
  };

  const handleSendToServer = async () => {
    if (!parsedData) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response: AxiosResponse<UpsertResponse> = await apiClient.post(
        "/arts/upsert",
        parsedData,
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

      const { result } = response.data;

      toast("Успішно завантажено ✅", {
        description: `Вставлено: ${result.insertedCount}, Оновлено: ${result.modifiedCount}`,
      });

      setParsedData(null);
      setPreview([]);
      setUploadProgress(0);
    } catch (error: unknown) {
      const errorUpload = error as Error;
      toast("Помилка завантаження ❌", {
        description:
          errorUpload.message || "Помилка при завантаженні на сервер",
      });
      console.error(errorUpload);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ArtsExcelUploaderView
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

export { ArtsExcelUploader };
export default ArtsExcelUploader;
