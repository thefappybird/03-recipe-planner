<script setup lang="ts">
import ExploreCard from "@/components/explore/ExploreCard.vue";
import ExploreCardSkeleton from "@/components/explore/ExploreCardSkeleton.vue";
import TheExploreHeader from "@/components/explore/ExploreHeader.vue";
import ThePagination from "@/components/ThePagination.vue";
import { useModalStore } from "@/stores/modalStore";
import { useRecipeStore } from "@/stores/recipeStore";
import type { RecipeFilter } from "@/types/interfaces";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useHead } from "@vueuse/head";

const { toggleLoginModal } = useModalStore();

const recipeStore = useRecipeStore();

const { fetchedRecipes, loadingState } = storeToRefs(recipeStore);

const { getDashRecipes, filterRecipes } = recipeStore;

onMounted(async () => {
  await getDashRecipes();
});

async function handleSearch(filter: RecipeFilter | null) {
  await filterRecipes(filter);
}

useHead({
  title: "Explore | Plato",
  meta: [
    { name: "description", content: "Explore new recipes" },
    { property: "og:title", content: "Explore | Plato" },
  ],
});
</script>
<template>
  <TheExploreHeader :onSearch="handleSearch" />
  <ExploreCard
    v-if="!loadingState"
    v-for="(recipe, index) in fetchedRecipes?.items"
    :key="recipe.recipeId"
    :recipe="recipe"
    :index="index"
    @toggle-favorite="
      toggleLoginModal(true, 'You need to log in to have access to Favorites.')
    "
  />
  <ExploreCardSkeleton v-else v-for="n in 4" :key="n" />
  <ThePagination
    :currentPage="fetchedRecipes?.currentPage ?? 1"
    :totalPages="fetchedRecipes?.totalPages ?? 1"
    :onChangePage="handleSearch"
  />
</template>

<style scoped></style>
