import { toast } from "sonner";
import { exportArtsWithStocks } from "../../api/services/queries/exportArtsWithStocks";

export function handleExportArtsWithStocks() {
  exportArtsWithStocks()
    .then(({ blob, filename }) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Файл успішно збережено");
    })
    .catch((error) => {
      toast.error("Помилка експорту", {
        description: error.message,
      });
    });
}

