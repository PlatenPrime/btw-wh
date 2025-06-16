import { apiClient } from "@/lib/apiClient"; // путь подкорректируй если нужно
import React, { useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import type { UploadingArt } from "../../types";
import { View } from "./view";

export const ArtsExcelUploader = () => {
  const [parsedData, setParsedData] = useState<UploadingArt[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadFinished, setIsUploadFinished] = useState(false);
  const [preview, setPreview] = useState<UploadingArt[]>([]);

  const handleFileRead = (file: File): Promise<UploadingArt[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, {
            defval: "",
          }) as UploadingArt[];

          const requiredFields = ["artikul", "zone", "namerus", "nameukr"];

          const missingFields = requiredFields.filter(
            (field) => !Object.keys(json[0] || {}).includes(field)
          );

          if (missingFields.length) {
            return reject(
              new Error(
                `В документі відсутні поля: ${missingFields.join(", ")}`
              )
            );
          }

          const formatted = json
            .map((row) => ({
              artikul: row.artikul?.toString().trim(),
              zone: row.zone?.toString().trim(),
              namerus: row.namerus?.toString().trim(),
              nameukr: row.nameukr?.toString().trim(),
            }))
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
    if (!parsedData) {
      toast("Немає данних для відправки", {
        description: "Спочатку завантажте файл",
      });
      return;
    }

    try {
      const response = await apiClient.post("/arts/upsert", parsedData, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setUploadProgress(percent);
        },
      });
      setUploadProgress(100);
      setTimeout(() => {
        setUploadProgress(0);
        setIsUploadFinished(false);
      }, 2000);
      toast("Імпорт завершено ✅", {
        description: `Імпортовано записів: ${
          response.data?.length ?? "невідомо"
        }`,
      });

      console.log(response.data);
    } catch (error: unknown) {
      const errorResponse = error as {
        response: { data: { message: string } };
      };
      toast("Помилка при імпорті ❌", {
        description:
          errorResponse.response?.data?.message ||
          "Невідома помилка при імпорті",
      });
      console.error(error);
    }
  };

  return (
    <View
      handleFileUpload={handleFileUpload}
      handleSendToServer={handleSendToServer}
      preview={preview}
      parsedData={parsedData}
      uploadProgress={uploadProgress}
      isUploadFinished={isUploadFinished}
    />
  );
};
