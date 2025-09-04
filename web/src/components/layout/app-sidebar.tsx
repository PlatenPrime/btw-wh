import * as React from "react";

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
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { appSidebarData } from "../../constants/app-sidebar-data";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "../ui/separator";
import { ProfileSidebarCard } from "./profile-sidebar-card";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = useLocation().pathname;
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log("Logging out, navigating to /login");
    navigate("/login", { replace: true });
  };

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
      <ProfileSidebarCard
        handleLogout={handleLogout}
        isLoading={isLoading}
        user={user}
      />
    </Sidebar>
  );
}
