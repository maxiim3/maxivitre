<template>
  <!-- Desktop: Sidebar à droite -->
  <div class="hidden lg:block fixed top-1/2 right-4 transform -translate-y-1/2 z-40">
    <div class="bg-white rounded-lg shadow-xl border border-gray-200 w-80 max-h-96 overflow-hidden">
      <div class="p-4 border-b border-gray-200 bg-primary/5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">🛒 Votre devis</h3>
          <span class="text-sm text-gray-500">{{ totalWindowCount }} fenêtre{{ totalWindowCount > 1 ? 's' : '' }}</span>
        </div>
      </div>
      
      <div v-if="totalWindowCount === 0" class="p-6 text-center text-gray-500">
        <div class="text-4xl mb-2">🪟</div>
        <p class="text-sm">Aucune fenêtre ajoutée</p>
      </div>
      
      <div v-else class="max-h-48 overflow-y-auto">
        <div class="divide-y divide-gray-100">
          <!-- Affichage individualisé de chaque fenêtre -->
          <div 
            v-for="(window, index) in windows" 
            :key="index"
            class="p-3 hover:bg-gray-50 group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3 flex-1 min-w-0">
                <span class="text-lg">{{ window.image }}</span>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ window.name }}</p>
                  <p class="text-xs text-gray-500">
                    {{ getSizeLabel(window.size) }} • 
                    {{ getCleaningTypeLabel(window.cleaningType) }} • 
                    Qty: {{ window.quantity }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-semibold text-primary">
                  {{ calculatePrice(window) }}€
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="totalWindowCount > 0" class="p-4 border-t border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-600">Sous-total</span>
          <span class="text-sm font-medium">{{ subtotal }}€</span>
        </div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-600">Remise {{ clientType === 'professionnel' ? 'pro' : 'particulier' }}</span>
          <span class="text-sm font-medium text-green-600">
            {{ clientType === 'professionnel' ? '-15%' : '0%' }}
          </span>
        </div>
        <div class="flex justify-between items-center pt-2 border-t border-gray-200">
          <span class="text-base font-semibold text-gray-900">Total</span>
          <span class="text-lg font-bold text-primary">{{ grandTotal }}€</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile: Footer fixe en bas -->
  <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
    <div class="p-4">
      <div v-if="totalWindowCount === 0" class="text-center text-gray-500">
        <p class="text-sm">Aucune fenêtre ajoutée au devis</p>
      </div>
      
      <div v-else>
        <!-- Summary line -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">{{ totalWindowCount }} fenêtre{{ totalWindowCount > 1 ? 's' : '' }}</span>
            <button 
              @click="showDetails = !showDetails"
              class="text-xs text-primary hover:underline"
            >
              {{ showDetails ? 'Masquer' : 'Détails' }}
            </button>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-primary">{{ grandTotal }}€</div>
          </div>
        </div>

        <!-- Détails expandable -->
        <div v-show="showDetails" class="space-y-2 mb-3 max-h-32 overflow-y-auto">
          <div 
            v-for="(window, index) in windows" 
            :key="index"
            class="flex items-center justify-between p-2 bg-gray-50 rounded text-xs"
          >
            <div class="flex items-center space-x-2 flex-1 min-w-0">
              <span>{{ window.image }}</span>
              <span class="truncate">{{ window.name }}</span>
              <span class="text-gray-500">×{{ window.quantity }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium">{{ calculatePrice(window) }}€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WindowSelection, ClientType } from '~/types/Windows.types'

const props = defineProps<{
  windows: WindowSelection[]
  clientType: ClientType
}>()

defineEmits<{
  // Pas d'émissions - cart en lecture seule
}>()

const showDetails = ref(false)

const windowPricing = useWindowPricing()

const calculatePrice = (window: WindowSelection) => {
  return windowPricing.calculateTotalPrice(window, props.clientType)
}

const subtotal = computed(() => {
  const total = props.windows.reduce((sum, window) => {
    return sum + parseFloat(calculatePrice(window))
  }, 0)
  return total.toFixed(2)
})

const grandTotal = computed(() => {
  return windowPricing.calculateQuoteTotal(props.windows, props.clientType)
})

// Nombre total de fenêtres (en comptant les quantités)
const totalWindowCount = computed(() => {
  return props.windows.reduce((sum, window) => sum + (window.quantity || 1), 0)
})

const getSizeLabel = (size: string) => {
  const labels: Record<string, string> = {
    petite: 'Petite',
    moyenne: 'Moyenne', 
    grande: 'Grande'
  }
  return labels[size] || 'Moyenne'
}

const getCleaningTypeLabel = (cleaningType: string) => {
  const labels: Record<string, string> = {
    exterieur: 'Ext.',
    'exterieur-interieur': 'Ext+Int'
  }
  return labels[cleaningType] || 'Ext.'
}
</script>