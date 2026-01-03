import { FormDialog } from "@/components/shared/form-dialog";
import { Icon } from "@/components/ui/icon";
import { Button, Text } from "@/components/ui";
import { ThemedText } from "@/components/themed-text";
import { ActivityIndicator, View } from "react-native";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface CalculationConfirmationDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function CalculationConfirmationDialogView({
  visible,
  onClose,
  onConfirm,
  isPending,
}: CalculationConfirmationDialogViewProps) {
  const { dialog, text, static: staticColors } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Запуск розрахунку дефіцитів"
      footer={
        <View className="flex-row gap-2">
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
              <ActivityIndicator color={staticColors.white} />
            ) : (
              <Text className="text-white font-semibold">Запустити</Text>
            )}
          </Button>
        </View>
      }
    >
      <View className="flex-row items-center gap-2 mb-3">
        <Icon family="MaterialIcons" name="calculate" size={20} color={textColor} />
        <ThemedText type="default" className="text-sm opacity-70 flex-1">
          Розрахунок дефіцитів може зайняти кілька хвилин. Процес буде виконуватися у
          фоновому режимі, і ви зможете відстежувати прогрес у реальному часі.
        </ThemedText>
      </View>
      <View
        className="flex-row items-center gap-2 rounded-lg p-3"
        style={{ backgroundColor: bgColor }}
      >
        <Icon family="MaterialIcons" name="access-time" size={16} color={textColor} />
        <ThemedText type="default" className="text-sm opacity-70">
          Очікуваний час виконання: 6-8 хвилин
        </ThemedText>
      </View>
    </FormDialog>
  );
}
