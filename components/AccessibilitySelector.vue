<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Accessibilité par défaut</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <div 
        v-for="option in accessibilityOptions" 
        :key="option.id"
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedAccessibility === option.id
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectAccessibility(option.id)"
      >
        <!-- Badge surcoût si applicable -->
        <div
          v-if="option.multiplier > 1"
          class="absolute -top-2 -right-2 bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
        >
          +{{ Math.round((option.multiplier - 1) * 100) }}%
        </div>
        
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              :id="option.id"
              type="radio"
              :value="option.id"
              v-model="selectedAccessibility"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label :for="option.id" class="font-medium text-gray-900 cursor-pointer">
              <span v-if="option.id === 'hauteur_homme'">🏠</span>
              <span v-else>🪜</span>
              {{ option.label }}
            </label>
            <p class="text-gray-500 mt-1">
              {{ option.description }}
            </p>
            <div class="mt-2 text-xs text-gray-600">
              <div v-if="option.multiplier === 1">
                • Tarif standard
                • Sans surcoût d'accessibilité
                • Intervention simple
              </div>
              <div v-else>
                • Majoration +{{ Math.round((option.multiplier - 1) * 100) }}%
                • Équipement spécialisé
                • Intervention sécurisée
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Note informative -->
    <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-800">
            💡 <strong>Note:</strong> Nous n'utilisons pas de nacelle ou équipement suspendu (max 8m)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AccessibilityLevel } from '~/types/Windows.types'
import { useBusinessRules } from '~/composables/useBusinessRules'

const props = defineProps<{
  modelValue: AccessibilityLevel
}>()

const emit = defineEmits<{
  'update:modelValue': [value: AccessibilityLevel]
}>()

const { accessibilityOptions } = useBusinessRules()

const selectedAccessibility = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const selectAccessibility = (accessibility: AccessibilityLevel) => {
  selectedAccessibility.value = accessibility
}
</script>