import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { UploadingZone } from "@/modules/zones/components/containers/zones-excel-container/types";
import {
  AlertCircle,
  CheckCircle,
  FileSpreadsheet,
  Upload,
} from "lucide-react";

interface ZonesExcelUploaderViewProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendToServer: () => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  preview: UploadingZone[];
  parsedData: UploadingZone[] | null;
  uploadProgress: number;
  isUploading: boolean;
}

export function ZonesExcelUploaderView({
  handleFileUpload,
  handleSendToServer,
  handleDrop,
  handleDragOver,
  preview,
  parsedData,
  uploadProgress,
  isUploading,
}: ZonesExcelUploaderViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Імпорт зон з Excel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="border-muted-foreground/25 hover:border-muted-foreground/50 rounded-lg border-2 border-dashed p-8 text-center transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Перетягніть Excel файл сюди</p>
              <p className="text-muted-foreground text-sm">
                або виберіть файл для завантаження
              </p>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="excel-upload"
              />
              <Button asChild>
                <label htmlFor="excel-upload" className="cursor-pointer">
                  Вибрати файл
                </label>
              </Button>
            </div>
          </div>

          {parsedData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  Знайдено записів: {parsedData.length}
                </p>
                <Button
                  onClick={handleSendToServer}
                  disabled={isUploading}
                  className="flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Завантаження...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Завантажити на сервер
                    </>
                  )}
                </Button>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Завантаження...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {preview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Попередній перегляд (перші 20 записів):
                  </p>
                  <div className="overflow-hidden rounded-lg border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">
                              Назва
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium">
                              Штрихкод
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium">
                              Сектор
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {preview.map((zone, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2 font-mono text-sm">
                                {zone.title}
                              </td>
                              <td className="px-4 py-2 font-mono text-sm">
                                {zone.bar}
                              </td>
                              <td className="px-4 py-2 font-mono text-sm">
                                {zone.sector || 0}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Вимоги до файлу
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground space-y-2 text-sm">
            <p>• Файл повинен бути у форматі Excel (.xlsx)</p>
            <p>
              • Обов'язкові колонки:{" "}
              <code className="bg-muted rounded px-1">title</code>,{" "}
              <code className="bg-muted rounded px-1">bar</code>
            </p>
            <p>
              • Опціональна колонка:{" "}
              <code className="bg-muted rounded px-1">sector</code>
            </p>
            <p>• Назва зони повинна бути у форматі: 42-1 або 42-5-2</p>
            <p>• Штрихкод повинен бути додатним числом</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
