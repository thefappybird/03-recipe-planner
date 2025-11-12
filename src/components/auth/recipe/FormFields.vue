<template>
  <div class="form-group">
    <label :for="modelName">{{ title }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelName: string;
  title: string;
}>();
</script>

<style scoped lang="scss">
.form-group {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
</style>
