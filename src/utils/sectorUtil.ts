// src/utils/sectorUtils.ts
export function groupBySector(shares: any[]) {
  return shares.reduce((acc: Record<string, any[]>, item) => {
    const sector = item.sector?.toLowerCase();
    if (!sector) return acc;

    if (!acc[sector]) acc[sector] = [];
    acc[sector].push(item);

    return acc;
  }, {});
}
