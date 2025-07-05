import { Button } from "@/components/ui/button";
import type { UploadingArt } from "../../types";
import { InputUploader } from "./input-uploader";
import { PreviewTable } from "./preview-table";
import { ProgressBar } from "./progress-bar";

interface ViewProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileReadFromDrop: (file: File) => void;
  handleSendToServer: () => void;
  preview: UploadingArt[];
  parsedData: UploadingArt[] | null;
  uploadProgress: number;
  isUploading: boolean;
}

export function View({
  handleFileUpload,
  handleFileReadFromDrop,
  handleSendToServer,
  preview,
  parsedData,
  uploadProgress,
  isUploading,
}: ViewProps) {
  return (
    <div className="bg-card-background grid w-full gap-6 rounded-2xl border p-6 shadow-lg">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">Імпорт з Excel</h2>
        <p className="text-muted-foreground text-sm">
          Завантажте файл <code className="rounded px-1">.xlsx</code> з полями{" "}
          <span className="font-bold">artikul, zone, namerus, nameukr</span>
        </p>
      </header>

      <InputUploader
        handleFileUpload={handleFileUpload}
        handleFileReadFromDrop={handleFileReadFromDrop}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />

      <PreviewTable preview={preview} />

      <Button
        onClick={handleSendToServer}
        disabled={!parsedData}
        className="w-fit py-3 font-medium disabled:cursor-not-allowed"
        variant="default"
      >
        Відправити
      </Button>

      <ProgressBar uploadProgress={uploadProgress} isUploading={isUploading} />
    </div>
  );
}
