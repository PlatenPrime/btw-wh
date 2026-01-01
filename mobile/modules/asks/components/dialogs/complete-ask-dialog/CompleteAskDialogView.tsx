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
import { useThemeColors } from "@/hooks/use-theme-colors";

interface CompleteAskDialogViewProps {
  artikul: string;
  isCompleting: boolean;
  onComplete: () => Promise<void>;
  onCancel: () => void;
  visible: boolean;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function CompleteAskDialogView({
  artikul,
  isCompleting,
  onComplete,
  onCancel,
  visible,
  bgColor,
  textColor,
  borderColor,
}: CompleteAskDialogViewProps) {
  const { static: staticColors } = useThemeColors();
  
  return (
    <Modal isOpen={visible} onClose={onCancel} className="items-center justify-center">
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
              Виконати запит "{artikul}"?
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
            Ви впевнені, що хочете виконати запит "{artikul}"? Ця дія змінить статус
            запиту на "виконано".
          </ThemedText>
        </ModalBody>
        <ModalFooter className="flex-row gap-2">
          <Button
            onPress={onCancel}
            disabled={isCompleting}
            variant="outline"
            className="flex-1"
          >
            <Text className="font-semibold">Скасувати</Text>
          </Button>
          <Button
            onPress={onComplete}
            disabled={isCompleting}
            variant="confirm"
            className="flex-1"
          >
            {isCompleting ? (
              <ActivityIndicator color={staticColors.white} />
            ) : (
              <Text className="text-white font-semibold">Виконати</Text>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

