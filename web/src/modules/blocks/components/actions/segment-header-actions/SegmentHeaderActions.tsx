import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { SegmentHeaderActionsView } from "@/modules/blocks/components/actions/segment-header-actions/SegmentHeaderActionsView";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface SegmentHeaderActionsProps {
  segment: SegmentDto;
}

export function SegmentHeaderActions({ segment }: SegmentHeaderActionsProps) {
  const [addZonesDialogOpen, setAddZonesDialogOpen] = useState(false);

  const openAddZonesDialog = useCallback(() => {
    setAddZonesDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "add-zones",
        label: "Додати зони",
        icon: Plus,
        variant: "default",
        onClick: openAddZonesDialog,
      },
    ],
    [openAddZonesDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <SegmentHeaderActionsView
      segment={segment}
      addZonesDialogOpen={addZonesDialogOpen}
      onAddZonesDialogOpenChange={setAddZonesDialogOpen}
    />
  );
}
