<script setup lang="ts">
import { computed } from "vue";

const { averageRating } = defineProps<{ averageRating: number }>();

const starStates = computed(() => {
  const stars = [];
  const fullStars = Math.floor(averageRating);
  const hasHalf = averageRating % 1 >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) stars.push("full");
    else if (i === fullStars + 1 && hasHalf) stars.push("half");
    else stars.push("empty");
  }
  return stars;
});
</script>

<template>
  <div class="stars">
    <span v-for="(state, i) in starStates" :key="i" class="star" :class="state">
      ★
    </span>
  </div>
</template>

<style scoped lang="scss">
.star {
  font-size: 20px;
  color: #ddd;
  &.full {
    color: #ffb400;
  }
  &.half {
    background: linear-gradient(90deg, #ffb400 50%, #ddd 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
