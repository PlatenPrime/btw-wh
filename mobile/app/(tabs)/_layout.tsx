import { HapticTab } from "@/components/haptic-tab";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { ThemedIcon } from "@/components/themed";
import { Colors, SemanticColors } from "@/constants/theme";
import { useTabPressHandler } from "@/hooks/use-tab-press-handler";
import { getThemeColorWithOpacity } from "@/hooks/use-theme-colors";
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";
import { useTheme } from "@/providers/theme-provider";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { isOpen } = useSidebar();
  const { resolvedTheme } = useTheme();
  const themeMode = resolvedTheme === "dark" ? "dark" : "light";

  // Обработчики для вкладок
  const handleArtsTabPress = useTabPressHandler("arts");
  const handleWarehouseTabPress = useTabPressHandler("warehouse");
  const handleRefilingTabPress = useTabPressHandler("refiling");

  const tabBarActiveTintColor = Colors[themeMode].tabIconSelected;
  const tabBarInactiveTintColor = Colors[themeMode].tabIconDefault;

  // Получаем цвет границы с opacity
  // outline-200: light: #DDDCDB (221, 220, 219), dark: #737474 (115, 116, 116)
  const outline200Color = themeMode === "light" ? "#DDDCDB" : "#737474";
  const borderColor = getThemeColorWithOpacity(outline200Color, 0.3);

  const baseTabBarStyle = Platform.select({
    ios: {
      position: "absolute" as const,
      backgroundColor: SemanticColors.card.bg[themeMode],
      borderTopColor: borderColor,
    },
    default: {
      backgroundColor: SemanticColors.card.bg[themeMode],
      borderTopColor: borderColor,
    },
  });

  const tabBarStyle = isOpen
    ? { ...baseTabBarStyle, height: 0, overflow: "hidden" as const }
    : baseTabBarStyle;

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor,
          tabBarInactiveTintColor,
          tabBarShowLabel: true,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Головна",
            tabBarLabel: "Головна",
            tabBarIcon: ({ color }) => (
              <ThemedIcon
                family="MaterialIcons"
                name="home"
                size={28}
                color={SemanticColors.iconColors.teal}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="arts"
          options={{
            title: "Артикули",
            tabBarLabel: "Артикули",
            tabBarIcon: ({ color }) => (
              <ThemedIcon
                family="MaterialIcons"
                name="article"
                size={28}
                color={SemanticColors.iconColors.sky}
              />
            ),
          }}
          listeners={{
            tabPress: handleArtsTabPress,
          }}
        />
        <Tabs.Screen
          name="warehouse"
          options={{
            title: "Склад",
            tabBarLabel: "Склад",
            tabBarIcon: ({ color }) => (
              <ThemedIcon
                family="MaterialIcons"
                name="warehouse"
                size={28}
                color={SemanticColors.iconColors.yellow}
              />
            ),
          }}
          listeners={{
            tabPress: handleWarehouseTabPress,
          }}
        />
        <Tabs.Screen
          name="refiling"
          options={{
            title: "Поповнення",
            tabBarLabel: "Поповнення",
            tabBarIcon: ({ color }) => (
              <ThemedIcon
                family="AntDesign"
                name="down-square"
                size={28}
                color={SemanticColors.iconColors.purple}
              />
            ),
          }}
          listeners={{
            tabPress: handleRefilingTabPress,
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
