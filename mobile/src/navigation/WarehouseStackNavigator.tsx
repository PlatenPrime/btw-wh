import { createStackNavigator } from '@react-navigation/stack';
import { RowDetailScreen } from '../screens/warehouse/RowDetailScreen';
import { RowsScreen } from '../screens/warehouse/RowsScreen';
import { StockDetailScreen } from '../screens/warehouse/StockDetailScreen';
import { StocksScreen } from '../screens/warehouse/StocksScreen';
import { WarehouseListScreen } from '../screens/warehouse/WarehouseListScreen';
import { WhUtilsScreen } from '../screens/warehouse/WhUtilsScreen';
import { ZonesScreen } from '../screens/warehouse/ZonesScreen';
import { WarehouseStackParamList } from './types';

const Stack = createStackNavigator<WarehouseStackParamList>();

export function WarehouseStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0f172a', // slate-900
        },
        headerTintColor: '#f8fafc', // slate-50
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="WarehouseList"
        component={WarehouseListScreen}
        options={{ title: 'Склад' }}
      />
      <Stack.Screen name="Rows" component={RowsScreen} options={{ title: 'Ряди' }} />
      <Stack.Screen
        name="RowDetail"
        component={RowDetailScreen}
        options={{ title: 'Деталі ряду' }}
      />
      <Stack.Screen name="Stocks" component={StocksScreen} options={{ title: 'Залишки' }} />
      <Stack.Screen
        name="StockDetail"
        component={StockDetailScreen}
        options={{ title: 'Деталі залишку' }}
      />
      <Stack.Screen name="Zones" component={ZonesScreen} options={{ title: 'Зони' }} />
      <Stack.Screen name="WhUtils" component={WhUtilsScreen} options={{ title: 'Утиліти' }} />
    </Stack.Navigator>
  );
}
