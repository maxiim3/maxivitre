/**
 * Composable de calcul des tarifs pour le système de devis
 *
 * Utilise les règles métier centralisées depuis business-rules.config.ts
 */

import businessRules from '~/business-rules.config'
import type { WindowSelection, ClientType, WindowSize, CleaningType, AccessibilityLevel, GeographicalZone, ServiceType } from '~/types/Windows.types'

export const useWindowPricing = () => {
  // ===========================================
  // FONCTIONS DE CALCUL DES COÛTS
  // ===========================================

  /**
   * Calcule le coût d'accessibilité
   */
  const calculateAccessibilityCost = (accessibility: AccessibilityLevel): number => {
    return businessRules.accessibilityCosts[accessibility] ?? 0
  }

  /**
   * Calcule le multiplicateur de service selon le type et le client
   */
  const calculateServiceMultiplier = (serviceType: ServiceType, clientType: ClientType = 'particulier'): number => {
    const multiplier = businessRules.serviceMultipliers[serviceType]

    // Cas spécial entretien-recent : différent selon clientType
    if (serviceType === 'entretien-recent' && typeof multiplier === 'object') {
      return multiplier[clientType]
    }

    return typeof multiplier === 'number' ? multiplier : 1
  }

  /**
   * Calcule le supplément de zone
   */
  const calculateZoneSurcharge = (zone: GeographicalZone): number => {
    return businessRules.zoneSurcharges[zone] ?? 0
  }

  /**
   * Calcule le multiplicateur de nettoyage
   */
  const calculateCleaningMultiplier = (cleaningType: CleaningType): number => {
    return businessRules.cleaningTypeMultipliers[cleaningType] ?? 1
  }

  // ===========================================
  // CALCUL DE PRIX PRINCIPAL
  // ===========================================

  /**
   * Calcule le prix total pour une fenêtre (SANS frais fixes)
   * Les frais fixes sont appliqués une seule fois dans calculateQuoteTotal
   */
  const calculateTotalPrice = (window: WindowSelection, clientType: ClientType = 'particulier'): string => {
    if (!window) return '0.00'

    const quantity = window.quantity ?? 1

    // Surface selon la taille de fenêtre
    const size: WindowSize = window.size ?? 'moyenne'
    const surfaceArea = businessRules.windowSizeAreas[size] ?? 1.2

    // Prix de base = prix/m² × surface
    const basePricePerM2 = businessRules.basePricePerSquareMeter
    const windowBasePrice = basePricePerM2 * surfaceArea

    // Multiplicateurs
    const cleaningType: CleaningType = window.cleaningType ?? 'exterieur'
    const cleaningMultiplier = calculateCleaningMultiplier(cleaningType)

    const serviceType: ServiceType = window.serviceType ?? 'nouveau-client'
    const serviceMultiplier = calculateServiceMultiplier(serviceType, clientType)

    // Coût accessibilité (appliqué par fenêtre)
    const accessibility: AccessibilityLevel = window.accessibility ?? 'rdc'
    const accessibilityCost = calculateAccessibilityCost(accessibility)

    // Calcul prix unitaire
    let unitPrice = windowBasePrice
    unitPrice *= serviceMultiplier     // Type de service (nouveau/entretien)
    unitPrice *= cleaningMultiplier    // Extérieur vs Ext+Int
    unitPrice += accessibilityCost     // Coût accessibilité (par fenêtre)
    // Note: zoneSurcharge est appliqué une seule fois par devis dans calculateQuoteTotal()

    // Prix total pour cette fenêtre (quantité)
    const totalPrice = unitPrice * quantity

    return totalPrice.toFixed(2)
  }

  /**
   * Calcule le total du devis avec frais fixes, zone et minimum de facturation
   */
  const calculateQuoteTotal = (windows: WindowSelection[], clientType: ClientType = 'particulier'): string => {
    if (!windows || windows.length === 0) {
      return '0.00'
    }

    // Somme des prix de toutes les fenêtres (sans frais fixes ni zone)
    let total = windows.reduce((sum, window) => {
      return sum + parseFloat(calculateTotalPrice(window, clientType))
    }, 0)

    // Frais fixes appliqués UNE SEULE FOIS par devis
    total += businessRules.fixedFees

    // Application du minimum de facturation AVANT les suppléments de zone
    const minimumBilling = businessRules.minimumBilling[clientType]
    total = Math.max(total, minimumBilling)

    // Supplément zone appliqué APRÈS le minimum (frais de déplacement toujours facturés)
    const zone: GeographicalZone = windows[0]?.zone ?? 'zone1'
    total += businessRules.zoneSurcharges[zone] ?? 0

    return total.toFixed(2)
  }

  // ===========================================
  // FONCTIONS DE LABELS
  // ===========================================

  const getAccessibilityCategory = (accessibility: AccessibilityLevel): string => {
    const labels: Record<AccessibilityLevel, string> = {
      rdc: 'Rez-de-chaussée',
      etage: 'Étage (échelle)',
      hauteur: 'Grande hauteur',
      nacelle: 'Nacelle requise'
    }
    return labels[accessibility] ?? 'Rez-de-chaussée'
  }

  const getFrequencyLabel = (frequency: string): string => {
    const labels: Record<string, string> = {
      ponctuel: 'Intervention ponctuelle',
      mensuel: 'Mensuel (-10%)',
      trimestriel: 'Trimestriel (-5%)',
      semestriel: 'Semestriel (-3%)'
    }
    return labels[frequency] ?? 'Intervention ponctuelle'
  }

  const getZoneLabel = (zone: GeographicalZone): string => {
    const surcharge = businessRules.zoneSurcharges[zone]
    const labels: Record<GeographicalZone, string> = {
      zone1: 'Castelnau-le-Lez (priorité)',
      zone2: `Périphérie proche (+${surcharge}€)`,
      zone3: `Périphérie éloignée (+${surcharge}€)`,
      'hors-zone': 'Hors zone (sur devis)'
    }
    return labels[zone] ?? 'Castelnau-le-Lez'
  }

  const getSizeLabel = (size: WindowSize): string => {
    const area = businessRules.windowSizeAreas[size]
    const labels: Record<WindowSize, string> = {
      petite: `Petite (~${area}m²)`,
      moyenne: `Moyenne (~${area}m²)`,
      grande: `Grande (~${area}m²)`
    }
    return labels[size] ?? 'Moyenne'
  }

  const getCleaningTypeLabel = (cleaningType: CleaningType): string => {
    const multiplier = businessRules.cleaningTypeMultipliers[cleaningType]
    const percentage = Math.round((multiplier - 1) * 100)
    const labels: Record<CleaningType, string> = {
      exterieur: 'Extérieur uniquement',
      'exterieur-interieur': `Extérieur + Intérieur (+${percentage}%)`
    }
    return labels[cleaningType] ?? 'Extérieur uniquement'
  }

  // ===========================================
  // EXPORT
  // ===========================================

  return {
    // Fonctions de calcul
    calculateAccessibilityCost,
    calculateServiceMultiplier,
    calculateZoneSurcharge,
    calculateCleaningMultiplier,
    calculateTotalPrice,
    calculateQuoteTotal,

    // Fonctions de labelling
    getAccessibilityCategory,
    getFrequencyLabel,
    getZoneLabel,
    getSizeLabel,
    getCleaningTypeLabel
  }
}
