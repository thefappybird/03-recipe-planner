<script setup lang="ts">
import GreetingSection from "@/components/home/GreetingSection.vue";
</script>

<template>
  <div class="main-container">
    <GreetingSection />
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
