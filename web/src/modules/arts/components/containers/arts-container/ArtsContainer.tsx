import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsContainerView } from "@/modules/arts/components/containers/arts-container/ArtsContainerView.tsx";
import { handleExportArts } from "@/modules/arts/utils/handle-export-arts/handleExportArts";
import { handleExportArtsWithStocks } from "@/modules/arts/utils/handle-export-arts-with-stocks/handleExportArtsWithStocks";
import { Download, FileSpreadsheet } from "lucide-react";

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

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
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
  ]);

  return (
    <ArtsContainerView
      data={data}
      isFetchingNextPage={isFetchingNextPage}
      search={search}
      onSearchChange={onSearchChange}
      bottomRef={bottomRef}
    />
  );
}
