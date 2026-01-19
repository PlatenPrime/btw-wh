import { UploadProgressBar } from "@/components/shared/progress/UploadProgressBar";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Button } from "@/components/ui/button";
import type { UploadingArt } from "@/modules/arts/api/types/arts";
import { InputUploader } from "@/modules/arts/components/containers/arts-excel-container/components/input-uploader";
import { PreviewTable } from "@/modules/arts/components/containers/arts-excel-container/components/preview-table";

interface ViewProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileReadFromDrop: (file: File) => void;
  handleSendToServer: () => void;
  preview: UploadingArt[];
  parsedData: UploadingArt[] | null;
  uploadProgress: number;
  isUploading: boolean;
}

export function ArtsExcelUploaderView({
  handleFileUpload,
  handleFileReadFromDrop,
  handleSendToServer,
  preview,
  parsedData,
  uploadProgress,
  isUploading,
}: ViewProps) {
  return (
    <Wrapper className="grid w-full gap-6">
      <header className="space-y-2">
        <h2 className="text-xl font-bold">Імпорт з Excel</h2>
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

      <UploadProgressBar
        uploadProgress={uploadProgress}
        isUploading={isUploading}
      />
    </Wrapper>
  );
}
