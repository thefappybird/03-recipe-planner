<template>
  <div>
    <ExploreView />
  </div>
</template>

<script setup lang="ts">
import ExploreView from "@/views/public/views/ExploreView.vue";
import { useHead } from "@vueuse/head";
useHead({
  title: "Explore | Plato",
  meta: [
    { name: "description", content: "Explore new recipes" },
    { property: "og:title", content: "Explore | Plato" },
  ],
});
</script>

<style scoped lang="scss">
div {
  width: 100%;
  margin: 0 1rem;
}
</style>
