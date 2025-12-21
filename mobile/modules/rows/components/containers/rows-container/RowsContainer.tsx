import { useState } from "react";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { useRegisterHeaderActions } from "@/components/layout/header";
import { RowsContainerView } from "./RowsContainerView";

interface RowsContainerProps {
  data: RowDto[] | undefined;
  isLoading: boolean;
}

export function RowsContainer({ data, isLoading }: RowsContainerProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useRegisterHeaderActions([
    {
      id: "create-row",
      label: "Створити ряд",
      icon: "add",
      iconColor: "emerald",
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
    />
  );
}

