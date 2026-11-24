/* Industry → Canva scene mapping, shared by the story and the overview. */

export const INDUSTRY_STORY_ID = "industry-story";

export const INDUSTRY_SCENE: Record<string, { scene: string; alt: string }> = {
  "Paints & Coatings": { scene: "paints", alt: "Pencil drawing of a paint plant with open tins of red and white paint in colour" },
  "Adhesives & Sealants": { scene: "adhesives", alt: "Pencil drawing of a facade with a sealant gun applying a red bead" },
  Pharmaceuticals: { scene: "pharma", alt: "Pencil drawing of a pharmaceutical clean room with a blister packaging line" },
  Textiles: { scene: "textiles", alt: "Pencil drawing of a textile mill with a loom fed by red and white yarn" },
  Construction: { scene: "construction", alt: "Pencil drawing of a construction site with a roof being coated red" },
  "Personal Care": { scene: "personalcare", alt: "Pencil drawing of a personal care plant with a bottle filling line" },
  Agrochemicals: { scene: "agro", alt: "Pencil drawing of farmland with a red tractor spraying crops" },
  "Plastics & Polymers": { scene: "polymers", alt: "Pencil drawing of a plastics plant with red and white polymer pellets" },
  Automotive: { scene: "automotive", alt: "Pencil drawing of a car assembly line with a red car body" },
  "Inks & Printing": { scene: "printing", alt: "Pencil drawing of a printing hall with rollers spreading red ink" },
};
