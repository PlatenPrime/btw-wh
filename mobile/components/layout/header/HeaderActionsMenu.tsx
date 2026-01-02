import { Pressable } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { useIconColor } from "@/hooks/use-icon-color";
import { useState } from "react";
import { HeaderActionsModalContent } from "./components/modal-content/ModalContent";
import { useHeaderActions } from "./useHeaderActions";

interface HeaderActionsMenuProps {
  trigger?: React.ReactNode;
}

export function HeaderActionsMenu({ trigger }: HeaderActionsMenuProps) {
  const { actions } = useHeaderActions();
  const [modalVisible, setModalVisible] = useState(false);
  const defaultIconColor = useIconColor();

  if (actions.length === 0) {
    return null;
  }

  const defaultActions = actions.filter(
    (action) =>
      action.variant !== "destructive" && action.variant !== "super-destructive"
  );
  const destructiveActions = actions.filter(
    (action) => action.variant === "destructive"
  );
  const superDestructiveActions = actions.filter(
    (action) => action.variant === "super-destructive"
  );

  if (trigger) {
    return (
      <>
        <Pressable onPress={() => setModalVisible(true)}>{trigger}</Pressable>
        <HeaderActionsModalContent
          defaultActions={defaultActions}
          destructiveActions={destructiveActions}
          superDestructiveActions={superDestructiveActions}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </>
    );
  }

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)} className="p-2">
        <Icon
          family="MaterialIcons"
          name="more-vert"
          size={24}
          color={defaultIconColor}
        />
      </Pressable>

      <HeaderActionsModalContent
        defaultActions={defaultActions}
        destructiveActions={destructiveActions}
        superDestructiveActions={superDestructiveActions}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
