import { useState } from "react";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { Button, Text } from "@/components/ui";

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
      <Button
        variant="outline"
        onPress={handlePress}
        className="w-full"
      >
        <Text className="font-semibold">+ запит</Text>
      </Button>

      <CreateAskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleSuccess}
        preFilledArtikul={artikul}
      />
    </>
  );
}
