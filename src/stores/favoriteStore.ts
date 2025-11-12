import { favoriteService } from "@/services/favoriteService";
import { handleError } from "@/util/helperFunctions";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { FavoriteFilter, PagedFavorites } from "@/types/interfaces";

export const useFavoriteStore = defineStore("favorite", () => {
  const loadingState = ref(false);
  const userFavorites = ref<PagedFavorites>();

  async function addFavorites(recipeId: string | undefined) {
    try {
      loadingState.value = true;
      if (!recipeId) throw new Error("Invalid recipe ID");
      await favoriteService.addFavorite(recipeId);
    } catch (error) {
      handleError(error);
    } finally {
      loadingState.value = false;
    }
  }
  async function removeFavorites(recipeId: string | undefined) {
    try {
      loadingState.value = true;
      if (!recipeId) throw new Error("Invalid recipe ID");
      await favoriteService.removeFavorite(recipeId);
    } catch (error) {
      handleError(error);
    } finally {
      loadingState.value = false;
    }
  }
  async function getUserFavorites(filter: FavoriteFilter) {
    try {
      loadingState.value = true;
      const response = await favoriteService.getFilteredFavoritesByUser(filter);
      console.log(response);
      userFavorites.value = response;
    } catch (error) {
      handleError(error);
    } finally {
      loadingState.value = false;
    }
  }
  return {
    loadingState,
    userFavorites,
    addFavorites,
    removeFavorites,
    getUserFavorites,
  };
});
