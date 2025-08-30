import { createStackNavigator } from '@react-navigation/stack';
import { PalletDetailScreen } from '../screens/pallets/PalletDetailScreen';
import { PalletsListScreen } from '../screens/pallets/PalletsListScreen';
import { PalletsStackParamList } from './types';

const Stack = createStackNavigator<PalletsStackParamList>();

export function PalletsStackNavigator() {
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
        name="PalletsList"
        component={PalletsListScreen}
        options={{ title: 'Паллети' }}
      />
      <Stack.Screen
        name="PalletDetail"
        component={PalletDetailScreen}
        options={{ title: 'Деталі паллети' }}
      />
    </Stack.Navigator>
  );
}
