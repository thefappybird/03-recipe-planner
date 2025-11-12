<template>
  <div class="favorites-dashboard">
    <h4>Favorites</h4>

    <ExploreCard
      v-if="!loadingState"
      v-for="(favorite, index) in userFavorites?.items"
      :key="favorite.recipe.recipeId"
      :recipe="favorite.recipe"
      :index="index"
      @toggle-favorite="null"
    />
    <ExploreCardSkeleton v-else v-for="n in 4" :key="n" />

    <ThePagination
      :currentPage="userFavorites?.currentPage ?? 1"
      :totalPages="userFavorites?.totalPages ?? 1"
      :onChangePage="favoriteStore.getUserFavorites"
    />
  </div>
</template>

<script setup lang="ts">
import ExploreCard from "@/components/explore/ExploreCard.vue";
import ExploreCardSkeleton from "@/components/explore/ExploreCardSkeleton.vue";
import ThePagination from "@/components/ThePagination.vue";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const favoriteStore = useFavoriteStore();

const { userFavorites, loadingState } = storeToRefs(favoriteStore);

onMounted(async () => {
  await favoriteStore.getUserFavorites({
    search: "",
    page: 1,
  });
});
</script>

<style scoped lang="scss">
.favorites-dashboard {
  @include flex(column);
  width: 100%;
  margin: 0.5rem 1rem;
}
</style>
