import { useState } from "react";
import { Pressable } from "@/components/ui";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu-native";
import { Icon } from "@/components/ui/icon";
import { useIconColor } from "@/hooks/use-icon-color";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowDialog } from "@/modules/rows/components/dialogs/update-row-dialog/UpdateRowDialog";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";

interface RowCardMenuProps {
  row: RowDto;
  onSuccess?: () => void;
}

export function RowCardMenu({ row, onSuccess }: RowCardMenuProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const defaultIconColor = useIconColor();

  const handleEdit = () => {
    setTimeout(() => {
      setIsEditOpen(true);
    }, 100);
  };

  const handleDelete = () => {
    setTimeout(() => {
      setIsDeleteOpen(true);
    }, 100);
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    onSuccess?.();
  };

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <Menu
        placement="bottom"
        offset={5}
        trigger={({ onPress, ref }) => {
          return (
            <Pressable ref={ref} onPress={onPress} className="p-2">
              <Icon
                family="MaterialIcons"
                name="more-vert"
                size={20}
                color={defaultIconColor}
              />
            </Pressable>
          );
        }}
      >
        <MenuItem key="edit" itemKey="edit" textValue="Редагувати" onPress={handleEdit}>
          <MenuItemLabel size="sm">Редагувати</MenuItemLabel>
        </MenuItem>
        <MenuItem key="delete" itemKey="delete" textValue="Видалити" onPress={handleDelete}>
          <MenuItemLabel size="sm" className="text-error-600">
            Видалити
          </MenuItemLabel>
        </MenuItem>
      </Menu>
      
      <UpdateRowDialog
        row={row}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={handleEditSuccess}
      />
      
      <DeleteRowDialog
        row={row}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}

