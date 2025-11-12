<template>
  <div class="user-recipes">
    <h6 class="title">My Recipes</h6>
    <RecipeItem
      v-for="recipe in recipes"
      :recipe-id="recipe.recipeId"
      :title="recipe.title"
      :average-rating="recipe.averageRating"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import RecipeItem from "./recipeItem/RecipeItem.vue";

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const recipes = computed(() => currentUser.value?.recipes ?? []);
</script>

<style scoped lang="scss">
.user-recipes {
  @include flex(column);
  width: 100%;
  .title {
    font-weight: bold;
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
}
</style>
