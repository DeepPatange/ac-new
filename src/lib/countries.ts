/**
 * Global Presence — countries served.
 *
 * PROVISIONAL LIST. The client will supply the final, verified country list.
 * To update: edit this array (ISO 3166-1 alpha-3 code, name, region and an
 * approximate centroid), then run `npm run map` to regenerate the highlighted
 * map layers (public/world-dots-served.svg + src/lib/map-points.json).
 *
 * The "60+ countries" headline in site.ts must stay consistent with this list.
 */

export type Region =
  | "Asia Pacific"
  | "Middle East"
  | "Europe"
  | "Africa"
  | "Americas";

export interface Country {
  iso3: string;
  name: string;
  region: Region;
  lat: number;
  lng: number;
}

export const HQ = { name: "Mumbai, India", lat: 19.076, lng: 72.8777 } as const;

export const countries: Country[] = [
  // Asia Pacific
  { iso3: "IND", name: "India", region: "Asia Pacific", lat: 21.0, lng: 78.0 },
  { iso3: "CHN", name: "China", region: "Asia Pacific", lat: 33.0, lng: 106.0 },
  { iso3: "JPN", name: "Japan", region: "Asia Pacific", lat: 36.5, lng: 138.5 },
  { iso3: "KOR", name: "South Korea", region: "Asia Pacific", lat: 36.4, lng: 127.9 },
  { iso3: "TWN", name: "Taiwan", region: "Asia Pacific", lat: 23.7, lng: 121.0 },
  { iso3: "SGP", name: "Singapore", region: "Asia Pacific", lat: 1.35, lng: 103.82 },
  { iso3: "MYS", name: "Malaysia", region: "Asia Pacific", lat: 3.8, lng: 102.0 },
  { iso3: "THA", name: "Thailand", region: "Asia Pacific", lat: 15.5, lng: 101.0 },
  { iso3: "IDN", name: "Indonesia", region: "Asia Pacific", lat: -2.5, lng: 117.0 },
  { iso3: "VNM", name: "Vietnam", region: "Asia Pacific", lat: 15.8, lng: 106.3 },
  { iso3: "PHL", name: "Philippines", region: "Asia Pacific", lat: 12.5, lng: 122.5 },
  { iso3: "KHM", name: "Cambodia", region: "Asia Pacific", lat: 12.6, lng: 104.9 },
  { iso3: "MMR", name: "Myanmar", region: "Asia Pacific", lat: 20.5, lng: 96.0 },
  { iso3: "BGD", name: "Bangladesh", region: "Asia Pacific", lat: 23.8, lng: 90.3 },
  { iso3: "LKA", name: "Sri Lanka", region: "Asia Pacific", lat: 7.8, lng: 80.7 },
  { iso3: "NPL", name: "Nepal", region: "Asia Pacific", lat: 28.3, lng: 84.0 },
  { iso3: "KAZ", name: "Kazakhstan", region: "Asia Pacific", lat: 48.0, lng: 67.0 },
  { iso3: "AUS", name: "Australia", region: "Asia Pacific", lat: -25.0, lng: 134.0 },
  { iso3: "NZL", name: "New Zealand", region: "Asia Pacific", lat: -41.5, lng: 172.5 },
  // Middle East
  { iso3: "ARE", name: "United Arab Emirates", region: "Middle East", lat: 24.0, lng: 54.0 },
  { iso3: "SAU", name: "Saudi Arabia", region: "Middle East", lat: 24.0, lng: 45.0 },
  { iso3: "QAT", name: "Qatar", region: "Middle East", lat: 25.3, lng: 51.2 },
  { iso3: "OMN", name: "Oman", region: "Middle East", lat: 21.0, lng: 57.0 },
  { iso3: "KWT", name: "Kuwait", region: "Middle East", lat: 29.3, lng: 47.6 },
  { iso3: "BHR", name: "Bahrain", region: "Middle East", lat: 26.0, lng: 50.55 },
  { iso3: "JOR", name: "Jordan", region: "Middle East", lat: 31.0, lng: 36.5 },
  { iso3: "ISR", name: "Israel", region: "Middle East", lat: 31.4, lng: 35.0 },
  { iso3: "TUR", name: "Türkiye", region: "Middle East", lat: 39.0, lng: 35.0 },
  // Europe
  { iso3: "NLD", name: "Netherlands", region: "Europe", lat: 52.2, lng: 5.5 },
  { iso3: "BEL", name: "Belgium", region: "Europe", lat: 50.6, lng: 4.6 },
  { iso3: "DEU", name: "Germany", region: "Europe", lat: 51.0, lng: 10.0 },
  { iso3: "FRA", name: "France", region: "Europe", lat: 46.5, lng: 2.5 },
  { iso3: "ITA", name: "Italy", region: "Europe", lat: 42.8, lng: 12.5 },
  { iso3: "ESP", name: "Spain", region: "Europe", lat: 40.2, lng: -3.7 },
  { iso3: "PRT", name: "Portugal", region: "Europe", lat: 39.6, lng: -8.0 },
  { iso3: "GBR", name: "United Kingdom", region: "Europe", lat: 53.0, lng: -1.5 },
  { iso3: "CHE", name: "Switzerland", region: "Europe", lat: 46.8, lng: 8.2 },
  { iso3: "POL", name: "Poland", region: "Europe", lat: 52.0, lng: 19.4 },
  { iso3: "SWE", name: "Sweden", region: "Europe", lat: 62.0, lng: 15.0 },
  { iso3: "GRC", name: "Greece", region: "Europe", lat: 39.3, lng: 22.0 },
  // Africa
  { iso3: "EGY", name: "Egypt", region: "Africa", lat: 26.5, lng: 30.0 },
  { iso3: "MAR", name: "Morocco", region: "Africa", lat: 31.8, lng: -7.1 },
  { iso3: "DZA", name: "Algeria", region: "Africa", lat: 28.0, lng: 2.6 },
  { iso3: "TUN", name: "Tunisia", region: "Africa", lat: 34.0, lng: 9.5 },
  { iso3: "NGA", name: "Nigeria", region: "Africa", lat: 9.6, lng: 8.1 },
  { iso3: "GHA", name: "Ghana", region: "Africa", lat: 7.9, lng: -1.0 },
  { iso3: "ETH", name: "Ethiopia", region: "Africa", lat: 9.1, lng: 39.6 },
  { iso3: "KEN", name: "Kenya", region: "Africa", lat: 0.2, lng: 37.9 },
  { iso3: "UGA", name: "Uganda", region: "Africa", lat: 1.4, lng: 32.4 },
  { iso3: "TZA", name: "Tanzania", region: "Africa", lat: -6.3, lng: 34.9 },
  { iso3: "MOZ", name: "Mozambique", region: "Africa", lat: -17.5, lng: 35.5 },
  { iso3: "ZMB", name: "Zambia", region: "Africa", lat: -13.5, lng: 27.8 },
  { iso3: "ZAF", name: "South Africa", region: "Africa", lat: -29.0, lng: 24.7 },
  // Americas
  { iso3: "USA", name: "United States", region: "Americas", lat: 39.0, lng: -98.0 },
  { iso3: "CAN", name: "Canada", region: "Americas", lat: 56.0, lng: -106.0 },
  { iso3: "MEX", name: "Mexico", region: "Americas", lat: 23.6, lng: -102.5 },
  { iso3: "COL", name: "Colombia", region: "Americas", lat: 4.6, lng: -74.1 },
  { iso3: "PER", name: "Peru", region: "Americas", lat: -9.2, lng: -75.0 },
  { iso3: "BRA", name: "Brazil", region: "Americas", lat: -10.5, lng: -52.0 },
  { iso3: "CHL", name: "Chile", region: "Americas", lat: -33.5, lng: -70.7 },
  { iso3: "ARG", name: "Argentina", region: "Americas", lat: -34.6, lng: -64.0 },
];

export const REGIONS: Region[] = [
  "Asia Pacific",
  "Middle East",
  "Europe",
  "Africa",
  "Americas",
];
