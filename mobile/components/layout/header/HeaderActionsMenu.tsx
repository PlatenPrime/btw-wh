import { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Box, Pressable, HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";
import { useHeaderActions } from "./useHeaderActions";
import { useIconColor } from "@/hooks/use-icon-color";
import { SemanticColors } from "@/constants/theme";

interface HeaderActionsMenuProps {
  trigger?: React.ReactNode;
}

const iconColorMap: Record<string, string | undefined> = {
  ...SemanticColors.iconColors,
  default: undefined,
};

export function HeaderActionsMenu({ trigger }: HeaderActionsMenuProps) {
  const { actions } = useHeaderActions();
  const [modalVisible, setModalVisible] = useState(false);
  const defaultIconColor = useIconColor();

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

  const renderActionItem = (
    action: typeof actions[0],
    textColorClass: string
  ) => {
    const iconColor =
      iconColorMap[action.iconColor || "default"] || defaultIconColor;
    return (
      <Pressable
        key={action.id}
        onPress={() => handleActionClick(action.onClick)}
        className="flex-row items-center py-3 px-4"
      >
        {action.icon && (
          <Icon
            family="MaterialIcons"
            name={action.icon}
            size={20}
            color={iconColor}
            className="mr-3"
          />
        )}
        <ThemedText type="default" className={textColorClass}>
          {action.label}
        </ThemedText>
      </Pressable>
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
        <Box className="flex-1 bg-black/50 items-center justify-center">
          <TouchableWithoutFeedback>
            <Box className="min-w-[200px] rounded-xl border border-outline-200 bg-background-0 p-2 shadow-lg">
              {defaultActions.map((action) =>
                renderActionItem(action, "text-typography-900")
              )}

              {destructiveActions.length > 0 &&
                defaultActions.length > 0 && (
                  <Box className="h-px bg-outline-200 my-1" />
                )}

              {destructiveActions.map((action) =>
                renderActionItem(
                  action,
                  iconColorMap[action.iconColor || "default"]
                    ? undefined
                    : "text-error-600"
                )
              )}

              {superDestructiveActions.length > 0 &&
                (defaultActions.length > 0 || destructiveActions.length > 0) && (
                  <Box className="h-px bg-outline-200 my-1" />
                )}

              {superDestructiveActions.map((action) =>
                renderActionItem(
                  action,
                  iconColorMap[action.iconColor || "default"]
                    ? undefined
                    : "text-error-700"
                )
              )}
            </Box>
          </TouchableWithoutFeedback>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );

  if (trigger) {
    return (
      <>
        <Pressable onPress={() => setModalVisible(true)}>
          {trigger}
        </Pressable>
        {modalContent}
      </>
    );
  }

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="p-2"
      >
        <Icon
          family="MaterialIcons"
          name="more-vert"
          size={24}
          color={defaultIconColor}
        />
      </Pressable>
      {modalContent}
    </>
  );
}
