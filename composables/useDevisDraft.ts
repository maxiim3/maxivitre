import type { WindowSelection, ClientType, ServiceType, GeographicalZone, FrequencyType, ServiceOptions, AccessibilityLevel } from '~/types/Windows.types'

// Migration des anciennes valeurs d'accessibilité vers le nouveau système
const migrateAccessibility = (value: string): AccessibilityLevel => {
  const mapping: Record<string, AccessibilityLevel> = {
    'rdc': 'hauteur_homme',
    'etage': 'echelle',
    'hauteur': 'echelle',
    'nacelle': 'echelle'
  }
  return (mapping[value] as AccessibilityLevel) || 'hauteur_homme'
}

interface DevisDraft {
  id: string
  timestamp: number
  clientType: ClientType
  globalServiceType: ServiceType
  globalZone: GeographicalZone
  globalFrequency: FrequencyType
  globalOptions: ServiceOptions
  selectedWindows: WindowSelection[]
  customerEmail: string
  currentStep: number
}

export const useDevisDraft = () => {
  const DRAFT_KEY = 'maxivitre-devis-draft'
  const DRAFTS_LIST_KEY = 'maxivitre-devis-drafts-list'

  // Save current devis as draft
  const saveDraft = (draft: Omit<DevisDraft, 'id' | 'timestamp'>) => {
    if (process.client) {
      const id = Date.now().toString()
      const completeDraft: DevisDraft = {
        ...draft,
        id,
        timestamp: Date.now()
      }
      
      // Save current draft
      localStorage.setItem(DRAFT_KEY, JSON.stringify(completeDraft))
      
      // Add to drafts list
      const existingDrafts = getDraftsList()
      const updatedDrafts = [completeDraft, ...existingDrafts.filter(d => d.id !== id)]
      localStorage.setItem(DRAFTS_LIST_KEY, JSON.stringify(updatedDrafts.slice(0, 10))) // Keep only 10 most recent
      
      return id
    }
    return null
  }

  // Load current draft
  const loadDraft = (): DevisDraft | null => {
    if (process.client) {
      const stored = localStorage.getItem(DRAFT_KEY)
      if (!stored) return null

      const draft: DevisDraft = JSON.parse(stored)

      // Migration: Convertir les anciennes valeurs d'accessibilité
      if (draft.selectedWindows && draft.selectedWindows.length > 0) {
        draft.selectedWindows = draft.selectedWindows.map(window => ({
          ...window,
          accessibility: migrateAccessibility(window.accessibility)
        }))
      }

      return draft
    }
    return null
  }

  // Get list of all drafts
  const getDraftsList = (): DevisDraft[] => {
    if (process.client) {
      const stored = localStorage.getItem(DRAFTS_LIST_KEY)
      return stored ? JSON.parse(stored) : []
    }
    return []
  }

  // Load specific draft by ID
  const loadDraftById = (id: string): DevisDraft | null => {
    const drafts = getDraftsList()
    const draft = drafts.find(draft => draft.id === id) || null

    // Migration: Convertir les anciennes valeurs d'accessibilité
    if (draft && draft.selectedWindows && draft.selectedWindows.length > 0) {
      draft.selectedWindows = draft.selectedWindows.map(window => ({
        ...window,
        accessibility: migrateAccessibility(window.accessibility)
      }))
    }

    return draft
  }

  // Delete draft
  const deleteDraft = (id: string) => {
    if (process.client) {
      const drafts = getDraftsList()
      const updatedDrafts = drafts.filter(draft => draft.id !== id)
      localStorage.setItem(DRAFTS_LIST_KEY, JSON.stringify(updatedDrafts))
      
      // If deleting current draft, clear it
      const currentDraft = loadDraft()
      if (currentDraft?.id === id) {
        localStorage.removeItem(DRAFT_KEY)
      }
    }
  }

  // Clear current draft
  const clearDraft = () => {
    if (process.client) {
      localStorage.removeItem(DRAFT_KEY)
    }
  }

  // Auto-save functionality
  const setupAutoSave = (
    getCurrentState: () => Omit<DevisDraft, 'id' | 'timestamp'>,
    intervalMs: number = 30000 // 30 seconds
  ) => {
    if (process.client) {
      const interval = setInterval(() => {
        const currentState = getCurrentState()
        
        // Only save if there's meaningful content
        if (currentState.selectedWindows.length > 0 || currentState.currentStep > 0) {
          saveDraft(currentState)
        }
      }, intervalMs)

      // Cleanup function
      return () => clearInterval(interval)
    }
    return () => {}
  }

  // Format draft for display
  const formatDraftSummary = (draft: DevisDraft) => {
    const windowsCount = draft.selectedWindows.length
    const clientTypeLabel = draft.clientType === 'professionnel' ? 'Pro' : 'Particulier'
    const date = new Date(draft.timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    return {
      title: `${windowsCount} fenêtre${windowsCount > 1 ? 's' : ''} - ${clientTypeLabel}`,
      subtitle: `Sauvé le ${date}`,
      step: `Étape ${draft.currentStep + 1}/5`
    }
  }

  return {
    saveDraft,
    loadDraft,
    getDraftsList,
    loadDraftById,
    deleteDraft,
    clearDraft,
    setupAutoSave,
    formatDraftSummary
  }
}