import { View } from "react-native";
import { ThemedButton, ThemedHStack, ThemedText as ThemedTextButton } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";

interface DefControlsViewProps {
  handleCalculate: () => void;
  isPending: boolean;
  isRecentlyStarted: boolean; // true когда расчет выполняется (isRunning === true)
}

export function DefControlsView({
  handleCalculate,
  isPending,
  isRecentlyStarted,
}: DefControlsViewProps) {
  return (
    <View className="items-center justify-center">
      <ThemedButton
        onPress={handleCalculate}
        disabled={isPending || isRecentlyStarted}
        variant={isRecentlyStarted ? "default" : "outline"}
        className="w-auto"
      >
        {isRecentlyStarted ? (
          <ThemedHStack className="gap-2 items-center" >
            <ThemedIcon family="MaterialIcons" name="check-circle" size={24} color={SemanticColors.info} />
            <ThemedTextButton className="font-semibold">Запущено</ThemedTextButton>
          </ThemedHStack>
        ) : (
          <ThemedHStack className="gap-2 items-center">
            <ThemedIcon family="MaterialIcons" name="calculate" size={24} color={SemanticColors.info} />
            <ThemedTextButton className="font-semibold">Розрахувати дефіцити</ThemedTextButton>
          </ThemedHStack>
        )}
      </ThemedButton>
    </View>
  );
}
