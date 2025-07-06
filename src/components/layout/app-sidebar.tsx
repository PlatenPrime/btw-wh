import * as React from "react";

import { Button } from "@/components/ui/button";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Link, Link as RouterLink, useLocation } from "react-router";
import { appSidebarData } from "../data/app-sidebar-data";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "../ui/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = useLocation().pathname;
  const { user, logout, isLoading } = useAuth();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between">
        <Link to="/" className="p-2 text-2xl font-bold hover:text-sky-200">
          BTW
        </Link>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <ModeToggle />
        <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
        <SidebarTrigger className="-ml-1 md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {appSidebarData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        pathname === item.url ||
                        pathname.startsWith(item.url + "/")
                      }
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
      <SidebarRail />
      <div className="mt-auto border-t p-4">
        {isLoading ? null : user ? (
          <div className="flex flex-col items-center gap-2">
            {user.photo && (
              <img
                src={user.photo}
                alt="User"
                className="h-12 w-12 rounded-full"
              />
            )}
            <div className="text-sm font-semibold">{user.fullname}</div>
            <div className="text-xs text-gray-500">@{user.username}</div>
            <Button
              size="sm"
              variant="outline"
              onClick={logout}
              className="mt-2 w-full"
            >
              Logout
            </Button>
            <RouterLink to="/profile" className="mt-1 text-xs text-blue-500">
              Profile
            </RouterLink>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <RouterLink to="/login" className="text-sm text-blue-500">
              Login
            </RouterLink>
            <RouterLink to="/register" className="text-sm text-blue-500">
              Register
            </RouterLink>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
