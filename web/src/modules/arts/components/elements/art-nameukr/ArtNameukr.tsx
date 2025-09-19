interface ArtNameukrProps {
  nameukr: string;
}

export function ArtNameukr({ nameukr }: ArtNameukrProps) {
  return <span className="text-foreground">{nameukr}</span>;
}
