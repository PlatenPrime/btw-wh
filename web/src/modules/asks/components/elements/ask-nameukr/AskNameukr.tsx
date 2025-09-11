interface AskNameukrProps {
  nameukr: string;
}

export function AskNameukr({ nameukr }: AskNameukrProps) {
  return <span className="text-foreground">{nameukr}</span>;
}
