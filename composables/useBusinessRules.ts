/**
 * Composable pour l'accès centralisé aux règles métier
 *
 * Fournit un accès réactif et optimisé à business-rules.config.ts
 * avec computed properties pour l'UI et fonctions helper
 */

import { readonly, computed } from 'vue'
import businessRulesConfig from '~/business-rules.config'
import type { GeographicalZone, ClientType, ServiceType, AccessibilityLevel } from '~/types/Windows.types'

export const useBusinessRules = () => {
  // Configuration brute (read-only)
  const businessRules = readonly(businessRulesConfig)

  // Options de zones avec données complètes pour UI
  const zoneOptions = computed(() =>
    (Object.entries(businessRules.zoneSurcharges) as [GeographicalZone, number][])
      .filter(([zoneId]) => zoneId !== 'hors-zone') // Exclure hors-zone de l'UI standard
      .map(([zoneId, supplement]) => ({
        id: zoneId,
        supplement,
        areas: businessRules.serviceAreas[zoneId as keyof typeof businessRules.serviceAreas] || [],
        label: getZoneDisplayLabel(zoneId, supplement),
        description: getZoneDescription(zoneId)
      }))
  )

  // Informations de remises pour affichage
  const discountInfo = computed(() => ({
    newClient: {
      rate: businessRules.discounts.newClient,
      percentage: Math.round(businessRules.discounts.newClient * 100),
      label: 'Nouveau client'
    },
    loyaltyProfessional: {
      rate: businessRules.discounts.loyaltyProfessional,
      percentage: Math.round(businessRules.discounts.loyaltyProfessional * 100),
      periodMonths: businessRules.discounts.loyaltyDelayMonths.professionnel,
      label: 'Entretien récent'
    },
    loyaltyIndividual: {
      rate: businessRules.discounts.loyaltyIndividual,
      percentage: Math.round(businessRules.discounts.loyaltyIndividual * 100),
      periodMonths: businessRules.discounts.loyaltyDelayMonths.particulier,
      label: 'Entretien récent'
    }
  }))

  // Options d'accessibilité avec coûts (pour UI)
  const accessibilityOptions = computed(() =>
    (Object.entries(businessRules.accessibilityCosts) as [AccessibilityLevel, number][])
      .filter(([level]) => level === 'rdc' || level === 'etage') // Seuls rdc et etage sont proposés
      .map(([level, cost]) => ({
        id: level,
        cost,
        label: getAccessibilityLabel(level),
        description: getAccessibilityDescription(level),
        surcharge: cost > 0 ? `+${cost}€` : null
      }))
  )

  // Types de services avec remises conditionnelles
  const getServiceOptions = (clientType: ClientType) => {
    const options = [
      {
        id: 'nouveau-client' as ServiceType,
        label: 'Nouveau client',
        discount: discountInfo.value.newClient,
        description: `Offre découverte -${discountInfo.value.newClient.percentage}%`,
        priority: 1
      },
      {
        id: 'entretien-recent' as ServiceType,
        label: 'Entretien récent',
        discount: clientType === 'professionnel'
          ? discountInfo.value.loyaltyProfessional
          : discountInfo.value.loyaltyIndividual,
        description: `Moins de ${getLoyaltyPeriod(clientType)} mois depuis la dernière intervention`,
        priority: 2
      },
      {
        id: 'entretien-standard' as ServiceType,
        label: 'Entretien standard',
        discount: { rate: 0, percentage: 0, label: '' },
        description: 'Tarif normal',
        priority: 3
      }
    ]

    return options.sort((a, b) => a.priority - b.priority)
  }

  // ===========================================
  // FONCTIONS HELPER POUR LABELS ET DESCRIPTIONS
  // ===========================================

  function getZoneDisplayLabel(zoneId: GeographicalZone, supplement: number): string {
    const zoneNames: Record<GeographicalZone, string> = {
      zone1: 'Zone 1',
      zone2: 'Zone 2',
      zone3: 'Zone 3',
      'hors-zone': 'Hors zone'
    }

    const name = zoneNames[zoneId] || zoneId
    return supplement > 0 ? `${name} (+${supplement}€)` : `${name} (GRATUIT)`
  }

  function getZoneDescription(zoneId: GeographicalZone): string {
    const areas = businessRules.serviceAreas[zoneId as keyof typeof businessRules.serviceAreas] || []
    return areas.join(', ')
  }

  function getAccessibilityLabel(level: AccessibilityLevel): string {
    const labels: Record<AccessibilityLevel, string> = {
      rdc: 'Rez-de-chaussée',
      etage: 'Étage (échelle)',
      hauteur: 'Grande hauteur',
      nacelle: 'Nacelle requise'
    }
    return labels[level] || level
  }

  function getAccessibilityDescription(level: AccessibilityLevel): string {
    const descriptions: Record<AccessibilityLevel, string> = {
      rdc: 'Accessible depuis le sol (< 3m)',
      etage: 'Nécessite une échelle (3-8m)',
      hauteur: 'Grande hauteur (> 8m)',
      nacelle: 'Nécessite nacelle élévatrice'
    }
    return descriptions[level] || ''
  }

  function getLoyaltyPeriod(clientType: ClientType): number {
    return businessRules.discounts.loyaltyDelayMonths[clientType]
  }

  // ===========================================
  // FONCTIONS DE CALCUL ET VALIDATION
  // ===========================================

  function getServiceDiscount(serviceType: ServiceType, clientType: ClientType): number {
    switch (serviceType) {
      case 'nouveau-client':
        return businessRules.discounts.newClient
      case 'entretien-recent':
        return clientType === 'professionnel'
          ? businessRules.discounts.loyaltyProfessional
          : businessRules.discounts.loyaltyIndividual
      case 'entretien-standard':
      default:
        return 0
    }
  }

  function getZoneLabel(zone: GeographicalZone): string {
    const option = zoneOptions.value.find(z => z.id === zone)
    return option ? option.label : zone
  }

  function getZoneSupplement(zone: GeographicalZone): number {
    return businessRules.zoneSurcharges[zone] ?? 0
  }

  return {
    // Configuration brute
    businessRules,

    // Options computed pour UI
    zoneOptions,
    discountInfo,
    accessibilityOptions,

    // Fonctions dynamiques
    getServiceOptions,

    // Fonctions helper
    getServiceDiscount,
    getZoneLabel,
    getZoneSupplement,
    getLoyaltyPeriod,

    // Fonctions de formatage
    getZoneDisplayLabel,
    getAccessibilityLabel,
    getAccessibilityDescription
  }
}
