<template>
  <footer class="footer footer-center bg-secondary text-secondary-content p-10">
    <aside>
      <TheLogoRounded class="w-12 h-12 fill-white" />
      <p class="font-bold">
        MAXIVITRE
        <br />
        Service de lavage de vitre depuis 2024
      </p>
      <p>Copyright © {{ new Date().getFullYear() }} - Tous droits réservés</p>
      <p>
        Design et développement par
        <NuxtLink to="https://digitalsolution.studio"
          >DIGITAL SOLUTION STUDIO</NuxtLink
        >
      </p>
    </aside>
    <nav>
      <div class="grid grid-flow-col gap-4">
        <a
          href="https://g.page/maxivitre"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M12 2C7.589 2 4 5.589 4 9.995 4 15.4 12 22 12 22s8-6.6 8-12.005C20 5.589 16.411 2 12 2zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
            />
          </svg>
        </a>
        <a
          :href="socialMediaLinks.instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramLogo />
        </a>
        <a
          :href="socialMediaLinks.facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookLogo />
        </a>
      </div>
    </nav>
  </footer>
</template>
