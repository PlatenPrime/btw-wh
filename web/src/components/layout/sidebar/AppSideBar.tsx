import * as React from "react";
import { ChevronDown } from "lucide-react";

import { ModeToggle } from "@/components/shared/mode-toggle.tsx";
import { ProfileSidebarCard } from "@/components/layout/sidebar/profile-sidebar-card/ProfileSidebarCard";
import {
  appSidebarData,
  filterVisibleSidebarNavItems,
  getActiveSidebarNavItemUrl,
  getIcon,
  isSidebarGroupActiveForPathname,
} from "@/components/layout/sidebar/data/app-sidebar-data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";

function groupKey(title: string) {
  return title;
}

function closeMobileDrawer(
  isMobile: boolean,
  setOpenMobile: (v: React.SetStateAction<boolean>) => void,
  scheduleMobileDrawerCloseShield: (durationMs?: number) => void,
) {
  if (!isMobile) return;
  setOpenMobile(false);
  scheduleMobileDrawerCloseShield();
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = useLocation().pathname;
  const { user, logout, isLoading, hasAnyRole } = useAuth();
  const navigate = useNavigate();
  const {
    isMobile,
    setOpenMobile,
    scheduleMobileDrawerCloseShield,
  } = useSidebar();

  const [openByGroup, setOpenByGroup] = React.useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      for (const group of appSidebarData.navMain) {
        const visible = filterVisibleSidebarNavItems(
          group.items,
          hasAnyRole,
        );
        initial[groupKey(group.title)] = isSidebarGroupActiveForPathname(
          group,
          pathname,
          visible,
        );
      }
      return initial;
    },
  );

  React.useLayoutEffect(() => {
    if (!isMobile) return;
    setOpenMobile((prev) => {
      if (prev) {
        queueMicrotask(() => scheduleMobileDrawerCloseShield());
      }
      return false;
    });
  }, [pathname, isMobile, setOpenMobile, scheduleMobileDrawerCloseShield]);

  React.useEffect(() => {
    setOpenByGroup((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const group of appSidebarData.navMain) {
        const visible = filterVisibleSidebarNavItems(
          group.items,
          hasAnyRole,
        );
        const k = groupKey(group.title);
        if (isSidebarGroupActiveForPathname(group, pathname, visible)) {
          if (!next[k]) {
            next[k] = true;
            changed = true;
          }
        }
      }
      return changed ? next : prev;
    });
  }, [pathname, hasAnyRole]);

  const handleLogout = () => {
    logout();
    console.log("Logging out, navigating to /login");
    closeMobileDrawer(isMobile, setOpenMobile, scheduleMobileDrawerCloseShield);
    navigate("/login", { replace: true });
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="relative flex min-w-0 flex-row items-center justify-between gap-3 border-b border-sidebar-border bg-sidebar px-3 py-3">
        <Link
          to="/"
          onClick={() =>
            closeMobileDrawer(
              isMobile,
              setOpenMobile,
              scheduleMobileDrawerCloseShield,
            )
          }
          className="group relative flex items-center transition-all duration-300 hover:scale-105 active:scale-100"
        >
          <span className="relative z-10 font-serif text-2xl font-bold tracking-tight transition-all duration-300">
            <span className="bg-gradient-to-r from-primary from-0%  to-primary to-100% bg-clip-text text-transparent [filter:contrast(1.25)_brightness(1.1)] group-hover:[filter:contrast(1.35)_brightness(1.15)]">
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
      <SidebarContent className="gap-0 overflow-x-hidden overflow-y-auto">
        {appSidebarData.navMain.map((group, index) => {
          const key = groupKey(group.title);
          const visibleItems = filterVisibleSidebarNavItems(
            group.items,
            hasAnyRole,
          );
          const activeNavUrl = getActiveSidebarNavItemUrl(
            pathname,
            visibleItems,
          );
          const isOpen = openByGroup[key] ?? false;

          return (
            <React.Fragment key={key}>
              {index > 0 ? (
                <SidebarSeparator className="my-1 shrink-0" />
              ) : null}
              <SidebarGroup className="py-0.5 px-2">
                <Collapsible
                  open={isOpen}
                  onOpenChange={(next) =>
                    setOpenByGroup((prev) => ({ ...prev, [key]: next }))
                  }
                  className="group/collapsible w-full min-w-0"
                >
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger
                      className={cn(
                        "w-full min-w-0 max-w-full shrink cursor-pointer",
                        "text-sidebar-foreground !text-base font-semibold leading-snug tracking-tight",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "data-[state=open]:bg-sidebar-accent/40 data-[state=open]:text-sidebar-accent-foreground",
                      )}
                    >
                      <span className="min-w-0 flex-1 truncate text-left">
                        {group.title}
                      </span>
                      <ChevronDown
                        className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
                        aria-hidden
                      />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent className="pt-0">
                      <SidebarMenu>
                        {visibleItems.map((navItem) => (
                          <SidebarMenuItem key={navItem.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={navItem.url === activeNavUrl}
                              className="hover:cursor-pointer"
                            >
                              <Link
                                to={navItem.url}
                                onClick={() =>
                                  closeMobileDrawer(
                                    isMobile,
                                    setOpenMobile,
                                    scheduleMobileDrawerCloseShield,
                                  )
                                }
                                className="flex min-w-0 w-full items-center gap-2 text-left"
                              >
                                {getIcon(navItem.iconName)}
                                <span className="min-w-0 flex-1 truncate">
                                  {navItem.title}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>
            </React.Fragment>
          );
        })}
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
