<template>
  <fieldset class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <legend class="text-lg font-semibold text-gray-900 mb-4">Zone géographique</legend>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" role="radiogroup" aria-label="Sélection de la zone géographique">
      
      <div
        v-for="option in zoneOptions"
        :key="option.id"
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedZone === option.id
            ? 'border-primary bg-primary/5'
            : 'border-gray-200 hover:border-gray-300'
        ]"
        @click="selectedZone = option.id"
      >
        <!-- Badge prix neutre -->
        <div
          v-if="option.supplement === 0"
          class="absolute -top-2 -right-2 bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
        >
          Inclus
        </div>
        <div
          v-else
          class="absolute -top-2 -right-2 bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
        >
          +{{ option.supplement }}€
        </div>

        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              :id="option.id"
              type="radio"
              :value="option.id"
              v-model="selectedZone"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label :for="option.id" class="font-medium text-gray-900 cursor-pointer">
              <span v-if="option.id === 'zone1'" aria-hidden="true">🏠</span>
              <span v-else-if="option.id === 'zone2'" aria-hidden="true">🏘️</span>
              <span v-else aria-hidden="true">🌄</span>
              {{ option.label }}
            </label>
            <p class="text-gray-500 mt-1">
              {{ option.description }}
            </p>
            <div class="mt-2 text-xs text-gray-600">
              <div v-if="option.supplement === 0">
                • Tarif de base
                • Disponibilité maximale
                • Service weekend
              </div>
              <div v-else>
                • Supplément déplacement +{{ option.supplement }}€
                • Prestation normale
                • Planning étendu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import type { GeographicalZone } from '~/types/Windows.types'
import { useBusinessRules } from '~/composables/useBusinessRules'

const props = defineProps<{
  zone: GeographicalZone
}>()

const emit = defineEmits<{
  'update:zone': [value: GeographicalZone]
}>()

const { zoneOptions } = useBusinessRules()

const selectedZone = computed({
  get: () => props.zone,
  set: (value) => emit('update:zone', value as GeographicalZone)
})
</script>