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
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Link } from "react-router";
import { quickLinkDescriptionByUrl } from "@/components/shared/main-quick-links/quick-links-data";

/**
 * Сітка карток-посилань «Швидкий доступ» по групах як у сайдбарі.
 */
export function MainQuickLinks() {
  const { hasAnyRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <section className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card/35 p-6 backdrop-blur-xl md:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(130deg, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 45%, color-mix(in oklch, var(--accent) 10%, transparent) 100%)",
          }}
        />
        <h2 className="relative z-10 text-center text-xl font-semibold md:text-2xl">
          Швидкий доступ
        </h2>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card/35 p-6 backdrop-blur-xl md:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-70 blur-3xl animate-pulse [animation-duration:11s] motion-reduce:animate-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 26%, transparent) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full opacity-60 blur-3xl animate-pulse [animation-duration:13s] motion-reduce:animate-none"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--accent) 24%, transparent) 0%, transparent 74%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(130deg, color-mix(in oklch, var(--primary) 10%, transparent) 0%, transparent 42%, color-mix(in oklch, var(--accent) 8%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <h2 className="text-center text-xl font-semibold md:text-2xl">
          Швидкий доступ
        </h2>

        <div className="flex flex-col gap-8">
        {appSidebarData.navMain.map((group) => {
          const visibleItems = filterVisibleSidebarNavItems(
            group.items,
            hasAnyRole,
          );
          if (visibleItems.length === 0) {
            return null;
          }

          return (
            <div key={group.url} className="flex flex-col gap-3">
              <h3 className="text-muted-foreground text-center text-base font-semibold md:text-left">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((item) => (
                  <Link
                    key={item.url}
                    to={item.url}
                    className="focus-visible:ring-ring group block rounded-2xl transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Card
                      className={cn(
                        "relative h-full overflow-hidden rounded-2xl border-border/70 bg-card/55 shadow-lg transition-all duration-300 backdrop-blur-xl",
                        "group-hover:-translate-y-0.5 group-hover:border-primary/35 group-hover:shadow-2xl",
                      )}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(140deg, color-mix(in oklch, var(--primary) 14%, transparent) 0%, transparent 45%, color-mix(in oklch, var(--accent) 12%, transparent) 100%)",
                        }}
                      />
                      <CardContent className="relative z-10 flex flex-col gap-3">
                        <div className="flex items-center justify-start gap-2">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/70 text-primary shadow-md [&_svg]:h-5 [&_svg]:w-5">
                            <div
                              className="pointer-events-none absolute inset-0 rounded-xl opacity-85"
                              style={{
                                background:
                                  "linear-gradient(145deg, color-mix(in oklch, var(--primary) 20%, transparent) 0%, color-mix(in oklch, var(--accent) 16%, transparent) 100%)",
                              }}
                            />
                            <span className="relative z-10">{getIcon(item.iconName)}</span>
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
      </div>
    </section>
  );
}
