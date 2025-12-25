import { ThemedText } from "@/components/themed-text";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal-native";
import { Icon } from "@/components/ui/icon";
import { Button, Text } from "@/components/ui";
import { TouchableOpacity, View, Platform, ActivityIndicator } from "react-native";
import { SemanticColors } from "@/constants/theme";

interface RejectAskDialogViewProps {
  artikul: string;
  isRejecting: boolean;
  onReject: () => Promise<void>;
  onCancel: () => void;
  visible: boolean;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function RejectAskDialogView({
  artikul,
  isRejecting,
  onReject,
  onCancel,
  visible,
  bgColor,
  textColor,
  borderColor,
}: RejectAskDialogViewProps) {
  return (
    <Modal isOpen={visible} onClose={onCancel} className="items-center justify-center">
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
              Відмовити на запит "{artikul}"?
            </ThemedText>
            <TouchableOpacity
              onPress={onCancel}
              className="absolute top-0 right-0 p-1"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <Icon family="MaterialIcons" name="close" size={16} color={textColor} />
            </TouchableOpacity>
          </View>
        </ModalHeader>
        <ModalBody>
          <ThemedText type="default" className="text-sm opacity-70">
            Ви впевнені, що хочете відмовити на запит "{artikul}"? Ця дія змінить статус
            запиту на "відмовлено".
          </ThemedText>
        </ModalBody>
        <ModalFooter className="flex-row gap-2">
          <Button
            onPress={onCancel}
            disabled={isRejecting}
            variant="outline"
            className="flex-1"
          >
            <Text className="font-semibold">Скасувати</Text>
          </Button>
          <Button
            onPress={onReject}
            disabled={isRejecting}
            variant="destructive"
            className="flex-1"
          >
            {isRejecting ? (
              <ActivityIndicator color={SemanticColors.white} />
            ) : (
              <Text className="text-white font-semibold">Відмовити</Text>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

