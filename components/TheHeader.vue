<template>
  <header
    class="sticky top-0 z-50 mx-auto w-full bg-gradient-to-b from-secondary to-secondary/80 px-8 py-3 text-base-100 backdrop-blur"
    role="banner">
    <nav class="grid-cols-nav mx-auto grid w-full max-w-[980px] items-center" aria-label="Main navigation">
      <div class="justify-self-start">
        <NuxtLink
          to="/"
          class="btn btn-ghost tooltip tooltip-bottom tooltip-secondary flex gap-2 text-xl transition-all hover:gap-5"
          data-tip="Accueil"
          aria-label="Home">
          <TheLogo class="mx-auto w-8 fill-primary" aria-hidden="true" />
          <span class="hidden sm:block">Maxivitre</span>
        </NuxtLink>
      </div>
      <NuxtLink
        to="/devis"
        class="flex items-center gap-2 text-center font-bold underline underline-offset-2 transition-all hover:gap-4 hover:underline sm:no-underline"
        aria-label="Votre devis gratuit en 3 clics">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="inline-block h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
        <span class="text-pretty">Mon devis en 3 clics</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="inline-block h-5 w-5 rotate-180">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </NuxtLink>
      <div class="relative justify-self-end sm:hidden">
        <button class="btn btn-ghost btn-primary sm:hidden" @click="dropLinks = !dropLinks">Contacts</button>
        <div
          v-show="dropLinks"
          class="absolute top-[110%] w-full rounded-md bg-secondary p-4 sm:hidden"
          @blur="dropLinks = false"
          @focusout="dropLinks = false">
          <div class="mx-auto flex w-fit flex-col gap-4">
            <NuxtLink
              :to="socialMediaLinks.instagram"
              target="_blank"
              class="tooltip tooltip-left tooltip-secondary"
              data-tip="Instagram"
              aria-label="Instagram">
              <InstagramLogo aria-hidden="true" />
            </NuxtLink>
            <NuxtLink
              :to="socialMediaLinks.facebook"
              target="_blank"
              class="tooltip tooltip-left tooltip-secondary"
              data-tip="Facebook"
              aria-label="Facebook">
              <FacebookLogo aria-hidden="true" />
            </NuxtLink>
            <NuxtLink
              :to="useSubmitEmail()"
              target="_blank"
              class="tooltip tooltip-left tooltip-secondary"
              data-tip="Email"
              aria-label="Email us">
              <MailBox aria-hidden="true" />
            </NuxtLink>
            <NuxtLink
              :to="`https://wa.me/${contacts.phone}`"
              target="_blank"
              class="tooltip tooltip-left tooltip-secondary"
              data-tip="WhatsApp"
              aria-label="Nous contacter sur WhatsApp">
              <PhoneLogo aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="hidden gap-2 justify-self-end sm:flex">
        <NuxtLink
          :to="socialMediaLinks.instagram"
          target="_blank"
          class="tooltip tooltip-bottom tooltip-secondary"
          data-tip="Instagram"
          aria-label="Instagram">
          <InstagramLogo aria-hidden="true" />
        </NuxtLink>
        <NuxtLink
          :to="socialMediaLinks.facebook"
          target="_blank"
          class="tooltip tooltip-bottom tooltip-secondary"
          data-tip="Facebook"
          aria-label="Facebook">
          <FacebookLogo aria-hidden="true" />
        </NuxtLink>
        <NuxtLink
          :to="useSubmitEmail()"
          target="_blank"
          class="tooltip tooltip-bottom tooltip-secondary"
          data-tip="Email"
          aria-label="Email us">
          <MailBox aria-hidden="true" />
        </NuxtLink>
        <NuxtLink
          :to="`https://wa.me/${contacts.phone}`"
          target="_blank"
          class="tooltip tooltip-bottom tooltip-secondary"
          data-tip="WhatsApp"
          aria-label="Nous contacter sur WhatsApp">
          <PhoneLogo aria-hidden="true" />
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  const dropLinks = ref(false);
</script>
