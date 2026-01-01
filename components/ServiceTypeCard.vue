<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Type de service</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      <div
        v-for="option in serviceOptions"
        :key="option.id"
        :class="[
          'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
          selectedService === option.id
            ? 'border-primary bg-primary/5'
            : 'border-gray-200 hover:border-gray-300'
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceType, ClientType } from '~/types/Windows.types'
import { useBusinessRules } from '~/composables/useBusinessRules'

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