export type ClientType = 'particulier' | 'professionnel'
export type ServiceType = 'standard' | 'autocollants' | 'apres-travaux' | 'entretien'
export type AccessibilityLevel = 'rdc' | 'etage' | 'hauteur' | 'nacelle'
export type FrequencyType = 'ponctuel' | 'mensuel' | 'trimestriel' | 'semestriel'
export type GeographicalZone = 'zone1' | 'zone2' | 'zone3' | 'hors-zone'

export interface WindowType {
  id: string
  name: string
  image: string
  basePrice: number
}

export interface ServiceOptions {
  cleanFrames: boolean
  antiLimescale: boolean
  insideOutside: boolean
  wasteRemoval: boolean
}

export interface WindowSelection extends WindowType {
  // Existant
  dirtiness: number
  gluePercentage: number
  height: number
  quantity: number
  
  // Nouveau
  serviceType: ServiceType
  accessibility: AccessibilityLevel
  frequency: FrequencyType
  zone: GeographicalZone
  options: ServiceOptions
}

export const DIRTINESS_LEVELS = [
  { label: 'Peu sale', multiplier: 1 },
  { label: 'Légèrement sale', multiplier: 1.2 },
  { label: 'Modérément sale', multiplier: 1.4 },
  { label: 'Assez sale', multiplier: 1.6 },
  { label: 'Très sale', multiplier: 1.8 },
  { label: 'Extrêmement sale', multiplier: 2 },
  { label: 'Très encrassé', multiplier: 2.3 },
  { label: 'Restauration nécessaire', multiplier: 2.5 }
]

export const CLIENT_MULTIPLIERS = {
  particulier: 1,
  professionnel: 0.85 // -15% pour les pros
}

export const FREQUENCY_DISCOUNTS = {
  ponctuel: 0,
  mensuel: 0.1, // -10%
  trimestriel: 0.05, // -5%
  semestriel: 0.03 // -3%
}

export const ZONE_SURCHARGES = {
  zone1: 0, // Montpellier centre
  zone2: 5, // Périphérie proche
  zone3: 10, // Périphérie éloignée
  'hors-zone': 0 // Sur devis
}

export const ACCESSIBILITY_COSTS = {
  rdc: 0,
  etage: 10,
  hauteur: 25,
  nacelle: 50
}

export const SERVICE_MULTIPLIERS = {
  standard: 1,
  autocollants: 1.5,
  'apres-travaux': 1.8,
  entretien: 0.9 // -10% pour entretien régulier
}

export const MINIMUM_BILLING = {
  particulier: 50,
  professionnel: 80
}
