<script setup lang="ts"></script>
<template>
  <section class="about-card">
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
.about-card {
  @include secondary-card;
}
</style>
