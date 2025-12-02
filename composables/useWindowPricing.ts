import {
  DIRTINESS_LEVELS,
  CLIENT_MULTIPLIERS,
  FREQUENCY_DISCOUNTS,
  ZONE_SURCHARGES,
  ACCESSIBILITY_MULTIPLIERS,
  SERVICE_MULTIPLIERS,
  LOYALTY_MULTIPLIERS,
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
      hauteur_homme: 'Accès facile (< 3m)',
      echelle: 'Échelle requise (3-8m)'
    }
    return labels[accessibility as keyof typeof labels] || 'Accès facile'
  }

  const calculateAccessibilityMultiplier = (accessibility: string) => {
    return ACCESSIBILITY_MULTIPLIERS[accessibility as keyof typeof ACCESSIBILITY_MULTIPLIERS] || 1.0
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

    // 1. SYSTÈME BASÉ SUR 2€/m² selon les règles métier
    const size = window.size ?? 'moyenne'
    const sizeMultipliers = {
      petite: 0.8,   // ~0.8m² = 1.6€
      moyenne: 1.2,  // ~1.2m² = 2.4€
      grande: 1.8    // ~1.8m² = 3.6€
    }
    const surfaceArea = sizeMultipliers[size] ?? 1.2
    const basePricePerM2 = 2 // 2€/m² selon rules
    const windowBasePrice = basePricePerM2 * surfaceArea

    // 2. MULTIPLICATEURS

    // 2a. Type de nettoyage (extérieur vs extérieur+intérieur)
    const cleaningType = window.cleaningType ?? 'exterieur'
    const cleaningMultiplier = CLEANING_TYPE_MULTIPLIERS[cleaningType] ?? 1

    // 2b. Type de service - utilise LOYALTY_MULTIPLIERS pour entretien-recent
    let serviceMultiplier = calculateServiceMultiplier(window.serviceType || 'nouveau-client')
    if (window.serviceType === 'entretien-recent') {
      // ✅ FIX Bug #4: Utilise LOYALTY_MULTIPLIERS au lieu de valeurs hard-codées
      serviceMultiplier = LOYALTY_MULTIPLIERS[clientType]
    }

    // 2c. Accessibilité - ✅ FIX Bug #1: Appliqué comme MULTIPLIER, pas comme coût fixe
    const accessibilityMultiplier = calculateAccessibilityMultiplier(window.accessibility || 'hauteur_homme')

    // 3. CALCUL PRIX UNITAIRE avec tous les multipliers
    let unitPrice = windowBasePrice
    unitPrice *= serviceMultiplier        // Type de service
    unitPrice *= cleaningMultiplier       // Extérieur vs Ext+Int
    unitPrice *= accessibilityMultiplier  // ✅ Accessibilité comme multiplier (1.0x ou 1.5x)

    // 4. AJOUT SURCHARGE ZONE (coût fixe par fenêtre)
    const zoneSurcharge = calculateZoneSurcharge(window.zone || 'zone1')
    unitPrice += zoneSurcharge

    // 5. MULTIPLICATION PAR QUANTITÉ
    let totalPrice = unitPrice * quantity

    // 6. ✅ FIX Bug #2: APPLICATION REMISE FRÉQUENCE (avant frais fixes)
    const frequency = window.frequency || 'ponctuel'
    const frequencyDiscount = FREQUENCY_DISCOUNTS[frequency as keyof typeof FREQUENCY_DISCOUNTS] || 0
    if (frequencyDiscount > 0) {
      totalPrice *= (1 - frequencyDiscount)
    }

    // 7. FRAIS FIXES (8€ par devis selon règles métier)
    const fixedFees = 8
    totalPrice += fixedFees

    // 8. ✅ FIX Bug #3: MINIMUM DE FACTURATION AVANT discount client
    const minimumBilling = clientType === 'professionnel' ? 80 : 50
    totalPrice = Math.max(totalPrice, minimumBilling)

    // 9. ✅ FIX Bug #3: DISCOUNT CLIENT EN DERNIER (après minimum)
    const clientMultiplier = CLIENT_MULTIPLIERS[clientType]
    totalPrice *= clientMultiplier

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
    const accessibilityMultiplier = calculateAccessibilityMultiplier(window.accessibility || 'hauteur_homme')
    const zoneSurcharge = calculateZoneSurcharge(window.zone || 'zone1')

    unitPrice *= accessibilityMultiplier
    unitPrice += glueCost + zoneSurcharge

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
    calculateAccessibilityMultiplier,
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
