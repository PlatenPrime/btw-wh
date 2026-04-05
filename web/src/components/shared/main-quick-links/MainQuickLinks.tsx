import {
  appSidebarData,
  filterVisibleSidebarNavItems,
  getIcon,
} from "@/components/layout/sidebar/data/app-sidebar-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { quickLinkDescriptionByUrl } from "./quick-links-data";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

/**
 * Сітка карток-посилань «Швидкий доступ» по групах як у сайдбарі.
 */
export function MainQuickLinks() {
  const { hasAnyRole, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-center text-xl font-semibold md:text-2xl">
          Швидкий доступ
        </h2>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-center text-xl font-semibold md:text-2xl">
        Швидкий доступ
      </h2>
      <div className="flex flex-col gap-8">
        {appSidebarData.navMain.map((group) => {
          const visibleItems = filterVisibleSidebarNavItems(
            group.items,
            hasAnyRole,
          );
          const items = visibleItems.filter(
            (item) => !item.allowedRoles || user,
          );
          if (items.length === 0) {
            return null;
          }

          return (
            <div key={group.url} className="flex flex-col gap-3">
              <h3 className="text-muted-foreground text-center text-base font-semibold md:text-left">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Link
                    key={item.url}
                    to={item.url}
                    className="focus-visible:ring-ring block rounded-xl transition-all hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Card
                      className={cn(
                        "h-full transition-all duration-200",
                        "hover:border-primary/30 hover:shadow-lg",
                      )}
                    >
                      <CardContent className="flex flex-col gap-3">
                        <div className="flex items-center justify-start gap-2">
                          <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg [&_svg]:h-5 [&_svg]:w-5">
                            {getIcon(item.iconName)}
                          </div>
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </div>

                        <CardDescription>
                          {quickLinkDescriptionByUrl[item.url] ?? ""}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
