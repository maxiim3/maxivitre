/**
 * Composable pour l'accès centralisé aux règles métier
 * 
 * Fournit un accès réactif et optimisé à business-rules.config.ts
 * avec computed properties pour l'UI et fonctions helper
 */

import businessRulesConfig from '~/business-rules.config'
import type { GeographicalZone, ClientType, ServiceType, AccessibilityLevel } from '~/types/Windows.types'

export const useBusinessRules = () => {
  // Configuration brute (read-only)
  const businessRules = readonly(businessRulesConfig)

  // Options de zones avec données complètes pour UI
  const zoneOptions = computed(() => 
    Object.entries(businessRules.zones).map(([zoneId, supplement]) => ({
      id: zoneId as GeographicalZone,
      supplement,
      areas: businessRules.serviceAreas[zoneId as keyof typeof businessRules.serviceAreas] || [],
      label: getZoneDisplayLabel(zoneId, supplement),
      description: getZoneDescription(zoneId, supplement)
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

  // Options d'accessibilité avec multipliers
  const accessibilityOptions = computed(() =>
    Object.entries(businessRules.accessibility).map(([level, multiplier]) => ({
      id: level as AccessibilityLevel,
      multiplier,
      label: getAccessibilityLabel(level, multiplier),
      description: getAccessibilityDescription(level, multiplier)
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

  // Fonctions helper pour labels et descriptions
  function getZoneDisplayLabel(zoneId: string, supplement: number): string {
    const zoneLabels = {
      zone1: 'Zone 1',
      zone2: 'Zone 2', 
      zone3: 'Zone 3'
    }
    
    const baseLabel = zoneLabels[zoneId as keyof typeof zoneLabels] || zoneId
    return supplement > 0 ? `${baseLabel} (+${supplement}€)` : `${baseLabel} (GRATUIT)`
  }

  function getZoneDescription(zoneId: string, supplement: number): string {
    const areas = businessRules.serviceAreas[zoneId as keyof typeof businessRules.serviceAreas] || []
    return areas.join(', ')
  }

  function getAccessibilityLabel(level: string, multiplier: number): string {
    const labels = {
      'hauteur_homme': 'Rez-de-chaussée',
      'echelle': 'Étage (échelle)'
    }
    
    const baseLabel = labels[level as keyof typeof labels] || level
    return multiplier > 1 ? `${baseLabel} (+${Math.round((multiplier - 1) * 100)}%)` : baseLabel
  }

  function getAccessibilityDescription(level: string, multiplier: number): string {
    const descriptions = {
      'hauteur_homme': 'Accessible depuis le sol (< 3m)',
      'echelle': 'Nécessite une échelle (3-8m)'
    }
    
    return descriptions[level as keyof typeof descriptions] || ''
  }

  function getLoyaltyPeriod(clientType: ClientType): number {
    return businessRules.discounts.loyaltyDelayMonths[clientType]
  }

  // Fonctions de calcul et validation
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
    return businessRules.zones[zone] || 0
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
    getAccessibilityLabel
  }
}