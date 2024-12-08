<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-gray-900">
            Window Cleaning Estimator
          </h1>
          <button @click="isDrawerOpen = true" class="btn btn-primary">
            Add Window
          </button>
        </div>

        <div v-if="selectedWindows.length === 0" class="text-center py-12">
          <h3 class="mt-2 text-sm font-semibold text-gray-900">
            No windows added
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Get started by adding a window to estimate.
          </p>
          <div class="mt-6">
            <button
              @click="isDrawerOpen = true"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Window
            </button>
          </div>
        </div>

        <div v-else class="space-y-6">
          <WindowCard
            v-for="(window, index) in selectedWindows"
            :key="index"
            :window="window"
            @remove="removeWindow(index)"
            @update="updateWindow(index, $event)"
          />

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center text-xl font-bold">
              <span>Grand Total:</span>
              <span>${{ grandTotal }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <WindowDrawer v-model:isOpen="isDrawerOpen" @select="addWindow" />
  </div>
</template>

<script setup lang="ts">
import type { WindowType, WindowSelection } from "~/types/window";

const isDrawerOpen = ref(false);
const selectedWindows = ref<WindowSelection[]>([]);
const windowPricing = useWindowPricing();

const addWindow = (window: WindowType) => {
  selectedWindows.value.push({
    ...window,
    dirtiness: 0,
    gluePercentage: 0,
    height: 1.5,
    quantity: 1,
  });
};

const removeWindow = (index: number) => {
  selectedWindows.value.splice(index, 1);
};

const updateWindow = (index: number, window: WindowSelection) => {
  selectedWindows.value[index] = window;
};

const grandTotal = computed(() => {
  return selectedWindows.value
    .reduce((total, window) => {
      return total + Number(windowPricing.calculateTotalPrice(window));
    }, 0)
    .toFixed(2);
});
</script>

<style scoped></style>
