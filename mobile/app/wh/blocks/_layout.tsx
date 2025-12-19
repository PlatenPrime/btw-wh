import { Stack } from 'expo-router';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';
import { RoleType } from '@/constants/roles';

export default function BlocksLayout() {
  return (
    <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
        <Stack.Screen name="[blockId]/segs/[segId]" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
