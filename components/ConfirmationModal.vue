<template>
  <div v-if="isOpen" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-gray-900 mb-4">
        {{ title }}
      </h3>
      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>
      <div class="modal-action">
        <button
          @click="$emit('cancel')"
          class="btn btn-outline"
        >
          {{ cancelText }}
        </button>
        <button
          @click="$emit('confirm')"
          class="btn btn-primary"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
    <div class="modal-backdrop" @click="$emit('cancel')"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>