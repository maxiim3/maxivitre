/**
 * Configuration centralisée des règles métiers MaxiVitre
 * 
 * Source: Extraction du codebase existant
 * Date: 2025-09-06
 */

const businessRules = {
  // Prix par fenêtre selon la taille
  windowPrices: {
    petite: 2,    // < 1m²
    moyenne: 4,   // 1-2m²  
    grande: 6     // > 2m²
  },
  
  // Multiplicateurs nettoyage intérieur
  cleaningTypes: {
    exterieur: 1.0,
    'exterieur-interieur-particulier': 2.5,   // +150%
    'exterieur-interieur-professionnel': 2.8  // +180%
  },
  
  // Système de remises (appliqué sur le total final)
  discounts: {
    newClient: 0.25,           // -25% offre découverte (tous clients)
    loyaltyProfessional: 0.20, // -20% fidélité pro (< 2 mois)
    loyaltyIndividual: 0.15,   // -15% fidélité particulier (< 6 mois)
    
    // Conditions d'application
    loyaltyDelayMonths: {
      professionnel: 2,        // < 2 mois depuis dernière intervention
      particulier: 6           // < 6 mois depuis dernière intervention
    }
  },
  
  // Coûts additionnels accessibilité
  accessibility: {
    hauteur_homme: 0,  // < 3m (tarif normal)
    echelle: 1.5       // > 3m et < 8m (+150%)
  },
  
  zones: {
    zone1: 0,
    zone2: 10,
    zone3: 15
  },
  
  
  // Legacy (compatibilité)
  dirtiness: [
    { label: 'Peu sale', multiplier: 1.0 },
    { label: 'Légèrement sale', multiplier: 1.2 },
    { label: 'Modérément sale', multiplier: 1.4 },
    { label: 'Assez sale', multiplier: 1.6 },
    { label: 'Très sale', multiplier: 1.8 },
    { label: 'Extrêmement sale', multiplier: 2.0 },
    { label: 'Très encrassé', multiplier: 2.3 },
    { label: 'Restauration nécessaire', multiplier: 2.5 }
  ],
  
  
  // Zones géographiques
  serviceAreas: {
    zone1: ['Castelnau-le-Lez'],
    zone2: ['Le Crès', 'Jacou', 'Montpellier Pompignane', 'Millénaire', 'Aiguelongue'],
    zone3: ['Clapiers', 'Vendargues', 'Baillargues', 'Montpellier Facultés', 'Antigone', 'Port-Marianne', 'Ecusson']
  },
  
  // Informations entreprise
  business: {
    name: 'MaxiVitre',
    phone: '+33778818583',
    phoneFormatted: '07 78 81 85 83',
    whatsapp: '33778818583',
    email: 'contact@maxivitre.fr',
    website: 'https://maxivitre.fr',
    specialization: 'Spécialiste nettoyage extérieur pour commerces',
    location: 'Castelnau-le-Lez',
    hours: 'Lun-Sam : 8h-19h'
  },
  
  // Contraintes
  constraints: {
    minQuantity: 1,
    maxQuantity: 50,
    exportDelay: 1500,
    quoteValidityDays: 30,
    depositThreshold: 500,
    depositPercentage: 0.30,
    interventionDelay: 48,
    fixedFees: 8
  }
} as const

export default businessRules