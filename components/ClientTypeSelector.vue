<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Type de client</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Particulier -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedType === 'particulier' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectClientType('particulier')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="particulier"
              type="radio"
              value="particulier"
              v-model="selectedType"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="particulier" class="font-medium text-gray-900 cursor-pointer">
              Particulier
            </label>
            <p class="text-gray-500">
              Tarifs standards pour les particuliers
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Minimum de facturation : <span class="font-medium">50€</span>
              • Paiement direct
              • Intervention ponctuelle ou récurrente
            </div>
          </div>
        </div>
      </div>

      <!-- Professionnel -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedType === 'professionnel' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectClientType('professionnel')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="professionnel"
              type="radio"
              value="professionnel"
              v-model="selectedType"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="professionnel" class="font-medium text-gray-900 cursor-pointer">
              Professionnel
            </label>
            <p class="text-gray-500">
              Tarifs préférentiels pour les entreprises
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Remise de <span class="font-medium text-green-600">-15%</span>
              • Minimum de facturation : <span class="font-medium">80€</span>
              • Facturation avec conditions de paiement
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
          -15%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ClientType } from '~/types/Windows.types'

const props = defineProps<{
  modelValue: ClientType
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ClientType]
}>()

const selectedType = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const selectClientType = (type: ClientType) => {
  selectedType.value = type
}
</script>