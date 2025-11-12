<script setup lang="ts">
import { RouterView } from "vue-router";
import TheToast from "./components/TheToast.vue";
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <TheHeader />
  <RouterView />
  <TheToast />
</template>

<style scoped></style>
