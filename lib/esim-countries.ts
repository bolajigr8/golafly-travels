export type EsimCountry = {
  label: string
  code: string
  type: 'country' | 'region' | 'global'
}

export const ESIM_COUNTRIES: EsimCountry[] = [
  { label: 'Global (130+ countries)', code: 'global', type: 'global' },
  { label: 'Europe', code: 'EU', type: 'region' },

  // Africa
  { label: 'Algeria', code: 'DZ', type: 'country' },
  { label: 'Angola', code: 'AO', type: 'country' },
  { label: 'Cameroon', code: 'CM', type: 'country' },
  { label: "Côte d'Ivoire", code: 'CI', type: 'country' },
  { label: 'Egypt', code: 'EG', type: 'country' },
  { label: 'Ethiopia', code: 'ET', type: 'country' },
  { label: 'Ghana', code: 'GH', type: 'country' },
  { label: 'Kenya', code: 'KE', type: 'country' },
  { label: 'Morocco', code: 'MA', type: 'country' },
  { label: 'Mozambique', code: 'MZ', type: 'country' },
  { label: 'Nigeria', code: 'NG', type: 'country' },
  { label: 'Rwanda', code: 'RW', type: 'country' },
  { label: 'Senegal', code: 'SN', type: 'country' },
  { label: 'South Africa', code: 'ZA', type: 'country' },
  { label: 'Tanzania', code: 'TZ', type: 'country' },
  { label: 'Tunisia', code: 'TN', type: 'country' },
  { label: 'Uganda', code: 'UG', type: 'country' },

  // Americas
  { label: 'Argentina', code: 'AR', type: 'country' },
  { label: 'Brazil', code: 'BR', type: 'country' },
  { label: 'Canada', code: 'CA', type: 'country' },
  { label: 'Chile', code: 'CL', type: 'country' },
  { label: 'Colombia', code: 'CO', type: 'country' },
  { label: 'Costa Rica', code: 'CR', type: 'country' },
  { label: 'Cuba', code: 'CU', type: 'country' },
  { label: 'Dominican Rep.', code: 'DO', type: 'country' },
  { label: 'Ecuador', code: 'EC', type: 'country' },
  { label: 'Jamaica', code: 'JM', type: 'country' },
  { label: 'Mexico', code: 'MX', type: 'country' },
  { label: 'Panama', code: 'PA', type: 'country' },
  { label: 'Peru', code: 'PE', type: 'country' },
  { label: 'United States', code: 'US', type: 'country' },
  { label: 'Uruguay', code: 'UY', type: 'country' },

  // Asia & Middle East
  { label: 'Azerbaijan', code: 'AZ', type: 'country' },
  { label: 'Bahrain', code: 'BH', type: 'country' },
  { label: 'Bangladesh', code: 'BD', type: 'country' },
  { label: 'Cambodia', code: 'KH', type: 'country' },
  { label: 'China', code: 'CN', type: 'country' },
  { label: 'Georgia', code: 'GE', type: 'country' },
  { label: 'Hong Kong', code: 'HK', type: 'country' },
  { label: 'India', code: 'IN', type: 'country' },
  { label: 'Indonesia', code: 'ID', type: 'country' },
  { label: 'Israel', code: 'IL', type: 'country' },
  { label: 'Japan', code: 'JP', type: 'country' },
  { label: 'Jordan', code: 'JO', type: 'country' },
  { label: 'Kazakhstan', code: 'KZ', type: 'country' },
  { label: 'Kuwait', code: 'KW', type: 'country' },
  { label: 'Kyrgyzstan', code: 'KG', type: 'country' },
  { label: 'Laos', code: 'LA', type: 'country' },
  { label: 'Lebanon', code: 'LB', type: 'country' },
  { label: 'Macau', code: 'MO', type: 'country' },
  { label: 'Malaysia', code: 'MY', type: 'country' },
  { label: 'Maldives', code: 'MV', type: 'country' },
  { label: 'Mongolia', code: 'MN', type: 'country' },
  { label: 'Myanmar', code: 'MM', type: 'country' },
  { label: 'Nepal', code: 'NP', type: 'country' },
  { label: 'Oman', code: 'OM', type: 'country' },
  { label: 'Pakistan', code: 'PK', type: 'country' },
  { label: 'Philippines', code: 'PH', type: 'country' },
  { label: 'Qatar', code: 'QA', type: 'country' },
  { label: 'Saudi Arabia', code: 'SA', type: 'country' },
  { label: 'Singapore', code: 'SG', type: 'country' },
  { label: 'South Korea', code: 'KR', type: 'country' },
  { label: 'Sri Lanka', code: 'LK', type: 'country' },
  { label: 'Taiwan', code: 'TW', type: 'country' },
  { label: 'Tajikistan', code: 'TJ', type: 'country' },
  { label: 'Thailand', code: 'TH', type: 'country' },
  { label: 'Turkey', code: 'TR', type: 'country' },
  { label: 'UAE', code: 'AE', type: 'country' },
  { label: 'Uzbekistan', code: 'UZ', type: 'country' },
  { label: 'Vietnam', code: 'VN', type: 'country' },

  // Europe
  { label: 'Albania', code: 'AL', type: 'country' },
  { label: 'Austria', code: 'AT', type: 'country' },
  { label: 'Belarus', code: 'BY', type: 'country' },
  { label: 'Belgium', code: 'BE', type: 'country' },
  { label: 'Bosnia', code: 'BA', type: 'country' },
  { label: 'Bulgaria', code: 'BG', type: 'country' },
  { label: 'Croatia', code: 'HR', type: 'country' },
  { label: 'Cyprus', code: 'CY', type: 'country' },
  { label: 'Czech Republic', code: 'CZ', type: 'country' },
  { label: 'Denmark', code: 'DK', type: 'country' },
  { label: 'Estonia', code: 'EE', type: 'country' },
  { label: 'Finland', code: 'FI', type: 'country' },
  { label: 'France', code: 'FR', type: 'country' },
  { label: 'Germany', code: 'DE', type: 'country' },
  { label: 'Greece', code: 'GR', type: 'country' },
  { label: 'Hungary', code: 'HU', type: 'country' },
  { label: 'Iceland', code: 'IS', type: 'country' },
  { label: 'Ireland', code: 'IE', type: 'country' },
  { label: 'Italy', code: 'IT', type: 'country' },
  { label: 'Kosovo', code: 'XK', type: 'country' },
  { label: 'Latvia', code: 'LV', type: 'country' },
  { label: 'Lithuania', code: 'LT', type: 'country' },
  { label: 'Luxembourg', code: 'LU', type: 'country' },
  { label: 'Malta', code: 'MT', type: 'country' },
  { label: 'Moldova', code: 'MD', type: 'country' },
  { label: 'Montenegro', code: 'ME', type: 'country' },
  { label: 'Netherlands', code: 'NL', type: 'country' },
  { label: 'North Macedonia', code: 'MK', type: 'country' },
  { label: 'Norway', code: 'NO', type: 'country' },
  { label: 'Poland', code: 'PL', type: 'country' },
  { label: 'Portugal', code: 'PT', type: 'country' },
  { label: 'Romania', code: 'RO', type: 'country' },
  { label: 'Serbia', code: 'RS', type: 'country' },
  { label: 'Slovakia', code: 'SK', type: 'country' },
  { label: 'Slovenia', code: 'SI', type: 'country' },
  { label: 'Spain', code: 'ES', type: 'country' },
  { label: 'Sweden', code: 'SE', type: 'country' },
  { label: 'Switzerland', code: 'CH', type: 'country' },
  { label: 'Ukraine', code: 'UA', type: 'country' },
  { label: 'United Kingdom', code: 'GB', type: 'country' },

  // Oceania
  { label: 'Australia', code: 'AU', type: 'country' },
  { label: 'Fiji', code: 'FJ', type: 'country' },
  { label: 'New Zealand', code: 'NZ', type: 'country' },
]

// ─── Popular chips ─────────────────────────────────────────────
export const POPULAR_COUNTRY_CODES = [
  'GB',
  'ES',
  'FR',
  'DE',
  'IT',
  'PT',
  'TR',
  'AE',
  'QA',
  'SA',
  'US',
  'JP',
  'TH',
  'SG',
  'ZA',
  'NG',
  'MA',
  'EG',
  'BR',
  'AR',
] as const

export const POPULAR_CHIPS = ESIM_COUNTRIES.filter((c) =>
  (POPULAR_COUNTRY_CODES as readonly string[]).includes(c.code),
).sort(
  (a, b) =>
    (POPULAR_COUNTRY_CODES as readonly string[]).indexOf(a.code) -
    (POPULAR_COUNTRY_CODES as readonly string[]).indexOf(b.code),
)

// ─── Country photos keyed by ISO code ─────────────────────────
const AF = '/esim/New/africa.webp'
const EU = '/esim/New/europe.jpeg'
const UK = '/esim/New/uk.jpeg'
const JP = '/esim/New/japan.jpeg'
const TH = '/esim/New/thai.jpeg'
const VN = '/esim/New/vietnam.jpeg'
const TR = '/esim/New/turk.jpeg'
const MX = '/esim/New/mexico.jpeg'
const IN = '/esim/New/indo.jpeg'
const PA = '/esim/New/paris.jpeg'
const GL = '/esim/New/global.jpeg'

export const COUNTRY_PHOTOS_BY_CODE: Record<string, string> = {
  global: GL,
  EU,
  // Africa
  DZ: AF,
  AO: AF,
  CM: AF,
  CI: AF,
  EG: AF,
  ET: AF,
  GH: AF,
  KE: AF,
  MA: AF,
  MZ: AF,
  NG: AF,
  RW: AF,
  SN: AF,
  ZA: AF,
  TZ: AF,
  TN: AF,
  UG: AF,
  // Americas
  AR: MX,
  BR: MX,
  CA: UK,
  CL: MX,
  CO: MX,
  CR: MX,
  CU: MX,
  DO: MX,
  EC: MX,
  JM: MX,
  MX: MX,
  PA: MX,
  PE: MX,
  US: UK,
  UY: MX,
  // Asia & Middle East
  AZ: TR,
  BH: PA,
  BD: VN,
  KH: VN,
  CN: JP,
  GE: EU,
  HK: JP,
  IN: IN,
  ID: VN,
  IL: PA,
  JP: JP,
  JO: PA,
  KZ: TR,
  KW: PA,
  KG: TR,
  LA: VN,
  LB: PA,
  MO: JP,
  MY: VN,
  MV: TH,
  MN: TR,
  MM: VN,
  NP: VN,
  OM: PA,
  PK: IN,
  PH: VN,
  QA: PA,
  SA: PA,
  SG: JP,
  KR: JP,
  LK: VN,
  TW: JP,
  TJ: TR,
  TH: TH,
  TR: TR,
  AE: PA,
  UZ: TR,
  VN: VN,
  // Europe
  AL: EU,
  AT: EU,
  BY: EU,
  BE: EU,
  BA: EU,
  BG: EU,
  HR: EU,
  CY: EU,
  CZ: EU,
  DK: EU,
  EE: EU,
  FI: EU,
  FR: PA,
  DE: EU,
  GR: EU,
  HU: EU,
  IS: EU,
  IE: UK,
  IT: EU,
  XK: EU,
  LV: EU,
  LT: EU,
  LU: EU,
  MT: EU,
  MD: EU,
  ME: EU,
  NL: EU,
  MK: EU,
  NO: EU,
  PL: EU,
  PT: EU,
  RO: EU,
  RS: EU,
  SK: EU,
  SI: EU,
  ES: EU,
  SE: EU,
  CH: EU,
  UA: EU,
  GB: UK,
  // Oceania
  AU: TH,
  FJ: TH,
  NZ: EU,
}

export function getCountryPhoto(codeOrName: string): string {
  if (COUNTRY_PHOTOS_BY_CODE[codeOrName])
    return COUNTRY_PHOTOS_BY_CODE[codeOrName]
  const found = ESIM_COUNTRIES.find(
    (c) => c.label.toLowerCase() === codeOrName.toLowerCase(),
  )
  if (found && COUNTRY_PHOTOS_BY_CODE[found.code])
    return COUNTRY_PHOTOS_BY_CODE[found.code]
  return GL
}

// ─── resolveCountryCode — fixed priority order ─────────────────
// The old loose .includes() caused "Algeria" to match "Albania" first.
// Now: exact code → exact label → starts-with → word-starts-with → null
// We never do a loose substring match anymore.
export function resolveCountryCode(input: string): string | null {
  const q = input.toLowerCase().trim()
  if (!q) return null

  // 1. Exact ISO code (e.g. user typed "NG" or "ng")
  const byCode = ESIM_COUNTRIES.find((c) => c.code.toLowerCase() === q)
  if (byCode) return byCode.code

  // 2. Exact full label (e.g. "Algeria", "United Kingdom")
  const byExact = ESIM_COUNTRIES.find((c) => c.label.toLowerCase() === q)
  if (byExact) return byExact.code

  // 3. Label starts-with (e.g. "alg" → "Algeria", not "Albania")
  const byStart = ESIM_COUNTRIES.find((c) =>
    c.label.toLowerCase().startsWith(q),
  )
  if (byStart) return byStart.code

  // 4. Any word in the label starts-with the query
  // e.g. "king" → "United Kingdom", "ara" → "Saudi Arabia"
  const byWordStart = ESIM_COUNTRIES.find((c) =>
    c.label
      .toLowerCase()
      .split(/\s+/)
      .some((word) => word.startsWith(q)),
  )
  if (byWordStart) return byWordStart.code

  // ✅ NO loose .includes() — removed entirely to prevent wrong matches
  return null
}
