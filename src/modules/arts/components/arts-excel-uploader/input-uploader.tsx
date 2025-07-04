import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface InputUploaderProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileReadFromDrop: (file: File) => void;
}

export function InputUploader({
  handleFileUpload,
  handleFileReadFromDrop,
}: InputUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith(".xlsx")) {
      handleFileReadFromDrop(file);
    }
  };

  return (
    <div
      className={`grid w-full max-w-sm items-center gap-4 transition-colors rounded-xl ${
        isDragOver ? "bg-emerald-100 border-emerald-400 dark:bg-emerald-900 dark:border-emerald-50 overflow-hidden" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div className="w-full py-9 bg-slate-500/10 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
        <div className="grid gap-2">
          <h3 className="text-center text-foreground text-sm font-medium leading-snug">
            Оберіть або перетягніть Excel файл:
          </h3>
          <div className="grid gap-1">
            <h4 className="text-center text-muted-foreground text-xs leading-4">
              Тільки формат <code>.xlsx</code>.
            </h4>
          </div>
          <div className="flex items-center justify-center">
            <Label htmlFor="excel-upload">
              <Input
                id="excel-upload"
                type="file"
                hidden
                accept=".xlsx"
                onChange={handleFileUpload}
              />
              <div className="flex w-28 h-9 px-2 flex-col bg-emerald-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                Вибрати
              </div>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
