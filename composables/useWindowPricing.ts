import { 
  DIRTINESS_LEVELS,
  CLIENT_MULTIPLIERS,
  FREQUENCY_DISCOUNTS,
  ZONE_SURCHARGES,
  ACCESSIBILITY_COSTS,
  SERVICE_MULTIPLIERS,
  WINDOW_SIZE_MULTIPLIERS,
  CLEANING_TYPE_MULTIPLIERS
} from '~/types/Windows.types'
import type { WindowSelection, ClientType, WindowSize, CleaningType } from '~/types/Windows.types'

export const useWindowPricing = () => {
  const getDirtinessMultiplier = (level: number) => {
    return DIRTINESS_LEVELS[level]?.multiplier ?? 1
  }

  const calculateGlueCost = (percentage: number = 0) => {
    const MAX_GLUE_COST = 20
    return Math.round((percentage / 100) * MAX_GLUE_COST * 2) / 2
  }

  const getAccessibilityCategory = (accessibility: string) => {
    const labels = {
      rdc: 'Rez-de-chaussée',
      etage: 'Étage (échelle)',
      hauteur: 'Grande hauteur',
      nacelle: 'Nacelle requise'
    }
    return labels[accessibility as keyof typeof labels] || 'Rez-de-chaussée'
  }

  const calculateAccessibilityCost = (accessibility: string) => {
    return ACCESSIBILITY_COSTS[accessibility as keyof typeof ACCESSIBILITY_COSTS] || 0
  }

  const calculateServiceMultiplier = (serviceType: string) => {
    return SERVICE_MULTIPLIERS[serviceType as keyof typeof SERVICE_MULTIPLIERS] || 1
  }

  const calculateZoneSurcharge = (zone: string) => {
    return ZONE_SURCHARGES[zone as keyof typeof ZONE_SURCHARGES] || 0
  }

  const calculateOptionsPrice = (options: any) => {
    let optionsPrice = 0
    if (options.cleanFrames) optionsPrice += 0.2 // +20% sera appliqué au total
    if (options.antiLimescale) optionsPrice += 0.15 // +15% sera appliqué au total
    if (options.wasteRemoval) optionsPrice += 25 // forfait fixe
    return optionsPrice
  }

  // Nouvelle logique de calcul selon les règles métier centralisées
  const calculateTotalPrice = (window: WindowSelection, clientType: ClientType = 'particulier') => {
    if (!window) return '0.00'

    const quantity = window.quantity ?? 1

    // Système basé sur 2€/m² selon les règles métier
    const size = window.size ?? 'moyenne'
    const sizeMultipliers = {
      petite: 0.8,   // ~0.8m² = 1.6€
      moyenne: 1.2,  // ~1.2m² = 2.4€
      grande: 1.8    // ~1.8m² = 3.6€
    }
    const surfaceArea = sizeMultipliers[size] ?? 1.2
    const basePricePerM2 = 2 // 2€/m² selon rules
    const windowBasePrice = basePricePerM2 * surfaceArea

    // Nouveau système : nettoyage extérieur/intérieur
    const cleaningType = window.cleaningType ?? 'exterieur'
    const cleaningMultiplier = CLEANING_TYPE_MULTIPLIERS[cleaningType] ?? 1

    // Service type (nouveau/entretien/récent) - logique entretien récent gérée séparément
    let serviceMultiplier = calculateServiceMultiplier(window.serviceType || 'nouveau-client')

    // Logique spécifique entretien récent selon clientType
    if (window.serviceType === 'entretien-recent') {
      serviceMultiplier = clientType === 'professionnel' ? 0.80 : 0.85 // -20% pro, -15% particulier
    }

    // Accessibilité
    const accessibilityCost = calculateAccessibilityCost(window.accessibility || 'rdc')

    // Zone géographique
    const zoneSurcharge = calculateZoneSurcharge(window.zone || 'zone1')

    // Calcul prix unitaire
    let unitPrice = windowBasePrice
    unitPrice *= serviceMultiplier     // Type de service (nouveau/entretien)
    unitPrice *= cleaningMultiplier    // Extérieur vs Ext+Int
    unitPrice += accessibilityCost     // Coût accessibilité
    unitPrice += zoneSurcharge         // Supplément zone

    // Prix total avant frais fixes et remises
    let totalPrice = unitPrice * quantity

    // Frais fixes de 8€ par devis selon les règles métier
    const fixedFees = 8
    totalPrice += fixedFees

    // Remise client professionnel
    const clientMultiplier = CLIENT_MULTIPLIERS[clientType]
    totalPrice *= clientMultiplier

    // Application des minimums de facturation selon les règles métier
    const minimumBilling = clientType === 'professionnel' ? 80 : 50
    totalPrice = Math.max(totalPrice, minimumBilling)

    return totalPrice.toFixed(2)
  }

  // Ancienne fonction gardée pour compatibilité temporaire
  const calculateTotalPriceLegacy = (window: WindowSelection, clientType: ClientType = 'particulier') => {
    if (!window) return '0.00'

    const basePrice = window.basePrice ?? 0
    const quantity = window.quantity ?? 1
    const dirtiness = window.dirtiness ?? 0
    const gluePercentage = window.gluePercentage ?? 0

    // Calculs de base
    let unitPrice = basePrice
    
    // Application des multiplicateurs
    unitPrice *= getDirtinessMultiplier(dirtiness)
    unitPrice *= calculateServiceMultiplier(window.serviceType || 'nouveau-client')
    
    // Coûts additionnels
    const glueCost = calculateGlueCost(gluePercentage)
    const accessibilityCost = calculateAccessibilityCost(window.accessibility || 'rdc')
    const zoneSurcharge = calculateZoneSurcharge(window.zone || 'zone1')
    
    unitPrice += glueCost + accessibilityCost + zoneSurcharge

    // Options (pourcentages appliqués sur le prix unitaire)
    const options = window.options || { cleanFrames: false, antiLimescale: false, insideOutside: false, wasteRemoval: false }
    let optionsMultiplier = 1
    
    if (options.cleanFrames) optionsMultiplier += 0.2
    if (options.antiLimescale) optionsMultiplier += 0.15
    if (options.insideOutside) optionsMultiplier *= 1.8 // majoration 180%
    
    unitPrice *= optionsMultiplier
    
    // Forfait évacuation déchets (par intervention, pas par fenêtre)
    const wasteRemovalCost = options.wasteRemoval ? 25 : 0

    // Prix total avant remises
    let totalPrice = (unitPrice * quantity) + wasteRemovalCost

    // Remise client type
    const clientMultiplier = CLIENT_MULTIPLIERS[clientType]
    totalPrice *= clientMultiplier

    // Remise fréquence (si applicable)
    const frequency = window.frequency || 'ponctuel'
    const frequencyDiscount = FREQUENCY_DISCOUNTS[frequency as keyof typeof FREQUENCY_DISCOUNTS] || 0
    totalPrice *= (1 - frequencyDiscount)

    return totalPrice.toFixed(2)
  }

  const calculateQuoteTotal = (windows: WindowSelection[], clientType: ClientType = 'particulier') => {
    const total = windows.reduce((sum, window) => {
      return sum + parseFloat(calculateTotalPrice(window, clientType))
    }, 0)

    return total.toFixed(2)
  }

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      ponctuel: 'Intervention ponctuelle',
      mensuel: 'Mensuel (-10%)',
      trimestriel: 'Trimestriel (-5%)',
      semestriel: 'Semestriel (-3%)'
    }
    return labels[frequency as keyof typeof labels] || 'Intervention ponctuelle'
  }

  const getZoneLabel = (zone: string) => {
    const labels = {
      zone1: 'Castelnau-le-Lez (priorité)',
      zone2: 'Périphérie proche (+10€)',
      zone3: 'Périphérie éloignée (+15€)',
      'hors-zone': 'Hors zone (sur devis)'
    }
    return labels[zone as keyof typeof labels] || 'Castelnau-le-Lez'
  }

  const getSizeLabel = (size: WindowSize) => {
    const labels = {
      petite: 'Petite (~0.8m²)',
      moyenne: 'Moyenne (~1.2m²)',
      grande: 'Grande (~1.8m²)'
    }
    return labels[size] || 'Moyenne'
  }

  const getCleaningTypeLabel = (cleaningType: CleaningType) => {
    const labels = {
      exterieur: 'Extérieur uniquement',
      'exterieur-interieur': 'Extérieur + Intérieur (+80%)'
    }
    return labels[cleaningType] || 'Extérieur uniquement'
  }

  return {
    // Fonctions existantes
    getDirtinessMultiplier,
    calculateGlueCost,
    
    // Nouvelles fonctions principales
    getAccessibilityCategory,
    calculateAccessibilityCost,
    calculateServiceMultiplier,
    calculateZoneSurcharge,
    calculateTotalPrice,
    calculateQuoteTotal,
    
    // Fonctions de labelling
    getFrequencyLabel,
    getZoneLabel,
    getSizeLabel,
    getCleaningTypeLabel,
    
    // Fonctions utilitaires
    calculateOptionsPrice,
    calculateTotalPriceLegacy // Compatibilité temporaire
  }
}
