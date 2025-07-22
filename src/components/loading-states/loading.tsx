export function Loading({ skeleton }: { skeleton: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">Завантаження...</div>
      </div>
      {skeleton}
    </div>
  );
}
