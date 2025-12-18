import { Stack } from 'expo-router';

export default function StocksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[stock]" options={{ headerShown: false }} />
    </Stack>
  );
}

