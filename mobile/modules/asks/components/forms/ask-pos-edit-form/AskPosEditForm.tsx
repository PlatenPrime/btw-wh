import { usePullAskMutation } from "@/modules/asks/api/hooks/mutations/usePullAskMutation";
import { useUpdateAskActionsByIdMutation } from "@/modules/asks/api/hooks/mutations/useUpdateAskActionsByIdMutation";
import { AskPosEditFormView } from "@/modules/asks/components/forms/ask-pos-edit-form/AskPosEditFormView";
import {
  askPosEditFormSchema,
  createAskPosEditFormDefaultValues,
  type AskPosEditFormData,
} from "@/modules/asks/components/forms/ask-pos-edit-form/schema";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useUpdatePosByIdMutation } from "@/modules/poses/api/hooks/mutations/useUpdatePosByIdMutation";
import type { PosResponse } from "@/modules/poses/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getAskActionTextUtil } from "./utils/getAskActionTextUtil";
import { handleRemovedBoxesChangeUtil } from "./utils/handleRemovedBoxesChangeUtil";
import { handleRemovedQuantChangeUtil } from "./utils/handleRemovedQuantChangeUtil";

interface AskPosEditFormProps {
  pos: PosResponse;
  askId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  initialRemovedQuant?: number;
}

export function AskPosEditForm({
  pos,
  askId,
  onSuccess,
  onCancel,
  initialRemovedQuant,
}: AskPosEditFormProps) {
  const form = useForm<AskPosEditFormData>({
    resolver: zodResolver(askPosEditFormSchema),
    defaultValues: createAskPosEditFormDefaultValues(initialRemovedQuant),
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;

  const removedQuant = watch("removedQuant");
  const removedBoxes = watch("removedBoxes");

  const { user } = useAuth();
  const updatePosMutation = useUpdatePosByIdMutation();
  const pullAskMutation = usePullAskMutation({ askId });
  const updateAskActionsMutation = useUpdateAskActionsByIdMutation();

  const handleRemovedQuantChange = (value: string) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AskPosEditForm.tsx:53',message:'handleRemovedQuantChange called',data:{value},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    handleRemovedQuantChangeUtil({ name: "removedQuant", value, setValue });
  };

  const handleRemovedBoxesChange = (value: string) => {
    handleRemovedBoxesChangeUtil({ name: "removedBoxes", value, setValue });
  };

  const onSubmit = async (data: AskPosEditFormData) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AskPosEditForm.tsx:61',message:'onSubmit called',data:{removedQuant:data.removedQuant,removedBoxes:data.removedBoxes,hasUser:!!user},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      const removedQuantNum = parseInt(data.removedQuant, 10);
      const removedBoxesNum =
        data.removedBoxes === "" ? 0 : parseInt(data.removedBoxes, 10);

      // Вычисляем новые значения
      const newQuant = pos.data!.quant - removedQuantNum;
      const newBoxes = pos.data!.boxes - removedBoxesNum;

      // Проверяем, что новые значения не отрицательные
      if (newQuant < 0) {
        throw new Error("Не можна зняти більше товару, ніж є в наявності");
      }

      if (newBoxes < 0) {
        throw new Error("Не можна зняти більше коробок, ніж є в наявності");
      }

      onSuccess?.();

      const actionText = getAskActionTextUtil({
        removedQuant: removedQuantNum,
        removedBoxes: removedBoxesNum,
        pos,
      });

      // Фіксуємо подію підтягування до оновлення складу
      const palletData = pos.data?.palletData;
      const pullQuant = Math.max(removedQuantNum, 0);
      const pullBoxes = Math.max(removedBoxesNum, 0);
      const shouldCreatePull = pullQuant > 0 || pullBoxes > 0;

      if (shouldCreatePull) {
        if (!palletData?._id || !palletData?.title) {
          throw new Error("Не знайдено валідну палету для підтягування");
        }

        // Оновлюємо позицію
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AskPosEditForm.tsx:105',message:'Before updatePosMutation',data:{posId:pos.data!._id,newQuant,newBoxes},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        await updatePosMutation.mutateAsync({
          id: pos.data!._id,
          data: {
            quant: newQuant,
            boxes: newBoxes,
            sklad: pos.data!.sklad,
          },
        });
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AskPosEditForm.tsx:113',message:'After updatePosMutation',data:{success:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion

        await pullAskMutation.mutateAsync({
          solverId: user._id,
          action: actionText,
          pullAskData: {
            palletData: {
              _id: palletData._id,
              title: palletData.title,
            },
            quant: pullQuant,
            boxes: pullBoxes,
          },
        });
      }
    } catch (error) {
      console.error("Error updating pos:", error);
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка оновлення позиції",
      });
    }
  };

  const isFormSubmitting =
    isSubmitting ||
    updatePosMutation.isPending ||
    pullAskMutation.isPending ||
    updateAskActionsMutation.isPending;

  // Вычисляем остатки
  const remainingQuant =
    pos.data!.quant - (removedQuant === "" ? 0 : parseInt(removedQuant, 10));
  const remainingBoxes =
    pos.data!.boxes - (removedBoxes === "" ? 0 : parseInt(removedBoxes, 10));

  return (
    <AskPosEditFormView
      form={form}
      pos={pos}
      remainingQuant={remainingQuant}
      remainingBoxes={remainingBoxes}
      onRemovedQuantChange={handleRemovedQuantChange}
      onRemovedBoxesChange={handleRemovedBoxesChange}
      isSubmitting={isFormSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

