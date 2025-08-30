import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ArtsStackNavigator } from './ArtsStackNavigator';
import { PalletsStackNavigator } from './PalletsStackNavigator';
import { MainTabParamList } from './types';
import { WarehouseStackNavigator } from './WarehouseStackNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Arts') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Warehouse') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Pallets') {
            iconName = focused ? 'layers' : 'layers-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0ea5e9', // sky-500
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Arts" component={ArtsStackNavigator} options={{ title: 'Артикули' }} />
      <Tab.Screen
        name="Warehouse"
        component={WarehouseStackNavigator}
        options={{ title: 'Склад' }}
      />
      <Tab.Screen name="Pallets" component={PalletsStackNavigator} options={{ title: 'Паллети' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профіль' }} />
    </Tab.Navigator>
  );
}
