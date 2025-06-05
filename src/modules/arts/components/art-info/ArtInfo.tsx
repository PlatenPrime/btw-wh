// import { useParams } from "react-router";

import { BtradeArtInfoContainer } from "./BtradeArtInfoContainer";

export function ArtInfo() {
  //   const { artikul } = useParams<{ artikul: string }>();

  return (
    <section>
      {" "}
      <h1 className="text-xl font-semibold mb-4">Інформація про артикул</h1>
      <BtradeArtInfoContainer />
    </section>
  );
}
