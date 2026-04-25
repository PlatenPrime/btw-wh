import { Warehouse } from "lucide-react";

/**
 * Hero-секція головної сторінки: градієнтний фон, іконка, заголовок, слоган.
 * Візуально узгоджена з login-сторінкою (BTrade Warehouse).
 */
export function MainHero() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card/40 py-16 backdrop-blur-xl md:py-20">
      <div className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]">
        <div
          className="absolute -left-16 -top-24 h-72 w-72 rounded-full opacity-80 blur-3xl animate-pulse [animation-duration:11s] motion-reduce:animate-none md:h-96 md:w-96"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 34%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full opacity-75 blur-3xl animate-pulse [animation-duration:13s] motion-reduce:animate-none md:h-[26rem] md:w-[26rem]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--accent) 32%, transparent) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "linear-gradient(125deg, color-mix(in oklch, var(--primary) 16%, transparent) 0%, transparent 34%, color-mix(in oklch, var(--accent) 14%, transparent) 72%, color-mix(in oklch, var(--chart-2) 16%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] dark:opacity-[0.2]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-4xl gap-8 px-4 md:gap-10">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/35 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
          <div
            className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-75"
            style={{
              background:
                "linear-gradient(130deg, color-mix(in oklch, var(--primary) 32%, transparent) 0%, transparent 38%, color-mix(in oklch, var(--accent) 30%, transparent) 100%)",
            }}
          />
          <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-8">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-card/70 shadow-xl md:h-20 md:w-20">
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-80 animate-pulse [animation-duration:6s] motion-reduce:animate-none"
                style={{
                  background:
                    "linear-gradient(145deg, color-mix(in oklch, var(--primary) 24%, transparent) 0%, color-mix(in oklch, var(--accent) 20%, transparent) 100%)",
                }}
              />
              <Warehouse className="relative z-10 h-8 w-8 text-primary md:h-10 md:w-10" />
            </div>

            <div className="grid gap-3 text-center md:text-left">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                BTrade Warehouse
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground md:text-xl">
                Управління складом на новому рівні
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
