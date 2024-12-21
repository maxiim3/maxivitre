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

    <div class="space-y-6">
      <!-- Dirtiness Level -->
      <div class="space-y-2">
        <div class="flex justify-between">
          <label class="text-sm font-medium text-gray-700">Condition</label>
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
          <span>A Little Dusty</span>
          <span>Needs Restoration</span>
        </div>
      </div>

      <!-- Glue Coverage -->
      <div class="space-y-2">
        <div class="flex justify-between">
          <label class="text-sm font-medium text-gray-700">Glue/Sticker Coverage</label>
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
          <span>No Glue</span>
          <span>Fully Covered</span>
        </div>
      </div>

      <!-- Height -->
      <div class="space-y-2">
        <div class="flex justify-between">
          <label class="text-sm font-medium text-gray-700">Window Height (meters)</label>
          <span class="text-sm text-gray-500">{{ heightCategory }}</span>
        </div>
        <input
          type="number"
          v-model="selection.height"
          min="0"
          step="0.5"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Quantity -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          v-model="selection.quantity"
          min="1"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="pt-4 border-t">
      <div class="space-y-2">
        <div class="flex justify-between text-sm text-gray-600">
          <span>Base Price:</span>
          <span>${{ window.basePrice }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Condition Multiplier:</span>
          <span>×{{ currentDirtinessLevel.multiplier }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Glue Removal:</span>
          <span>+${{ glueCost }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>Height Surcharge:</span>
          <span>+${{ heightCost }}</span>
        </div>
        <div class="flex justify-between text-lg font-semibold mt-2 pt-2 border-t">
          <span>Total (× {{ selection.quantity }}):</span>
          <span>${{ totalPrice }}</span>
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
  window: WindowSelection
}>()

const selection = reactive({
  ...props.window
})

const windowPricing = useWindowPricing()

const currentDirtinessLevel = computed(() =>
  DIRTINESS_LEVELS[selection.dirtiness]
)

const glueCost = computed(() => windowPricing.calculateGlueCost(selection.gluePercentage))
const heightCategory = computed(() => windowPricing.getHeightCategory(selection.height))
const heightCost = computed(() => windowPricing.calculateHeightCost(selection.height))
const totalPrice = computed(() => windowPricing.calculateTotalPrice(selection))

watch(selection, () => {
  emit('update', selection)
}, { deep: true })

const emit = defineEmits<{
  remove: []
  update: [window: WindowSelection]
}>()
</script>
