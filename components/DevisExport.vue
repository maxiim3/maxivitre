<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="text-center">
      <div class="text-6xl mb-4">📄</div>
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        Votre devis est prêt !
      </h2>
      <p class="text-gray-500 mb-6">
        Téléchargez ou recevez votre devis personnalisé
      </p>
      
      <!-- Export Options -->
      <div class="space-y-4 max-w-md mx-auto">
        <!-- Email Input -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Recevoir par email
          </label>
          <div class="flex space-x-2">
            <input
              type="email"
              v-model="email"
              placeholder="votre.email@exemple.com"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm"
            >
            <button 
              @click="sendByEmail"
              :disabled="!isValidEmail || isSending"
              class="btn btn-primary btn-sm"
              :class="{ 'loading': isSending }"
            >
              {{ isSending ? 'Envoi...' : 'Envoyer' }}
            </button>
          </div>
        </div>

        <!-- Download PDF -->
        <div class="border-t pt-4">
          <button 
            @click="downloadPDF"
            :disabled="isGenerating"
            class="btn btn-outline w-full"
            :class="{ 'loading': isGenerating }"
          >
            <svg v-if="!isGenerating" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {{ isGenerating ? 'Génération...' : 'Télécharger PDF' }}
          </button>
        </div>

        <!-- Share Link -->
        <div class="border-t pt-4">
          <button 
            @click="copyShareLink"
            class="btn btn-ghost w-full text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            {{ linkCopied ? 'Lien copié !' : 'Copier le lien de partage' }}
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div class="mt-8 p-4 bg-gray-50 rounded-lg">
        <div class="flex justify-between items-center">
          <div class="text-left">
            <p class="text-sm font-medium text-gray-900">Total du devis</p>
            <p class="text-xs text-gray-500">
              {{ selectedWindows.length }} fenêtre{{ selectedWindows.length > 1 ? 's' : '' }} • 
              {{ clientType === 'professionnel' ? 'Professionnel' : 'Particulier' }}
            </p>
          </div>
          <div class="text-2xl font-bold text-primary">
            {{ grandTotal }}€
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WindowSelection, ClientType } from '~/types/Windows.types'

const props = defineProps<{
  selectedWindows: WindowSelection[]
  clientType: ClientType
  grandTotal: string
}>()

const emit = defineEmits<{
  'email-sent': [email: string]
  'pdf-downloaded': []
}>()

const email = ref('')
const isSending = ref(false)
const isGenerating = ref(false)
const linkCopied = ref(false)

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

const sendByEmail = async () => {
  if (!isValidEmail.value) return
  
  isSending.value = true
  
  try {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In real implementation, would call API to send email
    console.log('Sending devis to:', email.value)
    
    emit('email-sent', email.value)
    
    // Show success message
    alert(`Devis envoyé à ${email.value} !`)
    
  } catch (error) {
    console.error('Error sending email:', error)
    alert('Erreur lors de l\'envoi de l\'email')
  } finally {
    isSending.value = false
  }
}

const downloadPDF = async () => {
  isGenerating.value = true
  
  try {
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In real implementation, would generate and download PDF
    console.log('Generating PDF for devis:', props.grandTotal)
    
    // Create a fake download
    const link = document.createElement('a')
    link.href = 'data:application/pdf;base64,JVBERi0xLjQK' // Fake PDF data
    link.download = `devis-maxivitre-${Date.now()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    emit('pdf-downloaded')
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Erreur lors de la génération du PDF')
  } finally {
    isGenerating.value = false
  }
}

const copyShareLink = async () => {
  const url = `${window.location.origin}/devis/shared/${Date.now()}`
  
  try {
    await navigator.clipboard.writeText(url)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Error copying link:', error)
    alert('Erreur lors de la copie du lien')
  }
}
</script>