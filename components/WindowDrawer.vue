<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 overflow-hidden z-50"
    @click="closeDrawer"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div class="pointer-events-auto w-screen max-w-lg">
          <div
            class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            @click.stop
          >
            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div class="flex items-start justify-between mb-6">
                <h2 class="text-lg font-medium text-gray-900">Ajouter une fenêtre</h2>
                <button
                  type="button"
                  class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  @click="closeDrawer"
                >
                  <span class="absolute -inset-0.5"></span>
                  <span class="sr-only">Fermer</span>
                  ✕
                </button>
              </div>

              <!-- Type de fenêtre -->
              <div class="mb-6">
                <h3 class="text-sm font-medium text-gray-900 mb-4">Type de fenêtre</h3>
                <div class="space-y-2">
                  <div 
                    v-for="window in windows"
                    :key="window.id"
                    :class="[
                      'flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                      selectedWindow?.id === window.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    ]"
                    @click="selectedWindow = window"
                  >
                    <input
                      :id="window.id"
                      type="radio"
                      :value="window.id"
                      v-model="selectedWindowId"
                      class="radio radio-primary"
                    >
                    <span class="text-2xl">{{ window.image }}</span>
                    <div class="flex-1">
                      <label :for="window.id" class="text-sm font-medium text-gray-900 cursor-pointer">
                        {{ window.name }}
                      </label>
                      <p class="text-xs text-gray-500">{{ window.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Taille -->
              <div class="mb-6">
                <h3 class="text-sm font-medium text-gray-900 mb-4">Taille approximative</h3>
                <div class="grid grid-cols-3 gap-2">
                  <div 
                    v-for="size in sizes"
                    :key="size.value"
                    :class="[
                      'flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all text-center',
                      selectedSize === size.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    ]"
                    @click="selectedSize = size.value"
                  >
                    <input
                      :id="size.value"
                      type="radio"
                      :value="size.value"
                      v-model="selectedSize"
                      class="sr-only"
                    >
                    <span class="text-lg mb-1">{{ size.icon }}</span>
                    <label :for="size.value" class="text-xs font-medium text-gray-900 cursor-pointer">
                      {{ size.label }}
                    </label>
                    <span class="text-xs text-gray-500">{{ size.dimensions }}</span>
                  </div>
                </div>
              </div>

              <!-- Nettoyage -->
              <div class="mb-6">
                <h3 class="text-sm font-medium text-gray-900 mb-4">Type de nettoyage</h3>
                <div class="space-y-2">
                  <div 
                    v-for="cleaning in cleaningTypes"
                    :key="cleaning.value"
                    :class="[
                      'flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                      selectedCleaningType === cleaning.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    ]"
                    @click="selectedCleaningType = cleaning.value"
                  >
                    <input
                      :id="cleaning.value"
                      type="radio"
                      :value="cleaning.value"
                      v-model="selectedCleaningType"
                      class="radio radio-primary"
                    >
                    <div class="flex-1">
                      <label :for="cleaning.value" class="text-sm font-medium text-gray-900 cursor-pointer">
                        {{ cleaning.label }}
                      </label>
                      <p class="text-xs text-gray-500">{{ cleaning.description }}</p>
                      <div v-if="cleaning.surcharge" class="mt-1">
                        <span :class="[
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                          cleaning.value === 'exterieur-interieur' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                        ]">
                          {{ cleaning.surcharge }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quantité et Accessibilité -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-2">Quantité</label>
                  <input
                    type="number"
                    v-model.number="quantity"
                    min="1"
                    max="50"
                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-2">Accessibilité</label>
                  <select
                    v-model="accessibility"
                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="rdc">Rez-de-chaussée</option>
                    <option value="etage">Étage</option>
                    <option value="hauteur">Grande hauteur</option>
                    <option value="nacelle">Nacelle</option>
                  </select>
                </div>
              </div>

              <!-- Prix estimé -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Prix de base + coefficient accessibilité</span>
                  <span class="text-lg font-semibold text-primary">{{ estimatedPrice }}€</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">
                  Prix final calculé selon type de client et zone
                </p>
              </div>
            </div>

            <!-- Footer buttons -->
            <div class="flex justify-between p-4 border-t border-gray-200">
              <button
                @click="closeDrawer"
                class="btn btn-outline"
              >
                Annuler
              </button>
              <button
                @click="addWindow"
                :disabled="!canAdd"
                class="btn btn-primary"
                :class="{ 'btn-disabled': !canAdd }"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WindowType, WindowSize, CleaningType, AccessibilityLevel } from '~/types/Windows.types'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'select': [window: WindowType]
}>()

// Nouvelles données simplifiées (5 types selon feedback)
const windows: WindowType[] = [
  { 
    id: 'standard', 
    name: 'Fenêtre standard', 
    image: '🪟', 
    basePrice: 8,
    description: 'Fenêtre classique, battant simple'
  },
  { 
    id: 'plein-pied', 
    name: 'Fenêtre de plein-pied', 
    image: '🚪', 
    basePrice: 8,
    description: 'Grande fenêtre jusqu\'au sol'
  },
  { 
    id: 'porte-fenetre', 
    name: 'Porte-fenêtre', 
    image: '🚪', 
    basePrice: 8,
    description: 'Porte-fenêtre à battants'
  },
  { 
    id: 'baie-vitree', 
    name: 'Baie vitrée', 
    image: '🏠', 
    basePrice: 8,
    description: 'Grande baie coulissante'
  },
  { 
    id: 'fenetre-toit', 
    name: 'Fenêtre de toit', 
    image: '🔺', 
    basePrice: 8,
    description: 'Vélux, lucarne, etc.'
  }
]

const sizes = [
  { value: 'petite', label: 'Petite', icon: '⬜', dimensions: '~0.8m²' },
  { value: 'moyenne', label: 'Moyenne', icon: '◻️', dimensions: '~1.2m²' },
  { value: 'grande', label: 'Grande', icon: '⬛', dimensions: '~1.8m²' }
]

const cleaningTypes = [
  { 
    value: 'exterieur', 
    label: 'Extérieur uniquement', 
    description: 'Nettoyage face extérieure seulement',
    surcharge: null
  },
  { 
    value: 'exterieur-interieur', 
    label: 'Extérieur + Intérieur', 
    description: 'Nettoyage des deux faces',
    surcharge: '+180%'
  }
]

// État du formulaire
const selectedWindow = ref<WindowType | null>(null)
const selectedWindowId = ref('')
const selectedSize = ref<WindowSize>('moyenne')
const selectedCleaningType = ref<CleaningType>('exterieur')
const quantity = ref(1)
const accessibility = ref<AccessibilityLevel>('rdc')

// Calcul prix estimé
const windowPricing = useWindowPricing()

const estimatedPrice = computed(() => {
  if (!selectedWindow.value) return '0'
  
  const basePrice = selectedWindow.value.basePrice
  const sizeMultiplier = selectedSize.value === 'petite' ? 0.8 : selectedSize.value === 'grande' ? 1.5 : 1
  const cleaningMultiplier = selectedCleaningType.value === 'exterieur-interieur' ? 1.8 : 1
  const accessibilityCost = windowPricing.calculateAccessibilityCost(accessibility.value)
  
  const unitPrice = (basePrice * sizeMultiplier * cleaningMultiplier) + accessibilityCost
  const totalPrice = unitPrice * quantity.value
  
  return totalPrice.toFixed(2)
})

const canAdd = computed(() => {
  return selectedWindow.value && quantity.value > 0
})

// Synchroniser la sélection
watch(selectedWindowId, (newId) => {
  selectedWindow.value = windows.find(w => w.id === newId) || null
})

const closeDrawer = () => {
  emit('update:isOpen', false)
}

const addWindow = () => {
  if (!selectedWindow.value) return
  
  // Créer l'objet fenêtre avec toutes les nouvelles propriétés
  const windowToAdd = {
    ...selectedWindow.value,
    quantity: quantity.value,
    size: selectedSize.value,
    accessibility: accessibility.value,
    cleaningType: selectedCleaningType.value,
    // Pour compatibilité avec l'ancien système
    serviceType: 'nouveau-client' as any,
    zone: 'zone1' as any
  }
  
  emit('select', windowToAdd)
  
  // Reset form
  selectedWindow.value = null
  selectedWindowId.value = ''
  selectedSize.value = 'moyenne'
  selectedCleaningType.value = 'exterieur'
  quantity.value = 1
  accessibility.value = 'rdc'
  
  closeDrawer()
}

// Reset form when drawer closes
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    selectedWindow.value = null
    selectedWindowId.value = ''
    selectedSize.value = 'moyenne'
    selectedCleaningType.value = 'exterieur'
    quantity.value = 1
    accessibility.value = 'rdc'
  }
})
</script>
