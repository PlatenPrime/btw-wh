import { Stack } from 'expo-router';

export default function SegsLayout() {
  return (
    <Stack>
      <Stack.Screen name="[segId]" options={{ headerShown: false }} />
    </Stack>
  );
}

