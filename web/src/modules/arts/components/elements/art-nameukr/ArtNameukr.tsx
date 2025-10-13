interface ArtNameukrProps {
  nameukr: string;
}

export function ArtNameukr({ nameukr }: ArtNameukrProps) {
  return <span className="text-foreground text-sm font-medium">{nameukr}</span>;
}
