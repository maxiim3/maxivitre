/**
 * Types TypeScript pour le système de devis MaxiVitre
 *
 * IMPORTANT: Les constantes de calcul sont dans business-rules.config.ts
 * Ce fichier ne contient QUE les définitions de types
 */

// ===========================================
// TYPES DE BASE
// ===========================================

export type ClientType = 'particulier' | 'professionnel'
export type ServiceType = 'nouveau-client' | 'entretien-standard' | 'entretien-recent'
export type AccessibilityLevel = 'rdc' | 'etage' | 'hauteur' | 'nacelle'
export type FrequencyType = 'ponctuel' | 'mensuel' | 'trimestriel' | 'semestriel'
export type GeographicalZone = 'zone1' | 'zone2' | 'zone3' | 'hors-zone'
export type WindowSize = 'petite' | 'moyenne' | 'grande'
export type CleaningType = 'exterieur' | 'exterieur-interieur'

// ===========================================
// INTERFACES
// ===========================================

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

// ===========================================
// CONSTANTES LEGACY (dépréciées - utiliser business-rules.config.ts)
// Conservées temporairement pour compatibilité
// ===========================================

/** @deprecated Utiliser businessRules.dirtiness depuis business-rules.config.ts */
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

