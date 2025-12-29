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

interface CalculationConfirmationDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export function CalculationConfirmationDialogView({
  visible,
  onClose,
  onConfirm,
  isPending,
  bgColor,
  textColor,
  borderColor,
}: CalculationConfirmationDialogViewProps) {
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
            <View className="flex-row items-center gap-2 flex-1">
              <Icon family="MaterialIcons" name="calculate" size={20} color={textColor} />
              <ThemedText type="defaultSemiBold" className="text-lg">
                Запуск розрахунку дефіцитів
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-0 right-0 p-1"
              activeOpacity={0.7}
              style={{ opacity: 0.7 }}
            >
              <Icon family="MaterialIcons" name="close" size={16} color={textColor} />
            </TouchableOpacity>
          </View>
        </ModalHeader>
        <ModalBody>
          <ThemedText type="default" className="text-sm opacity-70 mb-3">
            Розрахунок дефіцитів може зайняти кілька хвилин. Процес буде виконуватися у
            фоновому режимі, і ви зможете відстежувати прогрес у реальному часі.
          </ThemedText>
          <View
            className="flex-row items-center gap-2 rounded-lg p-3"
            style={{ backgroundColor: bgColor }}
          >
            <Icon family="MaterialIcons" name="access-time" size={16} color={textColor} />
            <ThemedText type="default" className="text-sm opacity-70">
              Очікуваний час виконання: 6-8 хвилин
            </ThemedText>
          </View>
        </ModalBody>
        <ModalFooter className="flex-row gap-2">
          <Button
            onPress={onClose}
            disabled={isPending}
            variant="outline"
            className="flex-1"
          >
            <Text className="font-semibold">Скасувати</Text>
          </Button>
          <Button
            onPress={onConfirm}
            disabled={isPending}
            variant="confirm"
            className="flex-1"
          >
            {isPending ? (
              <ActivityIndicator color={SemanticColors.white} />
            ) : (
              <Text className="text-white font-semibold">Запустити</Text>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
