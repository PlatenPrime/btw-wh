import { ThemedIcon, ThemedSpinner } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { SemanticColors } from "@/constants/theme";
import { formatDateTime } from "@/modules/asks/utils/format-date";
import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { useTheme } from "@/providers/theme-provider";
import { View } from "react-native";

interface CalculationStatusViewProps {
  status: DefsCalculationStatus;
  isLoading?: boolean;
}

function formatRemainingSeconds(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} сек`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) {
    return `${minutes} хв`;
  }
  return `${minutes} хв ${remainingSeconds} сек`;
}

export function CalculationStatusView({
  status,
  isLoading,
}: CalculationStatusViewProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  // Получаем цвета для спиннера и прогресс-бара
  const spinnerColor = SemanticColors.info; // info-500
  const progressBgColor = theme === "dark" ? "#374151" : "#d1d5db"; // typography-700/300
  const progressFillColor = SemanticColors.info; // info-500

  if (isLoading) {
    return (
      <ThemedView className="p-4 rounded-lg border bg-background-0 border-outline-100">
        <View className="flex-row items-center gap-2">
          <ThemedSpinner size="small" color={spinnerColor || "#2563eb"} />
          <ThemedText type="title" className="text-lg">
            Розрахунок дефіцитів виконується
          </ThemedText>
        </View>
        <View className="mt-3 p-3 rounded-lg bg-background-0">
          <ThemedText className="text-sm font-medium">
            Ініціалізація процесу розрахунку
          </ThemedText>
          <ThemedText className="text-xs opacity-70 mt-1">
            Отримання даних про статус...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (status.isRunning) {
    return (
      <ThemedView className="p-4 rounded-lg border bg-background-0 border-outline-100">
        <View className="flex-row items-center gap-2">
          <ThemedSpinner size="small" color={spinnerColor || "#2563eb"} />
          <ThemedText type="title" className="text-lg">
            Розрахунок дефіцитів виконується
          </ThemedText>
        </View>

        {status.progress !== undefined && (
          <View className="mt-3 gap-2">
            <View className="flex-row justify-between">
              <ThemedText className="text-sm">Прогрес</ThemedText>
              <ThemedText className="text-sm font-medium">
                {status.progress}%
              </ThemedText>
            </View>
            <View
              className="rounded-full overflow-hidden"
              style={{
                height: 8,
                backgroundColor: progressBgColor || "#e5e7eb",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${status.progress}%`,
                  backgroundColor: progressFillColor || "#2563eb",
                }}
              />
            </View>
          </View>
        )}

        {status.currentStep && (
          <View className="mt-3 p-3 rounded-lg bg-background-0">
            <ThemedText className="text-sm font-medium">
              {status.currentStep}
            </ThemedText>
            {status.processedItems !== undefined &&
              status.totalItems !== undefined && (
                <ThemedText className="text-xs opacity-70 mt-1">
                  Оброблено: {status.processedItems} з {status.totalItems}
                </ThemedText>
              )}
          </View>
        )}

        <View className="mt-3 gap-3">
          {status.startedAt && (
            <View className="flex-row items-center gap-2">
              <ThemedIcon
                family="MaterialIcons"
                name="access-time"
                size={16}
                color={SemanticColors.iconColors.fuchsia}
              />
              <View>
                <ThemedText className="text-sm font-medium">
                  Розпочато
                </ThemedText>
                <ThemedText className="text-xs opacity-70">
                  {formatDateTime(status.startedAt)}
                </ThemedText>
              </View>
            </View>
          )}

          {status.estimatedTimeRemaining !== undefined &&
            status.estimatedTimeRemaining > 0 && (
              <View className="flex-row items-center gap-2">
                <ThemedIcon
                  family="MaterialIcons"
                  name="schedule"
                  size={16}
                  color={SemanticColors.iconColors.fuchsia}
                />
                <View>
                  <ThemedText className="text-sm font-medium">
                    Залишилось часу
                  </ThemedText>
                  <ThemedText className="text-xs opacity-70">
                    {formatRemainingSeconds(status.estimatedTimeRemaining)}
                  </ThemedText>
                </View>
              </View>
            )}
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="p-4 rounded-lg border bg-background-0 border-outline-100">
      <View className="flex-row items-center gap-2">
        <ThemedIcon
          family="MaterialIcons"
          name="check-circle"
          size={20}
          color={SemanticColors.iconColors.green}
        />
        <ThemedText type="title" className="text-sm">
          Розрахунок дефіцитів завершено
        </ThemedText>
      </View>

      {status.processedItems !== undefined &&
        status.totalItems !== undefined && (
          <View className="mt-3 p-3 rounded-lg bg-background-0">
            <ThemedText className="text-sm font-medium">
              Оброблено елементів: {status.processedItems} з {status.totalItems}
            </ThemedText>
          </View>
        )}

      <View className="mt-3 gap-2">
        {status.startedAt && (
          <View className="flex-row items-center gap-2">
            <ThemedIcon
              family="MaterialIcons"
              name="access-time"
              size={16}
              color={SemanticColors.iconColors.fuchsia}
            />
            <View>
              <ThemedText className="text-sm font-medium">Розпочато</ThemedText>
              <ThemedText className="text-xs opacity-70">
                {formatDateTime(status.startedAt)}
              </ThemedText>
            </View>
          </View>
        )}

        {status.lastUpdate && (
          <View className="flex-row items-center gap-2">
            <ThemedIcon
              family="MaterialIcons"
              name="check-circle"
              size={16}
              color={SemanticColors.iconColors.fuchsia}
            />
            <View>
              <ThemedText className="text-sm font-medium">Завершено</ThemedText>
              <ThemedText className="text-xs opacity-70">
                {formatDateTime(status.lastUpdate)}
              </ThemedText>
            </View>
          </View>
        )}
      </View>
    </ThemedView>
  );
}
