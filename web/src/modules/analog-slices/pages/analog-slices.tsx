import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { AnalogSlicesControls } from "@/modules/analog-slices/components/controls/analog-slices-controls/AnalogSlicesControls";
import {
  AnalogSliceTableContainer,
  AnalogSliceTableSkeleton,
} from "@/modules/analog-slices/components/containers/analog-slice-table-container";
import { useAnalogSliceQuery } from "@/modules/analog-slices/api/hooks/queries/useAnalogSliceQuery";
import { useState } from "react";
import { isAxiosError } from "axios";

export function AnalogSlices() {
  const [konkName, setKonkName] = useState("");
  const [date, setDate] = useState("");

  const sliceQuery = useAnalogSliceQuery({ konkName, date });

  const showForm = Boolean(konkName && date);
  const isEmpty =
    sliceQuery.data?.data?.data &&
    Object.keys(sliceQuery.data.data.data).length === 0;

  return (
    <SidebarInsetLayout headerText="Зрізи">
      <div className="grid gap-4 p-2">
        <AnalogSlicesControls
          konkName={konkName}
          onKonkNameChange={setKonkName}
          date={date}
          onDateChange={setDate}
        />

        {!showForm && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента та дату для перегляду зрізу.
          </p>
        )}

        {showForm && sliceQuery.isLoading && <AnalogSliceTableSkeleton />}

        {showForm &&
          sliceQuery.error &&
          isAxiosError(sliceQuery.error) &&
          sliceQuery.error.response?.status === 404 && (
            <LoadingNoData description="Зріз не знайдено" />
          )}

        {showForm &&
          sliceQuery.error &&
          !(isAxiosError(sliceQuery.error) && sliceQuery.error.response?.status === 404) && (
            <ErrorDisplay
              error={sliceQuery.error}
              title="Помилка завантаження зрізу"
              description="Не вдалося завантажити зріз аналогів"
            />
          )}

        {showForm &&
          sliceQuery.isSuccess &&
          (sliceQuery.data?.data?.data == null || isEmpty) && (
            <LoadingNoData description="Зріз не знайдено" />
          )}

        {showForm &&
          sliceQuery.isSuccess &&
          sliceQuery.data?.data?.data != null &&
          !isEmpty && (
            <AnalogSliceTableContainer
              data={sliceQuery.data.data.data}
            />
          )}
      </div>
    </SidebarInsetLayout>
  );
}
