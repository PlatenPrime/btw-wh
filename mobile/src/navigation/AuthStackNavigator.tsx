import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { AuthStackParamList } from './types';

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthStackNavigator() {
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
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Вхід' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Реєстрація' }} />
    </Stack.Navigator>
  );
}
