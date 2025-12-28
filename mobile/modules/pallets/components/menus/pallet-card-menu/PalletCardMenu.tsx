import { ThemedText } from "@/components/themed-text";
import { Box, Pressable } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { DeletePalletDialogShort } from "@/modules/pallets/components/dialogs/delete-pallet-dialog/DeletePalletDialogShort";
import { UpdatePalletDialog } from "@/modules/pallets/components/dialogs/update-pallet-dialog/UpdatePalletDialog";
import { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

interface PalletCardMenuProps {
  pallet: PalletShortDto;
  rowId: string;
  onSuccess?: () => void;
}

export function PalletCardMenu({
  pallet,
  rowId,
  onSuccess,
}: PalletCardMenuProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const defaultIconColor = useIconColor();

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
      <Pressable
        onPress={(e) => {
          e.stopPropagation?.();
          setModalVisible(true);
        }}
        className="p-2"
      >
        <Icon
          family="MaterialIcons"
          name="more-horiz"
          size="md"
          color={defaultIconColor}
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
                  className="flex-row items-center p-3"
                >
                  <Icon
                    family="MaterialIcons"
                    name="edit"
                    size="md"
                    color={defaultIconColor}
                  />
                  <ThemedText type="default" className="text-sm">
                    Редагувати
                  </ThemedText>
                </Pressable>

                <Box className="h-px bg-outline-200 my-1" />

                <Pressable
                  onPress={handleDelete}
                  className="flex-row items-center p-3"
                >
                  <Icon
                    family="MaterialIcons"
                    name="delete"
                    size="md"
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

      <UpdatePalletDialog
        pallet={pallet}
        rowId={rowId}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={handleEditSuccess}
      />

      <DeletePalletDialogShort
        pallet={pallet}
        rowId={rowId}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
