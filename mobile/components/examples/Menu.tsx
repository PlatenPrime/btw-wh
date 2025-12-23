import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu-native";
import { Text } from "@/components/ui/text";
import { Pressable as RNPressable } from "react-native";

export function MenuExample() {
  return (
    <Menu
      placement="bottom"
      offset={5}
      disabledKeys={["Settings"]}
      trigger={({ onPress, ref }) => {
        return (
          <RNPressable
            ref={ref}
            onPress={onPress}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: "#6366f1",
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="text-white font-medium">Menu</Text>
          </RNPressable>
        );
      }}
    >
      <MenuItem key="Add account" itemKey="Add account" textValue="Add account">
        <MenuItemLabel size="sm">Add account</MenuItemLabel>
      </MenuItem>
      <MenuItem key="Community" itemKey="Community" textValue="Community">
        <MenuItemLabel size="sm">Community</MenuItemLabel>
      </MenuItem>
      <MenuItem key="Plugins" itemKey="Plugins" textValue="Plugins">
        <MenuItemLabel size="sm">Plugins</MenuItemLabel>
      </MenuItem>
      <MenuItem key="Settings" itemKey="Settings" textValue="Settings">
        <MenuItemLabel size="sm">Settings</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
}
