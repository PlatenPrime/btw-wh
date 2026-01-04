import { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { Pressable, Box } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
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
      <Pressable onPress={() => setModalVisible(true)} className="p-2">
        <Icon
          family="MaterialIcons"
          name="more-vert"
          size={20}
          color={SemanticColors.iconColors.sky}
        />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <Box className="flex-1 bg-black/50 items-center justify-center">
            <TouchableWithoutFeedback>
              <Box className="min-w-[200px] rounded-xl border border-outline-100 bg-background-0 p-2 shadow-lg">
                <Pressable
                  onPress={handleEdit}
                  className="flex-row items-center py-3 px-4"
                >
                  <Icon
                    family="MaterialIcons"
                    name="edit"
                    size={20}
                    color={SemanticColors.iconColors.sky}
                  />
                  <ThemedText type="default" className="text-sm">
                    Редагувати
                  </ThemedText>
                </Pressable>

                <Box className="h-px bg-outline-200 my-1" />

                <Pressable
                  onPress={handleDelete}
                  className="flex-row items-center py-3 px-4"
                >
                  <Icon
                    family="MaterialIcons"
                    name="delete"
                    size={20}
                    color={SemanticColors.error.text}
                  />
                  <ThemedText type="default" className="text-sm text-error-600">
                    Видалити
                  </ThemedText>
                </Pressable>
              </Box>
            </TouchableWithoutFeedback>
          </Box>
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

