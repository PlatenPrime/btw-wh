import { Box } from "@/components/ui/box";
import React from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { type HeaderAction } from "../../types";
import { RenderActionItem } from "../render-action-item/RenderActionItem";

interface HeaderActionsModalContentProps {
  defaultActions: HeaderAction[];
  destructiveActions: HeaderAction[];
  superDestructiveActions: HeaderAction[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HeaderActionsModalContent({
  defaultActions,
  destructiveActions,
  superDestructiveActions,
  modalVisible,
  setModalVisible,
}: HeaderActionsModalContentProps) {
  return (
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
              {defaultActions.map((action) => (
                <RenderActionItem
                  key={action.id}
                  action={action}
                  textColorClass="text-typography-900"
                  setModalVisible={setModalVisible}
                />
              ))}

              {destructiveActions.length > 0 && defaultActions.length > 0 && (
                <Box className="h-px bg-outline-200 my-1" />
              )}

              {destructiveActions.map((action) => (
                <RenderActionItem
                  key={action.id}
                  action={action}
                  textColorClass="text-error-600"
                  setModalVisible={setModalVisible}
                />
              ))}

              {superDestructiveActions.length > 0 &&
                (defaultActions.length > 0 ||
                  destructiveActions.length > 0) && (
                  <Box className="h-px bg-outline-200 my-1" />
                )}

              {superDestructiveActions.map((action) => (
                <RenderActionItem
                  key={action.id}
                  action={action}
                  textColorClass="text-error-700"
                  setModalVisible={setModalVisible}
                />
              ))}
            </Box>
          </TouchableWithoutFeedback>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
