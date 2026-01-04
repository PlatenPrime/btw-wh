import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { ThemedText } from "@/components/themed/themed-text";
import { Button, Text } from "@/components/ui";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ActivityIndicator, View } from "react-native";

interface CompleteAskDialogViewProps {
  artikul: string;
  isCompleting: boolean;
  onComplete: () => Promise<void>;
  onCancel: () => void;
  visible: boolean;
}

export function CompleteAskDialogView({
  artikul,
  isCompleting,
  onComplete,
  onCancel,
  visible,
}: CompleteAskDialogViewProps) {
  const { static: staticColors } = useThemeColors();

  return (
    <FormDialog
      visible={visible}
      onClose={onCancel}
      title={`Виконати запит "${artikul}"?`}
      footer={
        <View className="flex-row gap-2">
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
        </View>
      }
    >
      <ThemedText type="default" className="text-sm opacity-70">
        Ви впевнені, що хочете виконати запит "{artikul}"? Ця дія змінить статус
        запиту на "виконано".
      </ThemedText>
    </FormDialog>
  );
}
