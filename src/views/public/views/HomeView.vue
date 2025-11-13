<script setup lang="ts">
import GreetingSection from "@/components/home/GreetingSection.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Home | Plato",
  meta: [
    { name: "description", content: "Welcome to Plato" },
    { property: "og:title", content: "Home |  Plato" },
  ],
});
</script>

<template>
  <div class="main-container">
    <GreetingSection />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  @include flex(column);
  gap: 1rem;
  margin: 1rem 0;
}
</style>
