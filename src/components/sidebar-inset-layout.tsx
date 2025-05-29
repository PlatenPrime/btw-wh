import { Separator } from "./ui/separator";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";

export function SidebarInsetLayout({
  headerText,
  children,
}: {
  headerText?: string;
    children: React.ReactNode;
}) {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {headerText && (
          <h1 className="text-2xl font-bold">{headerText}</h1>
        )}
      </header>
      {children}
    </SidebarInset> 
  );
}
