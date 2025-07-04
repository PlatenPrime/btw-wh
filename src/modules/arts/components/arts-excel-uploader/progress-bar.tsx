interface ProgressBarProps {
  uploadProgress: number;
  isUploading: boolean;
}

export function ProgressBar({
  uploadProgress,
  isUploading,
}: ProgressBarProps) {


  if (!isUploading) {
    return null; // Не показувати прогресбар, якщо завантаження завершено
  }

  if (uploadProgress < 0 || uploadProgress > 100) {
    return null; // Не показувати прогресбар, якщо прогрес не в межах 0-100%
  }

  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span>Відправка на сервер...</span>
        <span>{uploadProgress}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-3">
        <div
          className="h-full bg-emerald-600 rounded-full transition-[width] ease-in-out duration-300"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>
    </div>
  );
}
