import { useState } from "react";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { ThemedButton, ThemedText as ThemedTextButton } from "@/components/themed";

interface DefAskButtonProps {
  artikul: string;
}

export function DefAskButton({ artikul }: DefAskButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePress = () => {
    setDialogOpen(true);
  };

  const handleSuccess = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <ThemedButton
        variant="outline"
        onPress={handlePress}
        className="w-full"
      >
        <ThemedTextButton className="font-semibold">+ запит</ThemedTextButton>
      </ThemedButton>

      <CreateAskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleSuccess}
        preFilledArtikul={artikul}
      />
    </>
  );
}
