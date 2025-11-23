import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRole } from "@/modules/auth/hooks/useRole";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsContainerView } from "@/modules/arts/components/containers/arts-container/ArtsContainerView.tsx";
import { DeleteArtsWithoutLatestMarkerDialog } from "@/modules/arts/components/dialogs/delete-arts-without-latest-marker-dialog/DeleteArtsWithoutLatestMarkerDialog";
import { handleExportArts } from "@/modules/arts/utils/handle-export-arts/handleExportArts";
import { handleExportArtsWithStocks } from "@/modules/arts/utils/handle-export-arts-with-stocks/handleExportArtsWithStocks";
import { Download, FileSpreadsheet, Trash2 } from "lucide-react";
import { useState } from "react";

interface ArtsContainerProps {
  data: ArtDto[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
}

export function ArtsContainer({
  data,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  search,
  onSearchChange,
}: ArtsContainerProps) {
  const bottomRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const { isPrime } = useRole();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Регистрируем действия в header меню
  const headerActions: HeaderAction[] = [
    {
      id: "export-arts",
      label: "Експортувати в Excel",
      icon: Download,
      variant: "default",
      onClick: () => handleExportArts(),
    },
    {
      id: "export-arts-with-stocks",
      label: "Експортувати з запасами",
      icon: FileSpreadsheet,
      iconColor: "emerald",
      variant: "default",
      onClick: () => handleExportArtsWithStocks(),
    },
  ];

  // Добавляем кнопку удаления только для пользователей с ролью PRIME
  if (isPrime()) {
    headerActions.push({
      id: "delete-arts-without-latest-marker",
      label: "Видалити неактуальні артикули",
      icon: Trash2,
      iconColor: "red",
      variant: "destructive",
      onClick: () => setDeleteDialogOpen(true),
    });
  }

  useRegisterHeaderActions(headerActions);

  return (
    <>
      <ArtsContainerView
        data={data}
        isFetchingNextPage={isFetchingNextPage}
        search={search}
        onSearchChange={onSearchChange}
        bottomRef={bottomRef}
      />
      <DeleteArtsWithoutLatestMarkerDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
