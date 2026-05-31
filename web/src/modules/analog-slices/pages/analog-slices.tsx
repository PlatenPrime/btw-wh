import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { AnalogSlicesControls } from "@/modules/analog-slices/components/controls/analog-slices-controls/AnalogSlicesControls";
import { AnalogSliceFetcher } from "@/modules/analog-slices/components/fetchers/analog-slice-fetcher";
import { useState } from "react";

export function AnalogSlices() {
  const [konkName, setKonkName] = useState("");
  const [date, setDate] = useState("");

  const showForm = Boolean(konkName && date);

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

        {showForm ? (
          <AnalogSliceFetcher konkName={konkName} date={date} />
        ) : null}
      </div>
    </SidebarInsetLayout>
  );
}
