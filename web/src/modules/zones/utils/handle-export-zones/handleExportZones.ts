import { toast } from "sonner";
import { exportZones } from "../../api/services/queries/exportZones";

export  function handleExportZones() {
    exportZones()
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Файл успешно скачан");
      })
      .catch((error) => {
        toast.error("Ошибка экспорта", {
          description: error.message,
        });
      });
  }