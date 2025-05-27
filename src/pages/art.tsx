import { ArtCardContainer } from "@/components/modules/arts/ArtCardContainer";
import { useBtradeArtInfoQuery } from "@/components/modules/arts/hooks/useBtradeArtInfoQuery";

export function Art() {


  const data = useBtradeArtInfoQuery("1102-0260"); 
  
  console.log("Products:", data); // Log the products to see the fetched data
  // Example artikul, replace with actual value
  return (
    <div>
      <ArtCardContainer />
    </div>
  );
}
