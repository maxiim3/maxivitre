<template>
  <div class="flex flex-col justify-center w-screen">
    <!--
    ---------------- Hero
  -->
    <section
      class="p-4 hero text-center bg-base-100 text-base-content h-screen md:h-[50vh]"
    >
      <div class="hero-content max-w-md flex flex-col gap-2">
        <TheLogo class="w-24 mx-auto" />
        <h1 class="text-5xl font-bold text-secondary uppercase">MAXIVITRE</h1>
        <h2 class="uppercase text-xl text-primary font-medium">
          Le lavage de vitre pro !
        </h2>
        <p class="text-secondary py-6">
          Professionnel ou particulier nous vous proposons un enretiens ponctuel
          ou réguliers et des forfaits adapter à vos besoins.
        </p>
        <ScrollDown class="rotate-180 md:hidden w-16 h-16 opacity-45 mt-12" />
      </div>
    </section>
    <!--
      ---------------- Simulation devis
    -->
    <section
      class="p-4 hero text-center bg-base-200 text-base-content h-screen md:h-[50vh]"
    >
      <div class="hero-content max-w-md flex flex-col gap-2">
        <h2 class="uppercase text-xl text-primary font-medium">
          Faites votre simulation de devis
        </h2>
        <p class="uppercase text-md">
          Essayez notre simulateur de devis en ligne et obtenez une idée de nos
          tarifs en 3 min chrono !
        </p>
        <div class="flex gap-2">
          <button class="btn flex-1 btn-primary uppercase">
            Simulation de Devis
          </button>
        </div>
      </div>
    </section>
    <!--
         ---------------- Zone d'intervention
       -->
    <section
      class="text-center bg-secondary text-secondary-content h-screen md:h-[50vh]"
    >
      <div class="flex flex-col md:flex-row h-full">
        <div class="p-4 flex-1">
          <h2 class="uppercase text-xl text-primary font-medium">
            Zone d&apos;intervention
          </h2>
          <p class="uppercase text-xl">Montpellier Centre & Est</p>
        </div>
        <div class="bg-slate-400 h-full flex-1">ICI UNE CARTE</div>
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
        <form class="flex flex-col gap-4 w-full">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-base-content">Votre nom</span>
            </label>
            <input
              type="text"
              placeholder="Nom"
              class="input input-bordered text-secondary w-full"
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-base-content">Votre email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              class="input input-bordered text-secondary w-full"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content">Votre message</span>
            </label>
            <textarea
              class="textarea textarea-bordered text-secondary h-24"
              placeholder="Message"
            ></textarea>
          </div>
          <button class="btn btn-primary uppercase">Envoyer</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
