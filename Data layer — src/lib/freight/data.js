// Indicative prototype values — replace with licensed/port-authority data in production.
export const ORIGINS = [
  { id: 'australia', name: 'Australia', short: 'AUS', loadPort: 'Hay Point, QLD', base: 24, days: 14 },
  { id: 'usa', name: 'United States', short: 'USA', loadPort: 'Hampton Roads, VA', base: 38, days: 42 },
  { id: 'mozambique', name: 'Mozambique', short: 'MOZ', loadPort: 'Nacala', base: 20, days: 16 },
  { id: 'russia', name: 'Russia', short: 'RUS', loadPort: 'Vostochny', base: 34, days: 24 },
  { id: 'indonesia', name: 'Indonesia', short: 'IDN', loadPort: 'Samarinda', base: 12, days: 9 },
];

export const PORTS = [
  { id: 'paradip', name: 'Paradip', state: 'Odisha', maxDraft: 17.0, maxLoa: 280, maxBeam: 47, handling: 60000, congestion: 58, premium: 1.0 },
  { id: 'vizag', name: 'Visakhapatnam', state: 'Andhra Pradesh', maxDraft: 18.5, maxLoa: 300, maxBeam: 50, handling: 50000, congestion: 46, premium: 0.99 },
  { id: 'gangavaram', name: 'Gangavaram', state: 'Andhra Pradesh', maxDraft: 21.0, maxLoa: 330, maxBeam: 55, handling: 55000, congestion: 34, premium: 0.98 },
  { id: 'dhamra', name: 'Dhamra', state: 'Odisha', maxDraft: 18.5, maxLoa: 300, maxBeam: 50, handling: 60000, congestion: 41, premium: 1.01 },
  { id: 'gopalpur', name: 'Gopalpur', state: 'Odisha', maxDraft: 14.5, maxLoa: 230, maxBeam: 40, handling: 25000, congestion: 22, premium: 1.03 },
  { id: 'sagar', name: 'Sagar-Sandheads', state: 'West Bengal', maxDraft: 12.5, maxLoa: 230, maxBeam: 36, handling: 30000, congestion: 52, premium: 1.05 },
  { id: 'haldia', name: 'Haldia', state: 'West Bengal', maxDraft: 10.5, maxLoa: 230, maxBeam: 32.3, handling: 20000, congestion: 67, premium: 1.08 },
];

export const VESSELS = [
  { id: 'handysize', name: 'Handysize', capacity: 35000, range: '28–40k DWT', draft: 10.0, loa: 180, beam: 30, mult: 1.25, hire: 12000 },
  { id: 'supramax', name: 'Supramax', capacity: 57000, range: '50–60k DWT', draft: 12.8, loa: 200, beam: 32.3, mult: 1.0, hire: 15000 },
  { id: 'panamax', name: 'Panamax', capacity: 76000, range: '65–82k DWT', draft: 14.2, loa: 229, beam: 32.3, mult: 0.87, hire: 17000 },
  { id: 'capesize', name: 'Capesize', capacity: 175000, range: '150–200k DWT', draft: 18.2, loa: 292, beam: 45, mult: 0.7, hire: 26000 },
];

export const SCENARIOS = [
  { id: 'aus-par', label: 'Australia → Paradip', origin: 'australia', dest: 'paradip' },
  { id: 'us-viz', label: 'US → Vizag', origin: 'usa', dest: 'vizag' },
  { id: 'rus-dha', label: 'Russia → Dhamra', origin: 'russia', dest: 'dhamra' },
];

export const CARGO_TYPES = ['Coking coal', 'Thermal coal', 'Limestone', 'Pet coke'];

export const getOrigin = (id) => ORIGINS.find((o) => o.id === id);
