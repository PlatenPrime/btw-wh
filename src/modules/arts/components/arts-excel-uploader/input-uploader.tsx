import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet } from "lucide-react";
import React, { useState } from "react";

interface InputUploaderProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileReadFromDrop: (file: File) => void;
  isUploading: boolean;
  uploadProgress: number;
}

export function InputUploader({
  handleFileUpload,
  handleFileReadFromDrop,
  isUploading,
  uploadProgress,
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
      className={`relative transition-colors grid w-full max-w-sm items-center gap-4 border border-emerald-900  dark:border-emerald-400  rounded-2xl border-dashed p-6 ${
        isDragOver
          ? "bg-emerald-50 dark:bg-emerald-900 border-emerald-400 dark:border-emerald-600  "
          : "bg-slate-500/10 border-gray-300"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div className="grid gap-2 items-center text-center">
        <FileSpreadsheet className="mx-auto w-8 h-8 text-emerald-600" />
        <h3 className="text-foreground text-sm font-medium leading-snug">
          Оберіть або перетягніть Excel файл
        </h3>
        <p className="text-muted-foreground text-xs leading-4">
          Тільки формат <code>.xlsx</code>
        </p>

        <Label htmlFor="excel-upload" className="leading-4 w-fit mx-auto border border-emerald-600 rounded-full cursor-pointer flex justify-center items-center px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900 text-foreground ">
          <Input
            id="excel-upload"
            type="file"
            hidden
            accept=".xlsx"
            onChange={handleFileUpload}
          />
          <p className=" ">
            Вибрати файл
          </p>
        </Label>
      </div>

      {/* {isUploading && (
        <div className="absolute bottom-0 left-0 w-full h-2 bg-emerald-100 rounded-b-2xl overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )} */}
    </div>
  );
}
