import type { BtradeArtInfoDto } from "@/modules/arts/types/dto";

export function BtradeArtInfo({ info }: { info: BtradeArtInfoDto }) {
  if (!info) {
    return <p>No information available</p>;
  }

  return (
    <div>
      <p>{info.nameukr}</p>
      <p>{info.price}</p>
      <p>{info.quantity}</p>
    </div>
  );
}
