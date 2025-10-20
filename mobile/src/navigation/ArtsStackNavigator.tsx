import { createStackNavigator } from '@react-navigation/stack';
import { ArtDetailScreen } from '../screens/arts/ArtDetailScreen';
import { ArtsListScreen } from '../screens/arts/ArtsListScreen';
import { ArtsUtilsScreen } from '../screens/arts/ArtsUtilsScreen';
import { ArtsStackParamList } from './types';

const Stack = createStackNavigator<ArtsStackParamList>();

export function ArtsStackNavigator() {
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
      <Stack.Screen name="ArtsList" component={ArtsListScreen} options={{ title: 'Артикули' }} />
      <Stack.Screen
        name="ArtDetail"
        component={ArtDetailScreen}
        options={{ title: 'Деталі артикулу' }}
      />
      <Stack.Screen name="ArtsUtils" component={ArtsUtilsScreen} options={{ title: 'Утиліти' }} />
    </Stack.Navigator>
  );
}
