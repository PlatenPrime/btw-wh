import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedButton, ThemedText as ThemedTextButton } from "@/components/themed";
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
          <ThemedButton
            onPress={onCancel}
            disabled={isCompleting}
            variant="outline"
            className="flex-1"
          >
            <ThemedTextButton className="font-semibold">Скасувати</ThemedTextButton>
          </ThemedButton>
          <ThemedButton
            onPress={onComplete}
            disabled={isCompleting}
            variant="confirm"
            className="flex-1"
          >
            {isCompleting ? (
              <ActivityIndicator color={staticColors.white} />
            ) : (
              <ThemedTextButton className="text-white font-semibold">Виконати</ThemedTextButton>
            )}
          </ThemedButton>
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
