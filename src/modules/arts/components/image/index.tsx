function getArtImageLink(artikul: string) {
  return `https://sharik.ua/images/elements_big/${artikul}_m1.jpg`;
}

export  function ArtImage({ artikul }: { artikul: string }) {
  const src = getArtImageLink(artikul);

  return <img src={src} alt={artikul} width="100%" className="rounded-xl" />;
}
