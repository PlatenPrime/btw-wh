import { Stack } from 'expo-router';
import { ProtectedRoute } from '@/modules/auth/components/ProtectedRoute';
import { RoleType } from '@/constants/roles';

export default function WhLayout() {
  return (
    <ProtectedRoute>
      <Stack>
        <Stack.Screen name="rows" options={{ headerShown: false }} />
        <Stack.Screen name="rows/[row]" options={{ headerShown: false }} />
        <Stack.Screen name="stocks" options={{ headerShown: false }} />
        <Stack.Screen name="stocks/[stock]" options={{ headerShown: false }} />
        <Stack.Screen name="pallets" options={{ headerShown: false }} />
        <Stack.Screen name="pallets/[title]" options={{ headerShown: false }} />
        <Stack.Screen name="zones" options={{ headerShown: false }} />
        <Stack.Screen name="zones/[title]" options={{ headerShown: false }} />
        <Stack.Screen name="zones-import-export" options={{ headerShown: false }} />
        <Stack.Screen name="blocks" options={{ headerShown: false }} />
        <Stack.Screen name="blocks/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="blocks/[blockId]/segs/[segId]" options={{ headerShown: false }} />
        <Stack.Screen name="utils" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
