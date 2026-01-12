import { HapticTab } from "@/components/haptic-tab";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { ThemedIcon } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { useTabPressHandler } from "@/hooks/use-tab-press-handler";
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

  const baseTabBarStyle = Platform.select({
    ios: {
      position: "absolute" as const,
      backgroundColor: SemanticColors.card.bg[themeMode],
    },
    default: {
      backgroundColor: SemanticColors.card.bg[themeMode],
    },
  });

  const tabBarStyle = isOpen
    ? { ...baseTabBarStyle, height: 0, overflow: "hidden" as const }
    : baseTabBarStyle;

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: SemanticColors.card.text[themeMode],
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
            tabBarActiveTintColor: SemanticColors.iconColors.teal,
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
            tabBarActiveTintColor: SemanticColors.iconColors.sky,
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
            tabBarActiveTintColor: SemanticColors.iconColors.yellow,
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
            tabBarActiveTintColor: SemanticColors.iconColors.purple,
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
