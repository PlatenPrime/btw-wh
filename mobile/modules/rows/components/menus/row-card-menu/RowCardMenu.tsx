import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox, ThemedPressable } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { UpdateRowDialog } from "@/modules/rows/components/dialogs/update-row-dialog/UpdateRowDialog";
import { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

interface RowCardMenuProps {
  row: RowDto;
  onSuccess?: () => void;
}

export function RowCardMenu({ row, onSuccess }: RowCardMenuProps) {
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
          size="md"
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
                  className="flex-row items-center p-3"
                >
                  <ThemedIcon
                    family="MaterialIcons"
                    name="edit"
                    size="md"
                    color={SemanticColors.iconColors.sky}
                  />
                  <ThemedText type="default" className="text-sm ">
                    Редагувати
                  </ThemedText>
                </ThemedPressable>

                <ThemedBox className="h-px bg-outline-200 my-1" />

                <ThemedPressable
                  onPress={handleDelete}
                  className="flex-row items-center p-3"
                >
                  <ThemedIcon
                    family="MaterialIcons"
                    name="delete"
                    size="md"
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

      <UpdateRowDialog
        row={row}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={handleEditSuccess}
      />

      <DeleteRowDialog
        row={row}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
