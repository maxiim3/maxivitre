export type ClientType = 'particulier' | 'professionnel'
export type ServiceType = 'nouveau-client' | 'entretien-standard' | 'entretien-recent'
export type AccessibilityLevel = 'rdc' | 'etage' | 'hauteur' | 'nacelle'
export type FrequencyType = 'ponctuel' | 'mensuel' | 'trimestriel' | 'semestriel'
export type GeographicalZone = 'zone1' | 'zone2' | 'zone3' | 'hors-zone'
export type WindowSize = 'petite' | 'moyenne' | 'grande'
export type CleaningType = 'exterieur' | 'exterieur-interieur'

export interface WindowType {
  id: string
  name: string
  image: string
  basePrice: number
  description?: string
}

export interface ServiceOptions {
  cleanFrames: boolean
  antiLimescale: boolean
  insideOutside: boolean
  wasteRemoval: boolean
}

export interface WindowSelection extends WindowType {
  // Configuration fenêtre
  quantity: number
  size: WindowSize
  accessibility: AccessibilityLevel
  cleaningType: CleaningType
  
  // Global (venant des étapes précédentes)
  serviceType: ServiceType
  zone: GeographicalZone
  
  // Ancien système (garde compatibilité temporaire)
  dirtiness?: number
  gluePercentage?: number
  height?: number
  frequency?: FrequencyType
  options?: ServiceOptions
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
  zone1: 0, // Castelnau-le-Lez (priorité)
  zone2: 10, // Périphérie proche 
  zone3: 15, // Périphérie éloignée
  'hors-zone': 0 // Sur devis
}

export const ACCESSIBILITY_COSTS = {
  rdc: 0,
  etage: 10,
  hauteur: 25,
  nacelle: 50
}

export const SERVICE_MULTIPLIERS = {
  'nouveau-client': 0.85, // -15% pour nouveau client (promotion acquisition)
  'entretien-standard': 1, // Tarif normal
  'entretien-recent': 1 // Tarif normal
}

export const WINDOW_SIZE_MULTIPLIERS = {
  petite: 0.8, // ~0.8m² 
  moyenne: 1, // ~1.2m²
  grande: 1.5 // ~1.8m²
}

export const CLEANING_TYPE_MULTIPLIERS = {
  exterieur: 1,
  'exterieur-interieur': 1.8 // +180% (ou 1.5 = +150% selon clarification)
}

