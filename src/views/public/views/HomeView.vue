<script setup lang="ts">
import GreetingSection from "@/components/home/GreetingSection.vue";
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
