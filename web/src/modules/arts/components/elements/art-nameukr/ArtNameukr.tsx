interface ArtNameukrProps {
  nameukr: string;
}

export function ArtNameukr({ nameukr }: ArtNameukrProps) {
  return <span className="text-foreground font-medium">{nameukr}</span>;
}
