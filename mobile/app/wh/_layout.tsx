import { Stack } from 'expo-router';

export default function WhLayout() {
  return (
    <Stack>
      <Stack.Screen name="rows" options={{ headerShown: false }} />
      <Stack.Screen name="stocks" options={{ headerShown: false }} />
      <Stack.Screen name="zones" options={{ headerShown: false }} />
      <Stack.Screen name="blocks" options={{ headerShown: false }} />
      <Stack.Screen name="zones-import-export" options={{ headerShown: false }} />
      <Stack.Screen name="utils" options={{ headerShown: false }} />
      <Stack.Screen name="pallets" options={{ headerShown: false }} />
    </Stack>
  );
}

