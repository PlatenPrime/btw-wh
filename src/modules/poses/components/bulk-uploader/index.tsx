import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useBulkCreatePosesMutation } from "../../api/useBulkCreatePosesMutation";

interface BulkUploaderProps {
  palletId: string;
  rowId: string;
  onSuccess?: () => void;
}

interface UploadingPos {
  artikul: string;
  quant: number;
  boxes: number;
  limit: number;
  comment: string;
  date?: string;
  sklad?: string;
}

export function BulkUploader({
  palletId,
  rowId,
  onSuccess,
}: BulkUploaderProps) {
  const [parsedData, setParsedData] = useState<UploadingPos[] | null>(null);
  const [preview, setPreview] = useState<UploadingPos[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutation = useBulkCreatePosesMutation(palletId);

  const handleFileRead = (file: File): Promise<UploadingPos[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, {
            defval: "",
          }) as UploadingPos[];
          // Валидация
          const requiredFields = [
            "artikul",
            "quant",
            "boxes",
            "limit",
            "comment",
          ];
          const missingFields = requiredFields.filter(
            (field) => !Object.keys(json[0] || {}).includes(field),
          );
          if (missingFields.length) {
            return reject(
              new Error(
                `В документі відсутні поля: ${missingFields.join(", ")}`,
              ),
            );
          }
          const formatted = json
            .map((row) => ({
              artikul: row.artikul?.toString().trim(),
              quant: Number(row.quant),
              boxes: Number(row.boxes),
              limit: Number(row.limit),
              comment: row.comment?.toString().trim(),
              date: row.date?.toString().trim() || undefined,
              sklad: row.sklad?.toString().trim() || undefined,
            }))
            .filter(
              (row) =>
                row.artikul &&
                row.quant &&
                row.boxes &&
                row.limit &&
                row.comment,
            );
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
    setError(null);
    try {
      const data = await handleFileRead(file);
      setParsedData(data);
      setPreview(data.slice(0, 10));
    } catch (err: any) {
      setError(err.message || "Помилка обробки файла");
    }
  };

  const handleSendToServer = async () => {
    if (!parsedData) return;
    setIsUploading(true);
    setError(null);
    try {
      await mutation.mutateAsync({
        poses: parsedData.map((row) => ({
          ...row,
          pallet: palletId,
          row: rowId,
        })),
      });
      setIsUploading(false);
      setParsedData(null);
      setPreview([]);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "Помилка імпорту");
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-card-background grid w-full gap-6 rounded-2xl border p-6 shadow-lg">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">Імпорт позицій з Excel</h2>
        <p className="text-muted-foreground text-sm">
          Завантажте файл <code className="rounded px-1">.xlsx</code> з полями{" "}
          <span className="font-bold">
            artikul, quant, boxes, limit, comment
          </span>
        </p>
      </header>
      <Input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      {error && <div className="text-destructive text-sm">{error}</div>}
      {preview.length > 0 && (
        <div>
          <div className="mb-2 font-medium">
            Попередній перегляд (перші 10):
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-xs">
              <thead>
                <tr>
                  <th>artikul</th>
                  <th>quant</th>
                  <th>boxes</th>
                  <th>limit</th>
                  <th>comment</th>
                  <th>date</th>
                  <th>sklad</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i}>
                    <td>{row.artikul}</td>
                    <td>{row.quant}</td>
                    <td>{row.boxes}</td>
                    <td>{row.limit}</td>
                    <td>{row.comment}</td>
                    <td>{row.date}</td>
                    <td>{row.sklad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Button
        onClick={handleSendToServer}
        disabled={!parsedData || isUploading}
        className="w-fit py-3 font-medium disabled:cursor-not-allowed"
        variant="default"
      >
        {isUploading ? "Імпорт..." : "Відправити"}
      </Button>
    </div>
  );
}
