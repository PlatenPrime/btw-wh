import { Button } from "@/components/ui/button";
import type { UploadingArt } from "../../types";
import { Input } from "@/components/ui/input";

interface ViewProps {
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSendToServer: () => void;
    preview: Array<{ artikul: string; zone: string; namerus: string; nameukr: string }>;
    parsedData: UploadingArt[] | null;
    uploadProgress: number;
    isUploadFinished: boolean;
}



export function View({
    handleFileUpload,
    handleSendToServer,
    preview,
    parsedData,
    uploadProgress,
    isUploadFinished
} : ViewProps) {
  return  <div className="w-full  bg-card-background  border rounded-2xl shadow-lg p-6 space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold ">
          Імпорт з Excel
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Завантажте файл{" "}
          <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
            .xlsx
          </code>{" "}
          з полями{" "}
          <span className="font-bold">artikul, zone, namerus, nameukr</span>
        </p>
      </header>

      <div className="space-y-2">
        <label
          htmlFor="excel-upload"
          className="block text-sm font-medium text-card-foreground"
        >
          Оберіть файл Excel для завантаження:
        </label>
        <Input
          id="excel-upload"
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className=" text-sm dark:text-zinc-200
                     file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                     file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700
                     hover:file:bg-emerald-100 dark:file:bg-zinc-800 dark:file:text-zinc-100 dark:hover:file:bg-zinc-700 transition cursor-pointer"
        />
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Тільки формат <code>.xlsx</code>.
        </p>
      </div>

      {preview.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
            Попередній перегляд даних:
          </h3>
          <div className="max-h-48 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-zinc-100 dark:bg-zinc-800">
                <tr>
                  <th className="px-3 py-2">artikul</th>
                  <th className="px-3 py-2">zone</th>
                  <th className="px-3 py-2">namerus</th>
                  <th className="px-3 py-2">nameukr</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className="even:bg-zinc-50 dark:even:bg-zinc-800">
                    <td className="px-3 py-1">{row.artikul}</td>
                    <td className="px-3 py-1">{row.zone}</td>
                    <td className="px-3 py-1">{row.namerus}</td>
                    <td className="px-3 py-1">{row.nameukr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Button
        onClick={handleSendToServer}
        disabled={!parsedData}
        className=" py-3 font-medium disabled:cursor-not-allowed"
      >
        Відправити на сервер
      </Button>

      {uploadProgress > 0 && !isUploadFinished && (
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>Загрузка...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-3">
            <div
              className="h-full bg-green-600 rounded-full transition-[width] ease-in-out duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
}
