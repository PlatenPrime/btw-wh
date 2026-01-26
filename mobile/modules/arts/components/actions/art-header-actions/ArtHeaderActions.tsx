import type { HeaderAction } from "@/components/layout/header";
import { useRegisterHeaderActions } from "@/components/layout/header";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtHeaderActionsView } from "@/modules/arts/components/actions/art-header-actions/ArtHeaderActionsView";
import { useCallback, useMemo, useState } from "react";

interface ArtHeaderActionsProps {
  artData: ArtDto;
}

export function ArtHeaderActions({ artData }: ArtHeaderActionsProps) {
  const [updateLimitDialogOpen, setUpdateLimitDialogOpen] = useState(false);
  const [createAskDialogOpen, setCreateAskDialogOpen] = useState(false);

  const openUpdateLimitDialog = useCallback(() => {
    setUpdateLimitDialogOpen(true);
  }, []);

  const openCreateAskDialog = useCallback(() => {
    setCreateAskDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "update-art-limit",
        label: "Змінити ліміт",
        icon: "edit",
        iconColor: "blue",
        textColor: "blue",
        variant: "default",
        onClick: openUpdateLimitDialog,
      },
      {
        id: "create-ask",
        label: "Створити запит",
        icon: "add",
        iconColor: "emerald",
        textColor: "emerald",
        variant: "default",
        onClick: openCreateAskDialog,
      },
    ],
    [openCreateAskDialog, openUpdateLimitDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <ArtHeaderActionsView
      artData={artData}
      updateLimitDialogOpen={updateLimitDialogOpen}
      onUpdateLimitDialogOpenChange={setUpdateLimitDialogOpen}
      createAskDialogOpen={createAskDialogOpen}
      onCreateAskDialogOpenChange={setCreateAskDialogOpen}
    />
  );
}

