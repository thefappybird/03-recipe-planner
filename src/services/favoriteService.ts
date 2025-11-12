import { ref } from "vue";
import api from "./api";
import type { FavoriteFilter } from "@/types/interfaces";
import { postRequest } from "@/util/helperFunctions";

export const favoriteService = {
  async addFavorite(recipeId: string) {
    const response = await api.post(
      import.meta.env.VITE_API_FAVORITE_ENDPOINT + `/${recipeId}`
    );
    return response.data;
  },
  async removeFavorite(recipeId: string) {
    const response = await api.delete(
      import.meta.env.VITE_API_FAVORITE_ENDPOINT + `/${recipeId}`
    );
    return response.data;
  },
  async getFilteredFavoritesByUser(filter: FavoriteFilter) {
    const response = await postRequest(
      import.meta.env.VITE_API_FAVORITE_ENDPOINT + "/current",
      filter
    );
    return response.data;
  },
};
