import { useArtsQuery } from "@/modules/arts/api/hooks/queries/useArtsQuery";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { ProdDto } from "@/modules/prods/api/types";
import { useSkugrsInfiniteQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrsInfiniteQuery";
import type { SkugrDto } from "@/modules/skugrs/api/types/dto";
import { useSkusCatalogQuery } from "@/modules/skus/api/hooks/queries/useSkusCatalogQuery";
import type { SkuDto } from "@/modules/skus/api/types";
import { useMemo, useState } from "react";
import {
  ReportEntitySearchView,
  type ReportEntityOption,
} from "./ReportEntitySearchView";

export type ReportEntitySource = "sku" | "skugr" | "art";

const SOURCE_COPY: Record<
  ReportEntitySource,
  { label: string; placeholder: string }
> = {
  sku: { label: "SKU", placeholder: "За назвою SKU..." },
  skugr: { label: "Товарна група", placeholder: "За назвою групи..." },
  art: { label: "Артикул", placeholder: "За артикулом або назвою..." },
};

const PAGE_LIMIT = 20;

function joinSubtitle(parts: Array<string | undefined>): string {
  return parts
    .map((part) => part?.trim() ?? "")
    .filter((part) => part.length > 0)
    .join(" · ");
}

function toSkuOption(sku: SkuDto): ReportEntityOption {
  return {
    id: sku._id,
    title: sku.title.trim() || sku.productId,
    subtitle: joinSubtitle([sku.konkName, sku.prodName]),
    imageUrl: sku.imageUrl,
  };
}

function toSkugrOption(
  skugr: SkugrDto,
  prodByName: ReadonlyMap<string, ProdDto>,
): ReportEntityOption {
  return {
    id: skugr._id,
    title: skugr.title.trim() || skugr._id,
    subtitle: joinSubtitle([skugr.konkName, skugr.prodName]),
    imageUrl: prodByName.get(skugr.prodName)?.imageUrl,
  };
}

function toArtOption(art: ArtDto): ReportEntityOption {
  const title = art.nameukr.trim() || art.namerus.trim() || art.artikul;
  return {
    id: art.artikul,
    title,
    subtitle: title === art.artikul ? "" : art.artikul,
    imageUrl: art.prod?.imageUrl,
  };
}

export interface ReportEntitySearchProps {
  source: ReportEntitySource;
  selectedId: string;
  selectedTitle: string;
  selectedImageUrl?: string;
  onSelect: (option: ReportEntityOption) => void;
  /** Обмежує SKU і групи обраним конкурентом. */
  konkName?: string;
  showFieldLabel?: boolean;
  disabled?: boolean;
}

export function ReportEntitySearch({
  source,
  selectedId,
  selectedTitle,
  selectedImageUrl,
  onSelect,
  konkName = "",
  showFieldLabel = true,
  disabled = false,
}: ReportEntitySearchProps) {
  const scopedKonk = source === "art" ? "" : konkName.trim();
  const needsProdImage = source === "skugr";
  const [search, setSearch] = useState("");
  const copy = SOURCE_COPY[source];
  const prodsQuery = useProdsQuery({ enabled: needsProdImage && !disabled });
  const prodByName = useMemo(() => {
    const map = new Map<string, ProdDto>();
    for (const prod of prodsQuery.data?.data ?? []) {
      map.set(prod.name, prod);
    }
    return map;
  }, [prodsQuery.data?.data]);

  const skuQuery = useSkusCatalogQuery({
    page: 1,
    limit: PAGE_LIMIT,
    search,
    konkName: scopedKonk,
    enabled: source === "sku" && !disabled,
  });
  const skugrQuery = useSkugrsInfiniteQuery({
    limit: PAGE_LIMIT,
    search,
    konkName: scopedKonk,
    enabled: source === "skugr" && !disabled,
  });
  const artQuery = useArtsQuery({
    page: 1,
    limit: PAGE_LIMIT,
    search,
    enabled: source === "art" && !disabled,
  });

  const options = useMemo(() => {
    if (source === "sku") return (skuQuery.data?.data ?? []).map(toSkuOption);
    if (source === "skugr") {
      return (skugrQuery.data?.pages.flatMap((page) => page.data) ?? []).map(
        (skugr) => toSkugrOption(skugr, prodByName),
      );
    }
    return (artQuery.data?.data ?? []).map(toArtOption);
  }, [
    artQuery.data?.data,
    prodByName,
    skuQuery.data?.data,
    skugrQuery.data?.pages,
    source,
  ]);

  const isLoading =
    (source === "sku" && skuQuery.isPending && options.length === 0) ||
    (source === "skugr" && skugrQuery.isPending && options.length === 0) ||
    (source === "art" && artQuery.isPending && options.length === 0);

  const hasNextPage = source === "skugr" && Boolean(skugrQuery.hasNextPage);
  const hasMoreOnServer =
    (source === "sku" && Boolean(skuQuery.data?.pagination.hasNext)) ||
    (source === "art" &&
      Boolean(artQuery.data && artQuery.data.page < artQuery.data.totalPages));

  return (
    <ReportEntitySearchView
      inputId={`excel-report-entity-${source}`}
      label={showFieldLabel ? copy.label : ""}
      placeholder={copy.placeholder}
      search={search}
      onSearchChange={setSearch}
      options={options}
      selectedId={selectedId}
      selectedTitle={selectedTitle}
      selectedImageUrl={selectedImageUrl}
      onSelect={onSelect}
      isLoading={isLoading}
      isFetchingNextPage={source === "skugr" && skugrQuery.isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={() => {
        if (source === "skugr") void skugrQuery.fetchNextPage();
      }}
      hasMoreOnServer={hasMoreOnServer}
      disabled={disabled}
    />
  );
}
