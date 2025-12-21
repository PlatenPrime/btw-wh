import { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Box, Pressable } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowDialog } from "@/modules/rows/components/dialogs/update-row-dialog/UpdateRowDialog";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";

interface RowCardMenuProps {
  row: RowDto;
  onSuccess?: () => void;
}

export function RowCardMenu({ row, onSuccess }: RowCardMenuProps) {
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

  const renderActionItem = (
    icon: string,
    label: string,
    onPress: () => void,
    textColorClass: string
  ) => {
    return (
      <Pressable
        onPress={onPress}
        className="flex-row items-center py-3 px-4"
      >
        <Icon
          family="MaterialIcons"
          name={icon}
          size={20}
          color={defaultIconColor}
          className="mr-3"
        />
        <ThemedText type="default" className={textColorClass}>
          {label}
        </ThemedText>
      </Pressable>
    );
  };

  const modalContent = (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <Box className="flex-1 bg-black/50 items-center justify-center">
          <TouchableWithoutFeedback>
            <Box className="min-w-[200px] rounded-xl border border-outline-200 bg-background-0 p-2 shadow-lg">
              {renderActionItem("edit", "Редагувати", handleEdit, "text-typography-900")}
              
              <Box className="h-px bg-outline-200 my-1" />
              
              {renderActionItem("delete", "Видалити", handleDelete, "text-error-600")}
            </Box>
          </TouchableWithoutFeedback>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="p-2"
      >
        <Icon
          family="MaterialIcons"
          name="more-vert"
          size={20}
          color={defaultIconColor}
        />
      </Pressable>
      {modalContent}
      
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

