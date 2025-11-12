import { ref } from "vue";
import { defineStore } from "pinia";

export const useRatingStore = defineStore("rating", () => {
  const loadingState = ref(false);

  //   async function addFavorites(recipeId: string) {
  //     try {
  //       loadingState.value = true;
  //       await ratingService;
  //     } catch (error) {
  //       handleError(error);
  //     } finally {
  //       loadingState.value = false;
  //     }
  //   }
  //   async function removeFavorites(recipeId: string) {
  //     try {
  //       loadingState.value = true;
  //       await favoriteService.removeFavorite(recipeId);
  //     } catch (error) {
  //       handleError(error);
  //     } finally {
  //       loadingState.value = false;
  //     }
  //   }
  return {
    loadingState,
    // addFavorites,
    // removeFavorites,
  };
});
