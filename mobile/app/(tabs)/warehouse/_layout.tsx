import { Stack } from 'expo-router';

export default function WarehouseLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="rows" options={{ headerShown: false }} />
      <Stack.Screen name="rows/[rowId]" options={{ headerShown: false }} />
      <Stack.Screen name="stocks" options={{ headerShown: false }} />
      <Stack.Screen name="zones" options={{ headerShown: false }} />
      <Stack.Screen name="blocks" options={{ headerShown: false }} />
      <Stack.Screen name="pallets" options={{ headerShown: false }} />
      <Stack.Screen name="pallets/[palletId]" options={{ headerShown: false }} />
    </Stack>
  );
}

