import React, { useState, useRef, useCallback } from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import type { ViewStyle } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface MenuProps {
  trigger: (props: { onPress: () => void; ref: React.RefObject<View> }) => React.ReactNode;
  placement?: Placement;
  offset?: number;
  disabledKeys?: string[];
  children: React.ReactNode;
  className?: string;
}

interface MenuItemProps {
  itemKey: string;
  textValue?: string;
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface MenuItemLabelProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

interface MenuSeparatorProps {
  className?: string;
}

const MenuContext = React.createContext<{
  isOpen: boolean;
  onClose: () => void;
  disabledKeys?: string[];
}>({
  isOpen: false,
  onClose: () => {},
});

function Menu({ trigger, placement = 'bottom', offset = 5, disabledKeys, children, className }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top?: number; bottom?: number; left?: number; right?: number }>({});
  const triggerRef = useRef<View>(null);

  const handleOpen = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        const MENU_WIDTH = 200; // примерная ширина меню
        const MENU_HEIGHT = 200; // примерная высота меню
        
        const position: { top?: number; bottom?: number; left?: number; right?: number } = {};
        
        switch (placement) {
          case 'bottom': {
            const top = py + height + offset;
            const left = Math.max(8, Math.min(px, SCREEN_WIDTH - MENU_WIDTH - 8));
            position.top = top;
            position.left = left;
            break;
          }
          case 'top': {
            const bottom = SCREEN_HEIGHT - py + offset;
            const left = Math.max(8, Math.min(px, SCREEN_WIDTH - MENU_WIDTH - 8));
            position.bottom = bottom;
            position.left = left;
            break;
          }
          case 'right': {
            const top = Math.max(8, Math.min(py, SCREEN_HEIGHT - MENU_HEIGHT - 8));
            const left = px + width + offset;
            position.top = top;
            position.left = left;
            break;
          }
          case 'left': {
            const top = Math.max(8, Math.min(py, SCREEN_HEIGHT - MENU_HEIGHT - 8));
            const right = SCREEN_WIDTH - px + offset;
            position.top = top;
            position.right = right;
            break;
          }
        }
        
        setMenuPosition(position);
        setIsOpen(true);
      });
    } else {
      // Fallback - центрируем меню
      setMenuPosition({
        top: SCREEN_HEIGHT / 2 - 100,
        left: SCREEN_WIDTH / 2 - 100,
      });
      setIsOpen(true);
    }
  }, [placement, offset]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const triggerElement = trigger({
    onPress: handleOpen,
    ref: triggerRef,
  });

  return (
    <>
      <View ref={triggerRef} collapsable={false}>
        {triggerElement}
      </View>
      <MenuContext.Provider value={{ isOpen, onClose: handleClose, disabledKeys }}>
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View className="flex-1">
              <TouchableWithoutFeedback>
                <View
                  style={[
                    {
                      position: 'absolute',
                      ...menuPosition,
                      minWidth: 200,
                      zIndex: 1000,
                      elevation: Platform.OS === 'android' ? 10 : 0,
                    } as ViewStyle,
                  ]}
                  className={`rounded-md bg-background-0 border border-outline-100 p-1 shadow-lg ${className || ''}`}
                >
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </MenuContext.Provider>
    </>
  );
}

function MenuItem({ itemKey, onPress, disabled, children, className }: MenuItemProps) {
  const { isOpen, onClose, disabledKeys } = React.useContext(MenuContext);
  const isDisabled = disabled || disabledKeys?.includes(itemKey);

  const handlePress = useCallback(() => {
    if (!isDisabled && onPress) {
      onClose();
      setTimeout(() => {
        onPress();
      }, 100);
    }
  }, [isDisabled, onPress, onClose]);

  if (!isOpen) return null;

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      className={`min-w-[200px] p-3 flex-row items-center rounded ${
        isDisabled ? 'opacity-40' : 'active:bg-background-100'
      } ${className || ''}`}
    >
      {children}
    </Pressable>
  );
}

function MenuItemLabel({ size = 'md', className, children }: MenuItemLabelProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Text className={`text-typography-700 font-normal font-body ${sizeClasses[size]} ${className || ''}`}>
      {children}
    </Text>
  );
}

function MenuSeparator({ className }: MenuSeparatorProps) {
  return <View className={`bg-background-200 h-px w-full my-1 ${className || ''}`} />;
}

Menu.displayName = 'Menu';
MenuItem.displayName = 'MenuItem';
MenuItemLabel.displayName = 'MenuItemLabel';
MenuSeparator.displayName = 'MenuSeparator';

export { Menu, MenuItem, MenuItemLabel, MenuSeparator };

