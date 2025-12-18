import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpenState] = useState(false);

  const setIsOpen = useCallback((open: boolean | ((prev: boolean) => boolean)) => {
    setIsOpenState(open);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsOpenState((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
}

