import { Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed/themed-view';
import { ThemedText } from '@/components/themed/themed-text';

export default function ForbiddenScreen() {
  const router = useRouter();

  return (
    <ThemedView className="flex-1 justify-center items-center p-6 gap-6">
      <ThemedText type="title" className="text-center mb-2">
        Доступ заборонено
      </ThemedText>
      <ThemedText type="subtitle" className="text-center mb-4">
        У вас недостатньо прав для доступу до цієї сторінки
      </ThemedText>
      <Pressable
        className="bg-primary-500 rounded-lg px-6 py-3"
        onPress={() => router.replace('/')}
      >
        <Text className="text-white font-semibold text-base">На головну</Text>
      </Pressable>
    </ThemedView>
  );
}
