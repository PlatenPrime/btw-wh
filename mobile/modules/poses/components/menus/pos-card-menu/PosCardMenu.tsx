import { useState } from "react";
import { Pressable } from "@/components/ui";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Icon } from "@/components/ui/icon";
import { useIconColor } from "@/hooks/use-icon-color";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosDialog } from "@/modules/poses/components/dialogs/update-pos-dialog/UpdatePosDialog";
import { DeletePosDialog } from "@/modules/poses/components/dialogs/delete-pos-dialog/DeletePosDialog";

interface PosCardMenuProps {
  pos: IPos;
  onSuccess?: () => void;
}

export function PosCardMenu({ pos, onSuccess }: PosCardMenuProps) {
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
        trigger={({ ...triggerProps }) => {
          return (
            <Pressable {...triggerProps} className="p-2">
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
        <MenuItem key="edit" textValue="Редагувати" onPress={handleEdit}>
          <MenuItemLabel size="sm">Редагувати</MenuItemLabel>
        </MenuItem>
        <MenuItem key="delete" textValue="Видалити" onPress={handleDelete}>
          <MenuItemLabel size="sm" className="text-error-600">
            Видалити
          </MenuItemLabel>
        </MenuItem>
      </Menu>
      
      <UpdatePosDialog
        pos={pos}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSuccess={handleEditSuccess}
      />
      
      <DeletePosDialog
        pos={pos}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}

