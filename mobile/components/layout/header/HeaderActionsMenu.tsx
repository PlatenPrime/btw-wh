import { useState } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Box, Pressable } from "@/components/ui";
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

const textColorMap: Record<string, string | undefined> = {
  red: "text-red-500",
  orange: "text-orange-500",
  amber: "text-amber-500",
  yellow: "text-yellow-500",
  lime: "text-lime-500",
  green: "text-green-500",
  emerald: "text-emerald-500",
  teal: "text-teal-500",
  cyan: "text-cyan-500",
  sky: "text-sky-500",
  blue: "text-blue-500",
  indigo: "text-indigo-500",
  violet: "text-violet-500",
  purple: "text-purple-500",
  fuchsia: "text-fuchsia-500",
  pink: "text-pink-500",
  rose: "text-rose-500",
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
    textColorClass: string | undefined
  ) => {
    const iconColor =
      iconColorMap[action.iconColor || "default"] || defaultIconColor;
    // Приоритетно используем action.textColor через маппинг, если он задан, иначе используем переданный textColorClass
    const finalTextColorClass =
      textColorMap[action.textColor || "default"] ?? textColorClass;
    return (
      <Pressable
        key={action.id}
        onPress={() => handleActionClick(action.onClick)}
        className="flex-row items-center p-3"
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
        <ThemedText type="default" className={finalTextColorClass}>
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
            <Box className="min-w-[200px] rounded-xl border border-outline-100 bg-background-0 p-2 shadow-lg">
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
                  iconColorMap[action.iconColor || "default"] !== undefined
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
                  iconColorMap[action.iconColor || "default"] !== undefined
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
