import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../providers/AuthProvider';
import { AuthStackNavigator } from './AuthStackNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // TODO: Add loading screen
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
