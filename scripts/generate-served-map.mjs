/**
 * Generates the Global Presence map layers from src/lib/countries.ts:
 *   - public/world-dots.svg         grey base world (all land)
 *   - public/world-dots-served.svg  red dots for every country served
 *   - src/lib/map-points.json       x/y (% of the map box) for each country
 *                                   marker and for the Mumbai HQ
 *
 * dotted-map uses a Mercator projection over a fixed world region, so marker
 * positions MUST come from the same DottedMap instance (getPin); never project
 * lat/lng by hand.
 *
 * Usage: npm run map   (Node 22.18+ / 23.6+, imports the .ts list directly)
 */
import DottedMap from "dotted-map";
import { writeFileSync } from "node:fs";
import { countries, HQ } from "../src/lib/countries.ts";

const WORLD = { lat: { min: -56, max: 71 }, lng: { min: -168, max: 168 } };
const OPTS = { height: 100, grid: "diagonal" };

const base = new DottedMap(OPTS);
const { width, height } = base.image;

writeFileSync(
  "public/world-dots.svg",
  base.getSVG({ radius: 0.24, color: "#C5C8CF", shape: "circle", backgroundColor: "transparent" })
);

// Only codes present in dotted-map's geojson can be filled; tiny states
// (e.g. Singapore, Bahrain) still get an interactive marker below.
const fillable = [];
for (const c of countries) {
  try {
    new DottedMap({ ...OPTS, countries: [c.iso3], region: WORLD });
    fillable.push(c.iso3);
  } catch {
    console.warn(`no polygon for ${c.iso3} (${c.name}); marker only`);
  }
}

const served = new DottedMap({ ...OPTS, countries: fillable, region: WORLD });
writeFileSync(
  "public/world-dots-served.svg",
  served.getSVG({ radius: 0.3, color: "#E11B22", shape: "circle", backgroundColor: "transparent" })
);

const pct = ({ x, y }) => ({
  x: Math.round((x / width) * 10000) / 100,
  y: Math.round((y / height) * 10000) / 100,
});

const points = {
  hq: pct(base.getPin({ lat: HQ.lat, lng: HQ.lng })),
  countries: Object.fromEntries(
    countries.map((c) => [c.iso3, pct(base.getPin({ lat: c.lat, lng: c.lng }))])
  ),
  aspect: width / height,
};
writeFileSync("src/lib/map-points.json", JSON.stringify(points, null, 2) + "\n");

console.log(`${countries.length} countries, ${fillable.length} filled, map ${width}x${height}`);
