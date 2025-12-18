import { Stack } from 'expo-router';

export default function BlocksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="[blockId]/segs/[segId]" options={{ headerShown: false }} />
    </Stack>
  );
}

