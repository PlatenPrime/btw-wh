import { toast } from "sonner";
import { exportArtsKeys } from "@/modules/arts/api/services/queries/exportArtsKeys";

export function handleExportArtsKeys() {
  exportArtsKeys()
    .then(({ blob, filename }) => {
      const url = window.URL.createObjectURL(blob);
      const anchorElement = document.createElement("a");
      anchorElement.href = url;
      anchorElement.download = filename;
      document.body.appendChild(anchorElement);
      anchorElement.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(anchorElement);
      toast.success("Файл успішно збережено");
    })
    .catch((error) => {
      toast.error("Помилка експорту", {
        description: error.message,
      });
    });
}
