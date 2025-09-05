<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Zone géographique</h2>
    <div class="space-y-4">
      
      <!-- Zone Selection -->
      <div>
        <label for="zone-select" class="block text-sm font-medium text-gray-700 mb-2">
          Sélectionnez votre zone d'intervention
        </label>
        <select
          id="zone-select"
          v-model="selectedZone"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="">-- Choisir une zone --</option>
          <optgroup label="Montpellier Centre (tarif de base)">
            <option value="zone1" data-communes="Montpellier Centre, Ecusson, Antigone, Comédie">
              Zone 1 - Montpellier Centre
            </option>
          </optgroup>
          <optgroup label="Périphérie proche (+5€)">
            <option value="zone2" data-communes="Castelnau-le-Lez, Lattes, Pérols, Saint-Jean-de-Védas">
              Zone 2 - Périphérie proche (+5€)
            </option>
          </optgroup>
          <optgroup label="Périphérie éloignée (+10€)">
            <option value="zone3" data-communes="Palavas-les-Flots, Carnon, La Grande-Motte, Lunel">
              Zone 3 - Périphérie éloignée (+10€)
            </option>
          </optgroup>
          <optgroup label="Autres">
            <option value="hors-zone">
              Hors zone (sur devis)
            </option>
          </optgroup>
        </select>
      </div>

      <!-- Zone Info -->
      <div v-if="selectedZone" class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <span class="text-2xl">
              {{ zoneIcon }}
            </span>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              {{ zoneInfo.name }}
            </h3>
            <p class="text-sm text-gray-600 mt-1">
              {{ zoneInfo.description }}
            </p>
            <div class="mt-2">
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  zoneInfo.cost === 0 
                    ? 'bg-green-100 text-green-800' 
                    : zoneInfo.cost > 0 
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ zoneInfo.costLabel }}
              </span>
            </div>
            
            <!-- Communes examples -->
            <div v-if="zoneInfo.communes" class="mt-3">
              <p class="text-xs text-gray-500">
                <span class="font-medium">Exemples de communes :</span>
                {{ zoneInfo.communes }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Frequency Selection -->
      <div class="border-t pt-4">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Fréquence d'intervention
        </label>
        <div class="grid grid-cols-2 gap-3">
          <div 
            v-for="freq in frequencies"
            :key="freq.value"
            :class="[
              'relative rounded-lg border-2 p-3 cursor-pointer transition-all text-center',
              selectedFrequency === freq.value
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'
            ]"
            @click="selectedFrequency = freq.value"
          >
            <input
              :id="freq.value"
              type="radio"
              :value="freq.value"
              v-model="selectedFrequency"
              class="sr-only"
            >
            <div>
              <label :for="freq.value" class="text-sm font-medium text-gray-900 cursor-pointer">
                {{ freq.label }}
              </label>
              <p class="text-xs text-gray-500 mt-1">
                {{ freq.description }}
              </p>
              <div 
                v-if="freq.discount"
                class="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded-full"
              >
                {{ freq.discount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GeographicalZone, FrequencyType } from '~/types/Windows.types'

const props = defineProps<{
  zone: GeographicalZone
  frequency: FrequencyType
}>()

const emit = defineEmits<{
  'update:zone': [value: GeographicalZone]
  'update:frequency': [value: FrequencyType]
}>()

const selectedZone = computed({
  get: () => props.zone,
  set: (value) => emit('update:zone', value as GeographicalZone)
})

const selectedFrequency = computed({
  get: () => props.frequency,
  set: (value) => emit('update:frequency', value as FrequencyType)
})

const frequencies = [
  {
    value: 'ponctuel',
    label: 'Ponctuel',
    description: 'Intervention unique',
    discount: null
  },
  {
    value: 'mensuel',
    label: 'Mensuel',
    description: 'Tous les mois',
    discount: '-10%'
  },
  {
    value: 'trimestriel',
    label: 'Trimestriel',
    description: 'Tous les 3 mois',
    discount: '-5%'
  },
  {
    value: 'semestriel',
    label: 'Semestriel',
    description: 'Tous les 6 mois',
    discount: '-3%'
  }
]

const zoneInfo = computed(() => {
  const zones = {
    zone1: {
      name: 'Montpellier Centre',
      description: 'Zone centrale avec tarif de base',
      cost: 0,
      costLabel: 'Tarif de base',
      communes: 'Centre-ville, Ecusson, Antigone, Comédie'
    },
    zone2: {
      name: 'Périphérie proche',
      description: 'Communes limitrophes avec supplément modéré',
      cost: 5,
      costLabel: '+5€ par intervention',
      communes: 'Castelnau-le-Lez, Lattes, Pérols, Saint-Jean-de-Védas'
    },
    zone3: {
      name: 'Périphérie éloignée', 
      description: 'Communes plus éloignées avec supplément',
      cost: 10,
      costLabel: '+10€ par intervention',
      communes: 'Palavas-les-Flots, Carnon, La Grande-Motte, Lunel'
    },
    'hors-zone': {
      name: 'Hors zone',
      description: 'Tarification sur devis selon la distance',
      cost: 0,
      costLabel: 'Sur devis',
      communes: null
    }
  }
  return zones[selectedZone.value] || zones.zone1
})

const zoneIcon = computed(() => {
  const icons = {
    zone1: '🏙️',
    zone2: '🏘️', 
    zone3: '🌊',
    'hors-zone': '📍'
  }
  return icons[selectedZone.value] || '📍'
})
</script>