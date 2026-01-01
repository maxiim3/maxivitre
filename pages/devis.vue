<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Progress Stepper -->
    <ProgressStepper :currentStep="currentStep" />

    <div class="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Step 1: Options (Client + Service + Zone) -->
        <div v-if="currentStep === 0" class="space-y-6">
          <ClientTypeSelector v-model="clientType" />
          <ServiceTypeCard v-model="globalServiceType" :clientType="clientType" />
          <ZoneSelector
            :zone="globalZone"
            @update:zone="globalZone = $event" />
          <AccessibilitySelector v-model="globalAccessibility" />
          <!-- OptionsSelector v-model="globalOptions" / -->
          <!-- Options additionnelles temporairement désactivées - hors business rules -->
        </div>

        <!-- Step 2: Windows Configuration -->
        <div v-else-if="currentStep === 1" class="space-y-6">
          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Configuration des fenêtres</h2>
              <button @click="openDrawerForAdd()" class="btn btn-primary">Ajouter une fenêtre</button>
            </div>

            <div v-if="selectedWindows.length === 0" class="py-12 text-center">
              <div class="mb-4 text-6xl">🪟</div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900">Aucune fenêtre configurée</h3>
              <p class="mb-6 text-gray-500">Ajoutez vos fenêtres pour calculer le prix de votre devis</p>
              <button @click="openDrawerForAdd()" class="btn btn-primary">Ajouter ma première fenêtre</button>
            </div>

            <div v-else class="space-y-4">
              <!-- En-tête avec compteur -->
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-sm font-medium text-gray-900">
                  Fenêtres configurées ({{ selectedWindows.length }})
                </h4>
              </div>

              <!-- Liste des fenêtres -->
              <div class="space-y-3">
                <div
                  v-for="(window, index) in selectedWindows"
                  :key="index"
                  class="flex items-center justify-between rounded-lg bg-gray-50 p-3 group hover:bg-gray-100 transition-colors"
                >
                  <!-- Gauche: Icône + Infos -->
                  <div class="flex items-center space-x-3 flex-1 min-w-0">
                    <span class="text-2xl">{{ window.image }}</span>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ window.name }}</p>
                      <p class="text-xs text-gray-500">
                        Quantité: {{ window.quantity }} •
                        {{ windowPricing.getSizeLabel(window.size) }} •
                        {{ windowPricing.getCleaningTypeLabel(window.cleaningType) }}
                      </p>
                    </div>
                  </div>

                  <!-- Droite: Prix + Supprimer -->
                  <div class="flex items-center space-x-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ windowPricing.calculateTotalPrice(window, clientType) }}€
                    </div>
                    <button
                      @click="confirmDelete(index)"
                      class="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/10"
                      :aria-label="`Supprimer ${window.name}`"
                      title="Supprimer cette fenêtre"
                    >
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Texte d'aide -->
              <div class="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Utilisez le bouton "Ajouter une fenêtre" pour configurer d'autres fenêtres</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Summary & Export -->
        <div v-else-if="currentStep === 2" class="space-y-6">
          <!-- Récapitulatif -->
          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 class="mb-6 text-lg font-semibold text-gray-900">Récapitulatif de votre devis</h2>

            <!-- Client Info -->
            <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500">Vous êtes :</span>
                  <span class="font-medium">
                    {{ clientType === "professionnel" ? "Professionnel (-15%)" : "Particulier" }}
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
              <h4 class="mb-4 text-sm font-medium text-gray-900">
                Fenêtres configurées ({{ selectedWindows.length }})
              </h4>
              <div class="space-y-3">
                <div
                  v-for="(window, index) in selectedWindows"
                  :key="index"
                  class="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div class="flex items-center space-x-3">
                    <span class="text-2xl">{{ window.image }}</span>
                    <div>
                      <p class="text-sm font-medium">{{ window.name }}</p>
                      <p class="text-xs text-gray-500">
                        Quantité: {{ window.quantity }} • {{ windowPricing.getSizeLabel(window.size) }} •
                        {{ windowPricing.getCleaningTypeLabel(window.cleaningType) }}
                      </p>
                    </div>
                  </div>
                  <div class="text-sm font-medium">{{ windowPricing.calculateTotalPrice(window, clientType) }}€</div>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="mt-6 border-t pt-6">
              <div class="rounded-lg bg-primary/5 p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-lg font-semibold text-gray-900">Total du devis</p>
                  </div>
                  <div class="text-2xl font-bold text-primary">{{ grandTotal }}€</div>
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
            @pdf-downloaded="onPdfDownloaded" />
        </div>

        <!-- Navigation -->
        <div class="mt-8">
          <!-- Validation Message -->
          <div v-if="getStepValidationMessage && !canProceedToNextStep" class="mb-4">
            <div class="rounded-md border border-amber-200 bg-amber-50 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd" />
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

          <div class="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
            <div class="order-2 flex flex-col space-y-2 sm:order-1 sm:flex-row sm:space-x-3 sm:space-y-0">
              <button v-if="currentStep > 0" @click="previousStep" class="btn btn-outline">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Précédent
              </button>
              <button @click="startNewDraft" class="btn btn-outline btn-error" :class="{ 'ml-3': currentStep > 0 }">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recommencer
              </button>
            </div>

            <button
              v-if="currentStep < 2"
              @click="nextStep"
              :disabled="!canProceedToNextStep"
              class="btn btn-primary order-1 sm:order-2"
              :class="{ 'btn-disabled': !canProceedToNextStep }">
              {{ currentStep === 1 ? "Finaliser" : "Suivant" }}
              <svg
                v-if="canProceedToNextStep"
                class="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
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
      @select="editingWindowIndex !== null ? updateWindow(editingWindowIndex, $event) : addWindow($event)" />

    <!-- Modal de confirmation pour brouillon existant -->
    <ConfirmationModal
      :isOpen="showDraftModal"
      title="Un devis est déjà en cours"
      message="Vous avez un brouillon de devis en cours. Que souhaitez-vous faire ?"
      confirmText="Continuer"
      cancelText="Recommencer"
      @confirm="loadExistingDraft"
      @cancel="startNewDraft" />

    <!-- Modale de confirmation de suppression -->
    <ConfirmationModal
      :isOpen="deleteConfirmIndex !== null"
      title="Supprimer cette fenêtre ?"
      message="Êtes-vous sûr de vouloir supprimer cette fenêtre de votre devis ? Cette action est irréversible."
      confirmText="Supprimer"
      cancelText="Annuler"
      @confirm="executeDelete"
      @cancel="cancelDelete" />
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
    ServiceOptions,
    AccessibilityLevel,
  } from "~/types/Windows.types";

  // Wizard state
  const currentStep = ref(0);

  // Global settings
  const clientType = ref<ClientType>("particulier");
  const globalServiceType = ref<ServiceType>("nouveau-client");
  const globalZone = ref<GeographicalZone>("zone1");
  const globalFrequency = ref<FrequencyType>("ponctuel");
  const globalAccessibility = ref<AccessibilityLevel>("rdc");
  const globalOptions = ref<ServiceOptions>({
    cleanFrames: false,
    antiLimescale: false,
    insideOutside: false,
    wasteRemoval: false,
  });

  // Windows and email
  const selectedWindows = ref<WindowSelection[]>([]);
  const isDrawerOpen = ref(false);
  const customerEmail = ref("");
  const editingWindowIndex = ref<number | null>(null);
  const deleteConfirmIndex = ref<number | null>(null);

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
      accessibility: globalAccessibility.value,
      frequency: globalFrequency.value,
      zone: globalZone.value,
      options: { ...globalOptions.value },
    });
  };

  const removeWindow = (index: number) => {
    selectedWindows.value.splice(index, 1);
  };

  const confirmDelete = (index: number) => {
    deleteConfirmIndex.value = index;
  };

  const cancelDelete = () => {
    deleteConfirmIndex.value = null;
  };

  const executeDelete = () => {
    if (deleteConfirmIndex.value !== null) {
      removeWindow(deleteConfirmIndex.value);
      deleteConfirmIndex.value = null;
    }
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
    if (currentStep.value < 2) {
      // Maintenant max 3 étapes (0,1,2)
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
          return "Ajoutez au moins une fenêtre pour continuer";
        }
        break;
    }
    return null;
  });

  // Helper functions
  const getServiceLabel = (serviceType: ServiceType) => {
    const labels = {
      "nouveau-client": "Nouveau client",
      "entretien-standard": "Entretien standard",
      "entretien-recent": `Entretien récent (moins de ${clientType.value === "professionnel" ? "2 mois" : "6 mois"})`,
    };
    return labels[serviceType] || "Nouveau client";
  };

  const getZoneLabel = (zone: GeographicalZone) => {
    return windowPricing.getZoneLabel(zone);
  };

  const getFrequencyLabel = (frequency: FrequencyType) => {
    return windowPricing.getFrequencyLabel(frequency);
  };

  // Memoized calculations for better performance
  const grandTotal = computed(() => {
    return windowPricing.calculateQuoteTotal(selectedWindows.value, clientType.value);
  });

  // Auto-apply global settings to existing windows (immutable update)
  watch(
    [globalServiceType, globalZone, globalFrequency, globalAccessibility, globalOptions],
    () => {
      if (selectedWindows.value.length === 0) return;

      selectedWindows.value = selectedWindows.value.map(window => ({
        ...window,
        serviceType: globalServiceType.value,
        zone: globalZone.value,
        frequency: globalFrequency.value,
        accessibility: globalAccessibility.value,
        options: { ...globalOptions.value },
      }));
    },
    { deep: true }
  );

  // Modal handlers
  const loadExistingDraft = () => {
    if (pendingDraft) {
      clientType.value = pendingDraft.clientType;
      globalServiceType.value = pendingDraft.globalServiceType;
      globalZone.value = pendingDraft.globalZone;
      globalFrequency.value = pendingDraft.globalFrequency;
      globalAccessibility.value = pendingDraft.globalAccessibility || "rdc";
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
    clientType.value = "particulier";
    globalServiceType.value = "nouveau-client";
    globalZone.value = "zone1";
    globalFrequency.value = "ponctuel";
    globalAccessibility.value = "rdc";
    globalOptions.value = {
      cleanFrames: false,
      antiLimescale: false,
      insideOutside: false,
      wasteRemoval: false,
    };
    selectedWindows.value = [];
    customerEmail.value = "";
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
    globalAccessibility: globalAccessibility.value,
    globalOptions: globalOptions.value,
    selectedWindows: selectedWindows.value,
    customerEmail: customerEmail.value,
    currentStep: currentStep.value,
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
