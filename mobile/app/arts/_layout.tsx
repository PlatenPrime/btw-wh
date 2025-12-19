import { Stack } from 'expo-router';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';

export default function ArtsLayout() {
  return (
    <ProtectedRoute>
      <Stack>
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="update" options={{ headerShown: false }} />
        <Stack.Screen name="utils" options={{ headerShown: false }} />
        <Stack.Screen name="[artikul]" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
