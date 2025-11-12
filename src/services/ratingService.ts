import api from "./api";

export const ratingService = {
  async addRating(recipeId: string) {
    const response = await api.post(
      import.meta.env.VITE_API_FAVORITE_ENDPOINT + `${recipeId}`
    );
    return response.data;
  },
  async removeFavorite(recipeId: string) {
    const response = await api.delete(
      import.meta.env.VITE_API_FAVORITE_ENDPOINT + `${recipeId}`
    );
    return response.data;
  },
};
