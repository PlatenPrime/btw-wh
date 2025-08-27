import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-semibold">Home</Text>
    </View>
  );
}

function LoginScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-semibold">Login</Text>
    </View>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
