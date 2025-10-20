import { RoleType, getRoleLabel } from "@btw-wh/shared";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  // Пример использования shared модуля
  const adminLabel = getRoleLabel(RoleType.ADMIN);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BTW-WH Mobile</Text>
      <Text style={styles.subtitle}>Shared модуль подключен ✅</Text>
      <Text style={styles.example}>Пример роли: {adminLabel}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  example: {
    fontSize: 14,
    color: "#888",
  },
});
