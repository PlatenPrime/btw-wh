import { ThemedText } from "@/components/themed-text";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal-native";
import { Icon } from "@/components/ui/icon";
import { CreateAskForm } from "@/modules/asks/components/forms/create-ask-form/CreateAskForm";
import { TouchableOpacity, View, Platform } from "react-native";
import { SemanticColors } from "@/constants/theme";

interface CreateAskDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function CreateAskDialogView({
  visible,
  onClose,
  onSuccess,
  bgColor,
  textColor,
  borderColor,
}: CreateAskDialogViewProps) {
  return (
    <Modal isOpen={visible} onClose={onClose} className="items-center justify-center">
      <ModalBackdrop
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: SemanticColors.shadow.backdrop }}
      />
      <ModalContent
        className="w-full max-w-md mx-4 rounded-lg p-6 border gap-4"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          ...Platform.select({
            ios: {
              shadowColor: SemanticColors.shadow.color,
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
              Створити запит
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
          <CreateAskForm onSuccess={onSuccess} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

