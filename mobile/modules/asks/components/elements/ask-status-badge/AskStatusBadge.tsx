import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import type { AskStatus } from "@/modules/asks/api/types/dto";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface AskStatusBadgeProps {
  status: AskStatus;
}

export function AskStatusBadge({ status }: AskStatusBadgeProps) {
  const { theme } = useThemeColors();

  const statusConfig: Record<AskStatus, { bgColor: string; textColor: string; text: string }> = {
    new: {
      bgColor: theme === "dark" ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)",
      textColor: theme === "dark" ? "#6ee7b7" : "#065f46",
      text: "новий",
    },
    processing: {
      bgColor: theme === "dark" ? "rgba(234, 179, 8, 0.2)" : "rgba(234, 179, 8, 0.1)",
      textColor: theme === "dark" ? "#fde047" : "#854d0e",
      text: "в процесі",
    },
    completed: {
      bgColor: theme === "dark" ? "rgba(107, 114, 128, 0.2)" : "rgba(107, 114, 128, 0.1)",
      textColor: theme === "dark" ? "#d1d5db" : "#374151",
      text: "завершено",
    },
    solved: {
      bgColor: theme === "dark" ? "rgba(107, 114, 128, 0.2)" : "rgba(107, 114, 128, 0.1)",
      textColor: theme === "dark" ? "#d1d5db" : "#374151",
      text: "завершено",
    },
    rejected: {
      bgColor: theme === "dark" ? "rgba(244, 63, 94, 0.2)" : "rgba(244, 63, 94, 0.1)",
      textColor: theme === "dark" ? "#fda4af" : "#991b1b",
      text: "відмовлено",
    },
    fail: {
      bgColor: theme === "dark" ? "rgba(244, 63, 94, 0.2)" : "rgba(244, 63, 94, 0.1)",
      textColor: theme === "dark" ? "#fda4af" : "#991b1b",
      text: "відмовлено",
    },
  };

  const config = statusConfig[status];

  return (
    <View
      className="rounded-md border px-2 py-1"
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.textColor + "80",
      }}
    >
      <ThemedText
        className="text-sm font-semibold"
        style={{ color: config.textColor }}
      >
        {config.text}
      </ThemedText>
    </View>
  );
}

