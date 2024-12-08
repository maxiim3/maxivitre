<template>
  <div class="flex flex-col justify-center w-screen">
    <!--
    ---------------- Hero
  -->
    <section
      class="p-4 hero text-center bg-base-100 text-base-content h-screen md:h-[50vh]"
    >
      <div class="hero-content max-w-md flex flex-col gap-2">
        <TheLogo class="w-24 mx-auto fill-primary" />
        <h1 class="text-5xl font-bold text-secondary uppercase">MAXIVITRE</h1>
        <h2 class="uppercase text-xl text-primary font-medium">
          Le lavage de vitre pro !
        </h2>
        <p class="text-secondary py-6">
          Professionnels ou particuliers, nous vous offrons des services de
          nettoyage de vitres sur mesure : interventions ponctuelles, contrats
          d'entretien réguliers et forfaits personnalisés pour répondre
          précisément à vos besoins.
        </p>
        <ScrollDown class="rotate-180 md:hidden w-16 h-16 opacity-45 mt-12" />
      </div>
    </section>
    <!--
      ---------------- Simulation devis
    -->
    <!--
    <section
    class="p-4 hero text-center bg-base-200 text-base-content h-screen md:h-[50vh]"
  >
    <div class="hero-content max-w-md flex flex-col gap-2">
      <h2 class="uppercase text-xl text-primary font-medium">
        Obtenez votre devis instantané
      </h2>
      <p class="uppercase text-md">
        Découvrez nos tarifs en quelques clics avec notre estimation immédiate et personnalisée !
      </p>
      <div class="flex gap-2">
        <NuxtLink to="/devis" class="btn flex-1 btn-primary uppercase">
          Calculer mon devis
        </NuxtLink>
      </div>
    </div>
  </section>
  -->
    <!--
         ---------------- Zone d'intervention
       -->
    <section
      class="text-center bg-secondary text-secondary-content h-screen md:h-[50vh]"
    >
      <div class="flex flex-col md:flex-row h-full">
        <div class="flex flex-col gap-8 p-4 flex-1 items-center justify-center">
          <h2 class="uppercase text-xl text-primary font-medium">
            Nous intervenons dans votre secteur
          </h2>
          <ul class="uppercase text-xl list-none">
            <li>Montpellier Centre</li>
            <li>Montpellier Est</li>
            <li>Castelnau-le-Lez</li>
            <li>Jacou</li>
            <li>Clapiers</li>
            <li>Le Crès</li>
            <!-- <li>Montferrier-sur-Lez</li> -->
            <!-- <li>Prades-le-Lez</li> -->
          </ul>
        </div>
        <!-- <div class="bg-slate-400 h-full flex-1">ICI UNE CARTE</div> -->
      </div>
    </section>
    <!--
      ---------------- Contact
    -->
    <section
      class="hero p-4 text-center bg-base-100 text-base-content min-h-screen md:min-h-[50vh]"
    >
      <div class="hero-content max-w-md flex flex-col gap-2">
        <h2 class="uppercase text-xl text-primary-content font-medium">
          Une question ?
        </h2>
        <p class="uppercase text-md">
          N'hésitez pas à nous contacter pour toute demande d'information !
        </p>
        <NuxtLink :to="onSubmitMessage()" class="btn btn-primary uppercase"
          >Nous écrire</NuxtLink
        >
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const EMAIL = ref("contact@maxivitre.fr");

function onSubmitMessage() {
  let message = encodeURIComponent("J'ai une question !");

  return `mailto:${EMAIL.value}?subject=${message}`;
}
</script>
<style scoped></style>
