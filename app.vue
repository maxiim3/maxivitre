<template>
  <NuxtPage />
  <TheFooter/>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    "data-theme": "cupcake",
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=KoHo:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Permanent+Marker&display=swap");
* {
  font-family: "Koho", "Inter", sans-serif;
  scroll-behavior: smooth;

}
</style>
