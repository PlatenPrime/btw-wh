import { ThemedText } from "@/components/themed-text";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal-native";
import { Icon } from "@/components/ui/icon";
import { CreateRowForm } from "@/modules/rows/components/forms/create-row-form/CreateRowForm";
import { TouchableOpacity, View, Platform } from "react-native";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface CreateRowDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function CreateRowDialogView({
  visible,
  onClose,
  onSuccess,
  bgColor,
  textColor,
  borderColor,
}: CreateRowDialogViewProps) {
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
              Створити ряд
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
          <CreateRowForm onSuccess={onSuccess} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
