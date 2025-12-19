import { Stack } from 'expo-router';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';
import { RoleType } from '@/constants/roles';

export default function ZonesLayout() {
  return (
    <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[title]" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
