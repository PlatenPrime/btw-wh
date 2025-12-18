import { Stack } from 'expo-router';

export default function RowsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[row]" options={{ headerShown: false }} />
    </Stack>
  );
}

