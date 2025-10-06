import * as React from "react";

import { ModeToggle } from "@/components/shared/mode-toggle.tsx";
import { ProfileSidebarCard } from "@/components/shared/sidebar/profile-sidebar-card/ProfileSidebarCard";
import { Separator } from "@/components/ui/separator";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { appSidebarData, getIcon } from "@/components/shared/sidebar/data/app-sidebar-data";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = useLocation().pathname;
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLogout = () => {
    logout();
    console.log("Logging out, navigating to /login");
    navigate("/login", { replace: true });
  };

  const handleNavigation = (url: string) => {
    // Закрываем мобильный сайдбар при навигации
    if (isMobile) {
      setOpenMobile(false);
    }
    navigate(url);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between">
        <Link to="/" className="p-2 text-2xl font-bold hover:text-sky-500">
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
                      <button
                        onClick={() => handleNavigation(item.url)}
                        className="flex w-full items-center gap-2 text-left"
                      >
                        {getIcon(item.iconName)}
                        {item.title}
                      </button>
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
