/**
 * Configuration centralisée des règles métiers MaxiVitre
 *
 * SOURCE DE VÉRITÉ UNIQUE pour tous les calculs de prix
 * Tous les composants doivent importer depuis ce fichier
 *
 * Date: 2025-09-06
 * Dernière mise à jour: Audit qualité système devis
 */

const businessRules = {
  // ===========================================
  // TARIFICATION DE BASE
  // ===========================================

  // Prix de base par m² (utilisé dans useWindowPricing)
  basePricePerSquareMeter: 2, // 2€/m²

  // Surfaces par taille de fenêtre (en m²)
  windowSizeAreas: {
    petite: 0.8,   // ~0.8m² → 1.6€ de base
    moyenne: 1.2,  // ~1.2m² → 2.4€ de base
    grande: 1.8    // ~1.8m² → 3.6€ de base
  } as const,

  // Frais fixes par devis (appliqués UNE SEULE FOIS)
  fixedFees: 8, // 8€ par devis

  // Minimum de facturation (35€ pour tous)
  minimumBilling: {
    particulier: 35,
    professionnel: 35
  } as const,

  // ===========================================
  // MULTIPLICATEURS ET REMISES
  // ===========================================

  // Multiplicateurs type de client
  clientMultipliers: {
    particulier: 1,      // Tarif normal
    professionnel: 1     // Pas de remise automatique - voir serviceMultipliers
  } as const,

  // Multiplicateurs type de service (remises)
  serviceMultipliers: {
    'nouveau-client': 0.75,      // -25% offre découverte
    'entretien-standard': 1,     // Tarif normal
    'entretien-recent': {
      particulier: 0.85,         // -15% fidélité particulier
      professionnel: 0.80        // -20% fidélité pro
    }
  } as const,

  // Multiplicateurs nettoyage
  cleaningTypeMultipliers: {
    exterieur: 1.0,              // Tarif standard
    'exterieur-interieur': 1.8   // +80% (intérieur + extérieur)
  } as const,

  // Système de remises (infos pour affichage)
  discounts: {
    newClient: 0.25,           // -25% offre découverte (tous clients)
    loyaltyProfessional: 0.20, // -20% fidélité pro (< 2 mois)
    loyaltyIndividual: 0.15,   // -15% fidélité particulier (< 6 mois)

    // Conditions d'application
    loyaltyDelayMonths: {
      professionnel: 2,        // < 2 mois depuis dernière intervention
      particulier: 6           // < 6 mois depuis dernière intervention
    }
  } as const,

  // ===========================================
  // ACCESSIBILITÉ
  // ===========================================

  // Coûts additionnels accessibilité (en €)
  accessibilityCosts: {
    rdc: 0,        // Rez-de-chaussée, hauteur homme (< 3m)
    etage: 10,     // Étage avec échelle (3-8m)
    hauteur: 25,   // Grande hauteur
    nacelle: 50    // Nacelle (non proposé actuellement)
  } as const,

  // ===========================================
  // ZONES GÉOGRAPHIQUES
  // ===========================================

  // Suppléments par zone (en €)
  zoneSurcharges: {
    zone1: 0,        // Castelnau-le-Lez (priorité)
    zone2: 10,       // Périphérie proche
    zone3: 15,       // Périphérie éloignée
    'hors-zone': 0   // Sur devis personnalisé
  } as const,
  
  
  // ===========================================
  // DONNÉES UI (pour composants)
  // ===========================================

  // Types de fenêtres disponibles
  windowTypes: [
    { id: 'standard', name: 'Fenêtre standard', image: '🪟', description: 'Fenêtre classique, battant simple' },
    { id: 'plein-pied', name: 'Fenêtre de plein-pied', image: '🚪', description: 'Grande fenêtre jusqu\'au sol' },
    { id: 'porte-fenetre', name: 'Porte-fenêtre', image: '🚪', description: 'Porte-fenêtre à battants' },
    { id: 'baie-vitree', name: 'Baie vitrée', image: '🏠', description: 'Grande baie coulissante' },
    { id: 'fenetre-toit', name: 'Fenêtre de toit', image: '🔺', description: 'Vélux, lucarne, etc.' }
  ] as const,

  // Tailles de fenêtres avec icônes
  windowSizes: [
    { value: 'petite', label: 'Petite', icon: '⬜', dimensions: '~0.8m²' },
    { value: 'moyenne', label: 'Moyenne', icon: '◻️', dimensions: '~1.2m²' },
    { value: 'grande', label: 'Grande', icon: '⬛', dimensions: '~1.8m²' }
  ] as const,

  // Types de nettoyage
  cleaningOptions: [
    {
      value: 'exterieur',
      label: 'Extérieur uniquement',
      description: 'Nettoyage face extérieure seulement',
      recommended: true
    },
    {
      value: 'exterieur-interieur',
      label: 'Extérieur + Intérieur',
      description: 'Nettoyage des deux faces',
      recommended: false
    }
  ] as const,

  // Options d'accessibilité pour UI
  accessibilityOptionsUI: [
    {
      value: 'rdc',
      label: 'Accès facile',
      icon: '🏠',
      description: 'Rez-de-chaussée, balcon accessible'
    },
    {
      value: 'etage',
      label: 'Accès difficile',
      icon: '⛰️',
      description: 'Étage élevé, échelle nécessaire'
    }
  ] as const,

  // ===========================================
  // LEGACY (compatibilité temporaire)
  // ===========================================

  // Niveau de saleté (non utilisé dans le nouveau système)
  dirtiness: [
    { label: 'Peu sale', multiplier: 1.0 },
    { label: 'Légèrement sale', multiplier: 1.2 },
    { label: 'Modérément sale', multiplier: 1.4 },
    { label: 'Assez sale', multiplier: 1.6 },
    { label: 'Très sale', multiplier: 1.8 },
    { label: 'Extrêmement sale', multiplier: 2.0 },
    { label: 'Très encrassé', multiplier: 2.3 },
    { label: 'Restauration nécessaire', multiplier: 2.5 }
  ] as const,
  
  
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
    email: 'contact@maxivitre.fr',
    website: 'https://maxivitre.fr',
    specialization: 'Spécialiste nettoyage extérieur pour commerces',
    location: 'Castelnau-le-Lez'
  },
  
  // Contraintes
  constraints: {
    minQuantity: 1,
    maxQuantity: 50,
    exportDelay: 1500,
    quoteValidityDays: 30,
    depositThreshold: 500,
    depositPercentage: 0.30
  }
} as const

export default businessRules