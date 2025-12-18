import { Stack } from 'expo-router';

export default function PalletsLayout() {
  return (
    <Stack>
      <Stack.Screen name="[title]" options={{ headerShown: false }} />
    </Stack>
  );
}

