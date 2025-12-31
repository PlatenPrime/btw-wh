import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { useMemo, useState } from "react";
import { QuickAccessPanelView } from "./QuickAccessPanelView";
import type { QuickAccessTrigger } from "./types";

interface QuickAccessPanelProps {
  triggers?: QuickAccessTrigger[];
}

const defaultTriggers: QuickAccessTrigger[] = [
  {
    id: "create-ask",
    title: "Створити запит",
    icon: "add-circle",
    color: "purple" as const,
  },
];

export function QuickAccessPanel({
  triggers = defaultTriggers,
}: QuickAccessPanelProps) {
  const [createAskDialogOpen, setCreateAskDialogOpen] = useState(false);

  const processedTriggers = useMemo(() => {
    return triggers.map((trigger) => {
      if (trigger.id === "create-ask") {
        return {
          ...trigger,
          onPress: () => setCreateAskDialogOpen(true),
        };
      }
      return {
        ...trigger,
        onPress: trigger.onPress || (() => {}),
      };
    });
  }, [triggers]);

  const handleCreateAskSuccess = () => {
    setCreateAskDialogOpen(false);
  };

  return (
    <>
      <QuickAccessPanelView triggers={processedTriggers} />
      <CreateAskDialog
        open={createAskDialogOpen}
        onOpenChange={setCreateAskDialogOpen}
        onSuccess={handleCreateAskSuccess}
      />
    </>
  );
}
