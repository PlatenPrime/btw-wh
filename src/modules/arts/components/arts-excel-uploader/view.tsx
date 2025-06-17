import { Button } from "@/components/ui/button";
import type { UploadingArt } from "../../types";
import { InputUploader } from "./input-uploader";
import { PreviewTable } from "./preview-table";
import { ProgressBar } from "./progress-bar";

interface ViewProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendToServer: () => void;
  preview: UploadingArt[];
  parsedData: UploadingArt[] | null;
  uploadProgress: number;
  isUploading: boolean;
}

export function View({
  handleFileUpload,
  handleSendToServer,
  preview,
  parsedData,
  uploadProgress,
  isUploading,
}: ViewProps) {
  return (
    <div className="w-full grid gap-6  bg-card-background  border rounded-2xl shadow-lg p-6 ">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold ">Імпорт з Excel</h2>
        <p className="text-sm text-muted-foreground">
          Завантажте файл{" "}
          <code className=" px-1 rounded">
            .xlsx
          </code>{" "}
          з полями{" "}
          <span className="font-bold">artikul, zone, namerus, nameukr</span>
        </p>
      </header>

      <InputUploader handleFileUpload={handleFileUpload} />

      <PreviewTable preview={preview} />

      <Button
        onClick={handleSendToServer}
        disabled={!parsedData}
        className=" py-3 w-fit font-medium disabled:cursor-not-allowed"
        variant="default"
      >
        Відправити
      </Button>

      <ProgressBar uploadProgress={uploadProgress} isUploading={isUploading} />
    </div>
  );
}
