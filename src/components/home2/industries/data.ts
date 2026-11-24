/* /industries-served-2 data (server-safe). The 18 downstream sectors from the
   live /industries-served page. Sectors whose stock photo was unsuitable
   (blank frame, branded perfume, gold bars, rubbish bin, gift ribbons) carry
   no photo and render as typographic red/black tiles instead. */

export type Sector = { name: string; id?: string };

export const SECTORS: Sector[] = [
  { name: "Paints", id: "1562259949-e8e7689d7828" },
  { name: "Coatings" },
  { name: "Packaging", id: "1607166452427-7e4477079cb9" },
  { name: "Adhesive", id: "1589939705384-5185137a7f0f" },
  { name: "Resins" },
  { name: "Textile", id: "1441984904996-e0b6ba687e04" },
  { name: "Pharmaceuticals", id: "1584308666744-24d5c474f2ae" },
  { name: "BOPP Tapes" },
  { name: "Fiber", id: "1587293852726-70cdb56c2866" },
  { name: "Leather", id: "1594223274512-ad4803739b7c" },
  { name: "Agrochemical", id: "1574943320219-553eb213f72d" },
  { name: "Electronics", id: "1518770660439-4636190af475" },
  { name: "Laminates", id: "1493809842364-78817add7ffb" },
  { name: "Lubricants", id: "1558618666-fcd25c85cd64" },
  { name: "Automobiles", id: "1567789884554-0b844b597180" },
  { name: "Perfume" },
  { name: "Petroleum", id: "1516937941344-00b4e0337589" },
  { name: "Polymers" },
];

export const sectorImg = (id: string, w = 900, h = 1125) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&auto=format&q=72`;
