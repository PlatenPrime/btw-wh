import type { IPos } from "@/modules/poses/api";
import { useUpdatePosMutation } from "@/modules/poses/api";
import { useState } from "react";
import { UpdatePosFormView } from "./view";

interface UpdatePosFormProps {
  pos: IPos;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdatePosForm({
  pos,
  onSuccess,
  onCancel,
}: UpdatePosFormProps) {
  const [quant, setQuant] = useState(pos.quant);
  const [boxes, setBoxes] = useState(pos.boxes);
  const [sklad, setSklad] = useState(pos.sklad );
  const [date, setDate] = useState(pos.date || "");
  const [comment, setComment] = useState(pos.comment);
  const [error, setError] = useState<string | null>(null);

  const updatePosMutation = useUpdatePosMutation(pos);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await updatePosMutation.mutateAsync({
        id: pos._id,
        data: {
          quant,
          boxes,
          sklad,
          date,
          comment,
        },
      });
      onSuccess?.();
    } catch (error) {
      setError("Помилка при оновленні позиції");
      console.error("Error updating pos:", error);
    }
  };

  return (
    <UpdatePosFormView
      artikul={pos.artikul}
      quant={quant}
      setQuant={setQuant}
      boxes={boxes}
      setBoxes={setBoxes}
      sklad={sklad}
      setSklad={setSklad}
      date={date}
      setDate={setDate}
      comment={comment}
      setComment={setComment}
      error={error}
      isSubmitting={updatePosMutation.isPending}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
