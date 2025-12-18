import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  return (
    <ThemedView className="flex-1 justify-center items-center">
      <ThemedText type="title">Login</ThemedText>
    </ThemedView>
  );
}
