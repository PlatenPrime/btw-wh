import { apiClient } from "@/lib/apiClient";
import type {
  UploadingZone,
  UpsertZonesResult,
} from "@/modules/zones/components/containers/zones-excel-container/types";
import {
  isExcelFile,
  parseExcelZones,
} from "@/modules/zones/utils/parse-excel-zones";
import type { AxiosResponse } from "axios";
import { useState } from "react";
import { toast } from "sonner";

const PREVIEW_LIMIT = 20;

export const useZonesExcelUpload = () => {
  const [parsedData, setParsedData] = useState<UploadingZone[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<UploadingZone[]>([]);

  const handleFileRead = async (file: File) => {
    try {
      const data = await parseExcelZones(file);
      setParsedData(data);
      setPreview(data.slice(0, PREVIEW_LIMIT));
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

    await handleFileRead(file);
  };

  const handleSendToServer = async () => {
    if (!parsedData) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response: AxiosResponse<UpsertZonesResult> = await apiClient.post(
        "/zones/upsert",
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

      const { result } = response.data;

      toast("Успешно загружено ✅", {
        description: `Создано: ${result.upsertedCount}, Обновлено: ${result.modifiedCount}`,
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(isExcelFile);

    if (excelFile) {
      handleFileRead(excelFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return {
    parsedData,
    preview,
    uploadProgress,
    isUploading,
    handleFileRead,
    handleFileUpload,
    handleSendToServer,
    handleDrop,
    handleDragOver,
  };
};

