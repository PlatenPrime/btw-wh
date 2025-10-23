import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { UploadingZone } from "@/modules/zones/components/containers/zones-excel-container/types";
import { AlertCircle, CheckCircle, FileSpreadsheet, Upload } from "lucide-react";

interface ZonesExcelUploaderViewProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileReadFromDrop: (file: File) => void;
  handleSendToServer: () => void;
  preview: UploadingZone[];
  parsedData: UploadingZone[] | null;
  uploadProgress: number;
  isUploading: boolean;
}

export function ZonesExcelUploaderView({
  handleFileUpload,
  handleFileReadFromDrop,
  handleSendToServer,
  preview,
  parsedData,
  uploadProgress,
  isUploading,
}: ZonesExcelUploaderViewProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(file => 
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.endsWith('.xlsx')
    );
    
    if (excelFile) {
      handleFileReadFromDrop(excelFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Импорт зон из Excel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Перетащите Excel файл сюда</p>
              <p className="text-sm text-muted-foreground">
                или выберите файл для загрузки
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
                  Выбрать файл
                </label>
              </Button>
            </div>
          </div>

          {parsedData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Найдено записей: {parsedData.length}
                </p>
                <Button
                  onClick={handleSendToServer}
                  disabled={isUploading}
                  className="flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Загрузка...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Загрузить на сервер
                    </>
                  )}
                </Button>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Загрузка...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {preview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Предварительный просмотр (первые 20 записей):</p>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">Название</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Штрихкод</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Сектор</th>
                          </tr>
                        </thead>
                        <tbody>
                          {preview.map((zone, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2 font-mono text-sm">{zone.title}</td>
                              <td className="px-4 py-2 font-mono text-sm">{zone.bar}</td>
                              <td className="px-4 py-2 font-mono text-sm">{zone.sector || 0}</td>
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
            Требования к файлу
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Файл должен быть в формате Excel (.xlsx)</p>
            <p>• Обязательные колонки: <code className="bg-muted px-1 rounded">title</code>, <code className="bg-muted px-1 rounded">bar</code></p>
            <p>• Опциональная колонка: <code className="bg-muted px-1 rounded">sector</code></p>
            <p>• Название зоны должно быть в формате: 42-1 или 42-5-2</p>
            <p>• Штрихкод должен быть положительным числом</p>
            <p>• Максимум 1000 записей за раз</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
