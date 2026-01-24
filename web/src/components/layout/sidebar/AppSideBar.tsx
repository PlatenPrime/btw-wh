import * as React from "react";

import { ModeToggle } from "@/components/shared/mode-toggle.tsx";
import { ProfileSidebarCard } from "@/components/layout/sidebar/profile-sidebar-card/ProfileSidebarCard";
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
import { appSidebarData, getIcon } from "@/components/layout/sidebar/data/app-sidebar-data";
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
      <SidebarHeader className="relative flex flex-row items-center justify-between gap-3 border-b border-sidebar-border/50 bg-sidebar/50 px-3 py-3 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-sidebar/80">
        <Link
          to="/"
          className="group relative flex items-center transition-all duration-300 hover:scale-105 active:scale-100"
        >
          <span className="relative z-10 font-serif text-2xl font-bold tracking-tight transition-all duration-300">
            <span className="bg-gradient-to-r from-primary from-0% via-chart-1 via-[48%] via-[52%] to-primary to-100% bg-clip-text text-transparent [filter:contrast(1.25)_brightness(1.1)] group-hover:[filter:contrast(1.35)_brightness(1.15)]">
              BTW
            </span>
          </span>
          <span className="absolute inset-0 -z-0 rounded-lg bg-primary/0 blur-xl transition-all duration-300 group-hover:bg-primary/20" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="transition-transform duration-300 hover:scale-110 active:scale-95">
            <ModeToggle />
          </div>
          <div className="transition-transform duration-300 hover:scale-110 active:scale-95 md:hidden">
            <SidebarTrigger />
          </div>
        </div>
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
                      className="hover:cursor-pointer"
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
