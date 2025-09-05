<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Type de service</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      <!-- Nouveau Client -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === 'nouveau-client' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectService('nouveau-client')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="nouveau-client"
              type="radio"
              value="nouveau-client"
              v-model="selectedService"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="nouveau-client" class="font-medium text-gray-900 cursor-pointer">
              🆕 Je suis nouveau client
            </label>
            <p class="text-gray-500 mt-1">
              Première intervention ou client non régulier
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Tarif de base
              • Nettoyage complet
              • Évaluation des besoins
            </div>
          </div>
        </div>
      </div>

      <!-- Entretien Standard -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === 'entretien-standard' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectService('entretien-standard')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="entretien-standard"
              type="radio"
              value="entretien-standard"
              v-model="selectedService"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="entretien-standard" class="font-medium text-gray-900 cursor-pointer">
              🔄 Entretien standard
            </label>
            <p class="text-gray-500 mt-1">
              Client habituel sans contrat récent
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Remise <span class="font-medium text-green-600">-10%</span>
              • Client connu
              • Nettoyage régulier
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
          -10%
        </div>
      </div>

      <!-- Entretien Récent -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === 'entretien-recent' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectService('entretien-recent')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="entretien-recent"
              type="radio"
              value="entretien-recent"
              v-model="selectedService"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="entretien-recent" class="font-medium text-gray-900 cursor-pointer">
              ⚡ Entretien de moins de {{ clientType === 'professionnel' ? '2 mois' : '6 mois' }}
            </label>
            <p class="text-gray-500 mt-1">
              Dernière intervention récente, vitres peu sales
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Remise <span class="font-medium text-blue-600">-15%</span>
              • Intervention récente
              • Nettoyage d'entretien
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
          -15%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceType, ClientType } from '~/types/Windows.types'

const props = defineProps<{
  modelValue: ServiceType
  clientType: ClientType
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ServiceType]
}>()

const selectedService = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const selectService = (type: ServiceType) => {
  selectedService.value = type
}
</script>