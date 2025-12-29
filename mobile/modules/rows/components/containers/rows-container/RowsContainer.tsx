import { useState } from "react";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { useRegisterHeaderActions } from "@/components/layout/header";
import { RowsContainerView } from "./RowsContainerView";

interface RowsContainerProps {
  data: RowDto[] | undefined;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function RowsContainer({
  data,
  isLoading,
  refreshing,
  onRefresh,
}: RowsContainerProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useRegisterHeaderActions([
    {
      id: "create-row",
      label: "Створити ряд",
      icon: "add",
      iconColor: "emerald",
      textColor: "emerald",
      variant: "default",
      onClick: () => setCreateDialogOpen(true),
    },
  ]);

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false);
  };

  return (
    <RowsContainerView
      data={data}
      isLoading={isLoading}
      createDialogOpen={createDialogOpen}
      setCreateDialogOpen={setCreateDialogOpen}
      onCreateSuccess={handleCreateSuccess}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

