<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Progress Stepper -->
    <ProgressStepper :currentStep="currentStep" />
    
    <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        
        <!-- Step 1: Options (Client + Service + Zone) -->
        <div v-if="currentStep === 0" class="space-y-6">
          <ClientTypeSelector v-model="clientType" />
          <ServiceTypeCard v-model="globalServiceType" :clientType="clientType" />
          <ZoneSelector 
            :zone="globalZone" 
            :frequency="globalFrequency"
            @update:zone="globalZone = $event"
            @update:frequency="globalFrequency = $event" 
          />
          <!-- OptionsSelector v-model="globalOptions" / --> 
          <!-- Options additionnelles temporairement désactivées - hors business rules -->
        </div>
        
        <!-- Step 2: Windows Configuration -->
        <div v-else-if="currentStep === 1" class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900">
                Configuration des fenêtres
              </h2>
              <button @click="openDrawerForAdd()" class="btn btn-primary">
                Ajouter une fenêtre
              </button>
            </div>

            <div v-if="selectedWindows.length === 0" class="text-center py-12">
              <div class="text-6xl mb-4">🪟</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Aucune fenêtre configurée
              </h3>
              <p class="text-gray-500 mb-6">
                Ajoutez vos fenêtres pour calculer le prix de votre devis
              </p>
              <button
                @click="openDrawerForAdd()"
                class="btn btn-primary"
              >
                Ajouter ma première fenêtre
              </button>
            </div>

            <div v-else>
              <p class="text-sm text-gray-600 mb-4">
                Gérez vos fenêtres via le panier sur la droite (desktop) ou en bas (mobile).
              </p>
              <div class="text-center py-8">
                <div class="text-4xl mb-2">✅</div>
                <p class="text-lg font-medium text-gray-900">{{ selectedWindows.length }} fenêtre{{ selectedWindows.length > 1 ? 's' : '' }} ajoutée{{ selectedWindows.length > 1 ? 's' : '' }}</p>
                <p class="text-sm text-gray-500 mt-2">
                  Utilisez le panier pour modifier ou supprimer vos fenêtres
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Step 3: Summary & Export -->
        <div v-else-if="currentStep === 2" class="space-y-6">
          <!-- Récapitulatif -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Récapitulatif de votre devis</h2>
            
            <!-- Client Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Vous êtes :</span>
                  <span class="font-medium">
                    {{ clientType === 'professionnel' ? 'Professionnel (-15%)' : 'Particulier' }}
                  </span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Service :</span>
                  <span class="font-medium">{{ getServiceLabel(globalServiceType) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Zone :</span>
                  <span class="font-medium">{{ getZoneLabel(globalZone) }}</span>
                </div>
              </div>
            </div>

            <!-- Windows List -->
            <div class="border-t pt-6">
              <h4 class="text-sm font-medium text-gray-900 mb-4">
                Fenêtres configurées ({{ selectedWindows.length }})
              </h4>
              <div class="space-y-3">
                <div 
                  v-for="(window, index) in selectedWindows" 
                  :key="index"
                  class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <span class="text-2xl">{{ window.image }}</span>
                    <div>
                      <p class="text-sm font-medium">{{ window.name }}</p>
                      <p class="text-xs text-gray-500">
                        Quantité: {{ window.quantity }} • 
                        {{ windowPricing.getSizeLabel(window.size) }} • 
                        {{ windowPricing.getCleaningTypeLabel(window.cleaningType) }}
                      </p>
                    </div>
                  </div>
                  <div class="text-sm font-medium">
                    {{ windowPricing.calculateTotalPrice(window, clientType) }}€
                  </div>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="border-t pt-6 mt-6">
              <div class="bg-primary/5 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-lg font-semibold text-gray-900">Total du devis</p>
                    <p class="text-sm text-gray-500">
                      (Minimum {{ clientType === 'professionnel' ? '80€' : '50€' }} appliqué)
                    </p>
                  </div>
                  <div class="text-2xl font-bold text-primary">
                    {{ grandTotal }}€
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Export intégré -->
          <DevisExport
            :selectedWindows="selectedWindows"
            :clientType="clientType"
            :grandTotal="grandTotal"
            @email-sent="onEmailSent"
            @pdf-downloaded="onPdfDownloaded"
          />
        </div>

        <!-- Navigation -->
        <div class="mt-8">
          <!-- Validation Message -->
          <div v-if="getStepValidationMessage && !canProceedToNextStep" class="mb-4">
            <div class="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-amber-800">
                    {{ getStepValidationMessage }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0">
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 order-2 sm:order-1">
              <button 
                v-if="currentStep > 0"
                @click="previousStep" 
                class="btn btn-outline"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Précédent
              </button>
              <button 
                @click="startNewDraft"
                class="btn btn-outline btn-error"
                :class="{ 'ml-3': currentStep > 0 }"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recommencer
              </button>
            </div>
            
            <button 
              v-if="currentStep < 2"
              @click="nextStep"
              :disabled="!canProceedToNextStep"
              class="btn btn-primary order-1 sm:order-2"
              :class="{ 'btn-disabled': !canProceedToNextStep }"
            >
              {{ currentStep === 1 ? 'Finaliser' : 'Suivant' }}
              <svg v-if="canProceedToNextStep" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <WindowDrawer 
      v-model:isOpen="isDrawerOpen" 
      :editingWindow="editingWindowIndex !== null ? selectedWindows[editingWindowIndex] : null"
      :isEditing="editingWindowIndex !== null"
      @select="editingWindowIndex !== null ? updateWindow(editingWindowIndex, $event) : addWindow($event)" 
    />
    
    <!-- Shopping Cart -->
    <ShoppingCart 
      :windows="selectedWindows" 
      :clientType="clientType"
    />
    
    <!-- Modal de confirmation pour brouillon existant -->
    <ConfirmationModal
      :isOpen="showDraftModal"
      title="Un devis est déjà en cours"
      message="Vous avez un brouillon de devis en cours. Que souhaitez-vous faire ?"
      confirmText="Continuer"
      cancelText="Recommencer"
      @confirm="loadExistingDraft"
      @cancel="startNewDraft"
    />
  </div>
</template>

<script setup lang="ts">
import type { 
  WindowType, 
  WindowSelection, 
  ClientType, 
  ServiceType, 
  GeographicalZone, 
  FrequencyType,
  ServiceOptions 
} from "~/types/Windows.types";
import { DIRTINESS_LEVELS } from "~/types/Windows.types";

// Wizard state
const currentStep = ref(0);

// Global settings
const clientType = ref<ClientType>('particulier');
const globalServiceType = ref<ServiceType>('standard');
const globalZone = ref<GeographicalZone>('zone1');
const globalFrequency = ref<FrequencyType>('ponctuel');
const globalOptions = ref<ServiceOptions>({
  cleanFrames: false,
  antiLimescale: false,
  insideOutside: false,
  wasteRemoval: false
});

// Windows and email
const selectedWindows = ref<WindowSelection[]>([]);
const isDrawerOpen = ref(false);
const customerEmail = ref('');
const editingWindowIndex = ref<number | null>(null);

// Modal state
const showDraftModal = ref(false);
let pendingDraft: any = null;

// Composables
const windowPricing = useWindowPricing();
const devisDraft = useDevisDraft();

// Window management
const addWindow = (window: WindowType) => {
  selectedWindows.value.push({
    ...window,
    dirtiness: 0,
    gluePercentage: 0,
    height: 1.5,
    quantity: 1,
    serviceType: globalServiceType.value,
    accessibility: 'rdc',
    frequency: globalFrequency.value,
    zone: globalZone.value,
    options: { ...globalOptions.value }
  });
};

const removeWindow = (index: number) => {
  selectedWindows.value.splice(index, 1);
};

const updateWindow = (index: number, window: WindowSelection) => {
  selectedWindows.value[index] = window;
  editingWindowIndex.value = null;
  isDrawerOpen.value = false;
};

const openDrawerForAdd = () => {
  editingWindowIndex.value = null;
  isDrawerOpen.value = true;
};

const openDrawerForEdit = (index: number) => {
  editingWindowIndex.value = index;
  isDrawerOpen.value = true;
};

// Navigation
const nextStep = () => {
  if (currentStep.value < 2) { // Maintenant max 3 étapes (0,1,2)
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 0: // Options (Client + Service + Zone) - always can proceed
      return true;
    case 1: // Windows - need at least one window
      return selectedWindows.value.length > 0;
    case 2: // Summary & Export - final step, no next button
      return false;
    default:
      return false;
  }
});

const getStepValidationMessage = computed(() => {
  switch (currentStep.value) {
    case 1: // Windows step
      if (selectedWindows.value.length === 0) {
        return 'Ajoutez au moins une fenêtre pour continuer';
      }
      break;
  }
  return null;
});

// Helper functions
const getServiceLabel = (serviceType: ServiceType) => {
  const labels = {
    'nouveau-client': 'Nouveau client',
    'entretien-standard': 'Entretien standard',
    'entretien-recent': `Entretien récent (moins de ${clientType.value === 'professionnel' ? '2 mois' : '6 mois'})`
  };
  return labels[serviceType] || 'Nouveau client';
};

const getZoneLabel = (zone: GeographicalZone) => {
  return windowPricing.getZoneLabel(zone);
};

const getFrequencyLabel = (frequency: FrequencyType) => {
  return windowPricing.getFrequencyLabel(frequency);
};

const currentDirtinessLevel = (level: number) => {
  return DIRTINESS_LEVELS[level] || DIRTINESS_LEVELS[0];
};

const hasGlobalOptions = computed(() => {
  return Object.values(globalOptions.value).some(option => option === true);
});

// Memoized calculations for better performance
const grandTotal = computed(() => {
  return windowPricing.calculateQuoteTotal(selectedWindows.value, clientType.value);
});

const totalWindows = computed(() => selectedWindows.value.length);

const hasAnyOptions = computed(() => {
  return selectedWindows.value.some(window => 
    Object.values(window.options).some(option => option === true)
  );
});

// Auto-apply global settings to new windows
watch([globalServiceType, globalZone, globalFrequency, globalOptions], () => {
  selectedWindows.value.forEach(window => {
    window.serviceType = globalServiceType.value;
    window.zone = globalZone.value;
    window.frequency = globalFrequency.value;
    window.options = { ...globalOptions.value };
  });
}, { deep: true });

// Modal handlers
const loadExistingDraft = () => {
  if (pendingDraft) {
    clientType.value = pendingDraft.clientType;
    globalServiceType.value = pendingDraft.globalServiceType;
    globalZone.value = pendingDraft.globalZone;
    globalFrequency.value = pendingDraft.globalFrequency;
    globalOptions.value = pendingDraft.globalOptions;
    selectedWindows.value = pendingDraft.selectedWindows;
    customerEmail.value = pendingDraft.customerEmail;
    currentStep.value = pendingDraft.currentStep;
  }
  showDraftModal.value = false;
  pendingDraft = null;
};

const startNewDraft = () => {
  devisDraft.clearDraft();
  showDraftModal.value = false;
  pendingDraft = null;
  // Reset to initial state
  currentStep.value = 0;
  clientType.value = 'particulier';
  globalServiceType.value = 'nouveau-client';
  globalZone.value = 'zone1';
  globalFrequency.value = 'ponctuel';
  globalOptions.value = {
    cleanFrames: false,
    antiLimescale: false,
    insideOutside: false,
    wasteRemoval: false
  };
  selectedWindows.value = [];
  customerEmail.value = '';
};

// Export handlers
const onEmailSent = (email: string) => {
  customerEmail.value = email;
  // Clear draft after successful export
  devisDraft.clearDraft();
};

const onPdfDownloaded = () => {
  // Clear draft after successful export
  devisDraft.clearDraft();
};

// Auto-save functionality
const getCurrentDraftState = () => ({
  clientType: clientType.value,
  globalServiceType: globalServiceType.value,
  globalZone: globalZone.value,
  globalFrequency: globalFrequency.value,
  globalOptions: globalOptions.value,
  selectedWindows: selectedWindows.value,
  customerEmail: customerEmail.value,
  currentStep: currentStep.value
});

// Setup auto-save on mount
onMounted(() => {
  // Load existing draft
  const existingDraft = devisDraft.loadDraft();
  if (existingDraft) {
    pendingDraft = existingDraft;
    showDraftModal.value = true;
  }
  
  // Setup auto-save every 30 seconds
  const cleanup = devisDraft.setupAutoSave(getCurrentDraftState, 30000);
  
  // Cleanup on unmount
  onUnmounted(cleanup);
});
</script>

<style scoped></style>
