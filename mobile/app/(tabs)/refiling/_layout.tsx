import { Stack } from 'expo-router';

export default function RefilingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="asks" options={{ headerShown: false }} />
      <Stack.Screen name="asks/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="defs" options={{ headerShown: false }} />
      <Stack.Screen name="pulls" options={{ headerShown: false }} />
    </Stack>
  );
}

