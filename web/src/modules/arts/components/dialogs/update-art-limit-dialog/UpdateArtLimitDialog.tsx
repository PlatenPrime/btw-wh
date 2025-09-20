import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useState } from "react";
import { UpdateArtLimitDialogView } from "./UpdateArtLimitDialogView";

interface UpdateArtLimitDialogProps {
  artData: ArtDto;
}

export function UpdateArtLimitDialog({ artData }: UpdateArtLimitDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <UpdateArtLimitDialogView
      open={open}
      setOpen={setOpen}
      artData={artData}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
