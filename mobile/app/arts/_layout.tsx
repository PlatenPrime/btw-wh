import { Stack } from 'expo-router';

export default function ArtsLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="update" options={{ headerShown: false }} />
      <Stack.Screen name="utils" options={{ headerShown: false }} />
      <Stack.Screen name="[artikul]" options={{ headerShown: false }} />
    </Stack>
  );
}

