<template>
  <div class="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 sm:py-6">
    <!-- Mobile: Simplified Progress -->
    <div class="sm:hidden">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-medium text-gray-700">
          Étape {{ currentStep + 1 }} sur {{ steps.length }}
        </span>
        <span class="text-xs text-gray-500">
          {{ Math.round(((currentStep + 1) / steps.length) * 100) }}%
        </span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-primary h-2 rounded-full transition-all duration-300"
          :style="{ width: `${((currentStep + 1) / steps.length) * 100}%` }"
        ></div>
      </div>
      <div class="mt-4 text-center">
        <h2 class="text-lg font-medium text-gray-900">
          {{ steps[currentStep]?.name }}
        </h2>
        <p class="text-sm text-gray-500 mt-1">
          {{ steps[currentStep]?.description }}
        </p>
      </div>
    </div>

    <!-- Desktop: Full Progress Stepper -->
    <div class="hidden sm:block">
      <nav aria-label="Progress">
        <ol class="flex items-center justify-center space-x-3 lg:space-x-5">
          <li 
            v-for="(step, index) in steps" 
            :key="step.id"
            :class="[
              'relative',
              index !== steps.length - 1 ? 'pr-6 lg:pr-20' : ''
            ]"
          >
            <!-- Connector Line -->
            <div 
              v-if="index !== steps.length - 1"
              :class="[
                'absolute top-4 -right-3 lg:-right-10 h-0.5 w-6 lg:w-20',
                currentStep > index ? 'bg-primary' : 'bg-gray-200'
              ]"
              aria-hidden="true"
            />
            
            <!-- Step Circle -->
            <div class="relative flex items-center justify-center">
              <div 
                :class="[
                  'h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm font-medium',
                  currentStep > index 
                    ? 'bg-primary border-primary text-white' 
                    : currentStep === index
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                ]"
              >
                <span v-if="currentStep > index" class="text-white">
                  ✓
                </span>
                <span v-else>
                  {{ index + 1 }}
                </span>
              </div>
            </div>
            
            <!-- Step Label -->
            <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-max">
              <p 
                :class="[
                  'text-xs font-medium hidden lg:block',
                  currentStep >= index ? 'text-primary' : 'text-gray-500'
                ]"
              >
                {{ step.name }}
              </p>
            </div>
          </li>
        </ol>
      </nav>
      
      <!-- Current Step Info -->
      <div class="mt-8 text-center">
        <h2 class="text-lg font-medium text-gray-900">
          {{ steps[currentStep]?.name }}
        </h2>
        <p class="text-sm text-gray-500 mt-1">
          {{ steps[currentStep]?.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  id: string
  name: string
  description: string
}

const props = defineProps<{
  currentStep: number
}>()

const steps: Step[] = [
  {
    id: 'client-type',
    name: 'Type de client',
    description: 'Sélectionnez votre profil (particulier ou professionnel)'
  },
  {
    id: 'service-location',
    name: 'Service & Zone',
    description: 'Choisissez le type de service et votre zone géographique'
  },
  {
    id: 'windows-config',
    name: 'Configuration',
    description: 'Configurez vos fenêtres et options'
  },
  {
    id: 'summary',
    name: 'Récapitulatif',
    description: 'Vérifiez votre devis et finalisez'
  },
  {
    id: 'export',
    name: 'Export',
    description: 'Recevez votre devis par email'
  }
]
</script>