import { Warehouse } from "lucide-react";

/**
 * Hero-секція головної сторінки: градієнтний фон, іконка, заголовок, слоган.
 * Візуально узгоджена з login-сторінкою (BTrade Warehouse).
 */
export function MainHero() {
  return (
    <div className="mx-auto grid gap-8 md:gap-10">
      <div className="border-border/60 bg-card/35 relative overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl md:p-8">
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-75"
          style={{
            background:
              "linear-gradient(130deg, color-mix(in oklch, var(--primary) 32%, transparent) 0%, transparent 38%, color-mix(in oklch, var(--accent) 30%, transparent) 100%)",
          }}
        />
        <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-8">
          <div className="border-border/60 bg-card/70 relative flex h-16 w-16 items-center justify-center rounded-2xl border shadow-xl md:h-20 md:w-20">
            <div
              className="pointer-events-none absolute inset-0 animate-pulse rounded-2xl opacity-80 [animation-duration:6s] motion-reduce:animate-none"
              style={{
                background:
                  "linear-gradient(145deg, color-mix(in oklch, var(--primary) 24%, transparent) 0%, color-mix(in oklch, var(--accent) 20%, transparent) 100%)",
              }}
            />
            <Warehouse className="text-primary relative z-10 h-8 w-8 md:h-10 md:w-10" />
          </div>

          <div className="grid gap-3 text-center md:text-left">
            <h1 className="text-foreground font-serif text-3xl font-bold tracking-tight md:text-5xl">
              BTrade Warehouse
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base md:text-xl">
              Управління складом на новому рівні
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
