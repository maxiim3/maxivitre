<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Zone géographique</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <!-- Zone 1 - Castelnau-le-Lez (Priorité) -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedZone === 'zone1' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300',
          'border-primary/30 scale-105' // Priorité pour Castelnau-le-Lez
        ]"
        @click="selectedZone = 'zone1'"
      >
        <div class="absolute -top-2 -right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
          Priorité
        </div>
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="zone1"
              type="radio"
              value="zone1"
              v-model="selectedZone"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="zone1" class="font-medium text-gray-900 cursor-pointer">
              🏙️ Zone 1 - Castelnau-le-Lez
            </label>
            <p class="text-gray-500 mt-1">
              Zone prioritaire - Déplacement OFFERT
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Tarif de base
              • Disponibilité maximale
              • Service weekend
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -left-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
          GRATUIT
        </div>
      </div>

      <!-- Zone 2 - Périphérie proche -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedZone === 'zone2' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectedZone = 'zone2'"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="zone2"
              type="radio"
              value="zone2"
              v-model="selectedZone"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="zone2" class="font-medium text-gray-900 cursor-pointer">
              🏘️ Zone 2 - Périphérie proche
            </label>
            <p class="text-gray-500 mt-1">
              Montpellier, Lattes, Pérols, Saint-Jean-de-Védas
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Déplacement <span class="font-medium text-orange-600">+10€</span>
              • Prestation normale
              • Planning étendu
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
          +10€
        </div>
      </div>

      <!-- Zone 3 - Périphérie éloignée -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedZone === 'zone3' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectedZone = 'zone3'"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="zone3"
              type="radio"
              value="zone3"
              v-model="selectedZone"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="zone3" class="font-medium text-gray-900 cursor-pointer">
              🌊 Zone 3 - Périphérie éloignée
            </label>
            <p class="text-gray-500 mt-1">
              Palavas, Carnon, La Grande-Motte, Lunel
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Déplacement <span class="font-medium text-red-600">+15€</span>
              • Prestation normale
              • Sur rendez-vous
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          +15€
        </div>
      </div>

      <!-- Hors Zone -->
      <div 
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedZone === 'hors-zone' 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectedZone = 'hors-zone'"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="hors-zone"
              type="radio"
              value="hors-zone"
              v-model="selectedZone"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="hors-zone" class="font-medium text-gray-900 cursor-pointer">
              📍 Hors zone
            </label>
            <p class="text-gray-500 mt-1">
              Autre commune non listée
            </p>
            <div class="mt-2 text-xs text-gray-600">
              • Devis personnalisé
              • Selon distance
              • Contact préalable
            </div>
          </div>
        </div>
        <div class="absolute -top-2 -right-2 bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          Devis
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GeographicalZone } from '~/types/Windows.types'

const props = defineProps<{
  zone: GeographicalZone
  frequency?: any // Keep for compatibility but unused
}>()

const emit = defineEmits<{
  'update:zone': [value: GeographicalZone]
  'update:frequency': [value: any] // Keep for compatibility but unused
}>()

const selectedZone = computed({
  get: () => props.zone,
  set: (value) => emit('update:zone', value as GeographicalZone)
})
</script>