import type { BtradeArtInfo } from "../services/arts";

export function BtradeArtInfo({ info }: { info: BtradeArtInfo }) {



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
