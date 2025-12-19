import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

function MainScreen() {
  const { toggleSidebar } = useSidebar();
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView className="flex-1">
      <TouchableOpacity
        onPress={toggleSidebar}
        className="absolute top-[50px] left-4 z-[1000] p-2"
      >
        <MaterialIcons
          name="menu"
          size={24}
          color={colorScheme === "light" ? Colors.light.text : Colors.dark.text}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title" className="text-center mb-4">
          BTrade Warehouse App
        </ThemedText>
        <ThemedText type="subtitle" className="text-center">
          Головна
        </ThemedText>
      </View>
    </ThemedView>
  );
}

export default function IndexScreen() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Ждем завершения проверки авторизации
    if (isLoading) {
      return;
    }

    // Если пользователь не авторизован - редирект на логин
    if (!user || !isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Если авторизован - редирект на tabs
    if (user && isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Показываем загрузку во время проверки
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-typography-500">Завантаження...</Text>
      </View>
    );
  }

  // Показываем пустой экран, редирект произойдет через useEffect
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
