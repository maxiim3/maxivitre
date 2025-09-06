/**
 * Configuration centralisée des règles métiers MaxiVitre
 * 
 * Ce fichier consolide toutes les règles business dispersées dans le code
 * pour faciliter la maintenance et éviter les incohérences.
 * 
 * Source: Extraction du codebase existant (types/Windows.types.ts, useWindowPricing.ts, .rules/)
 * Date: 2025-09-06
 */

// ============================================================================
// TYPES ET INTERFACES
// ============================================================================

export type ClientType = 'particulier' | 'professionnel'
export type ServiceType = 'nouveau-client' | 'entretien-standard' | 'entretien-recent'
export type AccessibilityLevel = 'rdc' | 'etage' | 'hauteur' | 'nacelle'
export type FrequencyType = 'ponctuel' | 'mensuel' | 'trimestriel' | 'semestriel'
export type GeographicalZone = 'zone1' | 'zone2' | 'zone3' | 'hors-zone'
export type WindowSize = 'petite' | 'moyenne' | 'grande'
export type CleaningType = 'exterieur' | 'exterieur-interieur'

export interface ServiceOptions {
  cleanFrames: boolean
  antiLimescale: boolean
  insideOutside: boolean
  wasteRemoval: boolean
}

// ============================================================================
// RÈGLES DE PRICING (CŒUR MÉTIER)
// ============================================================================

export const PRICING_RULES = {
  /** Prix de base par fenêtre en euros */
  BASE_PRICE_PER_WINDOW: 8,
  
  /** Prix standard documenté par m² */
  DOCUMENTED_PRICE_PER_M2: 2,
  
  /** Frais fixes (assurance, matériel pro, qualité) */
  FIXED_FEES: 8,
  
  /** Surface moyenne par fenêtre pour cohérence pricing */
  AVERAGE_WINDOW_SURFACE_M2: 4
} as const

/** Multiplicateurs selon la taille des fenêtres */
export const WINDOW_SIZE_MULTIPLIERS: Record<WindowSize, number> = {
  petite: 0.8,   // ~0.8m²
  moyenne: 1.0,  // ~1.2m² (référence)
  grande: 1.5    // ~1.8m²
}

/** Multiplicateurs selon le type de nettoyage */
export const CLEANING_TYPE_MULTIPLIERS: Record<CleaningType, number> = {
  exterieur: 1.0,
  'exterieur-interieur': 1.8  // +80%
}

/** Multiplicateurs selon le type de client */
export const CLIENT_MULTIPLIERS: Record<ClientType, number> = {
  particulier: 1.0,      // Tarif normal
  professionnel: 0.85    // -15% réduction
}

/** Multiplicateurs selon le type de service */
export const SERVICE_MULTIPLIERS: Record<ServiceType, number> = {
  'nouveau-client': 0.85,       // -15% promotion acquisition
  'entretien-standard': 1.0,    // Tarif normal
  'entretien-recent': 1.0       // Tarif normal
}

/** Coûts additionnels selon l'accessibilité */
export const ACCESSIBILITY_COSTS: Record<AccessibilityLevel, number> = {
  rdc: 0,      // Rez-de-chaussée
  etage: 10,   // Étage avec échelle
  hauteur: 25, // Grande hauteur
  nacelle: 50  // Nacelle requise
}

/** Surcharges selon les zones géographiques */
export const ZONE_SURCHARGES: Record<GeographicalZone, number> = {
  zone1: 0,        // Castelnau-le-Lez (priorité)
  zone2: 10,       // Périphérie proche (+10€)
  zone3: 15,       // Périphérie éloignée (+15€)
  'hors-zone': 0   // Sur devis (pas de surcharge automatique)
}

/** Minimums de facturation */
export const MINIMUM_BILLING: Record<ClientType, number> = {
  particulier: 50,     // 50€ minimum
  professionnel: 80    // 80€ minimum
}

// ============================================================================
// RÈGLES OPTIONS ET SERVICES
// ============================================================================

export const SERVICE_OPTIONS_RULES = {
  /** Nettoyage de cadres: pourcentage du tarif total */
  CLEAN_FRAMES_PERCENTAGE: 0.20,  // +20%
  
  /** Anti-calcaire: pourcentage du tarif total */
  ANTI_LIMESCALE_PERCENTAGE: 0.15,  // +15%
  
  /** Évacuation déchets: forfait fixe */
  WASTE_REMOVAL_FLAT_FEE: 25,  // 25€ forfait
  
  /** Intérieur+Extérieur (système legacy): multiplicateur */
  INSIDE_OUTSIDE_LEGACY_MULTIPLIER: 1.8  // +180%
} as const

// ============================================================================
// RÈGLES LEGACY (COMPATIBILITÉ TEMPORAIRE)
// ============================================================================

/** Niveaux de saleté avec multiplicateurs (système ancien) */
export const DIRTINESS_LEVELS = [
  { label: 'Peu sale', multiplier: 1.0 },
  { label: 'Légèrement sale', multiplier: 1.2 },
  { label: 'Modérément sale', multiplier: 1.4 },
  { label: 'Assez sale', multiplier: 1.6 },
  { label: 'Très sale', multiplier: 1.8 },
  { label: 'Extrêmement sale', multiplier: 2.0 },
  { label: 'Très encrassé', multiplier: 2.3 },
  { label: 'Restauration nécessaire', multiplier: 2.5 }
] as const

/** Remises selon la fréquence (système ancien) */
export const FREQUENCY_DISCOUNTS: Record<FrequencyType, number> = {
  ponctuel: 0,      // 0% de remise
  mensuel: 0.1,     // -10%
  trimestriel: 0.05, // -5%
  semestriel: 0.03   // -3%
}

/** Règles calcul colle (système legacy) */
export const GLUE_CALCULATION_RULES = {
  /** Coût maximum de la colle */
  MAX_GLUE_COST: 20,
  
  /** Formule: (pourcentage / 100) * MAX_COST * 2, arrondi à 0.5€ */
  calculateGlueCost: (percentage: number = 0) => {
    return Math.round((percentage / 100) * 20 * 2) / 2
  }
} as const

// ============================================================================
// RÈGLES BUSINESS ET FIDÉLITÉ
// ============================================================================

/** Règles documentées dans .rules/ (à harmoniser avec le code) */
export const LOYALTY_RULES_DOCUMENTED = {
  /** Offre découverte première intervention */
  DISCOVERY_OFFER_PERCENTAGE: 0.25,  // -25%
  
  /** Remise fidélité professionnels (< 2 mois) */
  PROFESSIONAL_LOYALTY_PERCENTAGE: 0.20,  // -20%
  
  /** Remise fidélité particuliers (< 6 mois) */
  INDIVIDUAL_LOYALTY_PERCENTAGE: 0.15,  // -15%
  
  /** Remise mutualisation (plusieurs commerces même zone) */
  MUTUALIZATION_AVAILABLE: true,
  MUTUALIZATION_CUMULATIVE: true,  // Cumulable avec autres réductions
  
  /** Délais d'application des remises fidélité */
  PROFESSIONAL_LOYALTY_DELAY_MONTHS: 2,
  INDIVIDUAL_LOYALTY_DELAY_MONTHS: 6
} as const

/** Règles appliquées actuellement dans le code (incohérentes) */
export const LOYALTY_RULES_IMPLEMENTED = {
  /** Nouveau client dans le code (devrait être -25%) */
  NEW_CLIENT_DISCOUNT: 0.15,  // -15% actuellement
  
  /** Remise pro globale (devrait être fidélité -20%) */
  PROFESSIONAL_GLOBAL_DISCOUNT: 0.15  // -15% actuellement
} as const

/** Incohérences identifiées à résoudre */
export const LOYALTY_INCONSISTENCIES = {
  DISCOVERY_OFFER: {
    documented: 0.25,  // -25%
    implemented: 0.15, // -15%
    status: 'INCONSISTENT'
  },
  PROFESSIONAL_LOYALTY: {
    documented: 0.20,  // -20% fidélité
    implemented: 0.15, // -15% globale
    status: 'INCONSISTENT'
  },
  MUTUALIZATION: {
    documented: true,
    implemented: false,
    status: 'MISSING'
  }
} as const

// ============================================================================
// ZONES GÉOGRAPHIQUES ET CIBLAGE
// ============================================================================

export const GEOGRAPHICAL_RULES = {
  /** Zone principale d'intervention */
  PRIMARY_ZONE: 'Castelnau-le-Lez',
  
  /** Zones de service avec villes */
  SERVICE_AREAS: {
    zone1: ['Castelnau-le-Lez'],
    zone2: ['Le Crès', 'Jacou', 'Montpellier Pompignane', 'Millénaire', 'Aiguelongue'],
    zone3: ['Clapiers', 'Vendargues', 'Baillargues', 'Montpellier Facultés', 'Antigone', 'Port-Marianne', 'Ecusson']
  },
  
  /** Frais fixes par zone (documentation) */
  ZONE_FIXED_FEES: {
    zone1: 8,   // Frais fixes seulement
    zone2: 18,  // Frais fixes + déplacement 10€
    zone3: 23   // Frais fixes + déplacement 15€
  }
} as const

// ============================================================================
// INFORMATIONS ENTREPRISE
// ============================================================================

export const BUSINESS_INFO = {
  NAME: 'MaxiVitre',
  PHONE: '+33778818583',
  EMAIL: 'contact@maxivitre.fr',
  WEBSITE: 'https://maxivitre.fr',
  FOUNDING_YEAR: '2024',
  
  /** Positionnement métier */
  SPECIALIZATION: 'Spécialiste nettoyage extérieur pour commerces',
  PRIMARY_LOCATION: 'Castelnau-le-Lez',
  
  /** Ciblage client (priorités) */
  TARGET_PRIORITIES: {
    commerces_bureaux: 70,  // 70% focus
    agences_syndics: 20,    // 20% focus  
    particuliers: 10        // 10% focus
  },
  
  /** Avantage concurrentiel */
  COMPETITIVE_ADVANTAGE: 'Horaires flexibles, interventions weekend sans perturber l\'activité'
} as const

// ============================================================================
// CONTRAINTES TECHNIQUES ET UI
// ============================================================================

export const TECHNICAL_CONSTRAINTS = {
  /** Limites interface utilisateur */
  UI_LIMITS: {
    MIN_WINDOW_QUANTITY: 1,
    MAX_WINDOW_QUANTITY: 50,
    EXPORT_GENERATION_DELAY_MS: 1500,  // Timeout artificiel
    AUTO_SAVE_INTERVAL_SECONDS: 30,    // Auto-save brouillons (à implémenter)
    MAX_DRAFTS: 10                     // Conservation brouillons (à implémenter)
  },
  
  /** Contraintes business à implémenter */
  BUSINESS_CONSTRAINTS: {
    QUOTE_VALIDITY_DAYS: 30,           // Validité devis
    DEPOSIT_THRESHOLD_EUROS: 500,      // Seuil acompte
    DEPOSIT_PERCENTAGE: 0.30,          // 30% acompte
    INTERVENTION_DELAY_MIN_HOURS: 48,  // Délai minimum
    INTERVENTION_DELAY_MAX_DAYS: 15    // Délai maximum
  }
} as const

// ============================================================================
// TYPES DE FENÊTRES SUPPORTÉES
// ============================================================================

export const WINDOW_TYPES = {
  /** Types de fenêtres avec prix uniforme */
  SUPPORTED_TYPES: [
    { id: 'standard', name: 'Fenêtre standard', basePrice: 8 },
    { id: 'plein-pied', name: 'Fenêtre de plein-pied', basePrice: 8 },
    { id: 'porte-fenetre', name: 'Porte-fenêtre', basePrice: 8 },
    { id: 'baie-vitree', name: 'Baie vitrée', basePrice: 8 },
    { id: 'toit', name: 'Fenêtre de toit', basePrice: 8 }
  ],
  
  /** Prix uniforme pour tous les types */
  UNIFORM_BASE_PRICE: 8
} as const

// ============================================================================
// CONFIGURATION GLOBALE
// ============================================================================

/** Configuration centralisée de toutes les règles métier */
export const BUSINESS_RULES_CONFIG = {
  // Core pricing
  pricing: PRICING_RULES,
  windowSizes: WINDOW_SIZE_MULTIPLIERS,
  cleaningTypes: CLEANING_TYPE_MULTIPLIERS,
  clients: CLIENT_MULTIPLIERS,
  services: SERVICE_MULTIPLIERS,
  accessibility: ACCESSIBILITY_COSTS,
  zones: ZONE_SURCHARGES,
  minimumBilling: MINIMUM_BILLING,
  
  // Options and services
  serviceOptions: SERVICE_OPTIONS_RULES,
  
  // Legacy compatibility
  dirtinessLevels: DIRTINESS_LEVELS,
  frequencyDiscounts: FREQUENCY_DISCOUNTS,
  glueCalculation: GLUE_CALCULATION_RULES,
  
  // Loyalty and business rules
  loyaltyDocumented: LOYALTY_RULES_DOCUMENTED,
  loyaltyImplemented: LOYALTY_RULES_IMPLEMENTED,
  inconsistencies: LOYALTY_INCONSISTENCIES,
  
  // Geography and targeting
  geography: GEOGRAPHICAL_RULES,
  
  // Business information
  business: BUSINESS_INFO,
  
  // Technical constraints
  constraints: TECHNICAL_CONSTRAINTS,
  
  // Window types
  windowTypes: WINDOW_TYPES
} as const

export type BusinessRulesConfig = typeof BUSINESS_RULES_CONFIG

// ============================================================================
// UTILITAIRES D'ACCÈS RAPIDE
// ============================================================================

/** Accès rapide aux règles les plus utilisées */
export const QUICK_ACCESS = {
  /** Prix de base par fenêtre */
  basePrice: PRICING_RULES.BASE_PRICE_PER_WINDOW,
  
  /** Minimums facturation */
  minimums: MINIMUM_BILLING,
  
  /** Surcharges zones */
  zoneSurcharges: ZONE_SURCHARGES,
  
  /** Remises client */
  clientDiscounts: CLIENT_MULTIPLIERS,
  
  /** Informations contact */
  contact: {
    phone: BUSINESS_INFO.PHONE,
    email: BUSINESS_INFO.EMAIL,
    website: BUSINESS_INFO.WEBSITE
  }
} as const

export default BUSINESS_RULES_CONFIG