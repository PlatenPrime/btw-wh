import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

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
