import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { appSidebarData } from "../app-sidebar-data";
import { AuthProvider, useAuth } from "../auth/AuthContext";

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Вітаємо, {user?.username}!
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 30 }}>
        Головна сторінка мобільного додатку
      </Text>
      <Pressable
        onPress={logout}
        style={{
          backgroundColor: "#ef4444",
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Вийти</Text>
      </Pressable>
    </View>
  );
}

function LoginScreen() {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      login(username.trim(), password.trim());
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30 }}>
        Вхід в систему
      </Text>

      <View style={{ width: "100%", maxWidth: 300, gap: 16 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>Логін</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Введіть логін"
            style={{
              borderWidth: 1,
              borderColor: "#d1d5db",
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>Пароль</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Введіть пароль"
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#d1d5db",
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
            }}
          />
        </View>

        {error ? (
          <Text style={{ color: "#dc2626", textAlign: "center" }}>{error}</Text>
        ) : null}

        <Pressable
          onPress={handleLogin}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? "#9ca3af" : "#000",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 8,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Увійти
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

function Sidebar(props: any) {
  const { user, logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          {user ? user.username : "Гість"}
        </Text>
      </View>

      <DrawerItemList {...props} />

      {user && (
        <Pressable
          onPress={logout}
          style={{
            margin: 16,
            padding: 12,
            backgroundColor: "#f3f4f6",
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#374151" }}>Вийти</Text>
        </Pressable>
      )}
    </DrawerContentScrollView>
  );
}

function AppDrawer() {
  const { user } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#f8fafc" },
        headerTintColor: "#1f2937",
      }}
    >
      {user ? (
        <>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Головна" }}
          />
          {appSidebarData.navMain.map((section) => (
            <Drawer.Screen
              key={section.title}
              name={section.title}
              component={HomeScreen}
              options={{ title: section.title }}
            />
          ))}
        </>
      ) : (
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Вхід" }}
        />
      )}
    </Drawer.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppDrawer />
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
  );
}
