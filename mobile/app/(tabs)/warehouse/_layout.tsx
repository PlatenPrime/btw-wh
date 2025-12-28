import { Stack } from 'expo-router';

export default function WarehouseLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="rows" options={{ headerShown: false }} />
      <Stack.Screen name="rows/[rowId]" options={{ headerShown: false }} />
      {/* Маршрут stocks оставлен для совместимости, недоступен через главное меню */}
      <Stack.Screen name="stocks" options={{ headerShown: false }} />
      <Stack.Screen name="zones" options={{ headerShown: false }} />
      <Stack.Screen name="zones/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="blocks" options={{ headerShown: false }} />
      <Stack.Screen name="blocks/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="blocks/[id]/segments/[segId]" options={{ headerShown: false }} />
      {/* Маршрут pallets оставлен для совместимости, недоступен через главное меню */}
      <Stack.Screen name="pallets" options={{ headerShown: false }} />
      {/* Маршрут pallets/[palletId] используется для детального просмотра паллеты через структуру Ряди */}
      <Stack.Screen name="pallets/[palletId]" options={{ headerShown: false }} />
    </Stack>
  );
}

