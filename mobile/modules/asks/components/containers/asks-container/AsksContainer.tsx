import { useRegisterHeaderActions } from "@/components/layout/header";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { addDays, subDays } from "@/modules/asks/utils/format-date";
import { useState } from "react";
import { AsksContainerView } from "./AsksContainerView";

interface AsksContainerProps {
  data: GetAsksByDateResponse;
  isFetching: boolean;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function AsksContainer({
  data,
  isFetching,
  selectedDate,
  setSelectedDate,
  refreshing,
  onRefresh,
}: AsksContainerProps) {
  const [createAskDialogOpen, setCreateAskDialogOpen] = useState(false);

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "create-ask",
      label: "Створити запит",
      icon: "add",
      iconColor: "emerald",
      textColor: "emerald",
      variant: "default",
      onClick: () => setCreateAskDialogOpen(true),
    },
  ]);

  const handlePreviousDay = () => {
    setSelectedDate((prev) => subDays(prev, 1));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => addDays(prev, 1));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleCreateAskSuccess = () => {
    setCreateAskDialogOpen(false);
  };

  return (
    <AsksContainerView
      selectedDate={selectedDate}
      data={data}
      isFetching={isFetching}
      onPreviousDay={handlePreviousDay}
      onNextDay={handleNextDay}
      onDateSelect={handleDateSelect}
      createAskDialogOpen={createAskDialogOpen}
      setCreateAskDialogOpen={setCreateAskDialogOpen}
      onCreateAskSuccess={handleCreateAskSuccess}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}
