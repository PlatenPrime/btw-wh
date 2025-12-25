import { ThemedText } from "@/components/themed-text";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal-native";
import { Icon } from "@/components/ui/icon";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { SemanticColors } from "@/constants/theme";

interface FormDialogViewProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function FormDialogView({
  visible,
  onClose,
  title,
  children,
  footer,
  bgColor,
  textColor,
  borderColor,
}: FormDialogViewProps) {
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
          maxHeight: "90%",
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
              {title}
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
        </ModalHeader>
        <ModalBody>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={true}>
            {children}
          </ScrollView>
        </ModalBody>
        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

