import { DIRTINESS_LEVELS } from '~/types/Windows.types'
import type { WindowSelection } from '~/types/Windows.types'

export const useWindowPricing = () => {
  const getDirtinessMultiplier = (level: number) => {
    return DIRTINESS_LEVELS[level]?.multiplier ?? 1
  }

  const calculateGlueCost = (percentage: number = 0) => {
    const MAX_GLUE_COST = 20
    return Math.round((percentage / 100) * MAX_GLUE_COST * 2) / 2
  }

  const getHeightCategory = (height: number = 1.5) => {
    if (height <= 2) return 'Ground Level'
    if (height <= 4) return 'Ladder Required'
    if (height <= 6) return 'Extension Ladder'
    return 'Special Equipment Required'
  }

  const calculateHeightCost = (height: number = 1.5) => {
    if (height <= 2) return 0
    if (height <= 4) return 10
    if (height <= 6) return 20
    return 40
  }

  const calculateTotalPrice = (window: WindowSelection) => {
    if (!window) return '0.00'

    const basePrice = window.basePrice ?? 0
    const quantity = window.quantity ?? 1
    const dirtiness = window.dirtiness ?? 0
    const gluePercentage = window.gluePercentage ?? 0
    const height = window.height ?? 1.5

    const baseWithMultiplier = basePrice * getDirtinessMultiplier(dirtiness)
    const glueCost = calculateGlueCost(gluePercentage)
    const heightCost = calculateHeightCost(height)
    const pricePerWindow = baseWithMultiplier + glueCost + heightCost

    return (pricePerWindow * quantity).toFixed(2)
  }

  return {
    getDirtinessMultiplier,
    calculateGlueCost,
    getHeightCategory,
    calculateHeightCost,
    calculateTotalPrice
  }
}
