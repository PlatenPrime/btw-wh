# Застаріло: RTL-корекція band-spike balun

Цей документ замінено гайдом [frontend/band-spike-correction.md](frontend/band-spike-correction.md).

Ендпоінт `POST /api/sku-slices/sku/:skuId/correct-balun-band-spike` знято. Використовуйте:

- `POST /api/sku-slices/band-spike/discover`
- `POST /api/sku-slices/sku/:skuId/correct-band-spike` з `stockMin` / `stockMax`

UI: `/sku/band-spike` і дія «Виправити band-spike» на картці SKU (будь-який konk, роль ≥ ADMIN).
