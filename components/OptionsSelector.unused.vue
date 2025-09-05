<!-- 
  COMPOSANT NON UTILISÉ - INNOVATION HORS BUSINESS RULES
  
  Ce composant était une innovation pour des options additionnelles,
  mais ne fait pas partie des règles business originales.
  
  Gardé en cas de besoin futur, mais commenté pour l'instant.
  
  Fonctionnalités :
  - Nettoyage des cadres (+20%)
  - Traitement anti-calcaire (+15%)
  - Nettoyage intérieur + extérieur (+180%)
  - Évacuation déchets (forfait +25€)
-->
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Options additionnelles</h2>
    
    <div class="space-y-4">
      <!-- Option Nettoyage cadres -->
      <div class="flex items-start space-x-3 p-4 rounded-lg border border-gray-200">
        <div class="flex h-5 items-center">
          <input
            id="clean-frames"
            type="checkbox"
            v-model="selectedOptions.cleanFrames"
            class="checkbox checkbox-primary"
          >
        </div>
        <div class="flex-1 min-w-0">
          <label for="clean-frames" class="text-sm font-medium text-gray-900 cursor-pointer">
            🖼️ Nettoyage des cadres
          </label>
          <p class="text-sm text-gray-500 mt-1">
            Nettoyage complet des encadrements et montants de fenêtres
          </p>
          <div class="mt-2">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              +20% du tarif vitre
            </span>
          </div>
        </div>
      </div>

      <!-- Option Traitement anti-calcaire -->
      <div class="flex items-start space-x-3 p-4 rounded-lg border border-gray-200">
        <div class="flex h-5 items-center">
          <input
            id="anti-limescale"
            type="checkbox"
            v-model="selectedOptions.antiLimescale"
            class="checkbox checkbox-primary"
          >
        </div>
        <div class="flex-1 min-w-0">
          <label for="anti-limescale" class="text-sm font-medium text-gray-900 cursor-pointer">
            💧 Traitement anti-calcaire
          </label>
          <p class="text-sm text-gray-500 mt-1">
            Application d'un produit déperlant contre les traces de calcaire
          </p>
          <div class="mt-2">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              +15% du tarif vitre
            </span>
          </div>
        </div>
      </div>

      <!-- Option Intérieur + Extérieur -->
      <div class="flex items-start space-x-3 p-4 rounded-lg border-2 border-orange-200 bg-orange-50">
        <div class="flex h-5 items-center">
          <input
            id="inside-outside"
            type="checkbox"
            v-model="selectedOptions.insideOutside"
            class="checkbox checkbox-primary"
          >
        </div>
        <div class="flex-1 min-w-0">
          <label for="inside-outside" class="text-sm font-medium text-gray-900 cursor-pointer">
            🏠 Nettoyage intérieur + extérieur
          </label>
          <p class="text-sm text-gray-500 mt-1">
            Nettoyage complet des deux faces de la vitre (note: "j'ai vraiment pas envie de le faire lol")
          </p>
          <div class="mt-2">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              Majoration +180%
            </span>
          </div>
        </div>
      </div>

      <!-- Option Évacuation déchets -->
      <div class="flex items-start space-x-3 p-4 rounded-lg border border-gray-200">
        <div class="flex h-5 items-center">
          <input
            id="waste-removal"
            type="checkbox"
            v-model="selectedOptions.wasteRemoval"
            class="checkbox checkbox-primary"
          >
        </div>
        <div class="flex-1 min-w-0">
          <label for="waste-removal" class="text-sm font-medium text-gray-900 cursor-pointer">
            🗑️ Évacuation des déchets
          </label>
          <p class="text-sm text-gray-500 mt-1">
            Enlèvement et évacuation des eaux usées et résidus de nettoyage
          </p>
          <div class="mt-2">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Forfait +25€
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Options Summary -->
    <div v-if="hasSelectedOptions" class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-sm font-medium text-gray-900 mb-2">Options sélectionnées :</h3>
      <ul class="space-y-1 text-sm text-gray-600">
        <li v-if="selectedOptions.cleanFrames" class="flex items-center">
          <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Nettoyage des cadres (+20%)
        </li>
        <li v-if="selectedOptions.antiLimescale" class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Traitement anti-calcaire (+15%)
        </li>
        <li v-if="selectedOptions.insideOutside" class="flex items-center">
          <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          Intérieur + extérieur (×1.8)
        </li>
        <li v-if="selectedOptions.wasteRemoval" class="flex items-center">
          <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          Évacuation déchets (+25€)
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceOptions } from '~/types/Windows.types'

const props = defineProps<{
  modelValue: ServiceOptions
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ServiceOptions]
}>()

const selectedOptions = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const hasSelectedOptions = computed(() => {
  return Object.values(selectedOptions.value).some(option => option === true)
})
</script>