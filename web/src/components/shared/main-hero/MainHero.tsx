import { Warehouse } from "lucide-react";

/**
 * Hero-секція головної сторінки: градієнтний фон, іконка, заголовок, слоган.
 * Візуально узгоджена з login-сторінкою (BTrade Warehouse).
 */
export function MainHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 py-16 backdrop-blur-sm md:py-20">
      {/* Лёгкий градієнтний фон */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--chart-2) 100%)",
          backgroundSize: "400% 400%",
          animation: "aurora 30s linear infinite",
        }}
      />
      {/* Мягкий многослойный градиент: радиальные блики + диагональ primary → accent (color-mix для oklch-темы) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 30%, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 85% 70%, color-mix(in oklch, var(--accent) 10%, transparent) 0%, transparent 48%), linear-gradient(145deg, color-mix(in oklch, var(--primary) 7%, transparent) 0%, transparent 40%, transparent 60%, color-mix(in oklch, var(--accent) 9%, transparent) 100%)",
        }}
      />

      {/* Декоративна сітка «зони/ряди» — точки */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm md:h-16 md:w-16">
            <Warehouse className="h-7 w-7 text-primary md:h-8 md:w-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            BTrade Warehouse
          </h1>
        </div>
        <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
          Управління складом на новому рівні
        </p>
      </div>
    </section>
  );
}
