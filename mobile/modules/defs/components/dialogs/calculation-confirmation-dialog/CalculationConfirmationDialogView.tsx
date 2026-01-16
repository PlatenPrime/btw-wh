import { FormDialog } from "@/components/shared/dialog/form-dialog";
import {
  ThemedButton,
  ThemedIcon,
  ThemedText as ThemedTextButton,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";
import { ActivityIndicator, View } from "react-native";

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
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const textColor = SemanticColors.card.text[theme];

  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Запуск розрахунку дефіцитів"
      footer={
        <View className="flex-row gap-2">
          <ThemedButton
            onPress={onClose}
            disabled={isPending}
            variant="outline"
            className="flex-1"
          >
            <ThemedTextButton className="font-semibold">
              Скасувати
            </ThemedTextButton>
          </ThemedButton>
          <ThemedButton
            onPress={onConfirm}
            disabled={isPending}
            variant="confirm"
            className="flex-1"
          >
            {isPending ? (
              <ActivityIndicator color={SemanticColors.white} />
            ) : (
              <ThemedTextButton className="text-white font-semibold">
                Запустити
              </ThemedTextButton>
            )}
          </ThemedButton>
        </View>
      }
    >
      <View className="flex-row items-center gap-2 mb-3">
        <ThemedIcon
          family="MaterialIcons"
          name="calculate"
          size={20}
          color={textColor}
        />
        <ThemedText type="default" className="text-sm opacity-70 flex-1">
          Розрахунок дефіцитів може зайняти кілька хвилин. Процес буде
          виконуватися у фоновому режимі, і ви зможете відстежувати прогрес у
          реальному часі.
        </ThemedText>
      </View>
      <View className="flex-row items-center gap-2 rounded-lg p-3 bg-background-0">
        <ThemedIcon
          family="MaterialIcons"
          name="access-time"
          size={16}
          color={textColor}
        />
        <ThemedText type="default" className="text-sm opacity-70">
          Очікуваний час виконання: 6-8 хвилин
        </ThemedText>
      </View>
    </FormDialog>
  );
}
