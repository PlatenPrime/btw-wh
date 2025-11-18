import type { SkladCode } from "@/constants/sklad";
import { exportPosesStocks } from "@/modules/poses/api/services/queries/exportPosesStocks";
import { toast } from "sonner";

export async function handleExportPosesStocks(sklad?: SkladCode) {
  try {
    const { blob, filename } = await exportPosesStocks({ sklad });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    toast.success("Файл успішно завантажено");
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Не вдалося експортувати залишки";
    toast.error("Помилка експорту", {
      description: message,
    });
    throw error;
  }
}

