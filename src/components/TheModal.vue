<script setup lang="ts">
defineEmits<{
  (e: "toggle-modal"): void;
}>();
</script>
<template>
  <div class="modal-bg" @click="$emit('toggle-modal')">
    <div class="modal" @click.stop>
      <button class="close" @click="$emit('toggle-modal')"><p>X</p></button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-bg {
  position: fixed; /* 👈 fixed, not absolute */
  top: 0;
  left: 0;
  width: 100vw; /* full width of the viewport */
  height: 100vh; /* full height of the viewport */
  background-color: rgba(0, 0, 0, 0.4); /* semi-transparent background */
  display: flex; /* center modal content */
  align-items: center;
  justify-content: center;
  z-index: 1000; /* make sure it sits above everything else */
  .modal {
    position: relative; /* 👈 establishes positioning context */
    background-color: $color-background-main;
    padding: 1rem;
    z-index: 1001; /* ensure above the backdrop */
    min-width: 300px;
    .close {
      position: absolute; /* 👈 positions relative to .modal */
      top: 0.5rem;
      right: 0.5rem;
      background-color: rgba($color: #dd2a2a, $alpha: 1);
      padding: 0.2rem 0.4rem;
      color: white;
      transition: background-color 0.2s ease;
      &:hover {
        background-color: rgba(#b21f1f, 1);
      }
    }
  }
}
</style>
