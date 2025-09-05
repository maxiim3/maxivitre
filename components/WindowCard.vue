<template>
  <div class="bg-white rounded-lg shadow p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <span class="text-4xl">{{ window.image }}</span>
        <div>
          <h3 class="font-medium">{{ window.name }}</h3>
          <p class="text-sm text-gray-500">Base price: ${{ window.basePrice }}</p>
        </div>
      </div>
      <button @click="$emit('remove')" class="text-red-500 hover:text-red-700">
        <TrashIcon class="h-5 w-5" />
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Column 1 -->
      <div class="space-y-4">
        <!-- Dirtiness Level -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="text-sm font-medium text-gray-700">État de saleté</label>
            <span class="text-sm text-gray-500">{{ currentDirtinessLevel.label }}</span>
          </div>
          <input
            type="range"
            v-model="selection.dirtiness"
            min="0"
            max="7"
            step="1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div class="flex justify-between text-xs text-gray-500">
            <span>Peu sale</span>
            <span>Restauration nécessaire</span>
          </div>
        </div>

        <!-- Glue Coverage -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="text-sm font-medium text-gray-700">Colle/Autocollants</label>
            <span class="text-sm text-gray-500">{{ selection.gluePercentage }}%</span>
          </div>
          <input
            type="range"
            v-model="selection.gluePercentage"
            min="0"
            max="100"
            step="5"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div class="flex justify-between text-xs text-gray-500">
            <span>Pas de colle</span>
            <span>Entièrement couvert</span>
          </div>
        </div>

        <!-- Quantity -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Quantité</label>
          <input
            type="number"
            v-model="selection.quantity"
            min="1"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Column 2 -->
      <div class="space-y-4">
        <!-- Accessibility -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="text-sm font-medium text-gray-700">Accessibilité</label>
            <span class="text-sm text-gray-500">{{ accessibilityCategory }}</span>
          </div>
          <select
            v-model="selection.accessibility"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="rdc">Rez-de-chaussée</option>
            <option value="etage">Étage (échelle)</option>
            <option value="hauteur">Grande hauteur</option>
            <option value="nacelle">Nacelle requise</option>
          </select>
        </div>

        <!-- Service Type -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Type de service</label>
          <select
            v-model="selection.serviceType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="standard">🪟 Nettoyage standard</option>
            <option value="autocollants">🏷️ Décollement autocollants</option>
            <option value="apres-travaux">🏗️ Après travaux</option>
            <option value="entretien">🔄 Entretien régulier</option>
          </select>
        </div>

        <!-- Zone -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Zone</label>
          <select
            v-model="selection.zone"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="zone1">Zone 1 - Centre</option>
            <option value="zone2">Zone 2 - Proche (+5€)</option>
            <option value="zone3">Zone 3 - Éloignée (+10€)</option>
            <option value="hors-zone">Hors zone (devis)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Options -->
    <div class="mt-6 pt-6 border-t">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Options spécifiques à cette fenêtre</h4>
      <div class="grid grid-cols-2 gap-3">
        <label class="flex items-center space-x-2 text-sm">
          <input 
            type="checkbox" 
            v-model="selection.options.cleanFrames"
            class="checkbox checkbox-primary checkbox-sm"
          >
          <span>Nettoyer cadres (+20%)</span>
        </label>
        <label class="flex items-center space-x-2 text-sm">
          <input 
            type="checkbox" 
            v-model="selection.options.antiLimescale"
            class="checkbox checkbox-primary checkbox-sm"
          >
          <span>Anti-calcaire (+15%)</span>
        </label>
        <label class="flex items-center space-x-2 text-sm">
          <input 
            type="checkbox" 
            v-model="selection.options.insideOutside"
            class="checkbox checkbox-primary checkbox-sm"
          >
          <span>Intérieur + ext. (+180%)</span>
        </label>
        <label class="flex items-center space-x-2 text-sm">
          <input 
            type="checkbox" 
            v-model="selection.options.wasteRemoval"
            class="checkbox checkbox-primary checkbox-sm"
          >
          <span>Évacuation (+25€)</span>
        </label>
      </div>
    </div>

    <div class="pt-4 border-t">
      <div class="space-y-2">
        <div class="flex justify-between text-sm text-gray-600">
          <span>Prix de base :</span>
          <span>{{ window.basePrice }}€</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Multiplicateur état :</span>
          <span>×{{ currentDirtinessLevel.multiplier }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Décollement colle :</span>
          <span>+{{ glueCost }}€</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Surcharge accessibilité :</span>
          <span>+{{ accessibilityCost }}€</span>
        </div>
        <div class="flex justify-between text-lg font-semibold mt-2 pt-2 border-t">
          <span>Total (× {{ selection.quantity }}) :</span>
          <span>{{ totalPrice }}€</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { TrashIcon } from '@heroicons/vue/24/outline'
import type { WindowSelection } from '~/types/Windows.types'
import { DIRTINESS_LEVELS } from '~/types/Windows.types'

const props = defineProps<{
  window: WindowSelection,
  clientType?: 'particulier' | 'professionnel'
}>()

const selection = reactive({
  ...props.window
})

const windowPricing = useWindowPricing()

const currentDirtinessLevel = computed(() =>
  DIRTINESS_LEVELS[selection.dirtiness]
)

const glueCost = computed(() => windowPricing.calculateGlueCost(selection.gluePercentage))
const accessibilityCategory = computed(() => windowPricing.getAccessibilityCategory(selection.accessibility || 'rdc'))
const accessibilityCost = computed(() => windowPricing.calculateAccessibilityCost(selection.accessibility || 'rdc'))
const totalPrice = computed(() => windowPricing.calculateTotalPrice(selection, props.clientType || 'particulier'))

watch(selection, () => {
  emit('update', selection)
}, { deep: true })

const emit = defineEmits<{
  remove: []
  update: [window: WindowSelection]
}>()
</script>
