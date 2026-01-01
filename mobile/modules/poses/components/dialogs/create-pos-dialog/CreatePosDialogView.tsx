import { ThemedText } from "@/components/themed-text";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal-native";
import { Icon } from "@/components/ui/icon";
import { CreatePosForm } from "@/modules/poses/components/forms/create-pos-form/CreatePosForm";
import type { IPallet } from "@/modules/pallets/api/types";
import { TouchableOpacity, View, Platform } from "react-native";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface CreatePosDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pallet: IPallet;
}

export function CreatePosDialogView({
  visible,
  onClose,
  onSuccess,
  pallet,
}: CreatePosDialogViewProps) {
  const { dialog, text, static: staticColors } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

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
          maxHeight: "90%",
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
              Створити нову позицію
            </ThemedText>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <Icon family="MaterialIcons" name="close" size="md" color={textColor} />
            </TouchableOpacity>
          </View>
        </ModalHeader>
        <ModalBody>
          <CreatePosForm pallet={pallet} onSuccess={onSuccess} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

