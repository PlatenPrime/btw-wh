import { downloadKonkBtradeComparisonExcel } from "@/modules/analogs/api/services/queries/downloadKonkBtradeComparisonExcel";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function getErrorMessageFromBlobError(error: unknown): Promise<string> {
  if (!axios.isAxiosError(error) || !error.response?.data) {
    return error instanceof Error ? error.message : "Невідома помилка";
  }

  const data = error.response.data;

  if (data instanceof Blob) {
    try {
      const text = await data.text();
      const json = JSON.parse(text) as { message?: string };
      if (typeof json.message === "string") return json.message;
    } catch {
      // ignore parse errors
    }
  }

  return error instanceof Error ? error.message : "Невідома помилка";
}

export function useDownloadKonkBtradeComparisonExcelMutation() {
  return useMutation({
    mutationFn: ({
      konk,
      prod,
      dateFrom,
      dateTo,
      abc,
      sortBy,
    }: {
      konk: string;
      prod: string;
      dateFrom: string;
      dateTo: string;
      abc?: string;
      sortBy?: "abc";
    }) =>
      downloadKonkBtradeComparisonExcel({
        konk,
        prod,
        dateFrom,
        dateTo,
        abc,
        sortBy,
      }),
    onSuccess: ({ blob, filename }) => {
      triggerBlobDownload(blob, filename);
      toast.success("Файл успішно завантажено");
    },
    onError: async (error: Error) => {
      const description = await getErrorMessageFromBlobError(error);
      toast.error("Помилка завантаження Excel", { description });
    },
  });
}

