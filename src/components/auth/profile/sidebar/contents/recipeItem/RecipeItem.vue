<template>
  <router-link
    :to="{ name: 'auth-recipe-details', params: { recipeId: recipeId } }"
    class="recipe-item"
    active-class="is-active"
    exact-active-class="is-exact-active"
  >
    <p class="title">{{ title }}</p>
    <!-- <p class="rating">
      {{ Math.floor(averageRating) }}<span class="star"> ★</span>
    </p> -->
  </router-link>
</template>

<script setup lang="ts">
const { recipeId, title, averageRating } = defineProps<{
  recipeId: string | undefined;
  title: string;
  averageRating: number;
}>();
</script>

<style scoped lang="scss">
.recipe-item {
  @include flex-type(row, space-between, center);
  @include secondary-card();
  margin: 0.25rem 0;
  padding: 0.25rem 0.75rem;
  width: 100%;
  transition: background 0.3s, color 0.3s;
  &:hover {
    @include main-card();
  }
  p {
    font-weight: bold;
  }
  .rating {
    font-size: 0.85rem;
    .star {
      color: #d4a538;
    }
  }
}
.is-exact-active {
  @include main-card();
}
</style>
