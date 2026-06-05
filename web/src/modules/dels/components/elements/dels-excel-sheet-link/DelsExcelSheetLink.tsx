import { ErrorDisplay } from "@/components/shared/errors";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstantByNameQuery } from "@/modules/constants/api/hooks/queries/useConstantByNameQuery";
import { DelsExcelSheetLinkView } from "@/modules/dels/components/elements/dels-excel-sheet-link/DelsExcelSheetLinkView";

const LINKS_CONSTANT_NAME = "links";
const DELS_EXCEL_SHEET_KEY = "dels_excel_sheet";

export function DelsExcelSheetLink() {
  const { data, isLoading, error } = useConstantByNameQuery({
    name: LINKS_CONSTANT_NAME,
  });

  if (isLoading) {
    return <Skeleton className="h-9 w-48 self-start" />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Не вдалося завантажити посилання на таблицю"
        description="Не вдалося отримати посилання на Google таблицю поставок"
        variant="compact"
        showActions={false}
      />
    );
  }

  const url = data?.data?.data?.[DELS_EXCEL_SHEET_KEY]?.trim();

  if (!url) {
    return (
      <ErrorDisplay
        error="Посилання на таблицю поставок не налаштовано"
        title="Посилання на таблицю поставок не налаштовано"
        description="Додайте ключ dels_excel_sheet у константу links"
        variant="compact"
        showActions={false}
      />
    );
  }

  return <DelsExcelSheetLinkView url={url} />;
}
