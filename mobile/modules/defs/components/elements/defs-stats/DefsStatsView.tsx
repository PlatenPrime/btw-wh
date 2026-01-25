import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useTheme } from "@/providers/theme-provider";
import { TouchableOpacity, View } from "react-native";

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
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  const getCardStyle = (filter: DeficitFilter) => {
    const isActive = activeFilter === filter;
    if (!isActive) {
      return {
        backgroundColor: undefined,
        borderColor: theme === "dark" ? "#555" : "#aaa",
      };
    }

    switch (filter) {
      case "all":
        return {
          backgroundColor:
            theme === "dark" ? "rgba(251, 146, 60, 0.2)" : "#fff7ed",
          borderColor: theme === "dark" ? "#f97316" : "#fdba74",
          borderWidth: 2,
        };
      case "critical":
        return {
          backgroundColor:
            theme === "dark" ? "rgba(239, 68, 68, 0.2)" : "#fef2f2",
          borderColor: theme === "dark" ? "#ef4444" : "#fca5a5",
          borderWidth: 2,
        };
      case "limited":
        return {
          backgroundColor:
            theme === "dark" ? "rgba(245, 158, 11, 0.2)" : "#fffbeb",
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

  const renderCard = (filter: DeficitFilter, label: string, value: number) => {
    const isActive = activeFilter === filter;
    const cardStyle = getCardStyle(filter);
    const textColor = getTextColor(filter);

    return (
      <TouchableOpacity
        key={filter}
        activeOpacity={0.7}
        onPress={() => onFilterChange(filter)}
        className="flex-1"
      >
        <ThemedView
          className={`flex-row justify-between p-2 rounded-lg border  ${
            !isActive ? "bg-background-0 border-outline-400" : ""
          }`}
          style={cardStyle}
        >
          <ThemedText className="text-sm">{label}</ThemedText>
          <ThemedText
            className="text-sm font-bold"
            style={{ color: textColor }}
          >
            {value}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-row gap-2">
      {renderCard("all", "Дефіцитів:", stats.deficits)}
      {renderCard("critical", "Критичних:", stats.critical)}
      {renderCard("limited", "В ліміті:", stats.nearLimit)}
    </View>
  );
}
