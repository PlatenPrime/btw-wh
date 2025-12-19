import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';
import { useSidebar } from '@/components/layout/sidebar/SidebarProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isOpen } = useSidebar();

  const baseTabBarStyle = Platform.select({
    ios: {
      position: 'absolute' as const,
    },
    default: {},
  });

  const tabBarStyle = isOpen
    ? { ...baseTabBarStyle, height: 0, overflow: 'hidden' as const }
    : baseTabBarStyle;

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Головна',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="arts"
          options={{
            title: 'Артикули',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="note" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="warehouse"
          options={{
            title: 'Склад',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="warehouse" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="refiling"
          options={{
            title: 'Поповнення',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name="refresh" color={color} />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}

