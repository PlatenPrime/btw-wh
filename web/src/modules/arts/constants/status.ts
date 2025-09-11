export const statusConfig = {
    new: { variant: "default" as const, text: "Новий" },
    in_progress: { variant: "secondary" as const, text: "В роботі" },
    completed: { variant: "outline" as const, text: "Завершено" },
    cancelled: { variant: "destructive" as const, text: "Скасовано" },
    solved: { variant: "outline"  as const, text: "Завершено" },
    failed: { variant: "destructive" as const, text: "Не вдалося" },
  };