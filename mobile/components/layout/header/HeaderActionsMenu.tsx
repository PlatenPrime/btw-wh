import { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { useHeaderActions } from "./useHeaderActions";

interface HeaderActionsMenuProps {
  trigger?: React.ReactNode;
}

const iconColorMap: Record<string, string> = {
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  yellow: "#eab308",
  lime: "#84cc16",
  green: "#22c55e",
  emerald: "#10b981",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  sky: "#0ea5e9",
  blue: "#3b82f6",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  purple: "#a855f7",
  fuchsia: "#d946ef",
  pink: "#ec4899",
  rose: "#f43f5e",
  default: undefined,
};

export function HeaderActionsMenu({ trigger }: HeaderActionsMenuProps) {
  const { actions } = useHeaderActions();
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme() ?? "light";

  // Если нет действий, не рендерим меню
  if (actions.length === 0) {
    return null;
  }

  // Группируем действия по variant
  const defaultActions = actions.filter(
    (action) =>
      action.variant !== "destructive" &&
      action.variant !== "super-destructive"
  );
  const destructiveActions = actions.filter(
    (action) => action.variant === "destructive"
  );
  const superDestructiveActions = actions.filter(
    (action) => action.variant === "super-destructive"
  );

  const handleActionClick = (onClick: () => void) => {
    setModalVisible(false);
    setTimeout(() => {
      onClick();
    }, 100);
  };

  const bgColor =
    colorScheme === "light" ? Colors.light.background : Colors.dark.background;
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor =
    colorScheme === "light" ? "#e5e7eb" : "#374151";

  const renderActionItem = (
    action: typeof actions[0],
    actionTextColor: string
  ) => {
    const iconColor =
      iconColorMap[action.iconColor || "default"] || actionTextColor;
    return (
      <TouchableOpacity
        key={action.id}
        onPress={() => handleActionClick(action.onClick)}
        style={styles.actionItem}
      >
        {action.icon && (
          <MaterialIcons
            name={action.icon}
            size={20}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <ThemedText type="default" style={{ color: actionTextColor }}>
          {action.label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const modalContent = (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: bgColor, borderColor },
              ]}
            >
              {defaultActions.map((action) =>
                renderActionItem(action, textColor)
              )}

              {destructiveActions.length > 0 &&
                defaultActions.length > 0 && (
                  <View
                    style={[
                      styles.separator,
                      { backgroundColor: borderColor },
                    ]}
                  />
                )}

              {destructiveActions.map((action) =>
                renderActionItem(
                  action,
                  iconColorMap[action.iconColor || "default"] || "#ef4444"
                )
              )}

              {superDestructiveActions.length > 0 &&
                (defaultActions.length > 0 || destructiveActions.length > 0) && (
                  <View
                    style={[
                      styles.separator,
                      { backgroundColor: borderColor },
                    ]}
                  />
                )}

              {superDestructiveActions.map((action) =>
                renderActionItem(
                  action,
                  iconColorMap[action.iconColor || "default"] || "#dc2626"
                )
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  if (trigger) {
    return (
      <>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {trigger}
        </TouchableOpacity>
        {modalContent}
      </>
    );
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.triggerButton}
      >
        <MaterialIcons name="more-vert" size={24} color={textColor} />
      </TouchableOpacity>
      {modalContent}
    </>
  );
}

const styles = StyleSheet.create({
  triggerButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    minWidth: 200,
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 12,
  },
  separator: {
    height: 1,
    marginVertical: 4,
  },
});
