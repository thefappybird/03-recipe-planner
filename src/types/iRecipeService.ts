import type { PagedRecipes, Recipe, RecipeFilter } from "./interfaces";

export interface RecipeService {
  getAllRecipes(): Promise<PagedRecipes>;
  getRecipeById(id: string): Promise<Recipe>;
  getFilteredRecipes(filter: RecipeFilter): Promise<PagedRecipes>;
  createRecipe(data: any): Promise<string>;
  updateRecipe(id: string, data: any): Promise<string>;
  deleteRecipe(id: string): Promise<string>;
}
