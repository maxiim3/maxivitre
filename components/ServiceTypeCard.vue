<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Type de service</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <!-- Service Standard -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === 'standard' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectService('standard')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="standard"
              type="radio"
              value="standard"
              v-model="selectedService"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="standard" class="font-medium text-gray-900 cursor-pointer">
              🪟 Nettoyage standard
            </label>
            <p class="text-gray-500 mt-1">
              Nettoyage classique des vitres intérieures et/ou extérieures
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Tarif de base
              • Intérieur et/ou extérieur
              • Séchage sans traces
            </div>
          </div>
        </div>
      </div>

      <!-- Service Autocollants -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === 'autocollants' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectService('autocollants')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="autocollants"
              type="radio"
              value="autocollants"
              v-model="selectedService"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="autocollants" class="font-medium text-gray-900 cursor-pointer">
              🏷️ Décollement autocollants
            </label>
            <p class="text-gray-500 mt-1">
              Retrait d'autocollants, étiquettes et résidus de colle
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Majoration <span class="font-medium text-orange-600">+50%</span>
              • Produits spécialisés
              • Selon superficie
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
          +50%
        </div>
      </div>

      <!-- Service Après travaux -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === 'apres-travaux' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectService('apres-travaux')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="apres-travaux"
              type="radio"
              value="apres-travaux"
              v-model="selectedService"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="apres-travaux" class="font-medium text-gray-900 cursor-pointer">
              🏗️ Nettoyage après travaux
            </label>
            <p class="text-gray-500 mt-1">
              Nettoyage intensif après rénovation ou construction
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Majoration <span class="font-medium text-red-600">+80%</span>
              • Salissures de chantier
              • Équipement renforcé
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          +80%
        </div>
      </div>

      <!-- Service Entretien -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === 'entretien' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectService('entretien')"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="entretien"
              type="radio"
              value="entretien"
              v-model="selectedService"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="entretien" class="font-medium text-gray-900 cursor-pointer">
              🔄 Entretien régulier
            </label>
            <p class="text-gray-500 mt-1">
              Contrat d'entretien avec passages planifiés
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Remise <span class="font-medium text-green-600">-10%</span>
              • Abonnement mensuel/trimestriel
              • Vitres moins sales
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
          -10%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceType } from '~/types/Windows.types'

const props = defineProps<{
  modelValue: ServiceType
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