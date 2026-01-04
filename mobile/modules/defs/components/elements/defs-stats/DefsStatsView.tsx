import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColors } from "@/hooks/use-theme-colors";

export type DeficitFilter = "all" | "critical" | "limited";

interface DefsStatsViewProps {
  stats: {
    deficits: number;
    critical: number;
    nearLimit: number;
  };
  activeFilter: DeficitFilter;
  onFilterChange: (filter: DeficitFilter) => void;
}

export function DefsStatsView({
  stats,
  activeFilter,
  onFilterChange,
}: DefsStatsViewProps) {
  const { card, theme } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  const getCardStyle = (filter: DeficitFilter) => {
    const isActive = activeFilter === filter;
    if (!isActive) {
      return {
        backgroundColor: bgColor,
        borderColor: borderColor,
      };
    }

    switch (filter) {
      case "all":
        return {
          backgroundColor: theme === "dark" ? "rgba(251, 146, 60, 0.2)" : "#fff7ed",
          borderColor: theme === "dark" ? "#f97316" : "#fdba74",
          borderWidth: 2,
        };
      case "critical":
        return {
          backgroundColor: theme === "dark" ? "rgba(239, 68, 68, 0.2)" : "#fef2f2",
          borderColor: theme === "dark" ? "#ef4444" : "#fca5a5",
          borderWidth: 2,
        };
      case "limited":
        return {
          backgroundColor: theme === "dark" ? "rgba(245, 158, 11, 0.2)" : "#fffbeb",
          borderColor: theme === "dark" ? "#f59e0b" : "#fcd34d",
          borderWidth: 2,
        };
    }
  };

  const getTextColor = (filter: DeficitFilter) => {
    switch (filter) {
      case "all":
        return theme === "dark" ? "#fb923c" : "#ea580c";
      case "critical":
        return theme === "dark" ? "#f87171" : "#dc2626";
      case "limited":
        return theme === "dark" ? "#fbbf24" : "#d97706";
    }
  };

  return (
    <View className="flex-row gap-2">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onFilterChange("all")}
        className="flex-1"
      >
        <ThemedView
          className="flex-row justify-between p-2 rounded-lg border"
          style={getCardStyle("all")}
        >
          <ThemedText className="text-sm">Дефіцитів:</ThemedText>
          <ThemedText className="text-sm font-bold" style={{ color: getTextColor("all") }}>
            {stats.deficits}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onFilterChange("critical")}
        className="flex-1"
      >
        <ThemedView
          className="flex-row justify-between p-2 rounded-lg border"
          style={getCardStyle("critical")}
        >
          <ThemedText className="text-sm">Критичних:</ThemedText>
          <ThemedText
            className="text-sm font-bold"
            style={{ color: getTextColor("critical") }}
          >
            {stats.critical}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onFilterChange("limited")}
        className="flex-1"
      >
        <ThemedView
          className="flex-row justify-between p-2 rounded-lg border"
          style={getCardStyle("limited")}
        >
          <ThemedText className="text-sm">В ліміті:</ThemedText>
          <ThemedText
            className="text-sm font-bold"
            style={{ color: getTextColor("limited") }}
          >
            {stats.nearLimit}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </View>
  );
}
