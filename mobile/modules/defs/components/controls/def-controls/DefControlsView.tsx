import { View } from "react-native";
import { Button, HStack, Text } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
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
      <Button
        onPress={handleCalculate}
        disabled={isPending || isRecentlyStarted}
        variant={isRecentlyStarted ? "default" : "outline"}
        className="w-auto"
      >
        {isRecentlyStarted ? (
          <HStack className="gap-2 items-center" >
            <Icon family="MaterialIcons" name="check-circle" size={24} color={SemanticColors.info} />
            <Text className="font-semibold">Запущено</Text>
          </HStack>
        ) : (
          <HStack className="gap-2 items-center">
            <Icon family="MaterialIcons" name="calculate" size={24} color={SemanticColors.info} />
            <Text className="font-semibold">Розрахувати дефіцити</Text>
          </HStack>
        )}
      </Button>
    </View>
  );
}
