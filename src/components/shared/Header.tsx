import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      {children}
    </header>
  );
}
