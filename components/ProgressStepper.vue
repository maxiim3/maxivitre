<template>
  <div class="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
    <!-- Mobile: Simplified Progress -->
    <div class="sm:hidden">
      <div class="mb-4 flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700"> Étape {{ currentStep + 1 }} sur {{ steps.length }} </span>
        <span class="text-xs text-gray-500"> {{ Math.round(((currentStep + 1) / steps.length) * 100) }}% </span>
      </div>
      <div class="h-2 w-full rounded-full bg-gray-200">
        <div
          class="h-2 rounded-full bg-primary transition-all duration-300"
          :style="{ width: `${((currentStep + 1) / steps.length) * 100}%` }"></div>
      </div>
      <div class="mt-4 text-center">
        <h2 class="text-lg font-medium text-gray-900">
          {{ steps[currentStep]?.name }}
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ steps[currentStep]?.description }}
        </p>
      </div>
    </div>

    <!-- Desktop: DaisyUI Steps Component -->
    <div class="hidden sm:block">
      <div class="flex justify-center">
        <ul class="steps steps-horizontal w-full max-w-2xl">
          <li
            v-for="(step, index) in steps"
            :key="step.id"
            :class="['step', currentStep >= index ? 'step-primary' : '']"
            :data-content="currentStep > index ? '✓' : index + 1">
            <div class="text-xs font-medium" :class="[currentStep >= index ? 'text-primary' : 'text-gray-400']">
              {{ step.name }}
            </div>
          </li>
        </ul>
      </div>

      <!-- Current Step Info -->
      <div class="mt-8 text-center">
        <h2 class="text-lg font-medium text-gray-900">
          {{ steps[currentStep]?.name }}
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ steps[currentStep]?.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Step {
    id: string;
    name: string;
    description: string;
  }

  const props = defineProps<{
    currentStep: number;
  }>();

  const steps: Step[] = [
    {
      id: "options",
      name: "Options",
      description: "Vous êtes un... + service et zone géographique",
    },
    {
      id: "windows-config",
      name: "Configuration",
      description: "Configurez vos fenêtres",
    },
    {
      id: "summary-export",
      name: "Récapitulatif",
      description: "Vérifiez et exportez votre devis",
    },
  ];
</script>
