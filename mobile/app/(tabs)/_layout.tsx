import { HapticTab } from "@/components/haptic-tab";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isOpen } = useSidebar();

  const baseTabBarStyle = Platform.select({
    ios: {
      position: "absolute" as const,
    },
    default: {},
  });

  const tabBarStyle = isOpen
    ? { ...baseTabBarStyle, height: 0, overflow: "hidden" as const }
    : baseTabBarStyle;

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Головна",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="arts"
          options={{
            title: "Артикули",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="article" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="warehouse"
          options={{
            title: "Склад",
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="warehouse" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="refiling"
          options={{
            title: "Поповнення",
            tabBarIcon: ({ color }) => (
              <AntDesign name="down-square" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
