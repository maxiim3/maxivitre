<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 overflow-hidden z-50"
    @click="closeDrawer"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div class="pointer-events-auto w-screen max-w-md">
          <div
            class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
            @click.stop
          >
            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900">Select Window Type</h2>
                <button
                  type="button"
                  class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  @click="closeDrawer"
                >
                  <span class="absolute -inset-0.5"></span>
                  <span class="sr-only">Close panel</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div class="mt-8">
                <div class="flow-root">
                  <div class="grid grid-cols-1 gap-6">
                    <button
                      v-for="window in windows"
                      :key="window.id"
                      class="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50"
                      @click="selectWindow(window)"
                    >
                      <span class="text-4xl">{{ window.image }}</span>
                      <div class="flex-1 text-left">
                        <h3 class="font-medium text-gray-900">{{ window.name }}</h3>
                        <p class="text-sm text-gray-500">${{ window.basePrice }}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { WindowType } from '~/types/Windows.types'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'select': [window: WindowType]
}>()

const windows: WindowType[] = [
  { id: 'standard', name: 'Standard Window', image: '🪟', basePrice: 25 },
  { id: 'large', name: 'Large Window', image: '🪟', basePrice: 35 },
  { id: 'bay', name: 'Bay Window', image: '🪟', basePrice: 45 },
  { id: 'sliding', name: 'Sliding Door', image: '🚪', basePrice: 40 },
  { id: 'french', name: 'French Door', image: '🚪', basePrice: 50 },
  { id: 'skylight', name: 'Skylight', image: '🪟', basePrice: 60 }
]

const closeDrawer = () => {
  emit('update:isOpen', false)
}

const selectWindow = (window: WindowType) => {
  emit('select', window)
  closeDrawer()
}
</script>
