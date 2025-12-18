import { Stack } from 'expo-router';

export default function RefilingLayout() {
  return (
    <Stack>
      <Stack.Screen name="asks" options={{ headerShown: false }} />
      <Stack.Screen name="defs/index" options={{ headerShown: false }} />
      <Stack.Screen name="pulls/index" options={{ headerShown: false }} />
    </Stack>
  );
}

