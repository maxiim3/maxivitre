<template>
  <main class="flex w-screen flex-col justify-center">
    <!--
    ---------------- Hero
  -->
    <section class="hero h-screen bg-base-100 p-4 text-center text-base-content md:h-[50vh]">
      <div class="hero-content flex max-w-md flex-col gap-2">
        <h2 class="text-xl font-medium uppercase text-primary">
          Le lavage de vitre pour les profesionnels et les particuliers
        </h2>
        <p class="py-6 text-secondary">
          Particuliers ou professionnels, faites briller vos vitres ! Service rapide, efficace et sur mesure. Devis
          immédiat en ligne.
        </p>
        <NuxtLink to="/devis" class="btn btn-primary btn-lg uppercase">Devis Express en Ligne</NuxtLink>
      </div>
    </section>
    <section class="h-screen bg-secondary text-center text-secondary-content md:h-[50vh]">
      <div class="flex h-full flex-col md:flex-row">
        <div class="flex flex-1 flex-col items-center justify-center gap-8 p-4">
          <h2 class="text-xl font-medium uppercase text-primary">À votre service près de chez vous</h2>
          <ul class="list-none text-xl uppercase">
            <li>Montpellier Centre</li>
            <li>Montpellier Est</li>
            <li>Castelnau-le-Lez</li>
            <li>Jacou</li>
            <li>Clapiers</li>
            <li>Le Crès</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="hero min-h-screen bg-base-100 p-4 text-center text-base-content md:min-h-[50vh]">
      <div class="hero-content flex max-w-md flex-col gap-2">
        <h2 class="text-xl font-medium uppercase text-primary-content">Besoin d'un renseignement ?</h2>
        <p class="text-md uppercase">Retrouvez-moi sur les réseaux sociaux</p>
        <div class="flex justify-center gap-4">
          <a href="https://instagram.com" target="_blank" class="btn btn-square btn-primary">
            <InstagramLogo />
          </a>
          <a href="https://facebook.com" target="_blank" class="btn btn-square btn-primary">
            <FacebookLogo />
          </a>
          <a href="https://wa.me/+33600000000" target="_blank" class="btn btn-square btn-primary">
            <PhoneLogo />
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts"></script>
<style scoped></style>
