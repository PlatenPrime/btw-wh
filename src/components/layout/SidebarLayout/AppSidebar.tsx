import * as React from "react";

import { data } from "@/components/layout/SidebarLayout/sidebarData";
import { useLocation } from "react-router";

import UserInfo from "@/components/layout/SidebarLayout/UserInfo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LogoutDialogButton } from "@/modules/auth/components/LogoutDialogButton/LogoutDialogButton";
import { Link } from "react-router";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const checkIsActive = (url: string): boolean => {
    if (location.pathname.slice(1) === url) {
      return true;
    }
    return false;
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center">
          <UserInfo />
          <ThemeToggle />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={checkIsActive(item.url)}
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <LogoutDialogButton />
      <SidebarRail />
    </Sidebar>
  );
}
