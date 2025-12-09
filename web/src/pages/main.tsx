import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import AnimatedMood from "@/components/shared/animated-mood/AnimatedMood";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <main className="">
        <h1 className="text-center text-3xl font-bold md:text-3xl lg:text-6xl">
          BTrade Warehouse App
          <AnimatedMood />
        </h1>
      </main>
    </SidebarInsetLayout>
  );
}
