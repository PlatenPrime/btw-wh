interface UploadProgressBarProps {
    uploadProgress: number;
    isUploading: boolean;
  }
  
  export function UploadProgressBar({ uploadProgress, isUploading }: UploadProgressBarProps) {
    
    if (!isUploading) {
      return null; // Не показувати прогресбар, якщо завантаження завершено
    }
  
    if (uploadProgress < 0 || uploadProgress > 100) {
      return null; // Не показувати прогресбар, якщо прогрес не в межах 0-100%
    }
  
    return (
      <div>
        <div className="mb-1 flex justify-between text-sm">
          <span>Відправка на сервер...</span>
          <span>{uploadProgress}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-success transition-[width] duration-300 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      </div>
    );
  }
  