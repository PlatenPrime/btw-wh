import { ThemedText } from "@/components/themed-text";
import { Box, Pressable } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { DeleteZoneDialog } from "@/modules/zones/components/dialogs/delete-zone-dialog/DeleteZoneDialog";
import { UpdateZoneDialog } from "@/modules/zones/components/dialogs/update-zone-dialog/UpdateZoneDialog";
import { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";

interface ZoneCardMenuProps {
  zone: ZoneDto;
  onSuccess?: () => void;
}

export function ZoneCardMenu({ zone, onSuccess }: ZoneCardMenuProps) {
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
      <Pressable onPress={() => setModalVisible(true)} className="p-2">
        <Icon
          family="MaterialIcons"
          name="more-vert"
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

      <UpdateZoneDialog
        zone={zone}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={handleEditSuccess}
      />

      <DeleteZoneDialog
        zone={zone}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}

