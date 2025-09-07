<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Type de service</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      <div 
        v-for="option in serviceOptions" 
        :key="option.id"
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === option.id && option.id === 'nouveau-client'
            ? 'border-warning bg-warning/5'
            : selectedService === option.id && option.id === 'entretien-recent' && option.discount.rate > 0
            ? 'border-primary bg-primary/5'
            : selectedService === option.id
            ? 'border-gray-400 bg-gray-50'
            : 'border-gray-200 hover:border-gray-300',
          option.id === 'nouveau-client' ? 'border-warning/30 shadow-warning/20' : '',
          option.id === 'entretien-recent' && option.discount.rate > 0 ? 'border-primary/30 shadow-primary/20' : ''
        ]"
        @click="selectService(option.id)"
      >
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              :id="option.id"
              type="radio"
              :value="option.id"
              v-model="selectedService"
              class="radio radio-primary"
            >
          </div>
          <div class="ml-3 text-sm">
            <label :for="option.id" class="font-medium text-gray-900 cursor-pointer">
              <span v-if="option.id === 'nouveau-client'">🆕</span>
              <span v-else-if="option.id === 'entretien-recent'">⚡</span>
              <span v-else>🔄</span>
              {{ option.label }}
            </label>
            <p class="text-gray-500 mt-1">
              {{ option.description }}
            </p>
            <div class="mt-2 text-xs text-gray-600">
              <div v-if="option.discount.rate > 0">
                • Remise <span class="font-medium text-green-600">-{{ option.discount.percentage }}%</span>
              </div>
              <div v-else>
                • Tarif normal
              </div>
              <div v-if="option.id === 'nouveau-client'">
                • Nettoyage complet
                • Évaluation des besoins
              </div>
              <div v-else-if="option.id === 'entretien-recent'">
                • Programme fidélité
                • Intervention récente
                • Nettoyage d'entretien
              </div>
              <div v-else>
                • Client connu
                • Nettoyage régulier
              </div>
            </div>
          </div>
        </div>
        
        <!-- Badge discount pour nouveau client -->
        <div 
          v-if="option.id === 'nouveau-client'" 
          class="absolute -top-2 -right-2 badge badge-warning text-xs font-medium"
        >
          -{{ option.discount.percentage }}%
        </div>
        
        <!-- Badge fidélité pour entretien récent -->
        <div 
          v-if="option.id === 'entretien-recent' && option.discount.rate > 0" 
          class="absolute -top-2 -right-2 badge badge-primary text-xs font-medium"
        >
          -{{ option.discount.percentage }}%
        </div>
        <div 
          v-else-if="option.id === 'entretien-recent'" 
          class="absolute -top-2 -right-2 badge badge-primary text-xs font-medium"
        >
          Fidélité
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

const { getServiceOptions } = useBusinessRules()

const selectedService = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const serviceOptions = computed(() => getServiceOptions(props.clientType))

const selectService = (type: ServiceType) => {
  selectedService.value = type
}
</script>