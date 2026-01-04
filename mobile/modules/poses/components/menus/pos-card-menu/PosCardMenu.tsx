import { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { ThemedPressable, ThemedBox } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosDialog } from "@/modules/poses/components/dialogs/update-pos-dialog/UpdatePosDialog";
import { DeletePosDialog } from "@/modules/poses/components/dialogs/delete-pos-dialog/DeletePosDialog";
import { SemanticColors } from "@/constants/theme";

interface PosCardMenuProps {
  pos: IPos;
  onSuccess?: () => void;
}

export function PosCardMenu({ pos, onSuccess }: PosCardMenuProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = () => {
    setModalVisible(false);
    setTimeout(() => {
      setIsEditOpen(true);
    }, 100);
  };

  const handleDelete = () => {
    setModalVisible(false);
    setTimeout(() => {
      setIsDeleteOpen(true);
    }, 100);
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    onSuccess?.();
  };

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <ThemedPressable onPress={() => setModalVisible(true)} className="p-2">
        <ThemedIcon
          family="MaterialIcons"
          name="more-vert"
          size={20}
          color={SemanticColors.iconColors.sky}
        />
      </ThemedPressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ThemedBox className="flex-1 bg-black/50 items-center justify-center">
            <TouchableWithoutFeedback>
              <ThemedBox className="min-w-[200px] rounded-xl border border-outline-100 bg-background-0 p-2 shadow-lg">
                <ThemedPressable
                  onPress={handleEdit}
                  className="flex-row items-center py-3 px-4"
                >
                  <ThemedIcon
                    family="MaterialIcons"
                    name="edit"
                    size={20}
                    color={SemanticColors.iconColors.sky}
                  />
                  <ThemedText type="default" className="text-sm">
                    Редагувати
                  </ThemedText>
                </ThemedPressable>

                <ThemedBox className="h-px bg-outline-200 my-1" />

                <ThemedPressable
                  onPress={handleDelete}
                  className="flex-row items-center py-3 px-4"
                >
                  <ThemedIcon
                    family="MaterialIcons"
                    name="delete"
                    size={20}
                    color={SemanticColors.error.text}
                  />
                  <ThemedText type="default" className="text-sm text-error-600">
                    Видалити
                  </ThemedText>
                </ThemedPressable>
              </ThemedBox>
            </TouchableWithoutFeedback>
          </ThemedBox>
        </TouchableWithoutFeedback>
      </Modal>
      
      <UpdatePosDialog
        pos={pos}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={handleEditSuccess}
      />
      
      <DeletePosDialog
        pos={pos}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}

