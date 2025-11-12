import { postRequest, transformToFormData } from "@/util/helperFunctions.ts";
import api from "./api.ts";
import type { Recipe, RecipeFilter } from "@/types/interfaces.ts";
import type { RecipeService } from "@/types/iRecipeService.ts";

const recipeService: RecipeService = {
  async getAllRecipes() {
    const response = await api.get(
      import.meta.env.VITE_API_RECIPE_ENDPOINT + "/dash-recipes"
    );
    return response.data;
  },
  async getRecipeById(id) {
    const response = await api.get(
      import.meta.env.VITE_API_RECIPE_ENDPOINT + `/get-recipe/${id}`
    );
    return response.data;
  },
  async getFilteredRecipes(filter: RecipeFilter) {
    const response = await postRequest(
      import.meta.env.VITE_API_RECIPE_ENDPOINT + "/get-filtered-recipes",
      filter
    );
    return response.data;
  },
  async createRecipe(data: Recipe) {
    const response = await postRequest(
      import.meta.env.VITE_API_RECIPE_ENDPOINT + "/auth/create-recipe",
      data
    );
    return response.data;
  },
  async updateRecipe(id, data) {
    const formData = transformToFormData(data);
    const response = await api.put(
      import.meta.env.VITE_API_RECIPE_ENDPOINT + `/auth/update-recipe/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
  async deleteRecipe(id) {
    const response = await api.delete(
      import.meta.env.VITE_API_RECIPE_ENDPOINT + `/auth/delete-recipe/${id}`
    );
    return response.data;
  },
};

export default recipeService;
