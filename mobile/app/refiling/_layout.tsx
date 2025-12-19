import { Stack } from 'expo-router';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';

export default function RefilingLayout() {
  return (
    <ProtectedRoute>
      <Stack>
        <Stack.Screen name="asks" options={{ headerShown: false }} />
        <Stack.Screen name="defs" options={{ headerShown: false }} />
        <Stack.Screen name="pulls" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
