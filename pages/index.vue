<template>
  <main>
    <!-- Hero Section avec image de fond -->
    <section
      class="hero min-h-screen relative bg-cover bg-center bg-no-repeat"
      style="background-image: linear-gradient(rgba(0, 31, 66, 0.7), rgba(0, 31, 66, 0.7)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')"
    >
      <div class="hero-content text-center text-white">
        <div class="max-w-2xl">
          <TheLogo class="w-32 mx-auto mb-8 fill-primary drop-shadow-2xl" />
          <h1 class="mb-5 text-6xl font-bold uppercase tracking-wider">MAXIVITRE</h1>
          <p class="mb-8 text-2xl text-primary font-medium">
            Le spécialiste du nettoyage de vitres à Montpellier
          </p>
          <p class="mb-10 text-lg opacity-90">
            Professionnels ou particuliers, redonnez de l'éclat à vos vitres avec notre service expert.
            Devis gratuit et intervention rapide.
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <NuxtLink to="/devis" class="btn btn-primary btn-lg px-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Devis Gratuit
            </NuxtLink>
            <a href="tel:+33778818583" class="btn btn-outline btn-lg px-8 text-white border-white hover:bg-white hover:text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Appeler
            </a>
          </div>
        </div>
      </div>
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Section Services -->
    <section class="py-20 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 text-secondary">Nos Services</h2>
        <p class="text-center text-lg mb-12 max-w-2xl mx-auto">
          Des solutions adaptées à tous vos besoins de nettoyage de vitres
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Service 1 -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <figure>
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop" alt="Particuliers" class="w-full h-48 object-cover" />
            </figure>
            <div class="card-body">
              <h3 class="card-title text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Particuliers
              </h3>
              <p>Maisons, appartements, vérandas... Nous redonnons de la transparence à vos vitres pour un intérieur lumineux.</p>
              <div class="card-actions justify-end">
                <NuxtLink to="/devis" class="btn btn-primary btn-sm">En savoir plus</NuxtLink>
              </div>
            </div>
          </div>
          <!-- Service 2 -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <figure>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" alt="Professionnels" class="w-full h-48 object-cover" />
            </figure>
            <div class="card-body">
              <h3 class="card-title text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Professionnels
              </h3>
              <p>Bureaux, commerces, immeubles... Service régulier ou ponctuel avec contrats sur mesure.</p>
              <div class="card-actions justify-end">
                <NuxtLink to="/devis" class="btn btn-primary btn-sm">En savoir plus</NuxtLink>
              </div>
            </div>
          </div>
          <!-- Service 3 -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <figure>
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop" alt="Syndics" class="w-full h-48 object-cover" />
            </figure>
            <div class="card-body">
              <h3 class="card-title text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Syndics & Copropriétés
              </h3>
              <p>Entretien régulier des parties communes, cages d'escalier et halls d'entrée. Tarifs préférentiels.</p>
              <div class="card-actions justify-end">
                <NuxtLink to="/devis" class="btn btn-primary btn-sm">En savoir plus</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Pourquoi nous choisir -->
    <section class="py-20 bg-gradient-to-br from-secondary to-secondary/90 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 text-primary">Pourquoi Nous Choisir ?</h2>
        <p class="text-center text-lg mb-12 max-w-2xl mx-auto opacity-90">
          Une expertise locale au service de votre satisfaction
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Qualité Garantie</h3>
            <p class="opacity-80">Résultat impeccable à chaque intervention</p>
          </div>
          <div class="text-center">
            <div class="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Rapidité</h3>
            <p class="opacity-80">Intervention sous 48h selon disponibilité</p>
          </div>
          <div class="text-center">
            <div class="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Prix Justes</h3>
            <p class="opacity-80">Tarifs transparents et compétitifs</p>
          </div>
          <div class="text-center">
            <div class="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Local</h3>
            <p class="opacity-80">Entreprise basée à Castelnau-le-Lez</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Zone d'intervention avec carte stylisée -->
    <section class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 text-secondary">Zone d'Intervention</h2>
        <p class="text-center text-lg mb-12 max-w-2xl mx-auto">
          Nous intervenons rapidement dans tout l'Est de Montpellier
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="bg-base-100 p-8 rounded-2xl shadow-xl">
              <h3 class="text-2xl font-bold mb-6 text-primary">Nos Secteurs</h3>
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-lg">Montpellier Centre</span>
                </div>
                <div class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-lg">Montpellier Est</span>
                </div>
                <div class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-lg">Castelnau-le-Lez</span>
                </div>
                <div class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-lg">Jacou</span>
                </div>
                <div class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-lg">Clapiers</span>
                </div>
                <div class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-lg">Le Crès</span>
                </div>
              </div>
              <div class="mt-8 p-4 bg-primary/10 rounded-lg">
                <p class="text-sm">
                  <strong class="text-primary">Zone d'intervention :</strong> Jusqu'à 15km autour de Montpellier
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl overflow-hidden shadow-xl">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.8400%2C43.5800%2C3.9400%2C43.6400&layer=mapnik&marker=43.6318%2C3.8606"
                class="w-full h-full border-0"
                loading="lazy"
                title="Carte de Castelnau-le-Lez et environs"
              ></iframe>
              <div class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p class="text-sm font-bold text-secondary">MaxiVitre</p>
                    <p class="text-xs text-gray-600">Castelnau-le-Lez</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Processus -->
    <section class="py-20 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 text-secondary">Comment Ça Marche ?</h2>
        <p class="text-center text-lg mb-12 max-w-2xl mx-auto">
          Un processus simple et efficace en 4 étapes
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 class="text-xl font-bold mb-2">Demande de Devis</h3>
            <p>Remplissez notre formulaire en ligne ou appelez-nous directement</p>
          </div>
          <div class="text-center">
            <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 class="text-xl font-bold mb-2">Estimation</h3>
            <p>Nous vous envoyons un devis détaillé sous 24h</p>
          </div>
          <div class="text-center">
            <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 class="text-xl font-bold mb-2">Intervention</h3>
            <p>Notre équipe intervient à la date convenue</p>
          </div>
          <div class="text-center">
            <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              4
            </div>
            <h3 class="text-xl font-bold mb-2">Satisfaction</h3>
            <p>Des vitres impeccables et un client satisfait</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section CTA -->
    <section 
      class="py-20 bg-cover bg-center bg-fixed relative"
      style="background-image: url('https://images.unsplash.com/photo-1563013712-3195246a3cc0?w=1600&q=80')"
    >
      <div class="absolute inset-0 bg-secondary/90"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center text-white max-w-3xl mx-auto">
          <h2 class="text-4xl font-bold mb-4 text-primary">Prêt à Faire Briller Vos Vitres ?</h2>
          <p class="text-xl mb-8 opacity-90">
            Obtenez votre devis gratuit en quelques clics ou contactez-nous directement
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <NuxtLink to="/devis" class="btn btn-primary btn-lg px-8">
              Devis Gratuit Immédiat
            </NuxtLink>
            <a href="tel:+33778818583" class="btn btn-outline btn-lg px-8 text-white border-white hover:bg-white hover:text-secondary">
              07 78 81 85 83
            </a>
          </div>
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p class="font-bold">Email</p>
              <p class="text-sm opacity-80">contact@maxivitre.fr</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="font-bold">Horaires</p>
              <p class="text-sm opacity-80">Lun-Sam : 8h-19h</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="font-bold">Zone</p>
              <p class="text-sm opacity-80">Castelnau-le-Lez</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Réseaux sociaux -->
    <section class="py-16 bg-base-100">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-2xl font-bold mb-6 text-secondary">Suivez-nous</h3>
        <div class="flex justify-center gap-6">
          <a href="https://instagram.com" target="_blank" class="btn btn-circle btn-lg btn-primary">
            <InstagramLogo />
          </a>
          <a href="https://facebook.com" target="_blank" class="btn btn-circle btn-lg btn-primary">
            <FacebookLogo />
          </a>
          <a href="https://wa.me/33778818583" target="_blank" class="btn btn-circle btn-lg btn-primary">
            <PhoneLogo />
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { socialMediaLinks } from '~/utils/socialMedia';
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>