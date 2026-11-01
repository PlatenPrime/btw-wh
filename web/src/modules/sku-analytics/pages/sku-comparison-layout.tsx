import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";

const TAB_STORAGE = {
  konks: "sku-comparison:konks",
  skus: "sku-comparison:skus",
} as const;

type ComparisonTab = keyof typeof TAB_STORAGE;

function resolveTab(pathname: string): ComparisonTab | null {
  if (pathname.endsWith("/comparison/skus")) return "skus";
  if (pathname.endsWith("/comparison/konks")) return "konks";
  return null;
}

const TABS: { id: ComparisonTab; label: string; to: string }[] = [
  { id: "konks", label: "По конкурентах", to: "/sku/comparison/konks" },
  { id: "skus", label: "По товарах", to: "/sku/comparison/skus" },
];

export function SkuComparisonLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = resolveTab(location.pathname);

  useEffect(() => {
    if (!activeTab) return;
    try {
      sessionStorage.setItem(TAB_STORAGE[activeTab], location.search);
    } catch {
      // ignore quota / private mode
    }
  }, [activeTab, location.search]);

  const handleTabClick = (tab: ComparisonTab, basePath: string) => {
    let search = "";
    try {
      search = sessionStorage.getItem(TAB_STORAGE[tab]) ?? "";
    } catch {
      search = "";
    }
    void navigate({ pathname: basePath, search });
  };

  return (
    <SidebarInsetLayout headerText="Порівняння">
      <div className="grid gap-4 p-2">
        <div
          role="tablist"
          aria-label="Режим порівняння"
          className="bg-muted flex flex-wrap gap-1 rounded-lg p-1"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <NavLink
                key={tab.id}
                to={tab.to}
                role="tab"
                aria-selected={isActive}
                onClick={(event) => {
                  event.preventDefault();
                  handleTabClick(tab.id, tab.to);
                }}
                className={cn(
                  "rounded-md px-3 py-1.5 transition-colors",
                  typography.body,
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </NavLink>
            );
          })}
        </div>
        <Outlet />
      </div>
    </SidebarInsetLayout>
  );
}
