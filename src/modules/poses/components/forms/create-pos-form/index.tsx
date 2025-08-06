import { useOneArtQuery } from "@/modules/arts/api/hooks/useOneArtQuery";
import type { IPallet } from "@/modules/pallets/api/types";
import {
  useCreatePosMutation,
  useUpdatePosByIdMutation,
} from "@/modules/poses/api";
import { useState } from "react";
import { CreatePosFormView } from "./view";

interface CreatePosFormProps {
  pallet: IPallet;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreatePosForm({
  pallet,
  onSuccess,
  onCancel,
}: CreatePosFormProps) {
  const [artikul, setArtikul] = useState("");
  const [quant, setQuant] = useState<number>(0);
  const [boxes, setBoxes] = useState<number>(0);
  const [sklad, setSklad] = useState("pogrebi");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createPosMutation = useCreatePosMutation(pallet._id);
  const updatePosMutation = useUpdatePosByIdMutation();

  // Поиск артикула при вводе 9 символов
  const shouldSearchArt = artikul.length === 9;
  const { data: artData, isPending: isArtLoading } = useOneArtQuery(
    shouldSearchArt ? artikul : undefined,
  );

  // Поиск существующей позиции с таким же артикулом
  const existingPos = pallet.poses.find(
    (pos) =>
      pos.artikul === artikul &&
      pos.sklad === sklad &&
      pos.comment === comment &&
      pos.date === date,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Валидация обязательных полей
    if (!artikul.trim() || quant <= 0 || boxes <= 0) {
      setError("Заповніть всі обов'язкові поля");
      return;
    }

    // Валидация формата артикула
    const artikulPattern = /^\d{4}-\d{4}$/;
    if (!artikulPattern.test(artikul)) {
      setError("Артикул повинен мати формат ЦЦЦЦ-ЦЦЦЦ");
      return;
    }

    try {
      if (existingPos) {
        // Обновляем существующую позицию
        await updatePosMutation.mutateAsync({
          id: existingPos._id,
          data: {
            quant: existingPos.quant + quant,
            boxes: existingPos.boxes + boxes,
          },
        });
      } else {
        // Создаем новую позицию
        await createPosMutation.mutateAsync({
          palletId: pallet._id,
          rowId: pallet.row,
          artikul,
          nameukr: artData?.nameukr,
          quant,
          boxes,
          sklad,
          date,
          comment,
        });
      }
      onSuccess?.();
    } catch (error) {
      setError("Помилка при створенні позиції");
      console.error("Error creating/updating pos:", error);
    }
  };

  // Обработка изменения артикула
  const handleArtikulChange = (value: string) => {
    setArtikul(value);
    setError(null);

    // Проверяем формат при вводе
    if (value.length > 0) {
      const pattern = /^\d{0,4}-?\d{0,4}$/;
      if (!pattern.test(value)) {
        setError("Артикул повинен мати формат ЦЦЦЦ-ЦЦЦЦ");
      }
    }
  };

  const isSubmitting =
    createPosMutation.isPending || updatePosMutation.isPending;

  return (
    <CreatePosFormView
      artikul={artikul}
      setArtikul={handleArtikulChange}
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
      isSubmitting={isSubmitting}
      isArtLoading={isArtLoading}
      artData={artData}
      existingPos={existingPos}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
