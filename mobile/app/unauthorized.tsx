import { Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function UnauthorizedScreen() {
  const router = useRouter();

  return (
    <ThemedView className="flex-1 justify-center items-center p-6 gap-6">
      <ThemedText type="title" className="text-center mb-2">
        Неавторизований доступ
      </ThemedText>
      <ThemedText type="subtitle" className="text-center mb-4">
        Будь ласка, увійдіть в систему для доступу до цієї сторінки
      </ThemedText>
      <Pressable
        className="bg-primary-500 rounded-lg px-6 py-3"
        onPress={() => router.replace('/login')}
      >
        <Text className="text-white font-semibold text-base">Перейти до входу</Text>
      </Pressable>
    </ThemedView>
  );
}
