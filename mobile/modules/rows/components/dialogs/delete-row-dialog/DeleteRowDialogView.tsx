import { View, TouchableOpacity, Platform } from "react-native";
import { ThemedText } from "@/components/themed-text";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@/components/ui/modal-native";
import { Icon } from "@/components/ui/icon";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog-description/DialogDescription";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface DeleteRowDialogViewProps {
  row: RowDto;
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function DeleteRowDialogView({
  row,
  visible,
  onClose,
  onDelete,
  isDeleting,
  bgColor,
  textColor,
  borderColor,
}: DeleteRowDialogViewProps) {
  const { static: staticColors } = useThemeColors();
  
  return (
    <Modal isOpen={visible} onClose={onClose} className="items-center justify-center">
      <ModalBackdrop
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: staticColors.shadow.backdrop }}
      />
      <ModalContent
        className="w-full max-w-md mx-4 rounded-lg p-6 border gap-4"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          ...Platform.select({
            ios: {
              shadowColor: staticColors.shadow.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
      >
        <ModalHeader className="flex-col gap-2">
          <View className="flex-row items-center justify-between relative">
            <ThemedText type="defaultSemiBold" className="text-lg text-center flex-1">
              Видалити ряд "{row.title}"?
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <Icon family="MaterialIcons" name="close" size={16} color={textColor} />
            </TouchableOpacity>
          </View>
          <DialogDescription>
            Ви впевнені, що хочете видалити ряд "{row.title}"? Цю дію
            неможливо скасувати, вона також призведе до видалення всіх
            пов'язаних палет та позицій.
          </DialogDescription>
        </ModalHeader>
        <ModalFooter className="flex-col-reverse gap-2">
          <DialogActions
            onCancel={onClose}
            onSubmit={onDelete}
            cancelText="Скасувати"
            submitText="Видалити"
            isSubmitting={isDeleting}
            variant="destructive"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

