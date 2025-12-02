<template>
  <main>
    <!-- Hero Section avec image de fond -->
    <section class="hero min-h-screen relative overflow-hidden">
      <!-- Image de fond optimisée -->
      <NuxtImg
        src="https://images.unsplash.com/photo-1482449609509-eae2a7ea42b7"
        alt="Nettoyage de vitres professionnel"
        :width="1920"
        :height="1080"
        sizes="100vw"
        format="webp"
        quality="80"
        priority
        class="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-secondary/70 to-secondary/70 -z-5"></div>
      <div class="hero-content text-center text-white">
        <div class="max-w-2xl">
          <TheLogo class="w-32 mx-auto mb-8 fill-primary drop-shadow-2xl" />
          <h1 class="mb-5 text-6xl font-bold uppercase tracking-wider">MAXIVITRE</h1>
          <p class="mb-8 text-2xl text-primary font-medium">
            {{ businessRules.business.specialization }} • {{ businessRules.business.location }}
          </p>
          <p class="mb-10 text-lg opacity-90">
            Vitrine impeccable = plus de clients ! Intervention flexible weekend, horaires adaptés à votre activité.
            <strong class="text-primary">-{{ businessRules.discounts.newClient * 100 }}% sur votre première intervention.</strong>
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <NuxtLink to="/devis" class="btn btn-primary btn-lg px-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              🎁 Première intervention -{{ businessRules.discounts.newClient * 100 }}%
            </NuxtLink>
            <a :href="`tel:${businessRules.business.phone}`" class="btn btn-outline btn-lg px-8 text-white border-white hover:bg-white hover:text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Appeler directement
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
          {{ businessRules.business.specialization.split('pour commerces')[0] }}<strong>extérieur uniquement</strong> • Priorité commerces {{ businessRules.business.location }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Service 1 - Particuliers -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <figure>
              <NuxtImg
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
                alt="Particuliers"
                :width="400"
                :height="300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                format="webp"
                quality="80"
                loading="lazy"
                class="w-full h-48 object-cover"
              />
            </figure>
            <div class="card-body">
              <h3 class="card-title text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Particuliers
              </h3>
              <p>Service résidentiel complémentaire. <strong>Nettoyage extérieur uniquement.</strong> Maisons, appartements, vérandas.</p>
            </div>
          </div>
          <!-- Service 2 - Commerces -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <figure>
              <NuxtImg
                src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                alt="Commerces"
                :width="400"
                :height="300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                format="webp"
                quality="80"
                loading="lazy"
                class="w-full h-48 object-cover"
              />
            </figure>
            <div class="card-body">
              <h3 class="card-title text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Commerces & Bureaux
                <span class="badge badge-primary badge-sm">Priorité</span>
              </h3>
              <p><strong>Vitrine impeccable = plus de clients !</strong> Nettoyage extérieur spécialisé. Intervention weekend sans perturber votre activité. Priorité absolue Castelnau-le-Lez.</p>
            </div>
          </div>
          <!-- Service 3 - Agences -->
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
            <figure>
              <NuxtImg
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                alt="Agences"
                :width="400"
                :height="300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                format="webp"
                quality="80"
                loading="lazy"
                class="w-full h-48 object-cover"
              />
            </figure>
            <div class="card-body">
              <h3 class="card-title text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Agences & Syndics
              </h3>
              <p>Image professionnelle indispensable. <strong>Contrats d'entretien régulier</strong> avec tarifs préférentiels. Nettoyage extérieur uniquement.</p>
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
            <p class="opacity-80">Intervention sous {{ businessRules.constraints.interventionDelay }}h selon disponibilité</p>
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
            <p class="opacity-80">Entreprise basée à {{ businessRules.business.location }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Zone d'intervention et tarifs -->
    <section class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 text-secondary">Zones d'Intervention & Tarifs</h2>
        <p class="text-center text-lg mb-12 max-w-2xl mx-auto">
          Tarification transparente depuis {{ businessRules.business.location }}
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div>
            <div class="bg-base-100 p-8 rounded-2xl shadow-xl">
              <h3 class="text-2xl font-bold mb-6 text-primary">Zones Tarifaires</h3>
              <div class="space-y-6">
                <!-- Zone 1 -->
                <div class="p-4 bg-primary/10 rounded-xl border-l-4 border-primary">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="font-bold text-lg text-primary">Zone 1 - {{ businessRules.serviceAreas.zone1[0] }}</h4>
                    <div class="badge badge-primary">Déplacement OFFERT</div>
                  </div>
                  <p class="text-xs text-gray-500 mb-3">Frais fixes {{ businessRules.constraints.fixedFees }}€ + prestation</p>
                </div>
                
                <!-- Zone 2 -->
                <div class="p-4 bg-secondary/10 rounded-xl border-l-4 border-secondary">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="font-bold text-lg text-secondary">Zone 2 - Communes limitrophes</h4>
                  </div>
                  <div class="text-sm space-y-1 mb-2">
                    <div
                      v-for="city in businessRules.serviceAreas.zone2"
                      :key="city"
                      class="flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ city }}</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mb-3">Frais fixes {{ businessRules.constraints.fixedFees }}€ + déplacement {{ businessRules.zones.zone2 }}€ + prestation</p>
                </div>

                <!-- Zone 3 -->
                <div class="p-4 bg-accent/10 rounded-xl border-l-4 border-accent">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="font-bold text-lg text-accent">Zone 3 - Secteur étendu</h4>
                  </div>
                  <div class="text-sm space-y-1 mb-2">
                    <div
                      v-for="city in businessRules.serviceAreas.zone3"
                      :key="city"
                      class="flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ city }}</span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mb-3">Frais fixes {{ businessRules.constraints.fixedFees }}€ + déplacement {{ businessRules.zones.zone3 }}€ + prestation</p>
                </div>
              </div>
              
              <!-- Bouton global pour obtenir un devis -->
              <div class="text-center mt-8">
                <NuxtLink to="/devis" class="btn btn-primary btn-lg px-8">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Obtenir mon devis
                </NuxtLink>
              </div>
            </div>
          </div>
          <div>
            <div class="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl overflow-hidden shadow-xl h-full">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.8950%2C43.6280%2C3.9150%2C43.6380&layer=mapnik&marker=43.6330%2C3.9050"
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
                    <p class="text-xs text-gray-600">{{ businessRules.business.location }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Offres Tarifaires -->
    <section class="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 text-secondary">Nos Offres</h2>
        <p class="text-center text-lg mb-8 max-w-2xl mx-auto">
          Solutions flexibles adaptées aux professionnels et particuliers
        </p>
        
        <!-- Toggle Pro/Particulier -->
        <div class="flex justify-center mb-12">
          <div class="join">
            <button 
              :class="['btn join-item', selectedClientType === 'pro' ? 'btn-secondary' : 'btn-outline']"
              @click="selectedClientType = 'pro'"
            >
              💼 Professionnels
            </button>
            <button 
              :class="['btn join-item', selectedClientType === 'particulier' ? 'btn-secondary' : 'btn-outline']"
              @click="selectedClientType = 'particulier'"
            >
              🏠 Particuliers
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div 
            v-for="offer in offers" 
            :key="offer.id" 
            :class="['card bg-base-100 shadow-xl border-2', offer.cardClass]"
          >
            <div class="card-body text-center">
              <div class="flex justify-center mb-4">
                <div :class="['badge badge-lg', offer.badge.class]">{{ offer.badge.text }}</div>
              </div>
              <h3 :class="['card-title text-2xl justify-center', offer.titleClass]">{{ offer.title }}</h3>
              <div :class="['text-4xl font-bold my-4', offer.discountClass]">{{ offer.discount }}</div>
              <p class="text-base-content" v-html="offer.description"></p>
              <ul class="text-sm space-y-2 mt-4 text-left">
                <li v-for="feature in offer.features" :key="feature">✓ {{ feature }}</li>
              </ul>
              <div class="card-actions justify-center mt-6">
                <NuxtLink to="/devis" :class="['btn', offer.buttonClass]">{{ offer.buttonText }}</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Section CTA -->
    <section class="py-20 relative overflow-hidden">
      <!-- Image de fond optimisée -->
      <NuxtImg
        src="https://images.unsplash.com/photo-1563013712-3195246a3cc0"
        alt="Façade de commerce avec vitres propres"
        :width="1600"
        :height="900"
        sizes="100vw"
        format="webp"
        quality="80"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div class="absolute inset-0 bg-secondary/90 -z-5"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center text-white max-w-3xl mx-auto">
          <h2 class="text-4xl font-bold mb-4 text-primary">Commerces de {{ businessRules.business.location }}</h2>
          <p class="text-xl mb-8 opacity-90">
            Vitrine impeccable = plus de clients ! <strong>-{{ businessRules.discounts.newClient * 100 }}% sur votre première intervention.</strong>
            Intervention weekend, sans perturber votre activité.
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <NuxtLink to="/devis" class="btn btn-primary btn-lg px-8">
              🎁 Offre Découverte -{{ businessRules.discounts.newClient * 100 }}%
            </NuxtLink>
            <a :href="`tel:${businessRules.business.phone}`" class="btn btn-outline btn-lg px-8 text-white border-white hover:bg-white hover:text-secondary">
              📞 {{ businessRules.business.phoneFormatted }}
            </a>
          </div>
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p class="font-bold">Email</p>
              <p class="text-sm opacity-80">{{ businessRules.business.email }}</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="font-bold">Horaires</p>
              <p class="text-sm opacity-80">{{ businessRules.business.hours }}</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="font-bold">Zone</p>
              <p class="text-sm opacity-80">{{ businessRules.business.location }}</p>
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
          <a :href="`https://wa.me/${businessRules.business.whatsapp}`" target="_blank" class="btn btn-circle btn-lg btn-primary">
            <PhoneLogo />
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { socialMediaLinks } from '~/utils/socialMedia';
import { useBusinessRules } from '~/composables/useBusinessRules'

const selectedClientType = ref<'pro' | 'particulier'>('pro')
const { businessRules } = useBusinessRules()

// SEO et schemas structurés
const { organizationSchema, localBusinessSchema, servicesSchemas } = useSchemas()

// Meta tags pour le SEO
useHead({
  title: `MaxiVitre - Nettoyage Vitres Professionnel ${businessRules.business.location} | -${businessRules.discounts.newClient * 100}% 1ère intervention`,
  meta: [
    { name: 'description', content: `${businessRules.business.specialization} ${businessRules.business.location}. Vitrine impeccable = plus de clients ! Intervention weekend, -${businessRules.discounts.newClient * 100}% première fois. ☎️ ${businessRules.business.phoneFormatted}` },
    { name: 'keywords', content: `nettoyage vitres, ${businessRules.business.location}, commerces, vitrines, professionnel, Montpellier` },
    { property: 'og:title', content: `MaxiVitre - Nettoyage Vitres Professionnel ${businessRules.business.location}` },
    { property: 'og:description', content: `Spécialiste nettoyage vitres commerces. Vitrine impeccable = plus de clients ! -${businessRules.discounts.newClient * 100}% première intervention.` },
    { property: 'og:type', content: 'business.business' },
    { property: 'og:locale', content: 'fr_FR' }
  ]
})

// Ajout des schemas JSON-LD dans le head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(localBusinessSchema)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': servicesSchemas
      })
    }
  ]
})

const offers = computed(() => {
  const newClientDiscount = businessRules.discounts.newClient * 100
  const loyaltyProDiscount = businessRules.discounts.loyaltyProfessional * 100
  const loyaltyPartDiscount = businessRules.discounts.loyaltyIndividual * 100
  const delayPro = businessRules.discounts.loyaltyDelayMonths.professionnel
  const delayPart = businessRules.discounts.loyaltyDelayMonths.particulier

  if (selectedClientType.value === 'pro') {
    return [
      {
        id: 'decouverte-pro',
        badge: { text: '🎁 NOUVEAU CLIENT', class: 'badge-warning' },
        title: 'Offre Découverte',
        titleClass: 'text-warning',
        discount: `-${newClientDiscount}%`,
        discountClass: 'text-warning',
        description: 'Sur votre première intervention',
        features: [
          'Tous types de prestations',
          'Valable toutes zones',
          'Sans engagement'
        ],
        buttonText: 'J\'en profite',
        buttonClass: 'btn-warning',
        cardClass: 'border-warning/30 shadow-warning/20'
      },
      {
        id: 'fidelite-pro',
        badge: { text: '💼 RECOMMANDÉ PRO', class: 'badge-primary' },
        title: 'Remise Fidélité',
        titleClass: 'text-primary',
        discount: `-${loyaltyProDiscount}%`,
        discountClass: 'text-primary',
        description: `Si intervention <strong>&lt; ${delayPro} mois</strong><br>de la précédente`,
        features: [
          'Intervention programmée',
          'Suivi personnalisé',
          'Priorité sur planning',
          'Facturation simplifiée'
        ],
        buttonText: 'Planifier',
        buttonClass: 'btn-primary',
        cardClass: 'border-primary/30 shadow-primary/20 scale-105'
      },
      {
        id: 'standard-pro',
        badge: { text: '⚡ PONCTUEL', class: 'badge-ghost' },
        title: 'Intervention Unique',
        titleClass: '',
        discount: 'Tarif standard',
        discountClass: '',
        description: 'Selon zone d\'intervention',
        features: [
          'Intervention flexible',
          'Tarif transparent',
          'Qualité garantie'
        ],
        buttonText: 'Demander un devis',
        buttonClass: 'btn-outline',
        cardClass: ''
      }
    ]
  } else {
    return [
      {
        id: 'decouverte-particulier',
        badge: { text: '🎁 NOUVEAU CLIENT', class: 'badge-warning' },
        title: 'Offre Découverte',
        titleClass: 'text-warning',
        discount: `-${newClientDiscount}%`,
        discountClass: 'text-warning',
        description: 'Sur votre première intervention',
        features: [
          'Intérieur et extérieur',
          'Valable toutes zones',
          'Sans engagement'
        ],
        buttonText: 'J\'en profite',
        buttonClass: 'btn-warning',
        cardClass: 'border-warning/30 shadow-warning/20'
      },
      {
        id: 'fidelite-particulier',
        badge: { text: '🏠 RECOMMANDÉ', class: 'badge-primary' },
        title: 'Remise Fidélité',
        titleClass: 'text-primary',
        discount: `-${loyaltyPartDiscount}%`,
        discountClass: 'text-primary',
        description: `Si intervention <strong>&lt; ${delayPart} mois</strong><br>de la précédente`,
        features: [
          'Service complet',
          'Suivi personnalisé',
          'Flexibilité horaire',
          'Conseils personnalisés'
        ],
        buttonText: 'Réserver',
        buttonClass: 'btn-primary',
        cardClass: 'border-primary/30 shadow-primary/20 scale-105'
      },
      {
        id: 'standard-particulier',
        badge: { text: '⚡ PONCTUEL', class: 'badge-ghost' },
        title: 'Intervention Unique',
        titleClass: '',
        discount: 'Tarif standard',
        discountClass: '',
        description: 'Selon zone d\'intervention',
        features: [
          'Intervention flexible',
          'Tarif transparent',
          'Qualité garantie'
        ],
        buttonText: 'Demander un devis',
        buttonClass: 'btn-outline',
        cardClass: ''
      }
    ]
  }
})
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