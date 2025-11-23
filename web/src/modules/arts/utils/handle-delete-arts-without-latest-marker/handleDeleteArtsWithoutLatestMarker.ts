/**
 * Утилита для открытия диалога удаления артикулов без последнего маркера
 * Используется как callback для кнопки в хедер меню
 */
export function handleDeleteArtsWithoutLatestMarker(
  onOpenDialog: () => void,
): void {
  onOpenDialog();
}

