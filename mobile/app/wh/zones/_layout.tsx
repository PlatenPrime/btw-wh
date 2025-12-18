import { Stack } from 'expo-router';

export default function ZonesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[title]" options={{ headerShown: false }} />
    </Stack>
  );
}

